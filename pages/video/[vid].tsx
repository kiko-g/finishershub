import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"
import { VideoNotFound, VideoPage } from "../../components/videos"
import { Layout } from "../../components/layout/Layout"

export default function Video() {
  const [videoIndex, setVideoIndex] = useState<number | null>(null)
  const router = useRouter()
  const { vid } = router.query

  useEffect(() => {
    if (!router.isReady) return

    const parsedIndex = parseInt(vid as string, 10)
    if (!isNaN(parsedIndex)) setVideoIndex(parsedIndex)
    else setVideoIndex(-1)
  }, [vid, router.isReady])

  return (
    router.isReady &&
    videoIndex !== null &&
    (isNaN(videoIndex) || videoIndex < 0 ? (
      <Layout location="Video Not Found">
        <VideoNotFound />
      </Layout>
    ) : (
      <VideoPage videoIndex={videoIndex} />
    ))
  )
}
