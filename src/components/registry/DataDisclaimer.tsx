import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

const DataDisclaimer = ({}: Props) => {
  return (
    <div
      className="mx-auto my-4 flex flex-wrap items-center justify-between rounded border-2 
      border-primary/90 bg-primary/75 p-4 text-light dark:border-light/10 dark:bg-primary"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 font-medium">
            <span>To change data you need to claim your identity.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DataDisclaimer
