import React from 'react'
import { CakeIcon } from '@heroicons/react/outline'

type Props = {
  count: number
}

const TotalFinishersDisclaimer = ({ count }: Props) => {
  return (
    <div
      className="mx-auto my-4 flex flex-wrap items-center justify-between rounded border-2 
    border-secondary/90 bg-secondary/75 p-4 text-light dark:border-light/10 dark:bg-secondary"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <CakeIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 font-medium">
            Total finishers by all member across all arenas: <strong>{count}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalFinishersDisclaimer
