import React from "react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import { AccessModal } from "./AccessModal"
import useAccessDenied from "../../hooks/useAccessDenied"

export function LimitedAccessBadge() {
  const [folded, setFolded] = React.useState<boolean>(true)
  const [locked, setLocked] = useAccessDenied()

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setFolded(!folded)}
        className="flex items-center justify-center gap-x-1 rounded border border-amber-600 bg-amber-600/70 px-3 py-2 text-white transition-all hover:bg-amber-600 lg:px-2 lg:py-1.5"
      >
        <ExclamationTriangleIcon className="h-5 w-5" />
        {folded ? null : <span className="whitespace-nowrap text-sm font-normal tracking-tighter">Limited Access</span>}
      </button>

      {folded ? null : <AccessModal lockedHook={[locked, setLocked]} startOpen={false} />}
    </div>
  )
}
