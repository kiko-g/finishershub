import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "../../../../config"
import Videos from "../../../../models/videos"
import { VideoMongoDB } from "../../../../@types"

// @desc     Update a video document
// @route    PUT /api/mongo/videos/urls
// @access   Public
export default async function updateAllVideos(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()

  // Ensure the request method is PUT
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  // Parse the body
  const videoData: VideoMongoDB = req.body

  try {
    // Find the video by _id and update it
    const updatedVideo = await Videos.findOneAndUpdate(
      { _id: videoData._id }, // filter by _id
      videoData, // update with the provided data
      { new: true }, // return the updated document
    )

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" })
    }

    res.status(200).json(updatedVideo)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
