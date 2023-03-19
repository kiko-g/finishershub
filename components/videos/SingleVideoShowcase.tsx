import React from 'react'
import VideoPlayer from './VideoPlayer'
import { VideoType } from '../../@types/index'
import Link from 'next/link'

type Props = {
  video: VideoType
}

export default function SingleVideoShowcase({ video }: Props) {
  return (
    <section className="flex flex-col gap-y-4 md:gap-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="rounded border border-blue-600 bg-blue-600/50 px-4 py-2 text-sm uppercase text-white">
          {video.game}
        </div>
        <div className="rounded border border-violet-500 bg-violet-500/50 px-4 py-2 text-sm uppercase text-white">
          {video.date}
        </div>
      </div>

      <VideoPlayer video={video} muted={true} play={true} />
    </section>
  )
}
