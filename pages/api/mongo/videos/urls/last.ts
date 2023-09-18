import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import { getVideoUrl } from "@/utils/api/s3"
import { VideoMongoDBWithUrl } from "@/@types"
import Videos from "@/models/videos"

// @desc     Get the last video with url
// @route    GET /api/mongo/videos/urls/last
// @access   Public
export default async function getLastVideoWithUrl(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()

  try {
    const video = await Videos.findOne().sort({ _id: -1 }) // Sort by _id in descending order to get the last document
    if (!video || !video.s3_uri) {
      res.status(404).json({ message: "Video not found" })
      return
    }

    const url = (await getVideoUrl(video.s3_uri)) || video.s3_uri
    const videoWithUrl: VideoMongoDBWithUrl = {
      ...video.toObject(),
      url,
    }

    res.status(200).json(videoWithUrl)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
