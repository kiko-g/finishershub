import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  video: string
  parent: string
}

export const TwitchVideoClip = ({ video, parent }: Props) => {
  return (
    <div className="h-full w-full rounded-xl shadow">
      <div className="relative h-full w-full">
        <iframe
          className="aspect-video w-full rounded-xl"
          src={`${video}&parent=${parent}`}
          onLoad={() => {}}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
