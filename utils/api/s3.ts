import { S3Client } from '@aws-sdk/client-s3'

export const estabilishS3Connection = () => {
  return new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME!,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
    },
  })
}
