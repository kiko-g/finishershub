import { estabilishS3Connection } from '../../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const idStr = req.query.id as string
    const videoIndex = parseInt(idStr)

    if (isNaN(videoIndex)) {
      res.status(404).json({
        message: 'Video id provided is invalid',
      })
    }

    const bucketMW2019 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2019 || 'finishershub.mw2019'
    const bucketMW2022 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2022 || 'finishershub.mw2022'

    const objectsMW2019 = await s3.listObjectsV2({ Bucket: bucketMW2019 }).promise()
    const objectsMW2022 = await s3.listObjectsV2({ Bucket: bucketMW2022 }).promise()

    if (!objectsMW2019.Contents || !objectsMW2022.Contents) {
      res.status(404).json({ message: 'Error requesting objects from S3' })
      return
    }

    const videoDataMW2019 = objectsMW2019.Contents.map((object) => ({
      bucketName: bucketMW2019,
      filename: object.Key,
      lastModified: object.LastModified,
    })).sort((a, b) => (a.lastModified! > b.lastModified! ? -1 : 1))

    const videoDataMW2022 = objectsMW2022.Contents.map((object) => ({
      bucketName: bucketMW2022,
      filename: object.Key as string,
      lastModified: object.LastModified,
    })).sort((a, b) => (a.lastModified! > b.lastModified! ? -1 : 1))

    const allVideosSorted = [...videoDataMW2019, ...videoDataMW2022]

    if (videoIndex < 0 || videoIndex >= allVideosSorted.length) {
      res.status(404).json({
        message: 'Video index is out of valid bounds',
      })
    }

    const video = allVideosSorted[videoIndex]
    const videoUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: video.bucketName,
      Key: video.filename,
      Expires: 60 * 60 * 24, // 1 days
    })

    res.status(200).json(videoUrl)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
