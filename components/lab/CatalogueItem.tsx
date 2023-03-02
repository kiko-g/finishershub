import React from 'react'
import classNames from 'classnames'
import { CatalogueItem as CatalogueItemType } from '../../@types'
import { BoltIcon, LockClosedIcon } from '@heroicons/react/24/solid'

type Props = {
  item: CatalogueItemType
}

export default function CatalogueItem({ item }: Props) {
  const speedText =
    Number(item.ttrk) < 2.3
      ? 'Ultra'
      : Number(item.ttrk) < 2.8
      ? 'Fast'
      : Number(item.ttrk) < 3
      ? 'Ok'
      : 'Slow'

  const uncertainty = item.accurate === 'Yes' ? 0.1 : item.accurate === 'Almost' ? 0.2 : 0.4

  return (
    <div className="flex items-center justify-center gap-x-3 rounded border border-gray-300 bg-white p-3 hover:border-primary hover:bg-primary/10 dark:border-secondary/20 dark:bg-secondary/10 dark:hover:border-secondary dark:hover:bg-secondary/20">
      <div className="aspect-square h-32 rounded bg-gradient-to-br from-slate-400 to-slate-500  dark:from-blue-500 dark:to-blue-600"></div>
      <div className="flex h-full w-full flex-col justify-between">
        {/* Top */}
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex w-full items-center justify-between gap-x-2">
            <p className="font-headings font-light tracking-tight">{item.name}</p>
            <div className="flex gap-x-1.5">
              <span
                className={classNames(
                  'rounded-full p-1',
                  item.accurate === 'Yes'
                    ? 'bg-teal-500'
                    : item.accurate === 'Almost'
                    ? 'bg-amber-500'
                    : 'bg-rose-600'
                )}
              >
                {<BoltIcon className="h-3.5 w-3.5 text-white" />}
              </span>
              <span
                className={classNames(
                  'rounded-full p-1',
                  item.unlocked === 'Yes'
                    ? 'bg-teal-500'
                    : item.unlocked === 'Almost'
                    ? 'bg-amber-500'
                    : 'bg-rose-600'
                )}
              >
                {<LockClosedIcon className="h-3.5 w-3.5 text-white" />}
              </span>
            </div>
          </div>

          <p className="-mt-0.5 text-sm font-light tracking-tight text-gray-500 dark:text-gray-400">
            {item.source}
          </p>

          <p className="font-headings text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
            {item.ttrk} ± {uncertainty}s
          </p>
        </div>

        {/* Bottom */}
        <div className="flex flex-row gap-x-2">
          <span
            className={classNames(
              'py-1 px-2 text-sm font-normal text-white',
              speedText === 'Ultra'
                ? 'bg-blue-600'
                : speedText === 'Fast'
                ? 'bg-teal-500'
                : speedText === 'Ok'
                ? 'bg-amber-500'
                : 'bg-rose-600'
            )}
          >
            {speedText}
          </span>

          <span
            className={classNames(
              'bg-slate-700 py-1 px-2 text-sm font-normal text-white dark:bg-slate-500'
            )}
          >
            0/100
          </span>
        </div>
      </div>
    </div>
  )
}
