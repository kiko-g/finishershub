import React from "react"
import Link from "next/link"
import useAccessDenied from "../../hooks/useAccessDenied"
import VideoPlayer from "./VideoPlayer"
import { VideoType } from "../../@types"
import { AccessModal, InvisbleTopLayer } from "../layout"
import { getVideoUrlFromVideo } from "../../utils"
import {
  ArrowsPointingOutIcon,
  BackwardIcon,
  ForwardIcon,
  PlayIcon,
  PlayPauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline"
import classNames from "classnames"
import { FocusViewToggler, MuteToggler, ShareVideo } from "./"

type Props = {
  video: VideoType
  expandedViewHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function SingleVideoShowcase({ video, expandedViewHook }: Props) {
  const next = getVideoUrlFromVideo(video, 1)
  const previous = getVideoUrlFromVideo(video, -1)

  const buttonControlsRef = React.useRef<HTMLDivElement | null>(null)
  const [muted, setMuted] = React.useState(true)
  const [autoplay, setAutoplay] = React.useState(true)
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [expandedView, setExpandedView] = expandedViewHook

  return expandedView ? (
    <section className="flex flex-col gap-y-4 md:gap-y-3">
      <div className="relative">
        <VideoPlayer video={video} muted={muted} autoplay={autoplay} key={`single-video-${video.url}`} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-between">
        <div className="flex items-center gap-2">
          {accessDenied ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} /> : null}
          <Link
            href={previous}
            title="Previous video"
            className="self-stretch rounded bg-slate-600 px-4 py-2 text-sm uppercase text-white transition hover:opacity-80"
          >
            <BackwardIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          </Link>
          <Link
            href={next}
            title="Next video"
            className="self-stretch rounded bg-slate-600 px-4 py-2 text-sm uppercase text-white transition hover:opacity-80"
          >
            <ForwardIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          </Link>
          <button
            disabled={accessDenied}
            onClick={() => {
              if (accessDenied) return
              setMuted((prev) => !prev)
            }}
            title="Toggle mute"
            className={classNames(
              muted ? "bg-rose-600" : "bg-teal-600",
              "self-stretch rounded px-4 py-2 text-sm uppercase text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-20",
            )}
          >
            {muted ? (
              <SpeakerXMarkIcon className="h-4 w-4 lg:h-6 lg:w-6" />
            ) : (
              <SpeakerWaveIcon className="h-4 w-4 lg:h-6 lg:w-6" />
            )}
          </button>
          <button
            onClick={() => setExpandedView((prev) => !prev)}
            title="Toggle expanded view"
            className="self-stretch rounded bg-blue-500 px-4 py-2 text-sm uppercase text-white transition hover:opacity-80"
          >
            <ArrowsPointingOutIcon className="h-4 w-4 lg:h-6 lg:w-6" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div
            title="Game"
            className="self-stretch rounded border border-blue-600 bg-blue-600/50 px-4 py-2 text-sm uppercase text-white"
          >
            {video.game}
          </div>
          <div
            title="Upload Date"
            className="self-stretch rounded border border-violet-500 bg-violet-500/50 px-4 py-2 text-sm text-white"
          >
            {new Date(video.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <main className="group relative h-screen">
      <div
        ref={buttonControlsRef}
        className="absolute bottom-0 right-2 top-auto z-50 flex flex-row flex-wrap items-center gap-2 self-end bg-white p-3 text-gray-800 opacity-50 transition-opacity duration-[2000] hover:opacity-100 dark:bg-slate-800 dark:text-white lg:bottom-auto lg:top-0 lg:max-w-full lg:flex-col lg:p-4"
      >
        <FocusViewToggler hook={[expandedView, setExpandedView]} size="md" />
        <MuteToggler hook={[muted, setMuted]} size="md" limitedAccess={accessDenied} />
        <ShareVideo video={video} size="md" />
      </div>

      <div className="relative w-full">
        <VideoPlayer
          video={video}
          autoplay={autoplay}
          muted={muted}
          special={true}
          key={`video-element-${video.index}`}
        />
      </div>
    </main>
  )
}
