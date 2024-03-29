import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import { Sound } from "@/models"

// @desc     Get all videos
// @route    GET /api/mongo/sound/on
// @access   Public
export default async function turnSoundOn(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const soundSetting = { setting: "audio-emergency", value: true }
    const updateSetting = await Sound.findOneAndUpdate({ setting: "audio-emergency" }, soundSetting, { new: true })

    return res.status(200).json({ message: "Emergency state ON. Sound was completely disabled." })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
