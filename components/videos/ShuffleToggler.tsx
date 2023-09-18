import React, { Dispatch, SetStateAction } from "react"
import { ShuffleIcon } from "@/components/icons"
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export function ShuffleToggler({ hook }: Props) {
  const [isShuffled, setIsShuffled] = hook

  return (
    <div className="hidden items-end justify-center space-x-2 text-gray-700 dark:text-light lg:flex">
      {isShuffled ? (
        <button title="Switch to 3x3 view" className="transition hover:opacity-80" onClick={() => setIsShuffled(false)}>
          <ShuffleIcon className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      ) : (
        <button title="Switch to 2x2 view" className="transition hover:opacity-80" onClick={() => setIsShuffled(true)}>
          <ArrowsRightLeftIcon className="h-5 w-5 lg:h-6 lg:w-6" />
        </button>
      )}
    </div>
  )
}
