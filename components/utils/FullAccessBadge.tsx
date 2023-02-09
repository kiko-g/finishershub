import React from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

type Props = {}

export default function FullAccessBadge({}: Props) {
  return (
    <div
      className="flex w-full items-center justify-center gap-x-1 rounded border-2 
    border-teal-600/80 bg-teal-600/50 px-3 py-2 text-white"
    >
      <CheckCircleIcon className="h-5 w-5" />
      <span className="whitespace-nowrap tracking-tighter">Full Access</span>
    </div>
  )
}
