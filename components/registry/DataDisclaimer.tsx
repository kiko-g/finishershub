import React from 'react'
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function DataDisclaimer({}: Props) {
  const [shown, setShown] = React.useState(true)

  return shown ? (
    <div className="flex w-full flex-wrap items-center justify-between rounded border border-primary/90 bg-primary/80 px-3 py-2 text-light dark:border-secondary/40 dark:bg-secondary/40 lg:px-3 lg:py-2">
      <div className="flex w-full items-center justify-between">
        <InformationCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />

        <p className="ml-3 flex-1 text-sm font-normal tracking-tight lg:font-normal lg:tracking-normal">
          <span>If you are a member, prove your identity to update your profile.</span>
        </p>

        <button className="rounded transition hover:bg-white/25" onClick={() => setShown(false)}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  ) : null
}
