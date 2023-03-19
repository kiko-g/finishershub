import { estabilishS3Connection } from '../../../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bucketMW2019 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2019 || 'finishershub.mw2019'
    const objectsMW2019 = await s3.listObjectsV2({ Bucket: bucketMW2019 }).promise()

    if (!objectsMW2019.Contents) {
      res.status(404).json({ message: 'Error requesting objects from S3' })
      return
    }

    const videoDataMW2019 = objectsMW2019.Contents.map((object) => ({
      bucketName: bucketMW2019,
      filename: object.Key as string,
      lastModified: object.LastModified,
    })).sort((a, b) => (a.lastModified! < b.lastModified! ? -1 : 1))

    const videosRes = []
    for (const video of videoDataMW2019) {
      const videoUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: video.bucketName,
        Key: video.filename,
        Expires: 60 * 60 * 24, // 1 day
      })

      const videoRes = {
        game: video.bucketName.split('.'),
        url: videoUrl,
        date: video.lastModified,
        filename: video.filename,
      }

      videosRes.push(videoRes)
    }

    res.status(200).json(videosRes)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
