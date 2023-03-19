import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Seo from '../../components/Seo'
import { Navbar, Footer } from '../../components/layout'
import { VideoPlayer, VideoSkeleton, VideoNotFound, ShareVideo } from '../../components/videos'
import { VideoType } from '../../@types'

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
    fetch(`/api/s3/videos/${videoIndex}}`)
      .then((res) => {
        if (res.status === 404) {
          setFetchError(true)
        } else {
          return res.json()
        }
      })
      .then((url) => {
        setLoading(false)
        setVideo({
          url: url,
          index: videoIndex,
        })
        setVideoId(parseInt(vid as string))
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
            <div className="flex flex-col space-y-4 md:space-y-3">
              <VideoPlayer video={video} muted={true} play={true} />
              <div className="flex w-full items-center justify-between">
                <Link
                  href="/"
                  className="rounded bg-gradient-to-br from-slate-800 to-slate-900 px-3 py-2 text-sm text-white transition hover:opacity-80 dark:bg-gradient-to-br dark:from-gray-200 dark:to-gray-300 dark:text-gray-800"
                >
                  Go back home 🛖
                </Link>
                <ShareVideo index={videoId} />
              </div>
            </div>
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
