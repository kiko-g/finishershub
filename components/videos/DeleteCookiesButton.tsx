import React from 'react'
import { clearCache } from '../../utils/storage'
import { FireIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function DeleteCookiesButton({}: Props) {
  return (
    <div className="flex items-end justify-center space-x-2 text-orange-500 dark:text-orange-400">
      <button
        title="Clear all cookies (helps if page does not load)"
        className="transition hover:opacity-80"
        onClick={() => {
          clearCache()
          alert('Do you want to clear all cookies and reload the page?')

          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }}
      >
        <FireIcon className="h-6 w-6 lg:h-7 lg:w-7" />
      </button>
    </div>
  )
}
