import { estabilishS3Connection } from '../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2019 || 'finishershub.mw2019'
    const objects = await s3.listObjectsV2({ Bucket: bucketName }).promise()

    if (!objects.Contents) {
      throw new Error('Error requesting objects from S3')
    }

    const filenames = objects.Contents.map((object) => object.Key)
    const videoUrls = []

    for (const filename of filenames) {
      const videoUrl = await s3.getSignedUrlPromise('getObject', {
        Bucket: bucketName,
        Key: filename,
        Expires: 60 * 60 * 24, // 1 days
      })
      videoUrls.push(videoUrl)
    }

    res.status(200).json(videoUrls)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
