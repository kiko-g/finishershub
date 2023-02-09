import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function UsageDisclaimer({}: Props) {
  return (
    <div
      className="flex w-full flex-wrap items-center justify-between rounded border-2 
      border-blue-500/90 bg-blue-500/80 px-3 py-2 text-light dark:border-blue-500/40 
      dark:bg-blue-500/40 lg:px-4 lg:py-3"
    >
      <div className="flex items-center justify-center">
        <InformationCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
        <p className="ml-2 flex-1 font-normal tracking-tighter lg:ml-3 lg:font-medium lg:tracking-normal">
          Tap the right arrow to get a <strong>new random highlight</strong> and use the left one to{' '}
          <strong>go back</strong>.
        </p>
      </div>
    </div>
  )
}
