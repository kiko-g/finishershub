import type { NextApiRequest, NextApiResponse } from 'next'
import { allowCors, connectMongoDB } from '../../../config'
import Registry from '../../../models/registry'

// @desc     Get finishers of all members
// @route    GET /api/registry/
// @access   Public
export default async function getAllFinishers(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const allStats = await Registry.find()
    res.status(200).json(allStats)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
    res.status(500).json({ message: errorMessage })
  }
}
