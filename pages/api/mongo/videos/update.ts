import Videos from "../../../../models/videos"
import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "../../../../config"

// @desc     Update a video document
// @route    PUT /api/mongo/videos/urls
// @access   Public
export default async function updateAllVideos(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const videoData = req.body
    const updatedVideo = await Videos.findOneAndUpdate({ _id: videoData._id }, videoData, { new: true })

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" })
    }

    res.status(200).json(updatedVideo)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
