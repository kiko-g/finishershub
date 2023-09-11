import React from "react"
import { getButtonSizeClassNames } from "../../utils"
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline"

type Props = {
  nextVideo: () => void
  disabled: boolean
  size?: "sm" | "md" | "lg" | "xl"
}

export function NextVideo({ nextVideo, disabled, size = "sm" }: Props) {
  return (
    <button
      onClick={nextVideo}
      disabled={disabled}
      title="Go to the next highlight (or press the right arrow key)"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
    >
      <ChevronDoubleRightIcon className={getButtonSizeClassNames(size)} />
    </button>
  )
}
