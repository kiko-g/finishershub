import React, { Dispatch, SetStateAction } from "react"
import { ShuffleIcon } from "@/components/icons"
import { getButtonSizeClassNames } from "@/utils"
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function VideoOrderToggler({ hook, size = "sm" }: Props) {
  const [shuffle, setShuffle] = hook

  return (
    <button
      title={shuffle ? "Turn shuffle off" : "Turn shuffle on"}
      onClick={() => setShuffle((shuffle) => !shuffle)}
      className="inline-flex items-center justify-center gap-x-1.5 rounded border border-primary bg-primary/70 px-1.5 py-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary dark:bg-primary/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      <span className="hidden tracking-tighter lg:inline-flex">Order</span>
      {shuffle ? (
        <ShuffleIcon className={getButtonSizeClassNames(size)} />
      ) : (
        <ArrowsRightLeftIcon className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
