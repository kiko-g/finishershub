import React from "react"
import Link from "next/link"
import useAccessDenied from "../../hooks/useAccessDenied"
import { VideoPlayer } from "./VideoPlayer"
import { VideoMongoDBWithUrl } from "../../@types"
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
import { useSoundAvailable } from "../../hooks/useSoundAvailable"

type Props = {
  video: VideoMongoDBWithUrl
  expandedViewHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export function SingleVideoShowcase({ video }: Props) {
  const next = getVideoUrlFromVideo(video, 1)
  const previous = getVideoUrlFromVideo(video, -1)

  const buttonControlsRef = React.useRef<HTMLDivElement | null>(null)
  const [soundAvailable] = useSoundAvailable()

  const [muted, setMuted] = React.useState(true)
  const [autoplay, setAutoplay] = React.useState(true)
  const [accessDenied, setAccessDenied] = useAccessDenied()

  return (
    <section className="flex flex-col gap-y-4 md:gap-y-3">
      <div className="relative">
        <VideoPlayer
          video={video}
          muted={soundAvailable ? true : muted}
          autoplay={autoplay}
          key={`single-video-${video.url}`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-between">
        <div className="flex items-center gap-2">
          {accessDenied ? <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} /> : null}

          <Link
            href={previous}
            title="Previous video"
            className="self-stretch rounded bg-slate-600 px-4 py-2 text-sm text-white transition hover:opacity-80"
          >
            Previous
          </Link>

          <Link
            href={next}
            title="Next video"
            className="self-stretch rounded bg-slate-600 px-4 py-2 text-sm text-white transition hover:opacity-80"
          >
            Next
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div
            title="Game"
            className="self-stretch rounded border border-blue-600 bg-blue-600/50 px-4 py-2 text-sm uppercase text-white"
          >
            {video.game}
          </div>
          {/* <div
        title="Upload Date"
        className="self-stretch rounded border border-violet-500 bg-violet-500/50 px-4 py-2 text-sm text-white"
      >
        {new Date(video.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div> */}
        </div>
      </div>
    </section>
  )
}
