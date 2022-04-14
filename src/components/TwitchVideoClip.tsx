import React, { useEffect, useState } from 'react'
import { Skeleton } from './Skeleton'

type Props = {
  video: string
  parent: string
}

export const TwitchVideoClip = ({ video, parent }: Props) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className={`${loaded ? 'flex' : 'hidden'} h-full w-full rounded-xl shadow`}>
        <div className="relative h-full w-full">
          <iframe
            className="aspect-video w-full rounded-xl"
            src={`${video}&parent=${parent}`}
            onLoad={() => {
              console.log('loaded')
              setLoaded(true)
            }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {!loaded && <Skeleton />}
    </>
  )
}
