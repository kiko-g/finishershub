import type { NextApiRequest, NextApiResponse } from "next"
import { Videos } from "@/models"
import { allowCors, connectMongoDB } from "@/config"

// @desc     Get total count of videos
// @route    GET /api/mongo/videos/count
// @access   Public
export default async function getTotalVideosCount(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()

  try {
    const count = await Videos.countDocuments()
    res.status(200).json(count)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
