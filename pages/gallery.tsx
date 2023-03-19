import React, { useState, useEffect, useMemo } from 'react'
import type { FilterType, VideoType, VideoTypeAPI } from '../@types'
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
  FilterVideos,
  VideoPlayer,
  VideoSkeleton,
  DelayDisclaimer,
} from '../components/videos'
import { PlusIcon } from '@heroicons/react/24/solid'

export default function Gallery() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const arenas: FilterType[] = [
    { name: 'All', value: '/' },
    { name: 'Warzone 1', value: '/mw2019' },
    { name: 'Warzone 2', value: '/mw2022' },
  ]

  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const [videos, setVideos] = useState<VideoType[]>([])
  const [filter, setFilter] = useState<FilterType>(arenas[0])
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [view, setView] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const [clipsShown, setClipsShown] = useState<number>(isMobile ? 1 : view ? 2 : 3)
  const [showMoreCount, setShowMoreCount] = useState<number>(0)

  const limitedAccess = useMemo(() => accessDenied, [accessDenied])
  const toastType = useMemo(() => {
    if (fetchError) return 'error'
    else if (loading) return 'warning'
    else if (!loading && !fetchError) return 'success'
    else return ''
  }, [loading, fetchError])

  const shuffleVideos = () => {
    setVideos((prev) => shuffle(prev))
  }

  const loadMore = () => {
    setShowMoreCount((prev) => prev + 1)
    if (isMobile) setClipsShown((prev) => prev + 1)
    else setClipsShown((prev) => prev + (view ? 2 : 3))
  }

  useEffect(() => {
    fetch(`/api/s3/videos${filter.value}`)
      .then((res) => res.json())
      .then((vids: VideoTypeAPI[]) => {
        setLoading(false)
        return vids.map((vid: VideoTypeAPI, index: number) => ({
          url: vid.url,
          index: index,
          date: vid.date,
          game: vid.game,
          filename: vid.filename,
        }))
      })
      .then((videos) => {
        const shuffledVideos = shuffle(videos) as VideoType[]
        setVideos(shuffledVideos)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [filter])

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
            <div className="flex flex-wrap items-center justify-start gap-3">
              <h2 className="mb-1 whitespace-nowrap text-4xl font-extrabold tracking-tight sm:text-5xl">
                Finishers Hub
              </h2>
              {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
            </div>
            <p className="text-sm font-normal">
              The place for all finisher related content. Chaotic, outrageous, lawless on the fence
              of criminality. Perfectly unbalanced. As all things should be.
            </p>
          </div>
          <div className="mt-1 flex flex-row items-center justify-end gap-3 lg:mt-0 lg:flex-col">
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
            <FilterVideos arenas={arenas} pickedHook={[filter, setFilter]} />
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
          {videos.length > 0
            ? videos.slice(0, clipsShown).map((video: VideoType, videoIdx: number) => {
                const play = isMobile
                  ? videoIdx <= showMoreCount
                    ? true
                    : autoplay
                  : videoIdx === 0
                  ? true
                  : autoplay
                return (
                  <VideoPlayer
                    video={video}
                    play={autoplay}
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
              videos.length === 0 || clipsShown >= videos.length ? 'hidden' : 'inline-flex',
              `items-center gap-2 rounded border border-transparent bg-primary/60 px-4 
              py-2 text-white shadow-sm transition hover:bg-primary/90 
              hover:bg-primary focus:border-transparent focus:ring-2 
              focus:ring-primary focus:ring-offset-2 dark:border-transparent 
              dark:bg-secondary/50 dark:hover:bg-secondary/80 dark:focus:ring-secondary dark:focus:ring-offset-2`
            )}
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            <span>Load More Videos</span>
          </button>
        </div>
      </main>
    </Layout>
  )
}
