import type { NextApiRequest, NextApiResponse } from "next"
import { allowCors, connectMongoDB } from "../../../../config"
import { getVideoUrl } from "../../../../utils/api/s3"
import Videos from "../../../../models/videos"
import { VideoMongoDB } from "../../../../@types"

// @desc     Get all videos with url
// @route    GET /api/mongo/videos/urls
// @access   Public
export default async function getAllVideosWithUrl(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const allVideos = await Videos.find()
    const videosWithUrl = await Promise.all(
      allVideos.map(async (video) => {
        const url = video.s3_uri ? await getVideoUrl(video.s3_uri) : null
        const videoObj = video.toObject() as VideoMongoDB

        // Ensure tags are split
        const splitTags =
          videoObj.tags?.flatMap((tag) =>
            typeof tag === "string" && tag.includes(",") ? tag.split(", ").map((t) => t.trim()) : tag,
          ) || []

        const splitAuthors =
          videoObj.authors?.flatMap((author) =>
            typeof author === "string" && author.includes(",") ? author.split(", ").map((x) => x.trim()) : author,
          ) || []

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
