import fs from "fs"
import multer from "multer"
import Videos from "@/models/videos"
import { allowCors, connectMongoDB } from "@/config"
import { S3, PutObjectCommand } from "@aws-sdk/client-s3"
import { establishS3Connection, runMiddleware } from "@/utils/api/s3"
import type { NextApiRequest, NextApiResponse } from "next"

// No need to extend NextApiRequest in this case
const upload = multer({ dest: "uploads/" })
const s3 = establishS3Connection()

export default async function uploadVideo(req: NextApiRequest, res: NextApiResponse) {
  await allowCors(req, res)
  await connectMongoDB()

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  // Use the adapter to handle multer middleware
  await runMiddleware(req, res, upload.single("video"))

  const file = req.file // Now req.file is available
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" })
  }

  try {
    const bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME
    const s3Response = await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: file.filename,
        Body: fs.createReadStream(file.path),
      }),
    )

    const newVideo = new Videos({
      filename: file.filename,
      s3_uri: `s3://${bucket}/${file.filename}`,
      bucket: bucket,
    })

    const savedVideo = await newVideo.save()

    res.status(201).json(savedVideo)
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  } finally {
    fs.unlinkSync(file.path) // Make sure to handle errors here as well
  }
}
