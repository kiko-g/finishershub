import React, { Dispatch, SetStateAction, useState } from "react"
import { getButtonSizeClassNames } from "../../utils"
import { SpinnerIcon } from "../icons/SpinnerIcon"
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"

type Props = {
  shuffle: Function
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function ReshuffleButton({ shuffle, hook, size = "sm" }: Props) {
  const [shuffled, setShuffled] = hook
  const [shuffling, setShuffling] = useState(false)

  const shuffleAction = () => {
    shuffle()
    setShuffling(true)
    setTimeout(() => setShuffling(false), 1000)
  }

  return (
    <button
      title="Reshuffle all videos"
      disabled={shuffling}
      onClick={shuffleAction}
      className="inline-flex items-center justify-center gap-x-1 rounded border border-primary bg-primary/70 px-1.5 py-1.5 text-center text-xs text-white transition enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:bg-black/60 dark:border-primary dark:bg-primary/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      <span className="hidden tracking-tighter lg:inline-flex">Reshuffle</span>
      {shuffling ? (
        <SpinnerIcon
          className={classNames(
            getButtonSizeClassNames(size),
            "animate-spin fill-rose-600 text-gray-300 dark:fill-white dark:text-gray-500",
          )}
        />
      ) : (
        <ArrowPathRoundedSquareIcon className={classNames(getButtonSizeClassNames(size))} />
      )}
    </button>
  )
}
