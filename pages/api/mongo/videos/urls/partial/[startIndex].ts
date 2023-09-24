import Videos from "@/models/videos"
import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "@/config"
import { getVideoUrl } from "@/utils/api/s3"
import { ensureItemsAreSplit } from "@/utils"

// @desc     Get paginated videos with url
// @route    GET /api/mongo/videos/urls/[startIndex]
// @access   Public
export default async function getPaginatedVideosWithUrl(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()

  const { startIndex } = req.query
  const itemsPerPage = 30

  try {
    const allVideos = await Videos.find().sort({ id: 1 }).skip(Number(startIndex)).limit(itemsPerPage)

    const videosWithUrl = await Promise.all(
      allVideos.map(async (video) => {
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
