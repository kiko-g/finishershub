import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { estabilishS3Connection } from '../../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

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

    const filenames = response.Contents.sort((a, b) =>
      a.LastModified! < b.LastModified! ? -1 : 1
    ).map((item) => item.Key)

    res.status(200).json(filenames)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
