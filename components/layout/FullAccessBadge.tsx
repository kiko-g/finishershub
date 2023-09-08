import React from "react"
import { CheckBadgeIcon } from "@heroicons/react/24/outline"

export function FullAccessBadge() {
  const [folded, setFolded] = React.useState<boolean>(true)

  return (
    <button
      onClick={() => setFolded(!folded)}
      className="flex items-center justify-center gap-x-1 rounded border border-teal-600/80 bg-teal-600/50 px-3 py-2 text-white transition-all hover:bg-teal-600 lg:px-2 lg:py-1.5"
    >
      <CheckBadgeIcon className="h-5 w-5" />
      {folded ? null : <span className="whitespace-nowrap text-sm font-normal tracking-tighter">Full Access</span>}
    </button>
  )
}
