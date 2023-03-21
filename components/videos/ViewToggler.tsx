import React, { Dispatch, SetStateAction } from 'react'
import { Bars3Icon, Bars4Icon } from '@heroicons/react/24/outline'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function ViewToggler({ hook }: Props) {
  const [type, setType] = hook

  return (
    <div className="hidden items-end justify-center space-x-2 text-gray-700 dark:text-light lg:flex">
      {type ? (
        <button
          title="Switch to 3x3 view"
          className="transition hover:opacity-80"
          onClick={() => setType(false)}
        >
          <Bars3Icon className="h-6 w-6 lg:h-7 lg:w-7" />
        </button>
      ) : (
        <button
          title="Switch to 2x2 view"
          className="transition hover:opacity-80"
          onClick={() => setType(true)}
        >
          <Bars4Icon className="h-6 w-6 lg:h-7 lg:w-7" />
        </button>
      )}
    </div>
  )
}
