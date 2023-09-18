import Videos from "@/models/videos"
import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import { getVideoUrl } from "@/utils/api/s3"
import { ensureItemsAreSplit } from "@/utils"

// @desc     Get video with url by ID
// @route    GET /api/mongo/videos/urls/[id]
// @access   Public
export default async function getVideoWithUrlById(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  const game = req.query.game as string

  try {
    const allVideos = game === "" ? await Videos.find() : await Videos.find({ game: game })
    const videosWithUrl = await Promise.all(
      allVideos
        .sort((a, b) => a.id - b.id)
        .map(async (video) => {
          const url = video.s3_uri ? await getVideoUrl(video.s3_uri) : null
          const videoObj = video.toObject()
          const splitTags = ensureItemsAreSplit(videoObj.tags)
          const splitAuthors = ensureItemsAreSplit(videoObj.authors)

          return {
            ...videoObj,
            tags: splitTags,
            authors: splitAuthors,
            url,
          }
        }),
    )

    res.status(200).json(videosWithUrl)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong"
    res.status(500).json({ message: errorMessage })
  }
}
