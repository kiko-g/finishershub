import React from 'react'
import type { VideoType, VideoTypeAPI } from '../../@types'
import { VideoSkeleton, VideoNotFound } from '../videos'

type Props = {}

export default function MostRecentVideoShowcase({}: Props) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [url, setUrl] = React.useState<string>('')

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
      .then((vid: VideoTypeAPI) => {
        setLoading(false)
        setUrl(vid.url)
      })
  }, [])

  if (loading) return <VideoSkeleton />

  if (error) return <VideoNotFound />

  return (
    <video
      loop
      muted
      controls={false}
      autoPlay={true}
      preload="preload"
      className="h-full w-full rounded bg-primary/10 shadow dark:bg-secondary/10"
    >
      <source src={url} type="video/mp4" />
    </video>
  )
}
