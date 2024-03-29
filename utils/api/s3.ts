import { NextApiRequest, NextApiResponse } from "next"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"

export function establishS3Connection() {
  return new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  })
}

export async function getVideoUrl(s3Uri: string): Promise<string | null> {
  // Extract bucket and key from the S3 URI
  const match = s3Uri.match(/^s3:\/\/([^/]+)\/(.+)$/)
  if (!match) {
    console.error("Invalid S3 URI")
    return null
  }

  const bucket = match[1]
  const key = match[2]
  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  })

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  })

  const url = await getSignedUrl(client, command, { expiresIn: 3600 })
  return url
}

export function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}
