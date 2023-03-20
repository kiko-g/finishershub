import React from 'react'
import useAccessDenied from '../../hooks/useAccessDenied'
import VideoPlayer from './VideoPlayer'
import { VideoType } from '../../@types'
import { AccessModal, InvisbleTopLayer } from '../layout'

type Props = {
  video: VideoType
}

export default function SingleVideoShowcase({ video }: Props) {
  const [accessDenied, setAccessDenied] = useAccessDenied()

  return (
    <section className="flex flex-col gap-y-4 md:gap-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="rounded border border-blue-600 bg-blue-600/50 px-4 py-2 text-sm uppercase text-white">
            {video.game}
          </div>
          {accessDenied ? (
            <AccessModal lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
          ) : null}
        </div>
        <div className="rounded border border-violet-500 bg-violet-500/50 px-4 py-2 text-sm text-white">
          {new Date(video.date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>

      <div className="relative">
        <VideoPlayer video={video} muted={true} play={true} />
        {accessDenied ? <InvisbleTopLayer /> : null}
      </div>
    </section>
  )
}
