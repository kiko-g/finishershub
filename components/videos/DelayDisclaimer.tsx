import React, { useEffect } from "react"
import classNames from "classnames"
import { XMarkIcon } from "@heroicons/react/24/outline"
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"

type ToastType = "success" | "error" | "warning" | "info" | ""

type Props = {
  type?: ToastType
}

export function DelayDisclaimer({ type }: Props) {
  const [shown, setShown] = React.useState(true)

  return shown ? (
    <div
      className={classNames(
        `flex w-full flex-wrap items-center justify-between rounded border 
        px-3 py-2 text-light lg:px-3 lg:py-1.5`,
        type === "info" ? `border-cyan-600/90 bg-cyan-600/80 dark:border-cyan-500/40 dark:bg-cyan-500/40` : ``,
        type === "error" ? `border-rose-600/90 bg-rose-600/80 dark:border-rose-500/40 dark:bg-rose-500/40` : ``,
        type === "warning" ? `border-amber-600/90 bg-amber-600/80 dark:border-amber-500/40 dark:bg-amber-500/40` : ``,
        type === "success" ? `border-teal-600/90 bg-teal-600/80 dark:border-teal-500/40 dark:bg-teal-500/40` : ``,
        type === undefined || type === ""
          ? `border-primary/90 bg-primary/80 dark:border-secondary/40 dark:bg-secondary/40`
          : ``,
      )}
    >
      <div className="flex w-full items-center justify-between">
        {/* Icon */}
        {type === "success" ? (
          <CheckBadgeIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        ) : type === "error" ? (
          <ExclamationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        ) : type === "warning" ? (
          <ExclamationTriangleIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        ) : (
          <InformationCircleIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
        )}

        {/* Text */}
        <p className="ml-3 flex-1 text-sm font-normal tracking-tight lg:font-normal lg:tracking-normal">
          {type === "success" ? (
            <span>All clips fetched.</span>
          ) : type === "error" ? (
            <span>There has been an error in fetching clips. Please reload your page and try again.</span>
          ) : type === "warning" ? (
            <span>
              Fetching clips... Loading stage takes some time if you haven&apos;t been on the website recently or if the
              results are not cached.
            </span>
          ) : (
            <span>Loading stage takes some time if you haven&apos;t been on the website recently.</span>
          )}
        </p>

        <button className="rounded transition hover:bg-white/25" onClick={() => setShown(false)}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  ) : null
}
