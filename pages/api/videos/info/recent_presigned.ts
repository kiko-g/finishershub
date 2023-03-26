import { estabilishS3Connection } from '../../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bucket = 'finishershub'
    const objects = new ListObjectsV2Command({ Bucket: bucket })
    const response = await s3.send(objects)

    if (!response.Contents) {
      res.status(404).json({ message: 'Error requesting objects from S3' })
      return
    }

    // 27 of March 2023 is after the last time we parsed the data
    const cutoffDate = new Date('2023-03-26T00:00:00.000Z')

    const videoData = response.Contents.filter((item) => item.LastModified! > cutoffDate)
      .map((object) => ({
        bucketName: bucket,
        filename: object.Key as string,
        lastModified: object.LastModified,
      }))
      .sort((a, b) => (a.lastModified! < b.lastModified! ? -1 : 1))

    const allSignedUrls = []
    for (const video of videoData) {
      const getObjectCommandInput = new GetObjectCommand({
        Bucket: video.bucketName,
        Key: video.filename,
      })

      const getObjectCommandOutput = {
        expiresIn: 60 * 60 * 24, // 1 day
      }

      const signedUrl = await getSignedUrl(s3, getObjectCommandInput, getObjectCommandOutput)
      allSignedUrls.push(signedUrl)
    }

    res.status(200).json(allSignedUrls)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
