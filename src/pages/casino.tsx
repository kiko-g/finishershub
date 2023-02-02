import React, { useState, useEffect, useMemo } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import Layout from '../components/layout'
import AccessModal from '../components/layout/AccessModal'
import useAccessDenied from '../hooks/useAccessDenied'
import TwitchAPI from '../api/twitch'
import Seo from '../components/Seo'
import { shuffle } from '../utils'
import { ArrowLongLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { clearCache, isStorageValid, writeVideosStorage } from '../utils/storage'
import {
  AutoplayToggler,
  MuteToggler,
  UsageDisclaimer,
  TwitchVideoClip,
  Skeleton,
  ShuffleButton,
  DeleteCookiesButton,
} from '../components/casino'
import InvisbleTopLayer from '../components/layout/InvisbleTopLayer'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function CasinoPage() {
  const sensitive = process.env.GATSBY_SENSITIVE === 'false' ? false : true
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [index, setIndex] = useState(0) // index of the current video
  const [videos, setVideos] = useState([]) //array of arrays with video links
  const [accessDenied, setAccessDenied] = useAccessDenied() // control access to content
  const [muted, setMuted] = useState(true) //muted videos or not
  const [autoplay, setAutoplay] = useState(true) //play automatically videos or not
  const limitedAccess = useMemo(() => sensitive && accessDenied, [sensitive, accessDenied])

  const prevVideo = () => setIndex(prev => prev - 1)

  const nextVideo = () => setIndex(prev => prev + 1)

  const shuffleAndSetVideos = () => {
    setVideos(shuffle(JSON.parse(localStorage.getItem('finishershub.videos'))))
  }

  const requestLoadAll = () => {
    if (isStorageValid()) {
      shuffleAndSetVideos()
    } else {
      clearCache(true)
      TwitchAPI.getAllClips((allEmbedUrls: string[]) => {
        const shuffledVideos = shuffle(allEmbedUrls)
        setVideos(shuffledVideos)
        writeVideosStorage(shuffledVideos)
      })
    }
  }

  useEffect(() => requestLoadAll(), [])

  useEffect(() => {
    if (!accessDenied) {
      setMuted(false)
    }
  }, [accessDenied])

  return (
    <Layout location="Casino">
      <Seo title="Casino" />
      <div className="mx-auto max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
        <main className="flex flex-col gap-3">
          <div className="mt-1 flex flex-col justify-between gap-y-2 lg:mt-3 lg:flex-row lg:gap-x-6">
            <div className="text-lg font-normal">
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Slot Machine</h2>
              <p>
                More fun than a casino, especially because we don't take your money. Not sure about the addiction part
                though.
              </p>
            </div>

            <div className="mt-1 flex flex-row items-center justify-end gap-4 lg:mt-0 lg:flex-col">
              {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
              <div className="flex items-center justify-end gap-x-2">
                {limitedAccess ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
                <DeleteCookiesButton />
                <ShuffleButton shuffle={shuffleAndSetVideos} />
                <AutoplayToggler hook={[autoplay, setAutoplay]} />
                {limitedAccess ? null : <MuteToggler hook={[muted, setMuted]} />}
              </div>
            </div>
          </div>

          <UsageDisclaimer />

          <div className="flex w-full flex-col gap-y-3">
            {/* Video */}
            <div className="relative w-full">
              {limitedAccess ? <InvisbleTopLayer /> : null}
              <TwitchVideoClip
                muted={muted}
                video={videos[index]}
                parent={process.env.GATSBY_DOMAIN}
                autoplay={index === 0 ? true : autoplay}
              />
            </div>

            {/* Left Arrow, Clip index, Right Arrow */}
            <div className="z-20 flex w-full items-center justify-between">
              <button
                onClick={prevVideo}
                disabled={index === 0}
                title="Go to the previous highlight"
                className="rounded-l-xl border-2 border-r-0 border-black/40 bg-black/40 px-6 py-2 text-white 
                transition enabled:hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-25 
                dark:border-white/20 dark:bg-white/10 enabled:dark:hover:bg-white/50 lg:px-6 lg:py-1.5"
              >
                <ArrowLongLeftIcon className="inline-flex h-7 w-7" />
              </button>

              <div
                className="flex w-full items-center justify-center self-stretch 
                  border-2 border-black/40 bg-black/40 py-2 px-4 
                  text-white dark:border-white/20 dark:bg-white/10"
              >
                Clip {index + 1}/{videos.length}
              </div>

              <button
                onClick={nextVideo}
                disabled={index === videos.length - 1}
                title="Go to the next highlight"
                className="rounded-r-xl border-2 border-l-0 border-black/40 bg-black/40 px-6 py-2 text-white 
                transition enabled:hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-25 
                dark:border-white/20 dark:bg-white/10 enabled:dark:hover:bg-white/50 lg:px-6 lg:py-1.5"
              >
                <ArrowLongRightIcon className="inline-flex h-7 w-7" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
