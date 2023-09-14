import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Footer, Header, Seo } from "../layout"
import { VideoNotFound, VideoPlayer, VideoSkeleton } from "."
import type { VideoMongoDBWithUrl } from "../../@types"
import { getVideoUrlFromVideo } from "../../utils"
import { useContentInteraction } from "../../hooks/useContentInteraction"
import { useControls } from "../../hooks/useControls"
import { AccessBadge } from "../layout/AccessBadge"
import { PickAuthors, PickGame, PickLocation, PickMap, PickTags } from "../admin"
import { CheckIcon } from "@heroicons/react/24/outline"

type Props = {
  videoIndex: number
}

export function VideoPage({ videoIndex }: Props) {
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

  const [video, setVideo] = useState<VideoMongoDBWithUrl | null>(null)
  const [videoSaved, setVideoSaved] = useState(false)
  const ready = useMemo(() => !isLoading && !fetchError, [isLoading, fetchError])
  const canEdit = useMemo(() => !accessDenied && !isMobile, [accessDenied, isMobile])

  const next = useMemo(() => (video === null ? undefined : getVideoUrlFromVideo(video, 1)), [video])
  const previous = useMemo(() => (video === null ? undefined : getVideoUrlFromVideo(video, -1)), [video])

  const updateVideo = async (video: VideoMongoDBWithUrl): Promise<VideoMongoDBWithUrl> => {
    const response = await fetch("/api/mongo/videos/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
    })

    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.message)
    }

    return response.json()
  }

  const handleUpdateVideo = async (video: VideoMongoDBWithUrl) => {
    try {
      setIsLoading(true)

      await Promise.all([
        (async () => {
          try {
            const updatedVideo = await updateVideo(video)
            setVideo(video)
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : null
            console.error("Error updating video:", errorMessage)
          }
        })(),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ])
    } catch (error) {
      console.error("Error replacing row:", error)
    } finally {
      setVideoSaved(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (videoIndex === undefined || videoIndex < 0) return

    fetch(`/api/mongo/videos/urls/${videoIndex}`)
      .then((res) => {
        if (res.status === 404) {
          setFetchError(true)
        } else {
          return res.json()
        }
      })
      .then((video: VideoMongoDBWithUrl) => {
        setIsLoading(false)
        setFetchError(false)
        setVideo(video)
      })
      .catch((err) => {
        setIsLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [videoIndex, setIsLoading, setFetchError])

  return (
    <div className="flex min-h-screen flex-col bg-light dark:bg-navy">
      <Seo title={`Video ${videoIndex}`} />
      <Header siteTitle="Finishers Hub" location="Video" />
      <div className="mx-auto mt-20 flex w-full max-w-7xl flex-1 items-start justify-center gap-x-6 px-4 xl:px-2">
        {ready && video !== null ? (
          <>
            <div className="hidden h-full min-w-[20rem] flex-col justify-between self-stretch lg:flex">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">Video {videoIndex}</h2>
                  <span>
                    <AccessBadge />
                  </span>
                </div>
                <p className="mb-2 mt-1 max-w-sm text-sm">
                  You need full access to edit video details below. Saved your changes by clicking the save button.
                </p>
              </div>

              {canEdit && (
                <div className="flex flex-col space-y-2">
                  <PickGame
                    setRowSaved={setVideoSaved}
                    rowHook={[video, setVideo] as [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]}
                  />
                  <PickMap
                    game={video.game}
                    setRowSaved={setVideoSaved}
                    rowHook={[video, setVideo] as [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]}
                  />
                  <PickLocation
                    game={video.game}
                    map={video.map}
                    setRowSaved={setVideoSaved}
                    rowHook={[video, setVideo] as [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]}
                  />
                  {/*
                  <PickTags
                    setRowSaved={setVideoSaved}
                    rowHook={[video, setVideo] as [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]}
                  />
                  <PickAuthors
                    setRowSaved={setVideoSaved}
                    rowHook={[video, setVideo] as [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]}
                  />
                */}
                </div>
              )}

              <div className="mt-8 flex w-full flex-col items-center gap-2 lg:flex-row">
                <button
                  disabled={videoSaved}
                  className="flex w-full items-center justify-center gap-1 self-stretch rounded bg-teal-600 px-4 py-2 text-sm capitalize text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => handleUpdateVideo(video)}
                >
                  <span>Save</span>
                  <CheckIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-2 flex w-full flex-col items-center gap-2 lg:flex-row">
                <VideoNavLink name="Next" href={next} />
                <VideoNavLink name="Previous" href={next} />
              </div>
            </div>

            <div className="relative max-w-5xl flex-col gap-y-4 md:gap-y-3">
              <VideoPlayer
                video={video}
                muted={soundAvailable ? true : muted}
                autoplay={autoplay}
                key={`single-video-${video.url}`}
              />

              <div className="mt-2 flex w-full flex-row flex-wrap items-center gap-2 lg:hidden">
                <VideoNavLink name="Next" href={next} />
                <VideoNavLink name="Previous" href={next} />
              </div>
            </div>
          </>
        ) : fetchError ? (
          <VideoNotFound reloadPage />
        ) : (
          <VideoSkeleton />
        )}
      </div>
      <Footer siteTitle="Finishers Hub" />
    </div>
  )
}

function VideoNavLink({ name, href, icon }: { name: string; href?: string; icon?: React.ReactNode }) {
  return href ? (
    <Link
      href={href}
      title={`${name} video`}
      className="flex w-full items-center justify-center gap-1 rounded bg-slate-600 px-4 py-2 text-center text-sm capitalize text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span>{name}</span>
    </Link>
  ) : (
    <button
      disabled
      className="flex w-full cursor-not-allowed items-center justify-center gap-1 rounded bg-slate-600 px-4 py-2 text-center text-sm capitalize text-white opacity-50"
    >
      <span>{name}</span>
    </button>
  )
}
