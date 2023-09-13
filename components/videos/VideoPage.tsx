import React, { useEffect, useMemo, useState } from "react"
import { Footer, Header, Seo } from "../layout"
import { SingleVideoShowcase, VideoNotFound, VideoSkeleton } from "."
import type { VideoMongoDBWithUrl } from "../../@types"

type Props = {
  videoIndex: number
}

export function VideoPage({ videoIndex }: Props) {
  const [video, setVideo] = useState<VideoMongoDBWithUrl | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [normalView, setNormalView] = useState<boolean>(true)
  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    if (videoIndex === undefined || videoIndex < 0) return

    fetch(`/api/mongo/videos/urls/${videoIndex}`)
      .then((res) => {
        if (res.status === 404) {
          setFetchError(true)
        } else {
          return res.json()
        }
      })
      .then((video: VideoMongoDBWithUrl) => {
        setLoading(false)
        setFetchError(false)
        setVideo(video)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [videoIndex])

  return normalView ? (
    <div className="flex min-h-screen flex-col bg-light dark:bg-navy">
      <Seo title={`Video ${videoIndex}`} />
      <Header siteTitle="Finishers Hub" location="Video" />
      <div className="flex flex-1 items-start justify-center md:items-center">
        <div className="mx-auto w-full max-w-full px-4 lg:max-w-5xl lg:px-0">
          {ready && video !== null ? (
            <SingleVideoShowcase video={video} expandedViewHook={[normalView, setNormalView]} />
          ) : fetchError ? (
            <VideoNotFound />
          ) : (
            <VideoSkeleton />
          )}
        </div>
      </div>
      <Footer siteTitle="Finishers Hub" />
    </div>
  ) : (
    ready && video !== null && (
      <>
        <Seo title={`Video ${videoIndex}`} />
        <SingleVideoShowcase video={video} expandedViewHook={[normalView, setNormalView]} />
      </>
    )
  )
}
