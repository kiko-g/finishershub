import classNames from "classnames"
import React from "react"

type Props = {
  className?: string
  rounded?: boolean
}

export function VideoSkeleton({ className, rounded }: Props) {
  return (
    <div
      className={classNames(
        "flex h-64 flex-1 items-center justify-center self-stretch border-primary/50 bg-primary/10 py-16 dark:border-secondary/50 dark:bg-secondary/10 lg:h-96",
        rounded && "rounded",
        className,
      )}
    >
      <svg
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="-ml-1 mr-3 h-12 w-12 animate-spin text-primary dark:text-secondary"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
          3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
}
