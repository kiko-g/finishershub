import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { estabilishS3Connection } from "@/utils/api/s3"
import type { NextApiRequest, NextApiResponse } from "next"

const s3 = estabilishS3Connection()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME

    const objects = new ListObjectsV2Command({ Bucket: bucket })

    const response = await s3.send(objects)

    if (!response.Contents) {
      res.status(404).json({ message: "Error requesting objects from S3" })
      return
    }

    const videoData = response.Contents.map((object) => ({
      filename: object.Key as string,
      lastModified: object.LastModified,
    })).sort((a, b) => (a.filename! < b.filename! ? -1 : 1))

    const videosRes = []
    for (const video of videoData) {
      const getObjectCommandInput = new GetObjectCommand({
        Bucket: bucket,
        Key: video.filename,
      })

      const getObjectCommandOutput = {
        expiresIn: 60 * 60 * 24, // 1 day
      }

      const signedUrl = await getSignedUrl(s3, getObjectCommandInput, getObjectCommandOutput)

      videosRes.push({
        url: signedUrl,
        date: video.lastModified,
        filename: video.filename,
      })
    }

    res.status(200).json(videosRes)
  } catch (error) {
    console.error(error)
    const errorMessage = error instanceof Error ? error.message : "Internal server error"
    res.status(500).json({ message: errorMessage })
  }
}
