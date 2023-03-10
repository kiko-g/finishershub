import React, { useRef, useState } from 'react'

type Props = {
  src: string
  play: boolean
  limitedAccess: boolean
}

export default function VideoPlayer({ src, play, limitedAccess }: Props) {
  const [muted, setMuted] = useState(limitedAccess)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="relative">
      <video
        ref={videoRef}
        controls={true}
        muted={muted}
        autoPlay={play}
        className="rounded shadow"
        onChange={() => console.log('change')}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
