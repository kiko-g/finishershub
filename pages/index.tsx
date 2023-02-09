import React, { useState, useEffect, useMemo } from 'react'
import classNames from 'classnames'
import useAccessDenied from '../hooks/useAccessDenied'
import { useMediaQuery } from 'usehooks-ts'
import { shuffle } from '../utils'
import { clearCache, isStorageValid, writeVideosStorage } from '../utils/storage'
import Layout from '../components/layout'
import InvisbleTopLayer from '../components/layout/InvisbleTopLayer'
import AccessModal from '../components/layout/AccessModal'
import { PlusIcon } from '@heroicons/react/24/solid'
import {
  ViewToggler,
  AutoplayToggler,
  MuteToggler,
  ShuffleButton,
  DelayDisclaimer,
  TwitchVideoClip,
  DeleteCookiesButton,
  Skeleton,
} from '../components/home'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'

export default function IndexPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sensitive = process.env.NEXT_PUBLIC_SENSITIVE! === 'false' ? false : true

  const [hostname, setHostname] = useState<string>('')
  const [videos, setVideos] = useState<string[]>([])
  const [clipsShown, setClipsShown] = useState<number>(isMobile ? 1 : 3)
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [view, setView] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const [showMoreCount, setShowMoreCount] = useState<number>(0)
  const limitedAccess = useMemo(() => sensitive && accessDenied, [sensitive, accessDenied])

  const shuffleAndSetVideos = () => {
    const videosStr = localStorage.getItem('finishershub.videos') as string
    const videosParsed = JSON.parse(videosStr) as string[]
    setVideos(shuffle(videosParsed))
  }

  const loadMore = () => {
    setShowMoreCount((prev) => prev + 1)
    if (isMobile) setClipsShown((prev) => prev + 1)
    else setClipsShown((prev) => prev + 3)
  }

  useEffect(() => {
    // request loading all twitch clips
    if (isStorageValid()) {
      shuffleAndSetVideos()
    } else {
      clearCache(true)
      fetch('/api/twitch')
        .then((res) => res.json())
        .then((allEmbedUrls) => {
          const shuffledVideos = shuffle(allEmbedUrls)
          setVideos(shuffledVideos)
          writeVideosStorage(shuffledVideos)
        })
    }

    // get hostname if not in ssr
    if (typeof window !== 'undefined') setHostname(window.location.hostname)
  }, [])

  useEffect(() => {
    if (limitedAccess) {
      setMuted(true)
      setAutoplay(true)
    } else {
      setMuted(false)
      setAutoplay(false)
    }
  }, [limitedAccess])

  return (
    <Layout location="Home" background={false}>
      <main className="flex flex-col gap-2 px-0 lg:px-4">
        <div className="mt-1 flex flex-col justify-between gap-y-2 lg:mt-3 lg:flex-row lg:gap-x-6">
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
              {limitedAccess ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
              <DeleteCookiesButton />
              <ShuffleButton shuffle={shuffleAndSetVideos} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} />
              {limitedAccess ? null : <MuteToggler hook={[muted, setMuted]} />}
              <ViewToggler hook={[view, setView]} />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <DelayDisclaimer />
        </div>

        <div
          className={classNames(
            'relative',
            view ? 'grid-cols-1' : 'sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
            'mb-2 grid grid-cols-1 gap-6 py-2 md:mt-0 md:gap-5 md:py-4'
          )}
        >
          {limitedAccess ? <InvisbleTopLayer /> : null}
          {videos.slice(0, clipsShown).map((video: string, videoIdx: number) => {
            const play = isMobile
              ? videoIdx <= showMoreCount
                ? true
                : autoplay
              : videoIdx === 0
              ? true
              : autoplay
            return (
              <TwitchVideoClip
                muted={muted}
                video={video}
                parent={hostname}
                key={`video-${videoIdx}`}
                autoplay={play}
              />
            )
          })}
          {videos.length === 0 &&
            Array(clipsShown)
              .fill(null)
              .map((_, skeletonIdx) => <Skeleton key={`skeleton-${skeletonIdx}`} />)}
        </div>

        <div className="mb-8 flex items-center justify-center">
          <button
            type="button"
            onClick={loadMore}
            className={classNames(
              videos.length === 0 ? 'hidden' : 'inline-flex',
              `items-center rounded border-2 border-primary bg-primary/70 px-4 py-2 
              text-white shadow-sm transition hover:bg-primary/90 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary 
              focus:ring-offset-2 dark:border-secondary dark:bg-secondary/50 dark:hover:bg-secondary/80`
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
