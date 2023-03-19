import type { NextApiRequest, NextApiResponse } from 'next'
import { allowCors, connectMongoDB } from '../../../../config'
import Registry from '../../../../models/registry'

// @desc     Get finishers of a certain member
// @route    GET /registry/:id/
// @access   Public
export default async function getFinishers(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const id = req.query.id as string
    const stats = await Registry.findById(id)

    if (!stats) {
      res.status(404).json({ message: 'Member not found' })
    }

    res.status(200).json(stats)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
    res.status(500).json({ message: errorMessage })
  }
}
