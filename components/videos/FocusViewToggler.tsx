import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React, { Dispatch, SetStateAction } from "react"

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
          <ArrowsPointingOutIcon
            className={classNames(
              size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
              size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
              size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
              size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
            )}
          />
        </button>
      ) : (
        <button title="Turn focus view off" className="transition hover:opacity-80" onClick={() => setFocused(true)}>
          <ArrowsPointingInIcon
            className={classNames(
              size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
              size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
              size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
              size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
            )}
          />
        </button>
      )}
    </div>
  )
}
