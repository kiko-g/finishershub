import { GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
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

    const videoDataMW2019 = mw2019Response.Contents.map((object) => ({
      bucketName: bucketMW2019,
      filename: object.Key,
      lastModified: object.LastModified,
    }))

    const videoDataMW2022 = mw2022Response.Contents.map((object) => ({
      bucketName: bucketMW2022,
      filename: object.Key as string,
      lastModified: object.LastModified,
    }))

    const allVideosSorted = [...videoDataMW2019, ...videoDataMW2022].sort((a, b) =>
      a.lastModified! < b.lastModified! ? -1 : 1
    )

    const video = allVideosSorted[allVideosSorted.length - 1]
    const getObjectCommandInput = new GetObjectCommand({
      Bucket: video.bucketName,
      Key: video.filename,
    })

    const getObjectCommandOutput = {
      expiresIn: 60 * 60 * 24, // 1 day
    }

    const signedUrl = await getSignedUrl(s3, getObjectCommandInput, getObjectCommandOutput)

    const videoRes = {
      game: video.bucketName.split('.')[1],
      url: signedUrl,
      date: video.lastModified,
      filename: video.filename,
    }

    res.status(200).json(videoRes)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    res.status(500).json({ message: errorMessage })
  }
}