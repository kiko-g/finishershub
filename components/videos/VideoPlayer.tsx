import classNames from "classnames"
import type { VideoMongoDBWithUrl } from "../../@types"
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react"
import { ShareVideo, PopOpenVideo, VideoSkeleton } from "./"
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid"
import { getButtonSizeClassNames } from "../../utils"
import { FocusViewToggler } from "./FocusViewToggler"
import { useSoundAvailable } from "../../hooks/useSoundAvailable"

type Props = {
  video: VideoMongoDBWithUrl
  limitedAccess?: boolean
  startExpanded?: boolean
  loop?: boolean
  autoplay?: boolean
  muted?: boolean
  special?: boolean
}

export function VideoPlayer(props: Props) {
  const {
    video,
    limitedAccess = true,
    startExpanded = false,
    loop = false,
    autoplay = false,
    muted = true,
    special = false,
  } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [soundAvailable] = useSoundAvailable()

  const [mute, setMute] = useState(muted)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(startExpanded)

  useEffect(() => {
    setMute((prev) => muted && prev)
  }, [muted])

  useEffect(() => {
    if (videoRef.current === null) return

    const updateVideoProgress = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
      animationFrameId = requestAnimationFrame(updateVideoProgress)
    }

    const video: HTMLVideoElement = videoRef.current
    let animationFrameId = requestAnimationFrame(updateVideoProgress)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // keyboard controls
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Space") togglePlay()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function togglePlay() {
    if (!videoRef.current) return

    if (videoRef.current.paused) videoRef.current.play()
    else videoRef.current.pause()
  }

  function handlePlay() {
    setPlaying(true)
  }

  function handlePause() {
    setPlaying(false)
  }

  return (
    <div
      className={classNames(
        "group relative z-20 w-full",
        special ? "mx-auto my-auto h-screen overflow-hidden" : "rounded",
      )}
    >
      <div className={classNames(special ? "absolute inset-0" : "")}>
        <video
          ref={videoRef}
          loop
          controls={false}
          muted={soundAvailable ? mute : true}
          autoPlay={autoplay}
          preload="auto"
          onClick={togglePlay}
          onPlay={handlePlay}
          onPause={handlePause}
          className={classNames(
            "w-full bg-primary/10 dark:bg-secondary/20",
            special
              ? "aspect-[9/16] h-screen scale-x-[3] scale-y-[3] overflow-hidden lg:aspect-video lg:h-full lg:scale-x-100 lg:scale-y-100"
              : "rounded",
          )}
        >
          <source src={video.url} type="video/mp4" />
        </video>

        {special ? null : (
          <>
            <div className="absolute left-0 top-0 z-30 flex font-normal text-white transition lg:hidden lg:group-hover:flex lg:group-hover:gap-2">
              <div className="flex items-center gap-2 rounded-br rounded-tl bg-black/50 px-2 py-2 lg:gap-2 lg:px-3 lg:py-3">
                <ShareVideo video={video} size="sm" />
                <PopOpenVideo video={video} size="sm" />
              </div>
            </div>

            {(video.authors || video.tags) && (
              <div className="absolute right-0 top-0 z-30 hidden font-normal text-white opacity-50 transition lg:hidden lg:hover:opacity-100 lg:group-hover:flex lg:group-hover:gap-2">
                <div className="flex flex-col items-end gap-2 rounded-bl rounded-tr bg-black/50 px-1 py-1 lg:gap-1 lg:px-2 lg:py-2">
                  <div className="flex max-w-md flex-1 flex-wrap items-center gap-1 self-stretch">
                    {video.tags.map((author, authorIdx) => (
                      <span
                        key={`${author}-${authorIdx}`}
                        className="flex-1 whitespace-nowrap rounded bg-primary/50 px-1 py-0.5 text-xxs tracking-tighter dark:bg-secondary/50"
                      >
                        {author}
                      </span>
                    ))}
                  </div>

                  <div className="flex max-w-md flex-1 flex-wrap items-center gap-1 self-stretch">
                    {video.authors.map((author, authorIdx) => (
                      <span
                        key={`${author}-${authorIdx}`}
                        className="flex-1 whitespace-nowrap rounded bg-primary/50 px-1 py-0.5 text-xxs tracking-tighter dark:bg-secondary/50"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-0 right-0 z-30 flex font-normal text-white transition lg:hidden lg:group-hover:flex lg:group-hover:gap-2">
              <div className="flex flex-col items-center gap-2 rounded-br rounded-tl bg-black/50 px-2 py-2 lg:gap-2 lg:px-3 lg:py-3">
                <PlayPauseVideo
                  size="sm"
                  playing={playing}
                  togglePlay={togglePlay}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                />
                <ToggleMuteVideo hook={[mute, setMute]} disabled={limitedAccess} size="sm" />
                <FocusViewToggler hook={[expanded, setExpanded]} size="sm" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="group relative -mt-[5px] h-[5px] cursor-pointer rounded-b shadow-inner hover:-mt-[10px] hover:h-[10px]"
        onClick={(event) => {
          if (progressBarRef.current && videoRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect()
            const clickPosition = event.clientX - rect.left
            const percentage = (clickPosition / rect.width) * 100
            setProgress(percentage)
            videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration
          }
        }}
      >
        <div className="absolute bottom-0 left-0 z-40 h-full w-full rounded-b bg-black/20 transition" />
        <div
          style={{ width: `${progress}%` }}
          className="absolute bottom-0 left-0 z-[999] h-full rounded-bl bg-primary transition dark:bg-secondary"
        />
      </div>
    </div>
  )
}

type PlayPauseVideoProps = {
  playing: boolean
  togglePlay?: () => void
  handlePlay?: () => void
  handlePause?: () => void
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

function PlayPauseVideo({ playing, togglePlay, handlePlay, handlePause, size = "sm" }: PlayPauseVideoProps) {
  return playing ? (
    <PauseIcon
      title="Pause (or press Space)"
      fillRule="evenodd"
      strokeWidth="1.5"
      onClick={togglePlay}
      className={classNames("cursor-pointer transition hover:opacity-80", getButtonSizeClassNames(size))}
    />
  ) : (
    <PlayIcon
      title="Play (or press Space)"
      fillRule="evenodd"
      strokeWidth="1.5"
      onClick={togglePlay}
      className={classNames("cursor-pointer transition hover:opacity-80", getButtonSizeClassNames(size))}
    />
  )
}

type ToggleMuteVideoProps = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  disabled?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

function ToggleMuteVideo({ hook, disabled = true, size = "sm" }: ToggleMuteVideoProps) {
  const [mute, setMute] = hook
  const [soundAvailable] = useSoundAvailable()

  function handleMute() {
    setMute(true)
  }

  function handleUnmute() {
    setMute(false)
  }

  if (!soundAvailable) return null

  return mute ? (
    <button
      disabled={disabled}
      title="Turn default mute off (or press M)"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
      onClick={handleUnmute}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className={classNames(getButtonSizeClassNames(size))}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          clipRule="evenodd"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    </button>
  ) : (
    <button
      disabled={disabled}
      title="Turn default mute on"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
      onClick={handleMute}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className={classNames(getButtonSizeClassNames(size))}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    </button>
  )
}
