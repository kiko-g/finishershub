import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import { Layout, FullAccessBadge, LimitedAccessBadge, Seo, AccessModal } from "../components/layout"
import {
  AutoplayToggler,
  DeleteCookiesButton,
  FocusViewToggler,
  KeyboardUsageButton,
  KeyboardUsageInstructions,
  MuteToggler,
  NextVideo,
  PopOpenVideo,
  PreviousVideo,
  ShareVideo,
  VideoNotFound,
  VideoOrderToggler,
  VideoPlayer,
  VideoSkeleton,
} from "../components/videos"
import type { FilterByGameType, VideoMongoDBWithUrl } from "../@types"
import { Listbox } from "@headlessui/react"
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CheckIcon,
  ChevronUpDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { FilterVideosByGame } from "../components/videos/FilterVideosByGame"
import { useSwipeable } from "react-swipeable"
import { useControls } from "../hooks/useControls"
import { useContentInteraction } from "../hooks/useContentInteraction"
import { arenas, authors, tags } from "../utils/data"

type Props = {}

export default function Videos({}: Props) {
  const buttonControlsRef = useRef<HTMLDivElement | null>(null)

  const {
    isMobile,
    accessDenied,
    setAccessDenied,
    isLoading,
    setIsLoading,
    fetchError,
    setFetchError,
    isContentReady,
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
  const [selectedGame, setSelectedGame] = useState<FilterByGameType>({ name: "All", value: "" })
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  const prevVideo = useCallback(() => setIndex((prev) => prev - 1), [])
  const nextVideo = useCallback(() => setIndex((prev) => prev + 1), [])

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

    if (selectedGame.value !== "") {
      result = result.filter((video) => video.game === selectedGame.value)
    }

    return shuffled ? result.sort(() => Math.random() - 0.5) : result.sort((a, b) => a.id - b.id)
  }, [videos, selectedTags, selectedAuthors, selectedGame, shuffled])

  const someVideosMatching = useMemo(
    () => isContentReady && filteredVideos.length > 0,
    [isContentReady, filteredVideos],
  )

  useEffect(() => {
    setIndex(0)
  }, [filteredVideos])

  const video = useMemo(() => (filteredVideos.length > 0 ? filteredVideos[index] : null), [filteredVideos, index])

  const handlers = useSwipeable({
    onSwipedUp: () => prevVideo,
    onSwiped: () => nextVideo,
  })

  useEffect(() => {
    setExpandedView(isMobile)
  }, [isMobile, setExpandedView])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 39) nextVideo() // right arrow
      if (event.keyCode === 37) prevVideo() // left arrow
      if (event.keyCode === 69 && accessDenied === false) setExpandedView((prev) => !prev) // e key
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [nextVideo, prevVideo, accessDenied, setExpandedView])

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

  return expandedView ? (
    <>
      <Seo title="Videos" />
      <main className="group relative h-screen">
        {someVideosMatching ? (
          <>
            <div
              ref={buttonControlsRef}
              className="absolute bottom-0 right-0 top-auto z-50 flex flex-col items-center gap-3 self-end rounded-tl bg-gray-900/80 p-3 text-white opacity-10 transition-opacity duration-[2000] hover:opacity-100 lg:bottom-auto lg:top-0 lg:max-w-full lg:flex-col lg:gap-2 lg:p-4"
            >
              <FocusViewToggler hook={[expandedView, setExpandedView]} size="md" />
              <VideoOrderToggler hook={[shuffled, setShuffled]} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} size="md" />
              <MuteToggler hook={[muted, setMuted]} size="md" limitedAccess={accessDenied} />
              <ShareVideo video={video} size="md" />
              <PopOpenVideo video={video} size="md" />
              <PreviousVideo prevVideo={prevVideo} disabled={index === 0} size="md" />
              <NextVideo nextVideo={nextVideo} disabled={index === videos.length - 1} size="md" />
              <KeyboardUsageButton showHook={[showInstructions, setShowInstructions]} size="md" />
            </div>

            <KeyboardUsageInstructions showHook={[showInstructions, setShowInstructions]} />

            <div className="relative w-full" {...handlers}>
              {isContentReady && video !== null ? (
                <VideoPlayer
                  video={video}
                  autoplay={autoplay}
                  muted={muted}
                  special={true}
                  key={`video-element-${video.id}`}
                />
              ) : (
                <VideoSkeleton />
              )}
              {fetchError && <VideoNotFound />}
            </div>
          </>
        ) : (
          <VideoNotFound />
        )}
      </main>
    </>
  ) : (
    <Layout location="Videos">
      <div className="mx-auto flex max-w-3xl flex-col space-y-2">
        <div className="text-lg font-normal">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Videos</h2>
            {accessDenied ? <LimitedAccessBadge /> : <FullAccessBadge />}
          </div>
          <p className="mt-0.5 max-w-3xl text-sm">
            This is your control panel. Filter as you see fit and relive some of our greatest moments.
          </p>
        </div>

        <main className="">
          {isLoading && <VideoSkeleton />}
          {fetchError && <VideoNotFound />}

          {isContentReady && someVideosMatching ? (
            <div className="flex flex-col space-y-2 font-normal">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center justify-end gap-1">
                  {accessDenied ? (
                    <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
                  ) : (
                    <DeleteCookiesButton size="sm" />
                  )}
                  <KeyboardUsageButton showHook={[showInstructions, setShowInstructions]} size="sm" />
                  <VideoOrderToggler hook={[shuffled, setShuffled]} />
                  <AutoplayToggler hook={[autoplay, setAutoplay]} size="sm" />
                  <MuteToggler hook={[muted, setMuted]} size="md" limitedAccess={accessDenied} />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <PickTags tags={tags} hook={[selectedTags, setSelectedTags]} />
                  <PickAuthors authors={authors} hook={[selectedAuthors, setSelectedAuthors]} />
                  <FilterVideosByGame arenas={arenas} pickedHook={[selectedGame, setSelectedGame]} />
                </div>
              </div>

              <KeyboardUsageInstructions showHook={[showInstructions, setShowInstructions]} />

              <div className="flex w-full items-center gap-2 rounded border border-sky-600 bg-sky-600/60 py-2 pl-3 pr-2 text-center text-sm font-medium tracking-tight text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-sky-500 dark:bg-sky-500/50">
                <InformationCircleIcon className="h-4 w-4 text-white" />
                <span>{filteredVideos.length} results matching your filtering criteria.</span>
              </div>

              <div className="relative w-full">
                {video !== null && (
                  <VideoPlayer
                    limitedAccess={accessDenied}
                    video={video}
                    autoplay={autoplay}
                    muted={muted}
                    key={`video-element-${video.id}`}
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

                  <div className="flex w-full items-center justify-center self-stretch border border-slate-800/60 bg-slate-800/60 px-4 py-2 dark:border-blue-200/30 dark:bg-blue-200/20 lg:py-1">
                    <span className="text-sm">
                      {index + 1} of {filteredVideos.length}
                    </span>
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
            isContentReady && <VideoNotFound />
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
          <Listbox.Button className="inline-flex w-full items-center justify-center gap-x-0.5 rounded border border-secondary bg-secondary/70 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:py-1.5 lg:pl-3 lg:pr-2 lg:text-sm">
            <span className="font-normal tracking-tighter lg:tracking-normal">Authors</span>
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
          <Listbox.Button className="inline-flex w-full items-center justify-center gap-x-0.5 rounded border border-secondary bg-secondary/70 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:py-1.5 lg:pl-3 lg:pr-2 lg:text-sm">
            <span className="font-normal tracking-tighter lg:tracking-normal">Tags</span>
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
