import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

type Props = {}

export const DelayDisclaimer = ({}: Props) => {
  return (
    <div
      className="mx-auto my-4 flex flex-wrap items-center justify-between rounded border-2 
      border-primary/25 bg-primary/20 p-4 dark:border-light/10 dark:bg-dark"
    >
      <div className="flex flex-1 items-center justify-between">
        <div className="flex">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 truncate font-medium">
            <span>Expect some delay on the requests!</span>
          </p>
        </div>
      </div>
    </div>
  )
}
