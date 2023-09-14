import React, { useState, useEffect, useMemo } from "react"
import classNames from "classnames"
import useAccessDenied from "../../hooks/useAccessDenied"
import { useMediaQuery } from "usehooks-ts"
import { shuffle } from "../../utils"
import { clearCache, isStorageValid, writeVideosStorage } from "../../utils/storage"
import { Layout, AccessModal, InvisbleTopLayer, FullAccessBadge, LimitedAccessBadge } from "../../components/layout"
import { PlusIcon } from "@heroicons/react/24/solid"
import {
  ViewToggler,
  AutoplayToggler,
  AutomuteToggler,
  ReshuffleButton,
  DeleteCookiesButton,
  VideoSkeleton,
  DelayDisclaimer,
} from "../../components/videos"
import { useSoundAvailable } from "../../hooks/useSoundAvailable"

export default function IndexPage() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [soundAvailable] = useSoundAvailable()

  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const [hostname, setHostname] = useState<string>("")
  const [videos, setVideos] = useState<string[]>([])
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [view, setView] = useState<boolean>(true)
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const [shuffled, setShuffled] = useState<boolean>(true)
  const [clipsShown, setClipsShown] = useState<number>(isMobile ? 1 : view ? 2 : 3)
  const [showMoreCount, setShowMoreCount] = useState<number>(0)

  const limitedAccess = useMemo(() => !soundAvailable && accessDenied, [soundAvailable, accessDenied])
  const toastType = useMemo(() => {
    if (fetchError) return "error"
    else if (loading) return "warning"
    else if (!loading && !fetchError) return "success"
    else return ""
  }, [loading, fetchError])

  const shuffleAndSetVideos = () => {
    const videosStr = localStorage.getItem("finishershub.videos") as string
    const videosParsed = JSON.parse(videosStr) as string[]
    setVideos(shuffle(videosParsed))
  }

  const loadMore = () => {
    setShowMoreCount((prev) => prev + 1)
    if (isMobile) setClipsShown((prev) => prev + 1)
    else setClipsShown((prev) => prev + (view ? 2 : 3))
  }

  useEffect(() => {
    // request loading all twitch clips
    if (isStorageValid()) {
      setLoading(false)
      shuffleAndSetVideos()
    } else {
      clearCache(true)
      fetch("/api/twitch")
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
    if (typeof window !== "undefined") setHostname(window.location.hostname)
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
    <Layout location="Twitch" background={false}>
      <main className="flex flex-col gap-y-4 px-0 lg:px-4">
        <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:gap-x-6">
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Finishers Hub</h2>
            <p className="grow text-lg font-normal">
              The place for all finisher related content. Chaotic, outrageous, lawless on the fence of criminality.
              Perfectly unbalanced. As all things should be.
            </p>
          </div>
          <div className="mt-1 flex flex-row items-center justify-end gap-3 lg:mt-0 lg:flex-col">
            {limitedAccess ? <LimitedAccessBadge /> : <FullAccessBadge />}
            <div className="flex items-center justify-end gap-x-2">
              {limitedAccess ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} /> : null}
              <DeleteCookiesButton />
              <ReshuffleButton hook={[shuffled, setShuffled]} shuffle={shuffleAndSetVideos} />
              <AutoplayToggler hook={[autoplay, setAutoplay]} />
              <AutomuteToggler hook={[muted, setMuted]} limitedAccess={limitedAccess} />
              <ViewToggler hook={[view, setView]} />
            </div>
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
          {limitedAccess ? <InvisbleTopLayer /> : null}
          {videos.length > 0
            ? videos.slice(0, clipsShown).map((video: string, videoIdx: number) => {
                const play = isMobile ? (videoIdx <= showMoreCount ? true : autoplay) : videoIdx === 0 ? true : autoplay
                return (
                  <TwitchVideoClip
                    muted={limitedAccess ? true : muted}
                    video={video}
                    parent={hostname}
                    key={`video-${videoIdx}`}
                    autoplay={play}
                  />
                )
              })
            : Array(clipsShown)
                .fill(null)
                .map((_, skeletonIdx) => <VideoSkeleton key={`skeleton-${skeletonIdx}`} />)}
        </div>

        <div className="mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={loadMore}
            className={classNames(
              videos.length === 0 ? "hidden" : "inline-flex",
              `items-center rounded border border-transparent bg-primary/60 px-4 
              py-2 text-white shadow-sm transition hover:bg-primary 
              hover:bg-primary/90 focus:border-transparent focus:ring-2 
              focus:ring-primary focus:ring-offset-2 dark:border-transparent dark:bg-secondary/50 
              dark:hover:bg-secondary/80 dark:focus:ring-secondary dark:focus:ring-offset-2`,
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

function TwitchVideoClip({
  video,
  parent,
  muted = false,
  autoplay = false,
}: {
  video: string
  parent: string
  muted?: boolean
  autoplay?: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className={`${loaded ? "flex" : "hidden"} h-full w-full rounded-xl shadow`}>
        <div className="relative h-full w-full">
          <iframe
            sandbox="allow-scripts allow-same-origin"
            title="Twitch video clip embed"
            className="aspect-video w-full rounded"
            src={`${video}&parent=${parent}&muted=${muted.toString()}&autoplay=${autoplay.toString()}`}
            onLoad={() => setLoaded(true)}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {loaded ? null : (
        <div className="flex h-64 flex-1 items-center justify-center self-stretch border-primary/50 bg-primary/10 py-16 dark:border-secondary/50 dark:bg-secondary/10 lg:h-96">
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="-ml-1 mr-3 h-12 w-12 animate-spin text-primary dark:text-secondary"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
          3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </>
  )
}
