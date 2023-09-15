import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import { Listbox } from "@headlessui/react"
import { FilterVideosByGame } from "../components/videos/FilterVideosByGame"
import { Layout, AccessBadge } from "../components/layout"
import {
  AutoplayToggler,
  KeyboardUsageButton,
  KeyboardUsageInstructions,
  AutomuteToggler,
  VideoNotFound,
  VideoPlayer,
  VideoSkeleton,
  FilterVideosByAuthors,
  FilterVideosByMap,
  FilterVideosByLocation,
} from "../components/videos"

import { authors, tags } from "../utils/data"
import type { Game, VideoMongoDBWithUrl } from "../@types"
import { useControls } from "../hooks/useControls"
import { useContentInteraction } from "../hooks/useContentInteraction"
import { VideoOrderToggler } from "../components/videos/VideoOrderToggler"
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline"
import { FilterVideosByTags } from "../components/videos/FilterVideosByTags"

type Props = {}

export default function Videos({}: Props) {
  const {
    isMobile,
    accessDenied,
    setAccessDenied,
    isLoading,
    setIsLoading,
    fetchError,
    setFetchError,
    isContentReady,
    soundAvailable,
  } = useContentInteraction()

  const {
    muted,
    setMuted,
    autoplay,
    setAutoplay,
    shuffled,
    setShuffled,
    showInstructions,
    setShowInstructions,
    expandedView,
    setExpandedView,
  } = useControls()

  const [videos, setVideos] = useState<VideoMongoDBWithUrl[]>([])
  const [index, setIndex] = useState<number>(0)
  const [selectedGame, setSelectedGame] = useState<Game>("MW2022")
  const [selectedMap, setSelectedMap] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  const filteredVideos = useMemo(() => {
    let result = videos

    if (selectedTags.length > 0) {
      result = result
        .filter((video) => video.tags !== null)
        .filter((video) => selectedTags.some((tag) => video.tags.includes(tag)))
    }

    if (selectedAuthors.length > 0) {
      result = result
        .filter((video) => video.authors !== null)
        .filter((video) => selectedAuthors.some((selectedAuthor) => video.authors.includes(selectedAuthor)))
    }

    if (selectedGame !== "All") {
      result = result.filter((video) => video.game === selectedGame)
    }

    if (selectedMap !== "") {
      result = result.filter((video) => video.map === selectedMap)
    }

    if (selectedLocation !== "") {
      result = result.filter((video) => video.location === selectedLocation)
    }

    return shuffled ? result.sort(() => Math.random() - 0.5) : result.sort((a, b) => a.id - b.id)
  }, [videos, selectedTags, selectedAuthors, selectedGame, shuffled, selectedMap, selectedLocation])

  const video = useMemo(() => (filteredVideos.length > 0 ? filteredVideos[index] : null), [filteredVideos, index])

  const prevVideo = useCallback(() => setIndex((prev) => prev - 1), [])
  const nextVideo = useCallback(() => setIndex((prev) => prev + 1), [])

  useEffect(() => {
    setIndex(0)
  }, [filteredVideos])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 39) nextVideo() // right arrow
      if (event.keyCode === 37) prevVideo() // left arrow
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextVideo, prevVideo, accessDenied])

  useEffect(() => {
    fetch(`/api/mongo/videos/urls`)
      .then((res) => res.json())
      .then((vids: VideoMongoDBWithUrl[]) => {
        setVideos(vids)
        setIsLoading(false)
        setFetchError(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [setFetchError, setIsLoading])

  return (
    <Layout location="Videos">
      <div className="mx-auto flex max-w-4xl flex-col space-y-2">
        <div className="text-lg font-normal">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Videos</h2>
            <AccessBadge />
          </div>
          <p className="mt-0.5 max-w-3xl text-sm">
            Unlimited entertainment with a control panel for you to filter as you wish and relive some of our greatest
            moments.
          </p>
        </div>

        <main>
          {isLoading && <VideoSkeleton />}
          {fetchError && <VideoNotFound reloadPage />}
          {isContentReady ? (
            <div className="flex flex-col space-y-2 font-normal">
              <div className="flex w-full flex-col items-end justify-between gap-2 lg:flex-row lg:gap-4">
                <div className="flex items-center gap-1.5">
                  <KeyboardUsageButton showHook={[showInstructions, setShowInstructions]} size="xs" />
                  <VideoOrderToggler hook={[shuffled, setShuffled]} size="xs" />
                  <AutoplayToggler hook={[autoplay, setAutoplay]} size="xs" />
                  <AutomuteToggler hook={[muted, setMuted]} size="xs" limitedAccess={accessDenied} />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <FilterVideosByTags tags={tags} hook={[selectedTags, setSelectedTags]} />
                  <FilterVideosByAuthors authors={authors} hook={[selectedAuthors, setSelectedAuthors]} />
                  <FilterVideosByGame pickedHook={[selectedGame, setSelectedGame]} />
                  <FilterVideosByMap game={selectedGame} pickedHook={[selectedMap, setSelectedMap]} />
                  <FilterVideosByLocation
                    game={selectedGame}
                    map={selectedMap}
                    pickedHook={[selectedLocation, setSelectedLocation]}
                  />
                </div>
              </div>

              <KeyboardUsageInstructions showHook={[showInstructions, setShowInstructions]} />

              <div className="relative w-full">
                {video !== null ? (
                  <VideoPlayer
                    limitedAccess={accessDenied}
                    video={video}
                    autoplay={autoplay}
                    automute={muted}
                    key={`video-element-${video.id}`}
                  />
                ) : (
                  <VideoNotFound
                    customActions={[
                      {
                        text: "Clear all filters 🗑️",
                        onClick: () => {
                          setSelectedGame("All")
                          setSelectedTags([])
                          setSelectedAuthors([])
                          setSelectedMap("")
                          setSelectedLocation("")
                        },
                      },
                    ]}
                  />
                )}
              </div>

              <div>
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

                  <div className="flex w-full items-center justify-center self-stretch border border-slate-800/60 bg-slate-800/60 px-4 py-2 text-sm dark:border-blue-200/30 dark:bg-blue-200/20 lg:py-1">
                    {filteredVideos.length === 0 ? (
                      <span>N/A</span>
                    ) : (
                      <span>
                        {index + 1} of {filteredVideos.length} clips
                      </span>
                    )}
                  </div>

                  <button
                    onClick={nextVideo}
                    disabled={index === filteredVideos.length - 1}
                    title="Go to the next highlight"
                    className="rounded-r border border-l-0 border-slate-800/60 bg-slate-800/60 px-4 py-2 transition enabled:hover:bg-slate-800/80 disabled:cursor-not-allowed disabled:opacity-25 dark:border-blue-200/30 dark:bg-blue-200/20 enabled:dark:hover:bg-blue-200/50 lg:px-4 lg:py-1"
                  >
                    <ArrowLongRightIcon className="inline-flex h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            fetchError && <VideoNotFound reloadPage />
          )}
        </main>
      </div>
    </Layout>
  )
}
