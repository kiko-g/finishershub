import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function DataDisclaimer({}: Props) {
  return (
    <div
      className="flex w-full flex-wrap items-center justify-between rounded border-2 
      border-primary/90 bg-primary/80 px-3 py-2 text-light dark:border-secondary/40 
      dark:bg-secondary/40 lg:px-4 lg:py-3"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-2 font-medium lg:ml-3">
            <span>If you are a member, prove your identity to update your profile.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
