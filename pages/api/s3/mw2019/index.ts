import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { estabilishS3Connection } from '../../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bucketMW2019 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2019 || 'finishershub.mw2019'
    const objectsMW2019 = new ListObjectsV2Command({ Bucket: bucketMW2019 })
    const mw2019Response = await s3.send(objectsMW2019)

    if (!mw2019Response.Contents) {
      res.status(404).json({ message: 'Error requesting objects from S3' })
      return
    }

    const videoDataMW2019 = mw2019Response.Contents.map((object) => ({
      bucketName: bucketMW2019,
      filename: object.Key,
      lastModified: object.LastModified,
    })).sort((a, b) => (a.filename! < b.filename! ? -1 : 1))

    const videosRes = []
    for (const video of videoDataMW2019) {
      const getObjectCommandInput = new GetObjectCommand({
        Bucket: video.bucketName,
        Key: video.filename,
      })

      const getObjectCommandOutput = {
        expiresIn: 60 * 60 * 24, // 1 day
      }

      const signedUrl = await getSignedUrl(s3, getObjectCommandInput, getObjectCommandOutput)

      videosRes.push({
        game: video.bucketName.split('.')[1],
        url: signedUrl,
        date: video.lastModified,
        filename: video.filename,
      })
    }

    res.status(200).json(videosRes)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
