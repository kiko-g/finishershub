import React, { useState, useEffect } from 'react'
import type { VideoType } from '../../@types'
import { ShareVideo, PopOpenVideo, VideoSkeleton } from './'
import classNames from 'classnames'

type Props = {
  video: VideoType
  play?: boolean
  muted?: boolean
  special?: boolean
}

export default function VideoPlayer({ video, play = false, muted = true, special = false }: Props) {
  const [slide, setSlide] = useState(false)

  useEffect(() => {
    setSlide(true)
    setTimeout(() => {
      setSlide(false)
    }, 1000)
  }, [video.url])

  return (
    <div
      className={classNames(
        'group relative z-20',
        special ? 'h-screen bg-black' : 'rounded bg-primary/50 dark:bg-secondary/50',
      )}
    >
      <div className={classNames(slide ? 'animate-pulse-500' : '')}>
        <video
          loop
          controls
          muted={video.index === 0 || muted}
          autoPlay={video.index === 0 ? false : play}
          preload="auto"
          className={classNames(
            'h-full w-full bg-primary/10 shadow dark:bg-secondary/10',
            special ? 'h-screen' : 'rounded',
          )}
        >
          <source src={video.url} type="video/mp4" />
        </video>
        {special ? null : (
          <div className="absolute right-0 top-0 z-30 hidden rounded-bl rounded-tr bg-slate-900/80 px-2 py-2 font-normal text-white transition group-hover:flex group-hover:gap-2">
            <div className="flex items-center gap-2">
              <ShareVideo video={video} />
              <PopOpenVideo video={video} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
