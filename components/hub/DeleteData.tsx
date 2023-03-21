import React from 'react'
import { clearCache } from '../../utils/storage'
import { TrashIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function DeleteData({}: Props) {
  const deleteData = () => {
    clearCache()
    alert('Do you want to clear all cookies and reload the page?')

    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  return (
    <button
      onClick={deleteData}
      title="Clear all site data"
      className="flex w-min items-center justify-start gap-2 rounded border border-rose-700 bg-rose-700/60 py-4 px-5 text-white transition hover:bg-rose-700"
    >
      <TrashIcon className="h-5 w-5 md:h-6 md:w-6" />
      <span className="whitespace-nowrap">Clear all site data</span>
    </button>
  )
}
