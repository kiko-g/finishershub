import { estabilishS3Connection } from '../../../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const idStr = req.query.id as string
    const videoIndex = parseInt(idStr)

    if (isNaN(videoIndex)) {
      throw new Error('Invalid video index requested')
    }

    const bucketMW2022 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2022 || 'finishershub.mw2022'
    const objectsMW2022 = await s3.listObjectsV2({ Bucket: bucketMW2022 }).promise()

    if (!objectsMW2022.Contents) {
      throw new Error('Error requesting objects from S3')
    }

    const filenamesMW2022 = objectsMW2022.Contents.map((object) => object.Key)
    if (videoIndex < 0 || videoIndex >= filenamesMW2022.length) {
      throw new Error('Invalid video index requested')
    }

    const videoUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: bucketMW2022,
      Key: filenamesMW2022[videoIndex],
      Expires: 60 * 60 * 24, // 1 days
    })

    res.status(200).json(videoUrl)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}