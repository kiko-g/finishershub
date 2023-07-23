import classNames from 'classnames'
import type { VideoType } from '../../@types'
import React, { useState, useEffect } from 'react'
import { ShareVideo, PopOpenVideo, VideoSkeleton } from './'

type Props = {
  video: VideoType
  autoplay?: boolean
  muted?: boolean
  special?: boolean
}

export default function VideoPlayer({
  video,
  autoplay = false,
  muted = true,
  special = false,
}: Props) {
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
          controls={false}
          muted={video.index === 0 || muted}
          autoPlay={video.index === 0 ? false : autoplay}
          preload="auto"
          className={classNames(
            'h-full w-full bg-primary/10 shadow dark:bg-secondary/10',
            special ? 'h-screen' : 'rounded',
          )}
        >
          <source src={video.url} type="video/mp4" />
        </video>
        {special ? null : (
          <div className="absolute left-4 bottom-4 z-30 hidden font-normal text-white transition group-hover:flex group-hover:gap-2">
            <div className="flex items-center flex-col gap-4 px-4 py-4 bg-black/50 rounded">
              <ShareVideo video={video} size="md" />
              <PopOpenVideo video={video} size="md" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
