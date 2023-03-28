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

  const motionText =
    Number(item.motion) === 1
      ? 'A'
      : Number(item.motion) === 2
      ? 'B'
      : Number(item.motion) === 3
      ? 'C'
      : Number(item.motion) === 4
      ? 'D'
      : 'E'

  const radiusText =
    Number(item.radius) === 1
      ? 'A'
      : Number(item.radius) === 2
      ? 'B'
      : Number(item.radius) === 3
      ? 'C'
      : Number(item.radius) === 4
      ? 'D'
      : 'E'

  const exitFocus = () => setChosen(null)

  return (
    <>
      {/* Card View */}
      <div
        onClick={() => setChosen(isChosen ? null : item.name)}
        className={classNames(
          'flex cursor-pointer items-start justify-center gap-x-3 rounded border p-3',
          isChosen
            ? 'border-pink-600 bg-rose-600/10 hover:bg-rose-600/5 dark:bg-pink-600/40 dark:hover:bg-pink-600/25'
            : 'border-gray-300 bg-white hover:border-primary hover:bg-primary/10 dark:border-secondary/20 dark:bg-secondary/10 dark:hover:border-secondary dark:hover:bg-secondary/20'
        )}
      >
        <div className="flex aspect-square h-32 rounded bg-gradient-to-br from-slate-400 to-slate-500 dark:from-blue-500 dark:to-blue-600" />

        <section className="flex w-full items-start justify-between">
          {/* Left */}
          <div className="flex h-32 w-full flex-col justify-between">
            {/* Top */}
            <div className="flex flex-col">
              {/* Header */}
              <p className="font-lexend font-light tracking-tight">{item.name}</p>

              <p className="-mt-0.5 text-sm font-light tracking-tight text-gray-500 dark:text-gray-400">
                {item.source}
              </p>
            </div>

            {/* Bottom */}
            <div className="flex flex-col gap-1">
              <p className="font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                {item.ttrk} ± {uncertainty}s
              </p>

              <div className="flex gap-2">
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

                <span className="bg-slate-700 py-1 px-2 text-sm font-normal text-white dark:bg-slate-500">
                  {item.score}/100
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <span
              className={classNames(
                'flex h-5 w-5 items-center justify-center rounded-full p-[0.2rem] lg:h-6 lg:w-6',
                radiusText === 'A'
                  ? 'bg-blue-500'
                  : radiusText === 'B'
                  ? 'bg-teal-500'
                  : radiusText === 'C'
                  ? 'bg-amber-500'
                  : radiusText === 'D'
                  ? 'bg-orange-500'
                  : 'bg-rose-600'
              )}
            >
              <span className="h-4 w-4 text-center text-xs font-normal text-white">
                {radiusText}
              </span>
            </span>
            <span
              className={classNames(
                'flex h-5 w-5 items-center justify-center rounded-full p-[0.2rem] lg:h-6 lg:w-6',
                motionText === 'A'
                  ? 'bg-blue-500'
                  : motionText === 'B'
                  ? 'bg-teal-500'
                  : motionText === 'C'
                  ? 'bg-amber-500'
                  : motionText === 'D'
                  ? 'bg-orange-500'
                  : 'bg-rose-600'
              )}
            >
              <span className="h-4 w-4 text-center text-xs font-normal text-white">
                {motionText}
              </span>
            </span>
            <span
              className={classNames(
                'flex h-5 w-5 items-center justify-center rounded-full p-1 lg:h-6 lg:w-6',
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
                'flex h-5 w-5 items-center justify-center rounded-full p-1 lg:h-6 lg:w-6',
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
        </section>
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
                <Dialog.Panel className="flex h-screen w-full transform flex-col justify-between gap-4 overflow-scroll bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-navy md:max-w-xl">
                  <div className="flex flex-col">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                    >
                      {item.name}
                    </Dialog.Title>

                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                      Source of finishing move: <strong>{item.source}</strong>
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
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

                      <div className="bg-slate-700 py-2 px-3 text-sm font-light text-white dark:bg-slate-500">
                        {item.score}/100
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Time to Register Kill (TTRK)
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        The time between the first frame of the animation and the moment the kill is
                        registered. We use the final frame right as the kill register sound is
                        queued.
                      </p>
                      <p className="mt-0.5 font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        {item.ttrk} ± {uncertainty}s
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Time to Complete Animation (TTCA)
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        The time between the first frame of the animation and the final frame, also
                        known has the moment when the player regains control.
                      </p>
                      <p className="mt-0.5 font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        {item.ttca.toString() === '?' ? 'Unknown' : item.ttca}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Motion
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        A classification of the motion of the character during the animation from A
                        (best) to E (worst).{' '}
                        <span className="font-bold underline">
                          Finishing moves with high motion are less likely to be interrputed
                        </span>
                        .
                      </p>
                      <p className="mt-0.5 font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        Class {motionText}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Motion
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        If the radius is low, the finishing move is more confined to a small area
                        and there is low risk of being interrupted by a ledge.{' '}
                        <span className="font-bold underline">
                          Finishing moves with small radius are less likely to be interrputed
                        </span>
                        .
                      </p>
                      <p className="mt-0.5 font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        Class {radiusText}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-base font-medium leading-6 text-gray-800 dark:text-white">
                        Score
                      </h4>
                      <p className="mt-0.5 text-sm font-normal leading-4 text-gray-500 dark:text-gray-400">
                        A function that determines score based on the TTRK and Motion.
                        <code className="mt-1.5 block tracking-tighter text-pink-500">
                          score = 100 - ((motion-1) * 2) ((radius-1) * 2) - 10*ttrk
                        </code>
                      </p>
                      <p className="mt-0.5 font-lexend text-2xl font-normal tracking-tight text-slate-700 dark:text-blue-200">
                        {item.score}
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
