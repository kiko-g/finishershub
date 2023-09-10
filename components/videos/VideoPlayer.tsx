import classNames from "classnames"
import type { VideoType } from "../../@types"
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react"
import { ShareVideo, PopOpenVideo, VideoSkeleton } from "./"
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid"
import { useMediaQuery } from "usehooks-ts"

type Props = {
  video: VideoType
  autoplay?: boolean
  muted?: boolean
  special?: boolean
}

export function VideoPlayer(props: Props) {
  const { video, autoplay = false, muted = true, special = false } = props

  const [mute, setMute] = useState(muted)
  const [slide, setSlide] = useState(false)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setSlide(true)
    setTimeout(() => {
      setSlide(false)
    }, 500)
  }, [video.url])

  useEffect(() => {
    setMute((prev) => muted && prev)
  }, [muted])

  function togglePlay() {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
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
        special ? "mx-auto my-auto h-screen overflow-hidden bg-black" : "rounded",
      )}
    >
      <div className={classNames(special ? "absolute inset-0" : "")}>
        <video
          ref={videoRef}
          loop
          controls={false}
          muted={mute || muted}
          autoPlay={video.index === 0 ? false : autoplay}
          preload="auto"
          onClick={togglePlay}
          onPlay={handlePlay}
          onPause={handlePause}
          className={classNames(
            "w-full bg-primary/20 dark:bg-secondary/20",
            special
              ? "aspect-[9/16] h-screen scale-x-[3] scale-y-[3] overflow-hidden lg:aspect-video lg:h-full lg:scale-x-100 lg:scale-y-100"
              : "rounded",
          )}
        >
          <source src={video.url} type="video/mp4" />
        </video>
        {special ? null : (
          <div className="absolute bottom-4 left-4 z-30 hidden font-normal text-white transition group-hover:flex group-hover:gap-2">
            <div className="flex flex-col items-center gap-2 rounded bg-black/50 px-2 py-2 lg:gap-4 lg:px-4 lg:py-4">
              <PlayPauseVideo playing={playing} size="md" />
              {/* <ToggleMuteVideo hook={[mute, setMute]} defaultMute={muted} size="md" /> */}
              <ShareVideo video={video} size="md" />
              <PopOpenVideo video={video} size="md" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

type PlayPauseVideoProps = {
  playing: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

function PlayPauseVideo({ playing, size = "sm" }: PlayPauseVideoProps) {
  return playing ? (
    <PlayIcon
      fillRule="evenodd"
      strokeWidth="1.5"
      className={classNames(
        size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
        size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
        size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
        size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
      )}
    />
  ) : (
    <PauseIcon
      fillRule="evenodd"
      strokeWidth="1.5"
      className={classNames(
        size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
        size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
        size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
        size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
      )}
    />
  )
}

type ToggleMuteVideoProps = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  defaultMute: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

function ToggleMuteVideo({ hook, defaultMute, size }: ToggleMuteVideoProps) {
  const [mute, setMute] = hook

  function handleMute() {
    setMute(true)
  }

  function handleUnmute() {
    setMute(false)
  }

  return mute ? (
    <button
      disabled={defaultMute}
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
        className={classNames(
          size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
          size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
          size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
          size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
        )}
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
      disabled={defaultMute}
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
        className={classNames(
          size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
          size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
          size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
          size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
        )}
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
