import React from "react"
import type { VideoMongoDBWithUrl } from "../../@types"
import { VideoSkeleton, VideoNotFound, ShareVideo, PopOpenVideo } from "."

export function MostRecentVideoShowcase() {
  const [loading, setLoading] = React.useState(true)
  const [fetchError, setFetchError] = React.useState(false)
  const [video, setVideo] = React.useState<VideoMongoDBWithUrl | null>(null)

  React.useEffect(() => {
    fetch(`/api/mongo/videos/urls/last`)
      .then((res) => {
        if (res.status === 404) {
          setFetchError(true)
          return null
        } else {
          return res.json()
        }
      })
      .then((video: VideoMongoDBWithUrl) => {
        setLoading(false)
        setVideo(video)
      })
  }, [])

  if (loading) return <VideoSkeleton />

  if (fetchError || video === null) return <VideoNotFound />

  return (
    <div className="group relative">
      <video
        loop
        muted
        controls={false}
        autoPlay={true}
        preload="auto"
        className="h-full w-full rounded bg-primary/10 shadow dark:bg-secondary/10"
      >
        <source src={video.url} type="video/mp4" />
      </video>
      <div className="absolute right-0 top-0 z-40 hidden rounded-bl rounded-tr bg-slate-900/80 px-2 py-2 font-normal text-white transition group-hover:flex group-hover:gap-2">
        <div className="flex items-center gap-2">
          <ShareVideo video={video} />
          <PopOpenVideo video={video} />
        </div>
      </div>
    </div>
  )
}
