import { ListObjectsV2Command } from '@aws-sdk/client-s3'
import { estabilishS3Connection } from '../../../utils/api/s3'
import type { NextApiRequest, NextApiResponse } from 'next'

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bucketMW2019 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2019 || 'finishershub.mw2019'
    const bucketMW2022 = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME_MW2022 || 'finishershub.mw2022'

    const objectsMW2019 = new ListObjectsV2Command({ Bucket: bucketMW2019 })
    const objectsMW2022 = new ListObjectsV2Command({ Bucket: bucketMW2022 })

    const [mw2019Response, mw2022Response] = await Promise.all([
      s3.send(objectsMW2019),
      s3.send(objectsMW2022),
    ])

    if (!mw2019Response.Contents || !mw2022Response.Contents) {
      res.status(404).json({ message: 'Error requesting objects from S3' })
      return
    }

    const filenamesMW2019 = mw2019Response.Contents.map((object) => object.Key)
    const filenamesMW2022 = mw2022Response.Contents.map((object) => object.Key)
    const filenames = [filenamesMW2019, filenamesMW2022].flat()

    res.status(200).json({ filenames })
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}
