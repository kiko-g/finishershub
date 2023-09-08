import React from "react"
import { clearCache } from "../../utils/storage"
import { TrashIcon } from "@heroicons/react/24/outline"

export function DeleteData() {
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
      title="Clear all site data"
      className="flex w-min items-center justify-start gap-2 rounded border border-rose-700 bg-rose-700/60 px-5 py-4 text-white transition hover:bg-rose-700"
    >
      <TrashIcon className="h-5 w-5 md:h-6 md:w-6" />
      <span className="whitespace-nowrap">Clear all site data</span>
    </button>
  )
}
