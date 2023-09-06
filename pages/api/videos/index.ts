import type { NextApiRequest, NextApiResponse } from 'next'
import { allowCors, connectMongoDB } from '../../../config'
import Videos from '../../../models/videos'

// @desc     Get all videos
// @route    GET /api/videos/
// @access   Public
export default async function getAllVideos(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const allVideos = await Videos.find()
    res.status(200).json(allVideos)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
    res.status(500).json({ message: errorMessage })
  }
}
