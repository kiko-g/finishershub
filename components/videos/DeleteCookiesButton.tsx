import React from "react"
import classNames from "classnames"
import { clearCache } from "../../utils/storage"
import { FireIcon } from "@heroicons/react/24/outline"
import { getButtonSizeClassNames } from "../../utils"

type Props = {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export function DeleteCookiesButton({ size = "xs" }: Props) {
  function deleteData() {
    if (typeof window === "undefined") return

    if (window.confirm("Clear all site data and reload the page?")) {
      clearCache()
      window.location.reload()
    }
  }

  return (
    <button
      onClick={deleteData}
      title="Clear all cookies and local storage"
      className="inline-flex items-center justify-center gap-x-1 self-stretch rounded border border-orange-500 bg-orange-500/70 px-1.5 py-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-orange-500 dark:bg-orange-500/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      <FireIcon className={classNames(getButtonSizeClassNames(size))} />
    </button>
  )
}
