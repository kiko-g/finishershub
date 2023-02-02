import React from 'react'
import { clearCache } from '../../utils/storage'

type Props = {}

export default function DeleteCookiesButton({}: Props) {
  return (
    <div className="flex items-end justify-center space-x-2 text-rose-800 dark:text-rose-600">
      <button
        title="Clear all cookies (helps if page does not load)"
        className="transition hover:opacity-75"
        onClick={() => {
          clearCache()
          alert('Do you want to clear all cookies and reload the page?')

          if (typeof window !== 'undefined') {
            window.location.reload()
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 lg:h-8 lg:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>
  )
}
