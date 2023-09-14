import React, { useState, useEffect, useMemo, useCallback, useRef } from "react"
import type { FilterByGameType, VideoMongoDBWithUrl } from "../@types"
import useAccessDenied from "../hooks/useAccessDenied"
import { useMediaQuery } from "usehooks-ts"
import { shuffle } from "../utils"
import { Layout, AccessBadge } from "../components/layout"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import {
  AutoplayToggler,
  FilterVideosByGame,
  AutomuteToggler,
  ReshuffleButton,
  UsageDisclaimer,
  VideoNotFound,
  VideoPlayer,
  VideoSkeleton,
} from "../components/videos"
import { useSoundAvailable } from "../hooks/useSoundAvailable"

export default function Casino() {
  const buttonControlsRef = useRef<HTMLDivElement | null>(null)
  const arenas: FilterByGameType[] = [
    { name: "All", value: "" },
    { name: "Warzone 1", value: "mw2019" },
    { name: "Warzone 2", value: "mw2022" },
  ]

  const isMobile = useMediaQuery("(max-width: 768px)")
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [soundAvailable] = useSoundAvailable()

  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [expandedView, setExpandedView] = useState<boolean>(false)

  const [index, setIndex] = useState<number>(0)
  const [videos, setVideos] = useState<VideoMongoDBWithUrl[]>([])
  const [filter, setFilter] = useState<FilterByGameType>(arenas[arenas.length - 1])
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
    else if (!loading && !fetchError) return "info"
    else return ""
  }, [loading, fetchError])

  const prevVideo = useCallback(() => setIndex((prev) => prev - 1), [])
  const nextVideo = useCallback(() => setIndex((prev) => prev + 1), [])

  function shuffleVideos() {
    setVideos((prev) => shuffle(prev))
  }

  useEffect(() => {
    fetch(`/api/mongo/videos/urls/game/${filter.value}`)
      .then((res) => res.json())
      .then((videos: VideoMongoDBWithUrl[]) => {
        setLoading(false)
        setIndex(0)
        const newVideos = shuffled ? shuffle(videos) : videos
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
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextVideo, prevVideo, limitedAccess])

  return (
    <Layout location="Casino">
      <div className="mx-auto flex max-w-[52rem] flex-col space-y-2">
        <main className="flex flex-col gap-2.5">
          <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:gap-x-6">
            <div className="text-lg font-normal">
              <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
                <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Slot Machine</h2>
                <AccessBadge />
              </div>
              <p className="mt-2 text-sm">
                More fun than a casino, especially because we don&apos;t take your money. Not sure about the addiction
                part though.
              </p>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center justify-center gap-x-2">
              <ReshuffleButton hook={[shuffled, setShuffled]} shuffle={shuffleVideos} size="xs" />
              <AutoplayToggler hook={[autoplay, setAutoplay]} size="xs" />
              <AutomuteToggler hook={[muted, setMuted]} limitedAccess={limitedAccess} size="xs" />
            </div>

            <div className="flex items-center justify-center gap-x-2">
              <FilterVideosByGame arenas={arenas} pickedHook={[filter, setFilter]} className="w-full" />
            </div>
          </div>

          <UsageDisclaimer type={toastType} />

          <div className="relative w-full">
            {ready ? (
              <VideoPlayer
                video={video}
                autoplay={autoplay}
                muted={soundAvailable ? true : muted}
                key={`video-element-${video.id}`}
              />
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
              <span className="text-sm">
                {index + 1} of {videos.length}
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
