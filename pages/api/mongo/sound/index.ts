import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import { Sound } from "@/models"

// @desc     Get all videos
// @route    GET /api/mongo/videos/
// @access   Public
export default async function getSound(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const entry = await Sound.findOne({ setting: "audio-available" })
    if (!entry || entry.value === undefined) {
      return res.status(404).json({ message: "Sound setting not found" })
    }

    return res.status(200).json(entry.value)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
