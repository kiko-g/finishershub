import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Seo from '../../components/Seo'
import { Navbar, Footer } from '../../components/layout'
import { VideoPlayer, VideoSkeleton, VideoNotFound, ShareVideo } from '../../components/videos'

type Props = {}

export default function Video({}: Props) {
  const vid = 0
  const [video, setVideo] = useState<string>('')
  const [videoId, setVideoId] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const ready = useMemo(() => !loading && !fetchError && video !== '', [loading, fetchError, video])

  useEffect(() => {
    fetch(`/api/s3/videos/${vid}`)
      .then((res) => {
        if (res.status === 404) {
          setFetchError(true)
        } else {
          return res.json()
        }
      })
      .then((url) => {
        setLoading(false)
        setVideo(url)
        setVideoId(vid)
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
          {ready ? (
            <div className="flex flex-col space-y-2">
              <VideoPlayer index={0} muted={true} play={true} src={video} />
              <div className="flex w-full items-center justify-between">
                <Link
                  href="/"
                  className="rounded bg-gradient-to-br from-blue-400 to-blue-500 px-3 py-2 text-sm text-white transition hover:opacity-80"
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