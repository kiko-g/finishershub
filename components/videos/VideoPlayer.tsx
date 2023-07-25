import classNames from 'classnames'
import type { VideoType } from '../../@types'
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react'
import { ShareVideo, PopOpenVideo, VideoSkeleton } from './'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

type Props = {
  video: VideoType
  autoplay?: boolean
  muted?: boolean
  special?: boolean
}

export default function VideoPlayer(props: Props) {
  const { video, autoplay = false, muted = true, special = false } = props

  const [mute, setMute] = useState(muted)
  const [slide, setSlide] = useState(false)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setSlide(true)
    setTimeout(() => {
      setSlide(false)
    }, 1000)
  }, [video.url])

  useEffect(() => {
    setMute((prev) => muted && prev)
  }, [muted])

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const handlePlay = () => setPlaying(true)
  const handlePause = () => setPlaying(false)

  return (
    <div
      className={classNames(
        'group relative z-20',
        special ? 'h-screen bg-black' : 'rounded bg-primary/50 dark:bg-secondary/50',
      )}
    >
      <div className={classNames(slide ? 'animate-pulse-500' : '')}>
        <video
          ref={videoRef}
          loop
          controls={false}
          muted={mute || muted}
          autoPlay={video.index === 0 ? false : autoplay}
          preload="auto"
          onClick={togglePlay}
          onPlay={handlePlay}
          onPause={handlePause}
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
              <PlayPauseVideo playing={playing} size="md" />
              {/* <ToggleMuteVideo hook={[mute, setMute]} defaultMute={muted} size="md" /> */}
              <ShareVideo video={video} size="md" />
              <PopOpenVideo video={video} size="md" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

type PlayPauseVideoProps = {
  playing: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

function PlayPauseVideo({ playing, size = 'sm' }: PlayPauseVideoProps) {
  return playing ? (
    <PlayIcon
      fillRule="evenodd"
      strokeWidth="1.5"
      className={classNames(
        size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
        size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
        size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
        size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
      )}
    />
  ) : (
    <PauseIcon
      fillRule="evenodd"
      strokeWidth="1.5"
      className={classNames(
        size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
        size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
        size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
        size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
      )}
    />
  )
}

type ToggleMuteVideoProps = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  defaultMute: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

function ToggleMuteVideo({ hook, defaultMute, size }: ToggleMuteVideoProps) {
  const [mute, setMute] = hook
  const handleMute = () => setMute(true)
  const handleUnmute = () => setMute(false)

  return mute ? (
    <button
      disabled={defaultMute}
      title="Turn default mute off (or press M)"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
      onClick={handleUnmute}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className={classNames(
          size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
          size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
          size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
          size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          clipRule="evenodd"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
        />
      </svg>
    </button>
  ) : (
    <button
      disabled={defaultMute}
      title="Turn default mute on"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
      onClick={handleMute}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        className={classNames(
          size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
          size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
          size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
          size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
        )}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
    </button>
  )
}
