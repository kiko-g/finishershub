import React, { useEffect, useMemo, useState } from 'react'
import { Header, Footer, Seo } from '../../components/layout'
import { VideoSkeleton, VideoNotFound, SingleVideoShowcase } from '../../components/videos'
import { VideoType, VideoTypeAPI } from '../../@types'

type Props = {}

export default function Video({}: Props) {
  const [video, setVideo] = useState<VideoType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    const videoIndex = 0
    fetch(`/api/s3/${videoIndex}}`)
      .then((res) => {
        if (res.status === 404) {
          setFetchError(true)
        } else {
          return res.json()
        }
      })
      .then((vid: VideoTypeAPI) => {
        setLoading(false)
        setVideo({
          url: vid.url,
          index: videoIndex,
          date: vid.date,
          game: vid.game,
          filteredGame: '',
          filename: vid.filename,
        })
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-light dark:bg-navy">
      <Seo title="Video" />
      <Header siteTitle="Finishers Hub" location="Video" />
      <div className="flex flex-1 items-start justify-center md:items-center">
        <div className="mx-auto w-full max-w-full px-4 lg:max-w-5xl lg:px-0">
          {ready && video !== null ? (
            <SingleVideoShowcase video={video} />
          ) : fetchError ? (
            <VideoNotFound />
          ) : (
            <VideoSkeleton />
          )}
        </div>
      </div>
      <Footer siteTitle="Finishers Hub" />
    </div>
  )
}
