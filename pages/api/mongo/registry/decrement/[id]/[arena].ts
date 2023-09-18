import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import Registry from "@/models/registry"

// @desc     Decrement finishers of a certain member
// @route    GET /api/mongo/registry/decrement/:id/:arena
// @access   Private
export default async function decrementFinishers(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const id = req.query.id as string
    const arena = parseInt(req.query.arena as string)
    const stats = await Registry.findById(id)

    if (!stats) {
      res.status(404).json({ message: "Member not found" })
      return
    }

    const increment = {
      finishers: stats.finishers.map((count, index) => (index === arena ? count - 1 : count)),
    }
    const updatedStats = await Registry.findByIdAndUpdate(id, increment, { new: true })
    res.status(200).json(updatedStats)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
