// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  message: string
}

// @desc     Ping service
// @route    GET /api/
// @access   Public
export default async function ping(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    res.status(200).json({ message: "Welcome to the Finishers Hub API." })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
