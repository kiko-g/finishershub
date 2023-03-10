import React from 'react'

type Props = {
  index: number
  src: string
  play: boolean
  muted: boolean
}

export default function VideoPlayer({ index, src, play, muted }: Props) {
  return (
    <video
      loop
      controls
      muted={index === 0 || muted}
      autoPlay={index === 0 ? false : play}
      className="rounded shadow"
      key={`video-element-${index}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
