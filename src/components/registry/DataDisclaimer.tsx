import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

const DataDisclaimer = ({}: Props) => {
  return (
    <div
      className="mx-auto my-4 flex flex-wrap items-center justify-between rounded border-2 
      border-blue-500/90 bg-blue-500/80 p-4 text-light dark:border-blue-500/40 dark:bg-blue-500/40"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 font-medium">
            <span>If you are a member, prove your identity to update your profile.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DataDisclaimer
