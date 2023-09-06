import React, { useEffect, useMemo, useState } from 'react'
import { Layout } from '../components/layout'
import { useMediaQuery } from 'usehooks-ts'
import { VideoNotFound, VideoSkeleton } from '../components/videos'
import type { VideoMongoDBWithUrl } from '../@types'

type Props = {}

export default function Videos({}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [data, setData] = useState<VideoMongoDBWithUrl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    fetch(`/api/videos/urls`)
      .then((res) => res.json())
      .then((vids: VideoMongoDBWithUrl[]) => {
        setData(vids)
        setLoading(false)
        setFetchError(false)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [])

  return (
    <Layout location="Videos">
      <div>{loading && <VideoSkeleton />}</div>
      <div>{fetchError && <VideoNotFound />}</div>
      <div>
        {ready && (
          <div className="grid grid-cols-3 gap-4">
            {data
              .sort((a, b) => (a.id < b.id ? -1 : 1))
              .slice(0, 9)
              .map((video, videoIdx) => (
                <div key={`video-${videoIdx}-${video._id}`} className="">
                  <video autoPlay={videoIdx === 0} controls loop>
                    <source src={video.url} type="video/mp4" />
                  </video>
                </div>
              ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
