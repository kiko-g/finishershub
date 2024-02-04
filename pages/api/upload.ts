import { S3, PutObjectCommand } from "@aws-sdk/client-s3"
import multer, { FileFilterCallback } from "multer"
import { estabilishS3Connection } from "@/utils/api/s3"
import Videos from "@/models/videos"
import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import fs from "fs"

// Extending NextApiRequest to include the file object
interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File
}

const upload = multer({ dest: "uploads/" })
const s3 = estabilishS3Connection()

export default async function uploadVideo(req: NextApiRequestWithFile, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const action = upload.single("video")
  action(req, res, async (err: any) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }

    const file = req.file
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
        // Populate other fields as needed
      })

      const savedVideo = await newVideo.save()

      res.status(201).json(savedVideo)
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      res.status(500).json({ message: errorMessage })
    } finally {
      fs.unlinkSync(file.path)
    }
  })
}
