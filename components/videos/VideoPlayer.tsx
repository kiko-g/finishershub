import React from 'react'
import ShareVideo from './ShareVideo'
import PopOpenVideo from './PopOpenVideo'

type Props = {
  src: string
  index: number
  play?: boolean
  muted?: boolean
}

export default function VideoPlayer({ src, index, play = false, muted = true }: Props) {
  return (
    <div className="group relative">
      <video
        loop
        controls
        muted={index === 0 || muted}
        autoPlay={index === 0 ? false : play}
        preload="preload"
        className="h-full w-full rounded bg-primary/10 shadow dark:bg-secondary/10"
        key={`video-element-${index}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute top-0 right-0 z-50 hidden rounded-bl rounded-tr bg-slate-900/80 px-2 py-2 font-normal text-white transition group-hover:flex group-hover:gap-2">
        <ShareVideo index={index} alt />
        <PopOpenVideo index={index} />
      </div>
    </div>
  )
}