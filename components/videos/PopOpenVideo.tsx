import React, { useEffect } from "react"
import Link from "next/link"
import { getButtonSizeClassNames, getVideoUrlFromVideo } from "@/utils"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import type { VideoMongoDBWithUrl } from "@/@types"

type Props = {
  video: VideoMongoDBWithUrl | null
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function PopOpenVideo({ video, size = "sm" }: Props) {
  const [url, setUrl] = React.useState<string>("")

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 80) {
        // P key
        window.open(url, "_blank")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [url])

  React.useEffect(() => {
    if (!video) return

    const videoUrl = getVideoUrlFromVideo(video)
    setUrl(videoUrl)
  }, [video])

  return video === null ? null : (
    <Link href={url} target="_blank" title="Open video in new tab (or press P)" className="transition hover:opacity-80">
      <ArrowTopRightOnSquareIcon fillRule="evenodd" strokeWidth="1.5" className={getButtonSizeClassNames(size)} />
    </Link>
  )
}
