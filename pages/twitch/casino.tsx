import React, { useState, useEffect, useMemo } from 'react'
import Layout from '../../components/layout'
import AccessModal from '../../components/layout/AccessModal'
import useAccessDenied from '../../hooks/useAccessDenied'
import { shuffle } from '../../utils'
import { clearCache, isStorageValid, writeVideosStorage } from '../../utils/storage'
import {
  AutoplayToggler,
  MuteToggler,
  UsageDisclaimer,
  TwitchVideoClip,
  ShuffleButton,
  DeleteCookiesButton,
  DelayDisclaimer,
} from '../../components/casino'
import InvisbleTopLayer from '../../components/layout/InvisbleTopLayer'
import { FullAccessBadge, LimitedAccessBadge } from '../../components/utils'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function CasinoPage() {
  const sensitive = process.env.NEXT_PUBLIC_SENSITIVE === 'false' ? false : true

  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const [hostname, setHostname] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [videos, setVideos] = useState<string[]>([])
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(true)

  const limitedAccess = useMemo(() => sensitive && accessDenied, [sensitive, accessDenied])
  const toastType = useMemo(() => {
    if (fetchError) return 'error'
    else if (loading) return 'warning'
    else if (!loading && !fetchError) return 'success'
    else return ''
  }, [loading, fetchError])

  const prevVideo = () => setIndex((prev) => prev - 1)
  const nextVideo = () => setIndex((prev) => prev + 1)

  const shuffleAndSetVideos = () => {
    const videosStr = localStorage.getItem('finishershub.videos') as string
    const videosParsed = JSON.parse(videosStr) as string[]
    setVideos(shuffle(videosParsed))
  }

  useEffect(() => {
    // request loading all twitch clips
    if (isStorageValid()) {
      setLoading(false)
      shuffleAndSetVideos()
    } else {
      clearCache(true)
      fetch('/api/twitch')
        .then((res) => res.json())
        .then((allEmbedUrls) => {
          setLoading(false)
          const shuffledVideos = shuffle(allEmbedUrls)
          setVideos(shuffledVideos)
          writeVideosStorage(shuffledVideos)
        })
        .catch((err) => {
          setLoading(false)
          setFetchError(true)
          console.error(err)
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
      setAutoplay(true)
    }
  }, [limitedAccess])

  return (
    <Layout location="Casino">
      <div className="mx-auto max-w-full lg:max-w-3xl">
        <main className="flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:gap-x-6">
            <div className="text-lg font-normal">
              <h2 className="mb-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Slot Machine
              </h2>
              <p className="leading-normal">
                More fun than a casino, especially because we don&apos;t take your money. Not sure
                about the addiction part though.
              </p>
            </div>

            <div className="flex flex-row items-center justify-center gap-2 lg:mt-0 lg:flex-col">
              {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
              <div className="flex items-center justify-end gap-x-2">
                {limitedAccess ? (
                  <AccessModal lockedHook={[accessDenied, setAccessDenied]} />
                ) : null}
                <DeleteCookiesButton />
                <ShuffleButton shuffle={shuffleAndSetVideos} />
                <AutoplayToggler hook={[autoplay, setAutoplay]} />
                {limitedAccess ? null : <MuteToggler hook={[muted, setMuted]} />}
              </div>
            </div>
          </div>

          <DelayDisclaimer type={toastType} />
          <UsageDisclaimer />

          <div className="flex w-full flex-col gap-y-3">
            {/* Video */}
            <div className="relative w-full">
              {limitedAccess ? <InvisbleTopLayer /> : null}
              <TwitchVideoClip
                muted={muted}
                video={videos[index]}
                parent={hostname}
                autoplay={index === 0 ? true : autoplay}
              />
            </div>

            {/* Left Arrow, Clip index, Right Arrow */}
            <div className="z-20 flex w-full items-center justify-between font-normal text-white">
              <button
                onClick={prevVideo}
                disabled={index === 0}
                title="Go to the previous highlight"
                className="rounded-l-xl border border-r-0 border-slate-800/60 bg-slate-800/60 px-6 py-2
                transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed 
                disabled:opacity-25 dark:border-sky-200/30 dark:bg-sky-200/20 enabled:dark:hover:bg-sky-200/50 
                lg:px-6 lg:py-1"
              >
                <ArrowLongLeftIcon className="inline-flex h-7 w-7" />
              </button>

              <div
                className="flex w-full items-center justify-center self-stretch 
                  border border-slate-800/60 bg-slate-800/60 py-2 px-4 
                  dark:border-sky-200/30 dark:bg-sky-200/20 lg:py-1"
              >
                {index + 1}/{videos.length}
              </div>

              <button
                onClick={nextVideo}
                disabled={index === videos.length - 1}
                title="Go to the next highlight"
                className="rounded-r-xl border border-l-0 border-slate-800/60 bg-slate-800/60 px-6 py-2
                transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-25 
                dark:border-sky-200/30 dark:bg-sky-200/20 enabled:dark:hover:bg-sky-200/50 lg:px-6 lg:py-1"
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
