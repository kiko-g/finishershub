import React from 'react'
import Link from 'next/link'
import useAccessDenied from '../../hooks/useAccessDenied'
import VideoPlayer from './VideoPlayer'
import { VideoType } from '../../@types'
import { AccessModal, InvisbleTopLayer } from '../layout'
import { getVideoUrlFromVideo } from '../../utils'
import {
  BackwardIcon,
  ForwardIcon,
  PlayIcon,
  PlayPauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/react/24/outline'

type Props = {
  video: VideoType
}

export default function SingleVideoShowcase({ video }: Props) {
  const next = getVideoUrlFromVideo(video, 1)
  const previous = getVideoUrlFromVideo(video, -1)

  const [muted, setMuted] = React.useState(true)
  const [autoplay, setAutoplay] = React.useState(true)
  const [accessDenied, setAccessDenied] = useAccessDenied()

  return (
    <section className="flex flex-col gap-y-4 md:gap-y-3">
      <div className="relative">
        <VideoPlayer
          video={video}
          muted={muted}
          autoplay={autoplay}
          key={`single-video-${video.url}`}
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-between">
        <div className="flex items-center gap-2">
          {accessDenied ? (
            <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
          ) : (
            <>
              <Link
                href={previous}
                title="Previous video"
                className="self-stretch rounded bg-slate-600 px-4 py-2 text-sm uppercase text-white transition hover:opacity-80"
              >
                <BackwardIcon className="h-5 w-5" />
              </Link>
              <Link
                href={next}
                title="Next video"
                className="self-stretch rounded bg-slate-600 px-4 py-2 text-sm uppercase text-white transition hover:opacity-80"
              >
                <ForwardIcon className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setMuted(!muted)}
                title="Toggle mute"
                className="self-stretch rounded bg-teal-500 px-4 py-2 text-sm uppercase text-white transition hover:opacity-80"
              >
                {muted ? (
                  <SpeakerXMarkIcon className="h-5 w-5" />
                ) : (
                  <SpeakerWaveIcon className="h-5 w-5" />
                )}
              </button>
            </>
          )}
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
            {new Date(video.date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
