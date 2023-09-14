import React from "react"
import { getButtonSizeClassNames } from "../../utils"
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/outline"

type Props = {
  prevVideo: () => void
  disabled: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function PreviousVideo({ prevVideo, disabled, size = "sm" }: Props) {
  return (
    <button
      onClick={prevVideo}
      disabled={disabled}
      title="Go to the previous highlight (or press the left arrow key)"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
    >
      <ChevronDoubleLeftIcon className={getButtonSizeClassNames(size)} />
    </button>
  )
}
