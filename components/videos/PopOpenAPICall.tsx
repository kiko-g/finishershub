import React, { useEffect } from "react"
import Link from "next/link"
import { getButtonSizeClassNames } from "../../utils"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

type Props = {
  videoId: number
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function PopOpenAPICall({ videoId, size = "sm" }: Props) {
  if (videoId < 0 || process.env.NODE_ENV !== "development") return null

  return (
    <Link
      target="_blank"
      title="Open video in new tab (or press P)"
      href={`/api/mongo/videos/urls/${videoId}`}
      className="transition hover:opacity-80"
    >
      <PaperAirplaneIcon fillRule="evenodd" strokeWidth="1.5" className={getButtonSizeClassNames(size)} />
    </Link>
  )
}
