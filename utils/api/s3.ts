import { S3 } from 'aws-sdk'

export const estabilishS3Connection = () => {
  return new S3({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION_NAME,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  })
}
