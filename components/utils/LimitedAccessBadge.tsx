import React from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

type Props = {}

export default function LimitedAccessBadge({}: Props) {
  return (
    <div
      className="flex w-full items-center justify-center gap-x-1 rounded border-2 
    border-amber-600/60 bg-amber-600/60 px-3 py-2 text-white"
    >
      <ExclamationTriangleIcon className="h-5 w-5" />
      <span className="whitespace-nowrap tracking-tighter">Limited Access</span>
    </div>
  )
}
