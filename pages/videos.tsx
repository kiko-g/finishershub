import React, { useEffect, useMemo, useState } from "react"
import useAccessDenied from "../hooks/useAccessDenied"
import { Layout, FullAccessBadge, LimitedAccessBadge } from "../components/layout"
import { useMediaQuery } from "usehooks-ts"
import { VideoNotFound, VideoSkeleton } from "../components/videos"
import type { VideoMongoDBWithUrl } from "../@types"

type Props = {}

export default function Videos({}: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [data, setData] = useState<VideoMongoDBWithUrl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    fetch(`/api/mongo/videos/urls`)
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
      <div>
        <div className="mb-3 text-lg font-normal">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Videos</h2>
            {accessDenied ? <LimitedAccessBadge /> : <FullAccessBadge />}
          </div>
          <p className="mt-1 max-w-3xl">
            This is your control panel. Filter as you see fit and relive some of our greatest moments.
          </p>
        </div>

        <>
          {loading && <VideoSkeleton />}
          {fetchError && <VideoNotFound />}
        </>
      </div>
    </Layout>
  )
}
