import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout'
import VideoPlayer from '../../components/VideoPlayer'
import VideoSkeleton from '../../components/VideoSkeleton'

type Props = {}

export default function Video({}: Props) {
  const router = useRouter()
  const { pid } = router.query
  const [video, setVideo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const ready = useMemo(() => !loading && !fetchError && video !== '', [loading, fetchError, video])

  useEffect(() => {
    if (pid === undefined) return
    else if (isNaN(parseInt(pid as string))) {
      setFetchError(true)
    }

    const videoIndex = parseInt(pid as string)
    fetch(`/api/s3/videos/${videoIndex}}`)
      .then((res) => res.json())
      .then((url) => {
        setLoading(false)
        setVideo(url)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [pid])

  return (
    <Layout location="Video">
      <div className="mx-auto w-full max-w-5xl">
        {ready ? (
          <VideoPlayer index={0} muted={true} play={true} src={video} />
        ) : fetchError ? null : (
          <VideoSkeleton />
        )}
      </div>
    </Layout>
  )
}
