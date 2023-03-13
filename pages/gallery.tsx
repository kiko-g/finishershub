import React, { useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { shuffle } from '../utils'
import { useMediaQuery } from 'usehooks-ts'
import useAccessDenied from '../hooks/useAccessDenied'
import { Layout, AccessModal, InvisbleTopLayer } from '../components/layout'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import {
  ViewToggler,
  AutoplayToggler,
  MuteToggler,
  ShuffleButton,
  DeleteCookiesButton,
  VideoPlayer,
  VideoSkeleton,
  DelayDisclaimer,
} from '../components/videos'
import { PlusIcon } from '@heroicons/react/24/solid'

export default function Gallery() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sensitive = process.env.NEXT_PUBLIC_SENSITIVE! === 'false' ? false : true

  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [view, setView] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const [clipsShown, setClipsShown] = useState<number>(isMobile ? 1 : view ? 2 : 3)
  const [showMoreCount, setShowMoreCount] = useState<number>(0)

  const limitedAccess = useMemo(() => sensitive && accessDenied, [sensitive, accessDenied])
  const toastType = useMemo(() => {
    if (fetchError) return 'error'
    else if (loading) return 'warning'
    else if (!loading && !fetchError) return 'success'
    else return ''
  }, [loading, fetchError])

  const shuffleVideos = () => {
    setVideoUrls((prev) => shuffle(prev))
  }

  const loadMore = () => {
    setShowMoreCount((prev) => prev + 1)
    if (isMobile) setClipsShown((prev) => prev + 1)
    else setClipsShown((prev) => prev + (view ? 2 : 3))
  }

  useEffect(() => {
    fetch('/api/s3/videos')
      .then((res) => res.json())
      .then((allEmbedUrls) => {
        setLoading(false)
        const shuffledVideos = shuffle(allEmbedUrls)
        setVideoUrls(shuffledVideos)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [])

  useEffect(() => {
    if (limitedAccess) {
      setMuted(true)
      setAutoplay(true)
    } else {
      setMuted(true)
      setAutoplay(false)
    }
  }, [limitedAccess])

  useEffect(() => {
    if (isMobile) return
    if (view === true) {
      setClipsShown((prev) => {
        const rest = prev % 2
        return rest !== 0 ? prev + (2 - rest) : prev
      })
    } else {
      setClipsShown((prev) => {
        const rest = prev % 3
        return rest !== 0 ? prev + (3 - rest) : prev
      })
    }
  }, [view, isMobile])

  return (
    <Layout location="Gallery" background={false}>
      <main className="flex flex-col gap-y-4 px-0 lg:px-4">
        <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:gap-x-6">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Hub</h2>
            <p className="grow text-lg font-normal">
              The place for all finisher related content. Chaotic, outrageous, lawless on the fence
              of criminality. Perfectly unbalanced. As all things should be.
            </p>
          </div>
          <div className="mt-1 flex flex-row items-center justify-end gap-3 lg:mt-0 lg:flex-col">
            {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
            <div className="flex items-center justify-end gap-x-2">
              {limitedAccess ? (
                <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
              ) : null}
              <DeleteCookiesButton />
              <ShuffleButton shuffle={shuffleVideos} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} />
              {limitedAccess ? null : <MuteToggler hook={[muted, setMuted]} />}
              <ViewToggler hook={[view, setView]} />
            </div>
          </div>
        </div>

        <div>
          <DelayDisclaimer type={toastType} />
        </div>

        <div
          className={classNames(
            'relative',
            view ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
            'grid grid-cols-1 gap-6 md:mt-0 md:gap-5'
          )}
        >
          {limitedAccess ? <InvisbleTopLayer /> : null}
          {videoUrls.length > 0
            ? videoUrls.slice(0, clipsShown).map((videoSrc: string, videoIdx: number) => {
                const play = isMobile
                  ? videoIdx <= showMoreCount
                    ? true
                    : autoplay
                  : videoIdx === 0
                  ? true
                  : autoplay
                return (
                  <VideoPlayer
                    index={videoIdx}
                    src={videoSrc}
                    play={play}
                    muted={muted}
                    key={`video-${videoIdx}`}
                  />
                )
              })
            : Array(clipsShown)
                .fill(null)
                .map((_, skeletonIdx) => <VideoSkeleton key={`skeleton-${skeletonIdx}`} />)}
        </div>

        <div className="mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={loadMore}
            className={classNames(
              videoUrls.length === 0 ? 'hidden' : 'inline-flex',
              `items-center rounded border border-transparent bg-primary/60 px-4 
              py-2 text-white shadow-sm transition hover:bg-primary/90 
              hover:bg-primary focus:border-transparent focus:ring-2 
              focus:ring-primary focus:ring-offset-2 dark:border-transparent dark:bg-secondary/50 
              dark:hover:bg-secondary/80 dark:focus:ring-secondary dark:focus:ring-offset-2`
            )}
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Load More Videos
          </button>
        </div>
      </main>
    </Layout>
  )
}
