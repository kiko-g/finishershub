import React from "react"
import { clearCache } from "../../utils/storage"
import { FireIcon } from "@heroicons/react/24/outline"

export function DeleteCookiesButton() {
  function deleteData() {
    if (typeof window === "undefined") return

    if (window.confirm("Clear all site data and reload the page?")) {
      clearCache()
      window.location.reload()
    }
  }

  return (
    <div className="flex items-end justify-center space-x-2 text-orange-500 dark:text-orange-500">
      <button
        onClick={deleteData}
        title="Clear all cookies (helps if page does not load)"
        className="transition hover:opacity-80"
      >
        <FireIcon className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
    </div>
  )
}
