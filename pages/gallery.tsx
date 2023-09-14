import React, { useState, useEffect, useMemo } from "react"
import type { FilterByGameType, VideoMongoDBWithUrl } from "../@types"
import classNames from "classnames"
import { shuffle } from "../utils"
import useAccessDenied from "../hooks/useAccessDenied"
import { useMediaQuery } from "usehooks-ts"
import { FullAccessBadge, LimitedAccessBadge, Layout, AccessModal } from "../components/layout"
import {
  ViewToggler,
  AutoplayToggler,
  AutomuteToggler,
  ReshuffleButton,
  DeleteCookiesButton,
  FilterVideosByGame,
  VideoPlayer,
  VideoSkeleton,
  DelayDisclaimer,
} from "../components/videos"
import { PlusIcon } from "@heroicons/react/24/solid"
import { useSoundAvailable } from "../hooks/useSoundAvailable"

export default function Gallery() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const arenas: FilterByGameType[] = [
    { name: "All", value: "" },
    { name: "Warzone 1", value: "mw2019" },
    { name: "Warzone 2", value: "mw2022" },
  ]

  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [soundAvailable] = useSoundAvailable()

  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [videos, setVideos] = useState<VideoMongoDBWithUrl[]>([])
  const [filter, setFilter] = useState<FilterByGameType>(arenas[0]) // use all
  const [view, setView] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const [shuffled, setShuffled] = useState<boolean>(true)
  const [clipsShown, setClipsShown] = useState<number>(isMobile ? 1 : view ? 2 : 3)

  const limitedAccess = useMemo(() => accessDenied, [accessDenied])
  const toastType = useMemo(() => {
    if (fetchError) return "error"
    else if (loading) return "warning"
    else if (!loading && !fetchError) return "success"
    else return ""
  }, [loading, fetchError])

  const shuffleVideos = () => {
    setVideos((prev) => shuffle(prev))
  }

  const loadMore = () => {
    if (isMobile) setClipsShown((prev) => prev + 1)
    else setClipsShown((prev) => prev + (view ? 2 : 3))
  }

  useEffect(() => {
    fetch(`/api/mongo/videos/urls/game/${filter.value}`)
      .then((res) => res.json())
      .then((videos: VideoMongoDBWithUrl[]) => {
        setLoading(false)
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
              <h2 className="mb-1 whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Finishers Hub</h2>
              {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
            </div>
            <p className="text-sm font-normal">
              The place for all finisher related content. Chaotic, outrageous, lawless on the fence of criminality.
              Perfectly unbalanced. As all things should be.
            </p>
          </div>
          <div className="mt-1 flex flex-row items-center justify-end gap-3 lg:mt-0 lg:flex-col">
            <div className="flex items-center justify-end gap-x-2">
              {limitedAccess ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} /> : null}
              <DeleteCookiesButton />
              <ReshuffleButton hook={[shuffled, setShuffled]} shuffle={shuffleVideos} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} />
              <AutomuteToggler hook={[muted, setMuted]} limitedAccess={limitedAccess} />
              <ViewToggler hook={[view, setView]} />
            </div>
            <FilterVideosByGame arenas={arenas} pickedHook={[filter, setFilter]} className="w-full" />
          </div>
        </div>

        <div>
          <DelayDisclaimer type={toastType} />
        </div>

        <div
          className={classNames(
            "relative",
            view ? "lg:grid-cols-2" : "lg:grid-cols-3",
            "grid grid-cols-1 gap-6 md:mt-0 md:gap-5",
          )}
        >
          {videos.length > 0
            ? videos
                .slice(0, clipsShown)
                .map((video: VideoMongoDBWithUrl, videoIdx: number) => (
                  <VideoPlayer
                    video={video}
                    autoplay={autoplay}
                    muted={soundAvailable ? true : muted}
                    key={`video-gallery-${video.id}`}
                  />
                ))
            : Array(clipsShown)
                .fill(null)
                .map((_, skeletonIdx) => <VideoSkeleton key={`skeleton-${skeletonIdx}`} />)}
        </div>

        <div className="mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={loadMore}
            className={classNames(
              videos.length === 0 || clipsShown >= videos.length ? "hidden" : "inline-flex",
              `items-center gap-2 rounded border border-transparent bg-primary/60 px-4 py-2 text-white shadow-sm transition hover:bg-primary hover:bg-primary/90 focus:border-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-transparent dark:bg-secondary/50 dark:hover:bg-secondary/80 dark:focus:ring-secondary dark:focus:ring-offset-2`,
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
