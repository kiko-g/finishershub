import React from 'react'
import { CakeIcon } from '@heroicons/react/24/outline'
import FinisherInfoModal from './FinisherInfoModal'

type Props = {
  count: number
}

const TotalFinishersDisclaimer = ({ count }: Props) => {
  const customElement = (
    <span className="inline-flex whitespace-nowrap underline hover:opacity-90">valid finishers</span>
  )

  return (
    <div
      className="mx-auto my-4 flex flex-wrap items-center justify-between rounded border-2 
    border-secondary/90 bg-secondary/90 p-4 text-light dark:border-light/10 dark:bg-secondary"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <CakeIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 inline-flex flex-wrap items-start justify-start gap-x-1 font-medium">
            Total <FinisherInfoModal custom={customElement} /> by all member across all arenas: <strong>{count}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default TotalFinishersDisclaimer
