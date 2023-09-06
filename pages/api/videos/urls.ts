import type { NextApiRequest, NextApiResponse } from 'next'
import { allowCors, connectMongoDB } from '../../../config'
import { getVideoUrl } from '../../../utils/api/s3'
import Videos from '../../../models/videos'
import { VideoMongoDB } from '../../../@types'

// @desc     Get all videos with url
// @route    GET /api/videos/urls
// @access   Public
export default async function getAllVideosWithUrl(req: NextApiRequest, res: NextApiResponse<any>) {
  await allowCors(req, res)
  await connectMongoDB()
  try {
    const allVideos = await Videos.find()
    const videosWithUrl = await Promise.all(
      allVideos.map(async (video) => {
        const url = video.s3_uri ? await getVideoUrl(video.s3_uri) : null
        return {
          ...(video.toObject() as VideoMongoDB),
          url,
        }
      }),
    )

    res.status(200).json(videosWithUrl)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong'
    res.status(500).json({ message: errorMessage })
  }
}
