import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/outline'

type Props = {}

const UsageDisclaimer = ({}: Props) => {
  return (
    <div
      className="hidden flex-wrap items-center justify-between rounded border-2 border-primary/90 
      bg-primary/75 px-4 py-3 text-light dark:border-light/10 dark:bg-dark lg:flex"
    >
      <div className="flex flex-1 items-start justify-between">
        <div className="flex">
          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
          <p className="ml-3 font-medium">
            <span>Tap the right arrow to draw a new random outstanding highlight and left one to go back.</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UsageDisclaimer
