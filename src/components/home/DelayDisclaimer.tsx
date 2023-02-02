import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

const DelayDisclaimer = ({}: Props) => {
  return (
    <div
      className="flex flex-wrap items-center justify-between rounded border-2 
      border-primary/90 bg-primary/75 p-2 text-light dark:border-light/10 dark:bg-primary lg:p-4"
    >
      <div className="flex items-center justify-center">
        <InformationCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
        <p className="ml-3 flex-1 font-normal tracking-tight lg:font-medium lg:tracking-normal">
          <span>Loading stage takes some time if you haven't been on the website recently.</span>
        </p>
      </div>
    </div>
  )
}

export default DelayDisclaimer
