import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { VideoPage } from "../../../components/videos"

type Props = {}

export default function VideoMW2022({}: Props) {
  const game = "mw2022"
  const [videoIndex, setVideoIndex] = useState<number>(-1)

  const router = useRouter()
  const { vid } = router.query

  useEffect(() => {
    if (vid === undefined) return

    const videoIndex = parseInt(vid as string)
    if (!isNaN(videoIndex)) setVideoIndex(videoIndex)
  }, [vid])

  return <VideoPage videoIndex={videoIndex} game={game} />
}
