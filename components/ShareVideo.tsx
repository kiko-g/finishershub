import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { ClipboardDocumentCheckIcon, ClipboardIcon, ShareIcon } from '@heroicons/react/24/outline'

type Props = {
  index: number
}

export default function ShareVideo({ index }: Props) {
  const [copied, setCopied] = useState(false)
  const handleCopied = () => {
    setCopied(!copied)
    navigator.clipboard.writeText(`https://finishershub.vercel.app/video/${index}`)
  }

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
        `transition hover:opacity-80`,
        copied ? `text-rose-500` : `text-primary dark:text-secondary`
      )}
    >
      {copied ? (
        <ClipboardDocumentCheckIcon className="h-7 w-7 lg:h-8 lg:w-8" />
      ) : (
        <ClipboardIcon className="h-7 w-7 lg:h-8 lg:w-8" />
      )}
    </button>
  )
}
