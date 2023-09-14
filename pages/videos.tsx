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
} from "../components/videos"

import { authors, tags } from "../utils/data"
import type { Game, VideoMongoDBWithUrl } from "../@types"
import { useControls } from "../hooks/useControls"
import { useContentInteraction } from "../hooks/useContentInteraction"
import { VideoOrderToggler } from "../components/videos/VideoOrderToggler"
import {
  ArrowLongLeftIcon,
  CheckCircleIcon,
  FunnelIcon,
  ArrowLongRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline"

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

    return shuffled ? result.sort(() => Math.random() - 0.5) : result.sort((a, b) => a.id - b.id)
  }, [videos, selectedTags, selectedAuthors, selectedGame, shuffled])

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
      <div className="mx-auto flex max-w-[52rem] flex-col space-y-2">
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

                <div className="flex items-center gap-1.5">
                  <PickTags tags={tags} hook={[selectedTags, setSelectedTags]} />
                  <PickAuthors authors={authors} hook={[selectedAuthors, setSelectedAuthors]} />
                  <FilterVideosByGame pickedHook={[selectedGame, setSelectedGame]} />
                  <ResultsAmountBadge count={filteredVideos.length} />
                </div>
              </div>

              <KeyboardUsageInstructions showHook={[showInstructions, setShowInstructions]} />

              <div className="relative w-full">
                {video !== null ? (
                  <VideoPlayer
                    limitedAccess={accessDenied}
                    video={video}
                    autoplay={autoplay}
                    muted={soundAvailable ? true : muted}
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
                        {index + 1} of {filteredVideos.length}
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

function PickAuthors({
  authors,
  hook,
  className,
}: {
  authors: string[]
  hook: [string[], React.Dispatch<React.SetStateAction<string[]>>]
  className?: string
}) {
  const [pickedAuthors, setPickedAuthors] = hook
  const displayedText = useMemo(() => {
    if (pickedAuthors.length === 0) return "Authors"
    else if (pickedAuthors.length === authors.length) return "Everyone"
    else return pickedAuthors.map((person) => person).join(", ")
  }, [pickedAuthors, authors])

  return (
    <Listbox
      as="div"
      multiple
      value={pickedAuthors}
      onChange={setPickedAuthors}
      className={classNames("relative h-full", className)}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="inline-flex w-full items-center justify-center rounded border border-secondary bg-secondary/70 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:py-1.5 lg:pl-2.5 lg:pr-1.5 lg:text-xs">
            <span className="whitespace-nowrap font-normal tracking-tighter">Authors</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Listbox.Options
            className={classNames(
              "z-40 max-h-[34rem] overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
              open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
            )}
          >
            {/* Option box header */}
            <div
              className="flex w-full items-center justify-between border-b 
              px-3 pb-2 pt-1 font-normal tracking-tighter"
            >
              <span>{pickedAuthors.length} selected</span>
              <button
                type="button"
                className="tracking-tighter text-secondary underline hover:font-bold hover:opacity-80 dark:text-secondary"
                onClick={() => setPickedAuthors([])}
              >
                Reset
              </button>
            </div>

            {/* Option box body (options list) */}
            <div className="pt-1">
              {authors.map((author: string, authorIdx: number) => {
                const isSelected = pickedAuthors.some((pickedAuthor) => pickedAuthor === author)

                return (
                  <Listbox.Option
                    key={`category-${authorIdx}`}
                    value={author}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-3",
                        active ? "bg-slate-200 dark:bg-slate-600" : "",
                      )
                    }
                  >
                    {({ selected }) => {
                      const highlight = selected || isSelected
                      return (
                        <span className="flex items-center gap-2">
                          {highlight ? (
                            <CheckCircleIcon className="h-5 w-5 text-teal-500" aria-hidden="true" />
                          ) : (
                            <span className="h-5 w-5" />
                          )}
                          <span className={classNames("block truncate", highlight ? "font-bold" : "font-normal")}>
                            {author}
                          </span>
                        </span>
                      )
                    }}
                  </Listbox.Option>
                )
              })}
            </div>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  )
}

function PickTags({
  tags,
  hook,
  className,
}: {
  tags: string[]
  hook: [string[], React.Dispatch<React.SetStateAction<string[]>>]
  className?: string
}) {
  const [pickedTags, setPickedTags] = hook
  const displayedText = useMemo(() => {
    if (pickedTags.length === 0) return "Tags"
    else if (pickedTags.length === tags.length) return "All tags"
    else return pickedTags.map((person) => person).join(", ")
  }, [pickedTags, tags])

  return (
    <Listbox
      as="div"
      multiple
      value={pickedTags}
      onChange={setPickedTags}
      className={classNames("relative h-full", className)}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="inline-flex w-full items-center justify-center rounded border border-secondary bg-secondary/70 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:py-1.5 lg:pl-2.5 lg:pr-1.5 lg:text-xs">
            <span className="whitespace-nowrap font-normal ">Tags</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Listbox.Options
            className={classNames(
              "z-40 max-h-[34rem] overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
              open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
            )}
          >
            <div
              className="flex w-full items-center justify-between border-b 
              px-3 pb-2 pt-1 font-normal tracking-tighter"
            >
              <span>{pickedTags.length} selected</span>
              <button
                type="button"
                className="tracking-tighter text-secondary underline hover:font-bold hover:opacity-80 dark:text-secondary"
                onClick={() => setPickedTags([])}
              >
                Reset
              </button>
            </div>

            <div className="pt-1">
              {tags.map((tag: string, tagIdx: number) => {
                const isSelected = pickedTags.some((pickedTag) => pickedTag === tag)

                return (
                  <Listbox.Option
                    key={`category-${tagIdx}`}
                    value={tag}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-1.5 pl-3 pr-3",
                        active ? "bg-slate-200 dark:bg-slate-600" : "",
                      )
                    }
                  >
                    {({ selected }) => {
                      const highlight = selected || isSelected
                      return (
                        <span className="flex items-center gap-2">
                          {highlight ? (
                            <CheckCircleIcon className="h-5 w-5 text-teal-500" aria-hidden="true" />
                          ) : (
                            <span className="h-5 w-5" />
                          )}
                          <span className={classNames("block truncate", highlight ? "font-bold" : "font-normal")}>
                            {tag}
                          </span>
                        </span>
                      )
                    }}
                  </Listbox.Option>
                )
              })}
            </div>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  )
}

function ResultsAmountBadge({ count }: { count: number }) {
  return (
    <div className="flex w-full items-center gap-2 self-stretch rounded border border-slate-700 bg-slate-700/80 px-2 py-1.5 text-center text-xs font-normal tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-500 dark:bg-slate-500/50">
      <span className="tracking-tighter">{count} results</span>
    </div>
  )
}

function ResultsAmountAnnouncement({ count }: { count: number }) {
  return (
    <div className="flex w-full items-center gap-2 rounded border border-slate-700 bg-slate-700/60 px-3 py-1.5 text-center text-sm font-medium tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-500 dark:bg-slate-500/50">
      <FunnelIcon className="h-4 w-4 text-white" />
      <span>{count} results matching your filtering criteria.</span>
    </div>
  )
}
