import React, { Dispatch, SetStateAction } from "react"
import { getButtonSizeClassNames } from "../../utils"
import { PlayCircleIcon as PlayCircleIconSolid } from "@heroicons/react/24/solid"
import { PlayCircleIcon as PlayCircleIconOutline } from "@heroicons/react/24/outline"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function AutoplayToggler({ hook, size = "sm" }: Props) {
  const [autoplay, setAutoplay] = hook

  return (
    <button
      title={autoplay ? "Turn autoplay off" : "Turn autoplay on"}
      onClick={() => setAutoplay((autoplay) => !autoplay)}
      className="inline-flex items-center justify-center gap-x-1 rounded border border-primary bg-primary/70 px-1.5 py-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary dark:bg-primary/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      <span className="hidden tracking-tighter lg:inline-flex">Autoplay</span>
      {autoplay ? (
        <PlayCircleIconSolid className={getButtonSizeClassNames(size)} />
      ) : (
        <PlayCircleIconOutline className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
