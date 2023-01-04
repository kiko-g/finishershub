import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

const DelayDisclaimer = ({}: Props) => {
  return (
    <div
      className="flex flex-wrap items-center justify-between rounded border-2 
      border-primary/90 bg-primary/75 p-4 text-light dark:border-light/10 dark:bg-primary"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 font-medium">
            <span>Loading stage takes some time if you haven't been on the website recently.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DelayDisclaimer
