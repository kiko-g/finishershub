import React from 'react'
import classNames from 'classnames'

type Props = {
  tall?: boolean
}

export default function Skeleton({ tall }: Props) {
  return (
    <div className="mx-auto w-full rounded-xl bg-lightest p-4 dark:bg-dark">
      <div className="flex animate-pulse space-x-4">
        <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-600" />

        <div className="flex-1 space-y-4 py-1">
          <div className="h-2 rounded bg-gray-300 dark:bg-gray-600" />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="col-span-1 h-2 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
            <div className="h-2 rounded bg-gray-300 dark:bg-gray-600" />
          </div>
          <div
            className={classNames(
              'w-full rounded bg-gray-300 dark:bg-gray-600',
              tall ? 'h-80' : 'h-44'
            )}
          />
        </div>
      </div>
    </div>
  )
}
