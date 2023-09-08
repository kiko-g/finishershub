import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import type { FilterType, VideoType, VideoTypeAPI } from "../@types"
import useAccessDenied from "../hooks/useAccessDenied"
import { shuffle } from "../utils"
import { Layout, AccessModal, InvisbleTopLayer } from "../components/layout"
import { FullAccessBadge, LimitedAccessBadge } from "../components/utils"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import {
  AutoplayToggler,
  DeleteCookiesButton,
  FilterVideos,
  FocusViewToggler,
  KeyboardUsageButton,
  KeyboardUsageInstructions,
  MuteToggler,
  NextVideo,
  PopOpenVideo,
  PreviousVideo,
  ReshuffleButton,
  ShareVideo,
  UsageDisclaimer,
  VideoNotFound,
  VideoOrderToggler,
  VideoPlayer,
  VideoSkeleton,
} from "../components/videos"
import { useSwipeable } from "react-swipeable"
import { useMediaQuery } from "usehooks-ts"

export default function Casino() {
  const buttonControlsRef = useRef<HTMLDivElement | null>(null)
  const arenas: FilterType[] = [
    { name: "All", value: "" },
    { name: "Warzone 1", value: "mw2019" },
    { name: "Warzone 2", value: "mw2022" },
  ]

  const isMobile = useMediaQuery("(max-width: 768px)")
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [expandedView, setExpandedView] = useState<boolean>(false)
  const [index, setIndex] = useState<number>(0)
  const [videos, setVideos] = useState<VideoType[]>([])
  const [filter, setFilter] = useState<FilterType>(arenas[arenas.length - 1])
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(true)
  const [shuffled, setShuffled] = useState<boolean>(true)
  const [showInstructions, setShowInstructions] = useState(true)

  const limitedAccess = useMemo(() => accessDenied, [accessDenied])
  const video = useMemo(() => videos[index], [index, videos])
  const ready = useMemo(() => !loading && !fetchError && video.url !== undefined, [loading, fetchError, video])

  const toastType = useMemo(() => {
    if (fetchError) return "error"
    else if (loading) return "warning"
    else if (!loading && !fetchError) return "success"
    else return ""
  }, [loading, fetchError])

  const prevVideo = useCallback(() => setIndex((prev) => prev - 1), [])
  const nextVideo = useCallback(() => setIndex((prev) => prev + 1), [])
  const shuffleVideos = () => {
    setVideos((prev) => shuffle(prev))
  }

  const handlers = useSwipeable({
    onSwipedUp: () => prevVideo,
    onSwiped: () => nextVideo,
  })

  useEffect(() => {
    setExpandedView(isMobile)
  }, [isMobile])

  useEffect(() => {
    fetch(`/api/s3/${filter.value}`)
      .then((res) => res.json())
      .then((vids: VideoTypeAPI[]) => {
        setLoading(false)
        return vids.map((vid: VideoTypeAPI, index: number) => {
          const video: VideoType = {
            url: vid.url,
            index: index,
            date: vid.date,
            game: vid.game,
            filteredGame: filter.value,
            filename: vid.filename,
          }

          return video
        })
      })
      .then((videos) => {
        setIndex(0)
        const typedVideos = videos as VideoType[]
        const newVideos = shuffled ? shuffle(typedVideos) : typedVideos
        setVideos(newVideos)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [filter, shuffled])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 39) nextVideo() // right arrow
      if (event.keyCode === 37) prevVideo() // left arrow
      if (event.keyCode === 69 && limitedAccess === false) setExpandedView((prev) => !prev) // e key
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextVideo, prevVideo, limitedAccess])

  useEffect(() => {
    const timerA = setTimeout(() => {
      if (buttonControlsRef.current) buttonControlsRef.current.classList.add("opacity-50")
    }, 4000)

    const timerB = setTimeout(() => {
      if (buttonControlsRef.current) buttonControlsRef.current.classList.remove("opacity-50")
      if (buttonControlsRef.current) buttonControlsRef.current.classList.add("opacity-0")
    }, 8000)

    return () => {
      clearTimeout(timerA)
      clearTimeout(timerB)
    }
  }, [])

  return expandedView ? (
    // focused view
    <main className="group relative h-screen">
      <div
        ref={buttonControlsRef}
        className="absolute bottom-0 right-2 top-auto z-50 flex flex-row flex-wrap items-center gap-2 self-end bg-white p-3 text-gray-800 opacity-10 transition-opacity duration-[2000] hover:opacity-100 dark:bg-slate-800 dark:text-white lg:bottom-auto lg:top-0 lg:max-w-full lg:flex-col lg:p-4"
      >
        <FocusViewToggler hook={[expandedView, setExpandedView]} size="md" />
        <AutoplayToggler hook={[autoplay, setAutoplay]} size="md" />
        <MuteToggler hook={[muted, setMuted]} size="md" limitedAccess={limitedAccess} />
        <ShareVideo video={video} size="md" />
        <PopOpenVideo video={video} size="md" />
        <PreviousVideo prevVideo={prevVideo} disabled={index === 0} size="md" />
        <NextVideo nextVideo={nextVideo} disabled={index === videos.length - 1} size="md" />
        <KeyboardUsageButton showHook={[showInstructions, setShowInstructions]} size="md" />
      </div>

      <KeyboardUsageInstructions showHook={[showInstructions, setShowInstructions]} />

      <div className="relative w-full" {...handlers}>
        {ready ? (
          <VideoPlayer
            video={video}
            autoplay={autoplay}
            muted={muted}
            special={true}
            key={`video-element-${video.index}`}
          />
        ) : (
          <VideoSkeleton />
        )}
        {fetchError && <VideoNotFound />}
      </div>
    </main>
  ) : (
    // unfocused view
    <Layout location="Casino">
      <div className="mx-auto max-w-full lg:max-w-3xl">
        <main className="flex flex-col gap-2.5">
          <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:gap-x-6">
            <div className="text-lg font-normal">
              <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
                <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Slot Machine</h2>
                {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
              </div>
              <p className="mt-2 text-sm">
                More fun than a casino, especially because we don&apos;t take your money. Not sure about the addiction
                part though.
              </p>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-2 lg:mt-0 lg:flex-col">
              <div className="flex w-full items-center justify-end gap-x-2">
                {limitedAccess ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} /> : null}
                <DeleteCookiesButton />
                <FocusViewToggler hook={[expandedView, setExpandedView]} />
                <VideoOrderToggler hook={[shuffled, setShuffled]} />
                <ReshuffleButton hook={[shuffled, setShuffled]} shuffle={shuffleVideos} />
                <AutoplayToggler hook={[autoplay, setAutoplay]} />
                <MuteToggler hook={[muted, setMuted]} limitedAccess={limitedAccess} />
              </div>
              <FilterVideos arenas={arenas} pickedHook={[filter, setFilter]} />
            </div>
          </div>

          <UsageDisclaimer type={toastType} />

          {/* Video */}
          <div className="relative w-full" {...handlers}>
            {ready ? (
              <VideoPlayer video={video} autoplay={autoplay} muted={muted} key={`video-element-${video.index}`} />
            ) : (
              <VideoSkeleton />
            )}
            {fetchError && <VideoNotFound />}
          </div>

          {/* Left Arrow, Clip index, Right Arrow */}
          <div className="z-20 flex w-full items-center justify-between font-normal text-white">
            <button
              onClick={prevVideo}
              disabled={index === 0}
              title="Go to the previous highlight"
              className="rounded-l border border-r-0 border-slate-800/60 bg-slate-800/60 px-4 py-2 transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-25 dark:border-blue-200/30 dark:bg-blue-200/20 enabled:dark:hover:bg-blue-200/50 lg:px-4 lg:py-1"
            >
              <ArrowLongLeftIcon className="inline-flex h-6 w-6" />
            </button>

            <div className="flex w-full items-center justify-center self-stretch border border-slate-800/60 bg-slate-800/60 px-4 py-2 dark:border-blue-200/30 dark:bg-blue-200/20 lg:py-1">
              <span className="text-sm font-bold">
                {index + 1}/{videos.length}
              </span>
            </div>

            <button
              onClick={nextVideo}
              disabled={index === videos.length - 1}
              title="Go to the next highlight"
              className="rounded-r border border-l-0 border-slate-800/60 bg-slate-800/60 px-4 py-2 transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-25 dark:border-blue-200/30 dark:bg-blue-200/20 enabled:dark:hover:bg-blue-200/50 lg:px-4 lg:py-1"
            >
              <ArrowLongRightIcon className="inline-flex h-6 w-6" />
            </button>
          </div>
        </main>
      </div>
    </Layout>
  )
}
