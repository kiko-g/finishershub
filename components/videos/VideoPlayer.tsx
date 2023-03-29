import React from 'react'
import type { VideoType } from '../../@types'
import { ShareVideo, PopOpenVideo } from './'

type Props = {
  video: VideoType
  play?: boolean
  muted?: boolean
}

export default function VideoPlayer({ video, play = false, muted = true }: Props) {
  return (
    <div className="group relative">
      <video
        loop
        controls
        muted={video.index === 0 || muted}
        autoPlay={video.index === 0 ? false : play}
        preload="preload"
        className="h-full w-full rounded bg-primary/10 shadow dark:bg-secondary/10"
      >
        <source src={video.url} type="video/mp4" />
      </video>
      <div className="absolute right-0 top-0 z-40 hidden rounded-bl rounded-tr bg-slate-900/80 px-2 py-2 font-normal text-white transition group-hover:flex group-hover:gap-2">
        <div className="flex items-center gap-2">
          <ShareVideo video={video} />
          <PopOpenVideo video={video} />
        </div>
      </div>
    </div>
  )
}
