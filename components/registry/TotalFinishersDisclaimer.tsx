import React from "react"
import { CakeIcon, XMarkIcon } from "@heroicons/react/24/outline"
import FinisherInfoModal from "./FinisherInfoModal"

type Props = {
  count: number
}

export default function TotalFinishersDisclaimer({ count }: Props) {
  const [shown, setShown] = React.useState(true)

  const customElement = (
    <span className="inline-flex whitespace-nowrap underline hover:opacity-90">valid finishers</span>
  )

  return shown ? (
    <div className="flex w-full flex-wrap items-center justify-between rounded border border-cyan-600/70 bg-cyan-600/60 px-3 py-2 text-light dark:border-cyan-600/60 dark:bg-cyan-600/50 lg:px-3 lg:py-2">
      <div className="flex w-full flex-1 items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <CakeIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />

          <p className="ml-3 inline-flex flex-1 flex-wrap gap-x-1 text-sm font-normal tracking-tight lg:font-normal lg:tracking-normal">
            Total <FinisherInfoModal custom={customElement} /> by all member across all arenas: <strong>{count}</strong>
          </p>

          <button className="rounded transition hover:bg-white/25" onClick={() => setShown(false)}>
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  ) : null
}
