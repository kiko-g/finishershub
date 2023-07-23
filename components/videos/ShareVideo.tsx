import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import type { VideoType } from '../../@types'
import { getVideoUrlFromVideo } from '../../utils'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'

type Props = {
  video: VideoType
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function ShareVideo({ video, size = 'sm' }: Props) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = React.useState<string>('')

  const handleCopied = useCallback(() => {
    setCopied(!copied)
    navigator.clipboard.writeText(url)
  }, [copied, url])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 67) handleCopied() // C key
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleCopied])

  React.useEffect(() => {
    if (!video) return

    const videoUrl = getVideoUrlFromVideo(video)
    setUrl(videoUrl)
  }, [video])

  useEffect(() => {
    if (copied)
      setTimeout(() => {
        setCopied(!copied)
      }, 3000)
  }, [copied, setCopied])

  return (
    <button
      onClick={handleCopied}
      title="Copy video link (or press C)"
      className={classNames('transition hover:opacity-80', copied ? 'text-emerald-500' : '')}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon
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
        <ClipboardIcon
          fillRule="evenodd"
          strokeWidth="1.5"
          className={classNames(
            size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
            size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
            size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
            size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
          )}
        />
      )}
    </button>
  )
}
