import React, { useState } from 'react'
import Skeleton from './Skeleton'
import classNames from 'classnames'

type Props = {
  video: string
  parent: string
  muted?: boolean
  autoplay?: boolean
  rounded?: boolean
}

export default function TwitchVideoClip({
  video,
  parent,
  muted = false,
  autoplay = false,
  rounded = true,
}: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className={`${loaded ? 'flex' : 'hidden'} h-full w-full rounded-xl shadow`}>
        <div className="relative h-full w-full">
          <iframe
            title="Twitch video clip embed"
            className={classNames(rounded ? 'rounded-xl' : 'rounded-none', 'aspect-video w-full')}
            src={`${video}&parent=${parent}&muted=${muted.toString()}&autoplay=${autoplay.toString()}`}
            onLoad={() => setLoaded(true)}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {loaded ? null : <Skeleton />}
    </>
  )
}
