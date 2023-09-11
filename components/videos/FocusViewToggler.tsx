import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React, { Dispatch, SetStateAction } from "react"
import { getButtonSizeClassNames } from "../../utils"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "sm" | "md" | "lg" | "xl"
}

export function FocusViewToggler({ hook, size = "sm" }: Props) {
  const [unfocused, setFocused] = hook

  return (
    <div className="flex items-end justify-center space-x-2">
      {unfocused ? (
        <button title="Turn focus view on" className="transition hover:opacity-80" onClick={() => setFocused(false)}>
          <ArrowsPointingOutIcon className={getButtonSizeClassNames(size)} />
        </button>
      ) : (
        <button title="Turn focus view off" className="transition hover:opacity-80" onClick={() => setFocused(true)}>
          <ArrowsPointingInIcon className={getButtonSizeClassNames(size)} />
        </button>
      )}
    </div>
  )
}
