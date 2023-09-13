import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { VideoPage } from "../../components/videos"

export default function Video() {
  const [videoIndex, setVideoIndex] = useState<number>(-1)
  const router = useRouter()
  const { vid } = router.query

  useEffect(() => {
    if (router.isReady) {
      const parsedIndex = parseInt(vid as string, 10)
      if (!isNaN(parsedIndex)) setVideoIndex(parsedIndex)
    }
  }, [vid, router.isReady])

  return <VideoPage videoIndex={videoIndex} />
}
