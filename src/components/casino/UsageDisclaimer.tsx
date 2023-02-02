import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function UsageDisclaimer({}: Props) {
  return (
    <div
      className="flex items-start justify-start rounded border-2 border-primary/90 bg-primary/75 px-3 
      py-2 text-sm text-light dark:border-light/10 dark:bg-primary lg:px-4 lg:py-3 lg:text-base"
    >
      <InformationCircleIcon className="inline-flex h-6 w-6 min-w-[1.25rem]" aria-hidden="true" />
      <p className="ml-3 font-normal">
        Tap the right arrow to get a <strong>new random highlight</strong> and use the left one to{' '}
        <strong>go back</strong>.
      </p>
    </div>
  )
}
