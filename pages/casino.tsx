import React, { useState, useEffect, useMemo } from 'react'
import Layout from '../components/layout'
import AccessModal from '../components/layout/AccessModal'
import useAccessDenied from '../hooks/useAccessDenied'
import { shuffle } from '../utils'
import {
  AutoplayToggler,
  MuteToggler,
  UsageDisclaimer,
  ShuffleButton,
  DeleteCookiesButton,
} from '../components/casino'
import InvisbleTopLayer from '../components/layout/InvisbleTopLayer'
import { FullAccessBadge, LimitedAccessBadge } from '../components/utils'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline'
import VideoPlayer from '../components/VideoPlayer'
import VideoSkeleton from '../components/VideoSkeleton'
import DelayDisclaimer from '../components/DelayDisclaimer'

export default function Casino() {
  const [index, setIndex] = useState<number>(0)
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const limitedAccess = useMemo(() => accessDenied, [accessDenied])

  const toastType = useMemo(() => {
    if (fetchError) return 'error'
    else if (loading) return 'warning'
    else if (!loading && !fetchError) return 'success'
    else return ''
  }, [loading, fetchError])

  const prevVideo = () => setIndex((prev) => prev - 1)
  const nextVideo = () => setIndex((prev) => prev + 1)
  const shuffleVideos = () => {
    setVideoUrls((prev) => shuffle(prev))
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
                  <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
                ) : null}
                <DeleteCookiesButton />
                <ShuffleButton shuffle={shuffleVideos} />
                <AutoplayToggler hook={[autoplay, setAutoplay]} />
                {limitedAccess ? null : <MuteToggler hook={[muted, setMuted]} />}
              </div>
            </div>
          </div>

          <DelayDisclaimer type={toastType} />
          <UsageDisclaimer type="info" />

          <div className="flex w-full flex-col gap-y-3">
            {/* Video */}
            <div className="relative w-full">
              {limitedAccess ? <InvisbleTopLayer /> : null}
              {!loading && !fetchError ? (
                <VideoPlayer index={index} src={videoUrls[index]} play={autoplay} muted={muted} />
              ) : (
                <VideoSkeleton />
              )}
            </div>

            {/* Left Arrow, Clip index, Right Arrow */}
            <div className="z-20 flex w-full items-center justify-between font-normal text-white">
              <button
                onClick={prevVideo}
                disabled={index === 0}
                title="Go to the previous highlight"
                className="rounded-l border border-r-0 border-slate-800/60 bg-slate-800/60 px-4 py-2
                transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed 
                disabled:opacity-25 dark:border-blue-200/30 dark:bg-blue-200/20 enabled:dark:hover:bg-blue-200/50 
                lg:px-4 lg:py-1"
              >
                <ArrowLongLeftIcon className="inline-flex h-6 w-6" />
              </button>

              <div
                className="flex w-full items-center justify-center self-stretch 
                  border border-slate-800/60 bg-slate-800/60 py-2 px-4 
                  dark:border-blue-200/30 dark:bg-blue-200/20 lg:py-1"
              >
                <span className="text-sm font-bold">
                  {index + 1}/{videoUrls.length}
                </span>
              </div>

              <button
                onClick={nextVideo}
                disabled={index === videoUrls.length - 1}
                title="Go to the next highlight"
                className="rounded-r border border-l-0 border-slate-800/60 bg-slate-800/60 px-4 py-2
                transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-25 
                dark:border-blue-200/30 dark:bg-blue-200/20 enabled:dark:hover:bg-blue-200/50 lg:px-4 lg:py-1"
              >
                <ArrowLongRightIcon className="inline-flex h-6 w-6" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}
