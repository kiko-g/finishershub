import type { NextApiRequest, NextApiResponse } from 'next'
import { allowCors, connectMongoDB } from '../../../../../../config'
import Registry from '../../../../../../models/registry'

// @desc     Update password of a certain member
// @route    GET /api/mongo/registry/:id/password/:newPassword/
// @access   Private
export default async function updatePassword(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const id = req.query.id as string
    const password = req.query.newPassword as string
    const stats = await Registry.findById(id)

    if (!stats) {
      res.status(404).json({ message: 'Member not found' })
      return
    }

    const updated = { code: password }
    const updatedStats = await Registry.findByIdAndUpdate(id, updated, { new: true })
    res.status(200).json(updatedStats)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
    res.status(500).json({ message: errorMessage })
  }
}
