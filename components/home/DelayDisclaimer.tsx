import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function DelayDisclaimer({}: Props) {
  return (
    <div
      className="mt-2 flex w-full flex-wrap items-center justify-between rounded border-2 
      border-blue-500/90 bg-blue-500/80 px-3 py-2 text-light dark:border-blue-500/40 
      dark:bg-blue-500/40 lg:px-4 lg:py-3"
    >
      <div className="flex items-center justify-center">
        <InformationCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
        <p className="ml-3 flex-1 font-normal tracking-tight lg:font-medium lg:tracking-normal">
          <span>
            Loading stage takes some time if you haven&apos;t been on the website recently.
          </span>
        </p>
      </div>
    </div>
  )
}
