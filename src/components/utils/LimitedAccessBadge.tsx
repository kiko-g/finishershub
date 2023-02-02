import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function LimitedAccessBadge({}: Props) {
  return (
    <div
      className="flex w-full items-center justify-center gap-x-1 rounded border-2 
    border-rose-800/50 bg-rose-800/50 px-3 py-2 text-white"
    >
      <ExclamationCircleIcon className="h-5 w-5" />
      <span className="whitespace-nowrap tracking-tighter">Limited Access</span>
    </div>
  )
}
