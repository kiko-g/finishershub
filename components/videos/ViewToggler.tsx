import React, { Dispatch, SetStateAction } from "react"
import { Bars3Icon, Bars4Icon } from "@heroicons/react/24/outline"
import { getButtonSizeClassNames } from "@/utils"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function ViewToggler({ hook, size = "sm" }: Props) {
  const [type, setType] = hook

  return (
    <button
      title={type ? "Switch to 3x3 view" : "Switch to 2x2 view"}
      onClick={() => setType((autoplay) => !autoplay)}
      className="inline-flex items-center justify-center gap-x-1 rounded border border-primary bg-primary/70 px-1.5 py-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary dark:bg-primary/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      {type ? (
        <Bars3Icon className={getButtonSizeClassNames(size)} />
      ) : (
        <Bars4Icon className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
