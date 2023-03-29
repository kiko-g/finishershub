import React from 'react'
import type { VideoAPIAndIndex, VideoType } from '../../@types'
import { VideoSkeleton, VideoNotFound, ShareVideo, PopOpenVideo } from '../videos'

type Props = {}

export default function MostRecentVideoShowcase({}: Props) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [video, setVideo] = React.useState<VideoType | null>(null)

  React.useEffect(() => {
    fetch('/api/s3/last')
      .then((res) => {
        if (res.status === 404) {
          setError(true)
          return null
        } else {
          return res.json()
        }
      })
      .then((res: VideoAPIAndIndex) => {
        setLoading(false)
        setVideo({
          url: res.video.url,
          index: res.index,
          date: res.video.date,
          game: res.video.game,
          filteredGame: 'mw2022',
          filename: res.video.filename,
        })
      })
  }, [])

  if (loading) return <VideoSkeleton />

  if (error || video === null) return <VideoNotFound />

  return (
    <div className="group relative">
      <video
        loop
        muted
        controls={false}
        autoPlay={true}
        preload="preload"
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
