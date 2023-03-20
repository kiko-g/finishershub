import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import type { VideoType } from '../../@types'
import { getVideoUrlFromVideo } from '../../utils'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'

type Props = {
  video: VideoType
  alt?: boolean
}

export default function ShareVideo({ video, alt }: Props) {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = React.useState<string>('')

  const handleCopied = () => {
    setCopied(!copied)
    navigator.clipboard.writeText(url)
  }

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
      className={classNames(
        `transition`,
        copied
          ? `text-emerald-500`
          : alt
          ? `text-white hover:opacity-80 dark:text-white`
          : `text-gray-700 hover:opacity-80 dark:text-white`
      )}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon
          fillRule="evenodd"
          className={classNames(alt ? `h-7 w-7 lg:h-8 lg:w-8` : `h-5 w-5 lg:h-6 lg:w-6`)}
        />
      ) : (
        <ClipboardIcon
          className={classNames(alt ? `h-7 w-7 lg:h-8 lg:w-8` : `h-5 w-5 lg:h-6 lg:w-6`)}
        />
      )}
    </button>
  )
}
