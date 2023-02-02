import React, { useState } from 'react'
import Skeleton from './Skeleton'

type Props = {
  video: string
  parent: string
  muted?: boolean
  autoplay?: boolean
}

export default function TwitchVideoClip({ video, parent, muted = false, autoplay = false }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className={`${loaded ? 'flex' : 'hidden'} h-full w-full rounded-xl shadow`}>
        <div className="relative h-full w-full">
          <iframe
            className="aspect-video w-full rounded"
            src={`${video}&parent=${parent}&muted=${muted.toString()}&autoplay=${autoplay.toString()}`}
            onLoad={() => setLoaded(true)}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {!loaded && <Skeleton />}
    </>
  )
}
