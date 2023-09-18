import React, { Dispatch, SetStateAction } from "react"
import { getButtonSizeClassNames } from "@/utils"
import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  handler?: () => void
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function FocusViewToggler({ hook, handler, size = "sm" }: Props) {
  const [expanded, setExpanded] = hook

  return (
    <button
      title={expanded ? "Turn focus view off" : "Turn focus view on"}
      onClick={(prev) => {
        setExpanded(!prev)
        handler?.()
      }}
      className="transition hover:opacity-80"
    >
      {expanded ? (
        <ArrowsPointingInIcon className={getButtonSizeClassNames(size)} />
      ) : (
        <ArrowsPointingOutIcon className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
