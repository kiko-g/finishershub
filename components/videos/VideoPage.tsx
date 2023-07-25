import React, { useEffect, useMemo, useState } from 'react'
import { Footer, Header, Seo } from '../layout'
import { SingleVideoShowcase, VideoNotFound, VideoSkeleton } from '.'
import type { VideoType, VideoTypeAPI } from '../../@types'

type Props = {
  game: 'mw2019' | 'mw2022' | ''
  videoIndex: number
}

export default function VideoPage({ game, videoIndex }: Props) {
  const [video, setVideo] = useState<VideoType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [expandedView, setExpandedView] = useState<boolean>(true)
  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    if (videoIndex === -1) return
    const gameRoute = game === '' ? '' : `/${game}`
    const url = `/api/s3${gameRoute}/${videoIndex}`

    fetch(url)
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
          filteredGame: game,
          filename: vid.filename,
        })
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [videoIndex, game])

  return expandedView ? (
    <div className="flex min-h-screen flex-col bg-light dark:bg-navy">
      <Seo title="Video" />
      <Header siteTitle="Finishers Hub" location="Video" />
      <div className="flex flex-1 items-start justify-center md:items-center">
        <div className="mx-auto w-full max-w-full px-4 lg:max-w-5xl lg:px-0">
          {ready && video !== null ? (
            <SingleVideoShowcase video={video} expandedViewHook={[expandedView, setExpandedView]} />
          ) : fetchError ? (
            <VideoNotFound />
          ) : (
            <VideoSkeleton />
          )}
        </div>
      </div>
      <Footer siteTitle="Finishers Hub" />
    </div>
  ) : ready && video !== null ? (
    <SingleVideoShowcase video={video} expandedViewHook={[expandedView, setExpandedView]} />
  ) : null
}
