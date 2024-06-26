import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import Link from "next/link"
import type { VideoMongoDBWithUrl } from "@/@types"
import { formatVideoDate, getVideoUrlFromVideo } from "@/utils"
import { useControls } from "@/hooks/useControls"
import { useContentInteraction } from "@/hooks/useContentInteraction"
import { Footer, Header, Seo, AccessBadge } from "@/components/layout"
import { VideoNotFound, VideoPlayer, VideoSkeleton } from "@/components/videos"
import { PickAuthors, PickGame, PickLocation, PickMap, PickQuantity, PickTags } from "@/components/admin"
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
  const canEdit = useMemo(() => !accessDenied, [accessDenied])

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
    <div className="flex min-h-screen flex-col bg-light text-gray-700 dark:bg-navy dark:text-white">
      <Seo title={`Video ${videoIndex}`} />
      <Header siteTitle="Finishers Hub" location="Video" />
      <div className="mx-auto mb-8 mt-4 flex w-full max-w-7xl flex-1 flex-col items-start justify-center gap-4 px-4 lg:mb-8 lg:mt-20 xl:flex-row xl:px-2">
        {ready && video !== null ? (
          <>
            <div className="order-2 h-full min-w-[20rem] flex-col justify-between self-stretch rounded bg-white p-3 dark:bg-dark lg:order-1">
              <div>
                <div className="flex flex-wrap items-center gap-x-2">
                  <h2 className="text-2xl font-bold">Video {videoIndex}</h2>
                  <span>
                    <AccessBadge />
                  </span>
                </div>

                <p className="mb-1 mt-3 border-t pt-2 text-sm text-gray-500">
                  {video.date === null ? "Unknown Date" : formatVideoDate(video.date)}
                </p>

                <p className="mb-3 max-w-sm text-sm">
                  {accessDenied
                    ? "You need full access to edit and saved video details below."
                    : "You have full access. Save your changes by clicking the save button."}
                </p>
              </div>

              {canEdit && (
                <div className="flex flex-col space-y-2">
                  <PickGame setVideoSaved={setVideoSaved} videoHook={[video, setVideo]} />
                  <PickMap game={video.game} setVideoSaved={setVideoSaved} videoHook={[video, setVideo]} />
                  <PickLocation
                    game={video.game}
                    map={video.map}
                    setVideoSaved={setVideoSaved}
                    videoHook={[video, setVideo]}
                  />
                  <PickTags setVideoSaved={setVideoSaved} videoHook={[video, setVideo]} />
                  <PickAuthors setVideoSaved={setVideoSaved} videoHook={[video, setVideo]} />
                  <PickQuantity
                    setVideoSaved={setVideoSaved}
                    videoHook={[video, setVideo]}
                    className={classNames(
                      "w-full cursor-pointer rounded border",
                      video.quantity <= 0 && "border-rose-700 bg-rose-200",
                    )}
                  />
                </div>
              )}

              {canEdit && (
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
              )}

              <div className="mt-2 flex w-full flex-col items-center gap-2 lg:flex-row">
                <VideoNavLink name="Previous" href={previous} />
                <VideoNavLink name="Next" href={next} />
              </div>
            </div>

            <div className="relative order-1 max-w-5xl flex-col gap-y-4 md:gap-y-3 lg:order-2">
              <VideoPlayer video={video} automute={muted} autoplay={autoplay} key={`single-video-${video.url}`} />
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
