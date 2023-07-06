import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function FocusViewToggler({ hook }: Props) {
  const [unfocused, setFocused] = hook

  return (
    <div className="flex items-end justify-center space-x-2 text-gray-700 dark:text-light">
      {unfocused ? (
        <button
          title="Turn focus view on"
          className="transition hover:opacity-80"
          onClick={() => setFocused(false)}
        >
          <ArrowsPointingOutIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        </button>
      ) : (
        <button
          title="Turn focus view off"
          className="transition hover:opacity-80"
          onClick={() => setFocused(true)}
        >
          <ArrowsPointingInIcon className="h-6 w-6 lg:h-7 lg:w-7" />
        </button>
      )}
    </div>
  )
}
