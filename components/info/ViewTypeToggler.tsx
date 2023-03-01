import React, { Dispatch, SetStateAction } from 'react'
import { TableCellsIcon, Squares2X2Icon } from '@heroicons/react/24/outline'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function ViewTypeToggler({ hook }: Props) {
  const [type, setType] = hook

  return (
    <div className="hidden items-end justify-center space-x-2 text-gray-700 dark:text-light lg:flex">
      {type ? (
        <button
          title="Switch to table view"
          className="transition hover:opacity-80"
          onClick={() => setType(false)}
        >
          <TableCellsIcon className="h-7 w-7 lg:h-8 lg:w-8" />
        </button>
      ) : (
        <button
          title="Switch to grid view"
          className="transition hover:opacity-80"
          onClick={() => setType(true)}
        >
          <Squares2X2Icon className="h-7 w-7 lg:h-8 lg:w-8" />
        </button>
      )}
    </div>
  )
}
