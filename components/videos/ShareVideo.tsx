import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { getVideoUrlFromIndex } from '../../utils'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'

type Props = {
  index: number
  alt?: boolean
}

export default function ShareVideo({ index, alt }: Props) {
  const url = getVideoUrlFromIndex(index)
  const [copied, setCopied] = useState(false)
  const handleCopied = () => {
    setCopied(!copied)
    navigator.clipboard.writeText(url)
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
          className={classNames(alt ? `h-5 w-5 lg:h-6 lg:w-6` : `h-7 w-7 lg:h-8 lg:w-8`)}
        />
      ) : (
        <ClipboardIcon
          className={classNames(alt ? `h-5 w-5 lg:h-6 lg:w-6` : `h-7 w-7 lg:h-8 lg:w-8`)}
        />
      )}
    </button>
  )
}
