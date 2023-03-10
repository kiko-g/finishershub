import React, { Dispatch, Fragment, SetStateAction, useMemo } from 'react'
import classNames from 'classnames'
import { CatalogueItem as CatalogueItemType } from '../../@types'
import { BoltIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  item: CatalogueItemType
  chosen: string | null
  setChosen: Dispatch<SetStateAction<string | null>>
}

export default function CatalogueItem({ item, chosen, setChosen }: Props) {
  const uncertainty = item.accurate === 'Yes' ? 0.1 : item.accurate === 'Almost' ? 0.2 : 0.4
  const isChosen = useMemo(() => chosen === item.name, [chosen, item.name])
  const speedText =
    Number(item.ttrk) < 2.3
      ? 'Ultra'
      : Number(item.ttrk) < 2.8
      ? 'Fast'
      : Number(item.ttrk) < 3
      ? 'Ok'
      : 'Slow'

  const exitFocus = () => setChosen(null)

  return (
    <>
      {/* Card View */}
      <div
        onClick={() => setChosen(isChosen ? null : item.name)}
        className={classNames(
          'flex cursor-pointer items-center justify-center gap-x-3 rounded border p-3',
          isChosen
            ? 'border-pink-600 bg-rose-600/10 hover:bg-rose-600/5 dark:bg-pink-600/40 dark:hover:bg-pink-600/25'
            : 'border-gray-300 bg-white hover:border-primary hover:bg-primary/10 dark:border-secondary/20 dark:bg-secondary/10 dark:hover:border-secondary dark:hover:bg-secondary/20'
        )}
      >
        <div className="aspect-square h-32 rounded bg-gradient-to-br from-slate-400 to-slate-500  dark:from-blue-500 dark:to-blue-600"></div>
        <div className="flex h-full w-full flex-col justify-between">
          {/* Top */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex w-full items-center justify-between gap-x-2">
              <p className="font-lexend font-light tracking-tight">{item.name}</p>
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

            <p className="font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
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

      {/* Focused View */}
      <Transition appear show={isChosen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={exitFocus}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 dark:bg-black/25" />
          </Transition.Child>

          <div className="fixed right-0 top-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex h-screen w-full transform flex-col justify-between gap-4 overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-navy md:max-w-md">
                  <div className="flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-800 dark:text-white"
                    >
                      {item.name}
                    </Dialog.Title>

                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      Source of finishing move: <strong>{item.source}</strong>
                    </p>

                    <div className="mt-2 h-48 w-full rounded bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600  dark:from-pink-500 dark:via-pink-600 dark:to-pink-700"></div>

                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <div
                        className={classNames(
                          'flex items-center gap-2 py-2 px-3 text-sm font-light text-white',
                          item.accurate === 'Yes'
                            ? 'bg-teal-500'
                            : item.accurate === 'Almost'
                            ? 'bg-amber-500'
                            : 'bg-rose-600'
                        )}
                      >
                        <span>Accuracy</span>
                        <BoltIcon className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span
                        className={classNames(
                          'flex items-center gap-2 py-2 px-3 text-sm font-light text-white',
                          item.unlocked === 'Yes'
                            ? 'bg-teal-500'
                            : item.unlocked === 'Almost'
                            ? 'bg-amber-500'
                            : 'bg-rose-600'
                        )}
                      >
                        <span>{item.unlocked === 'Yes' ? 'Unlocked' : 'Locked'}</span>
                        <LockClosedIcon className="h-3.5 w-3.5 text-white" />
                      </span>

                      <div
                        className={classNames(
                          'py-2 px-3 text-sm font-light text-white',
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
                      </div>

                      <div
                        className={classNames(
                          'bg-slate-700 py-2 px-3 text-sm font-light text-white dark:bg-slate-500'
                        )}
                      >
                        0/100
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Time to Register Kill
                      </h4>
                      <p className="mt-0.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                        The time between the first frame of the animation and the moment the kill is
                        registered. We use the final frame right as the kill register sound is
                        queued.
                      </p>
                      <p className="font-lexend mt-0.5 text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        {item.ttrk} ± {uncertainty}s
                      </p>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Time to Complete Animation
                      </h4>
                      <p className="mt-0.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                        The time between the first frame of the animation and the final frame, also
                        known has the moment when the player regains control.
                      </p>
                      <p className="font-lexend mt-0.5 text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        {item.ttca.toString() === '?' ? 'Unknown' : item.ttca}
                      </p>
                    </div>
                  </div>

                  {/*  Bottom */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center border border-transparent bg-pink-100 px-4 py-2 text-sm font-medium text-pink-900 hover:bg-pink-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                      onClick={exitFocus}
                    >
                      Roger that
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
