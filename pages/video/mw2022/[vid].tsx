import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Seo from '../../../components/Seo'
import { Navbar, Footer } from '../../../components/layout'
import {
  VideoPlayer,
  VideoSkeleton,
  VideoNotFound,
  ShareVideo,
  SingleVideoShowcase,
} from '../../../components/videos'
import { VideoType, VideoTypeAPI } from '../../../@types'

type Props = {}

export default function Video({}: Props) {
  const router = useRouter()
  const { vid } = router.query
  const [video, setVideo] = useState<VideoType | null>(null)
  const [videoId, setVideoId] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    if (vid === undefined) return
    else if (isNaN(parseInt(vid as string))) {
      setFetchError(true)
    }

    const videoIndex = parseInt(vid as string)
    fetch(`/api/s3/mw2022/${videoIndex}}`)
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
          filename: vid.filename,
        })
        setVideoId(videoIndex)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [vid])

  return (
    <div className="flex min-h-screen flex-col bg-light dark:bg-navy">
      <Seo title="Video" />
      <Navbar siteTitle="Finishers Hub" location="Video" />
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
