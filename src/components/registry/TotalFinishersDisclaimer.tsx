import React from 'react'
import { CakeIcon } from '@heroicons/react/24/outline'
import FinisherInfoModal from './FinisherInfoModal'

type Props = {
  count: number
}

export default function TotalFinishersDisclaimer({ count }: Props) {
  const customElement = (
    <span className="inline-flex whitespace-nowrap underline hover:opacity-90">valid finishers</span>
  )

  return (
    <div
      className="flex w-full flex-wrap items-center justify-between rounded border-2 border-teal-700/90
    bg-teal-700/80 px-3 py-2 tracking-tight text-light dark:border-light/10 dark:bg-teal-600/60 lg:px-4 lg:py-3"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <CakeIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-2 inline-flex flex-wrap items-start justify-start gap-x-1 font-medium lg:ml-3">
            Total <FinisherInfoModal custom={customElement} /> by all member across all arenas: <strong>{count}</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
