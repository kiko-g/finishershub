import React, { useCallback, useEffect, useState } from "react"
import classNames from "classnames"
import type { VideoMongoDBWithUrl } from "@/@types"
import { getButtonSizeClassNames, getVideoUrlFromVideo } from "@/utils"
import { ClipboardIcon } from "@heroicons/react/24/outline"
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid"

type Props = {
  video: VideoMongoDBWithUrl | null
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function ShareVideo({ video, size = "sm" }: Props) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = React.useState<string>("")

  const handleCopied = useCallback(() => {
    setCopied(!copied)
    navigator.clipboard.writeText(url)
  }, [copied, url])

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.keyCode === 67) handleCopied() // C key
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleCopied])

  React.useEffect(() => {
    if (!video) return

    const videoUrl = getVideoUrlFromVideo(video)
    setUrl(videoUrl)
  }, [video])

  useEffect(() => {
    if (copied)
      setTimeout(() => {
        setCopied(!copied)
      }, 3000)
  }, [copied, setCopied])

  return video === null ? null : (
    <button
      onClick={handleCopied}
      title="Copy video link (or press C)"
      className={classNames("transition hover:opacity-80", copied ? "text-emerald-500" : "")}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon fillRule="evenodd" strokeWidth="1.5" className={getButtonSizeClassNames(size)} />
      ) : (
        <ClipboardIcon fillRule="evenodd" strokeWidth="1.5" className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
