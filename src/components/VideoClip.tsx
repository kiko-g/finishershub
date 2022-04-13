import React from 'react'

type VideoClipProps = {
  video: string
}

export const VideoClip = ({ video }: VideoClipProps) => {
  return (
    <div className="h-full w-full rounded-xl shadow">
      <div className="relative h-full w-full">
        <iframe allowFullScreen className="aspect-video w-full rounded-xl" src={`${video}&parent=localhost`}></iframe>
      </div>
    </div>
  )
}
