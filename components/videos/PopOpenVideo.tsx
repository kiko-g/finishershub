import React, { useEffect } from "react"
import Link from "next/link"
import type { VideoType } from "../../@types"
import { getVideoUrlFromVideo } from "../../utils"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"

type Props = {
  video: VideoType
  size?: "sm" | "md" | "lg" | "xl"
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

  return url === "" ? null : (
    <Link href={url} target="_blank" title="Open video in new tab (or press P)" className="transition hover:opacity-80">
      <ArrowTopRightOnSquareIcon
        fillRule="evenodd"
        strokeWidth="1.5"
        className={classNames(
          size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
          size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
          size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
          size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
        )}
      />
    </Link>
  )
}
