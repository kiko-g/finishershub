import React from "react"
import { clearCache } from "../../utils/storage"
import { FireIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { getButtonSizeClassNames } from "../../utils"

type Props = {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function DeleteCookiesButton({ size = "sm" }: Props) {
  function deleteData() {
    if (typeof window === "undefined") return

    if (window.confirm("Clear all site data and reload the page?")) {
      clearCache()
      window.location.reload()
    }
  }

  return (
    <div className="flex items-end justify-center space-x-2">
      <button
        onClick={deleteData}
        title="Clear all cookies (helps if page does not load)"
        className="transition hover:opacity-80"
      >
        <FireIcon
          className={classNames(
            getButtonSizeClassNames(size),
            "fill-transparent text-orange-500 dark:fill-orange-500/10 dark:text-orange-500",
          )}
        />
      </button>
    </div>
  )
}
