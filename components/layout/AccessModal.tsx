import React, { Dispatch, Fragment, SetStateAction, memo, useState } from 'react'
import classNames from 'classnames'
import { Dialog, Transition } from '@headlessui/react'
import {
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  KeyIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

type Props = {
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
  startOpen?: boolean
}

export default function AccessModal({ lockedHook, startOpen }: Props) {
  const secretCode = 'Doeu'
  const secretHints = ['Levels', 'Bio', 'Window', 'Clip']

  const [accessCode, setAccessCode] = useState('')
  const [accessCodeShown, setAccessCodeShown] = useState(true)
  const [accessCodeError, setAccessCodeError] = useState(false)

  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(startOpen !== undefined ? startOpen : locked)

  const closeModal = () => {
    setIsOpen(false)
  }

  const togglePasswordShown = () => {
    setAccessCodeShown(!accessCodeShown)
  }

  const submitPassword = () => {
    if (accessCode.toLowerCase() === secretCode.toLowerCase()) {
      setAccessCode('')
      setLocked(false)
      setIsOpen(false)
    } else {
      setAccessCode('')
      setAccessCodeError(true)
      setTimeout(() => setAccessCodeError(false), 4000)
    }
  }

  if (!locked) return null

  return (
    <>
      {/* Button */}
      <button
        title="Open access modal"
        onClick={() => setIsOpen(true)}
        className="text-teal-500 transition hover:opacity-80 dark:text-teal-400"
      >
        <KeyIcon className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur dark:bg-white/5" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-[999]">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-600 shadow-xl transition-all dark:bg-gray-800 dark:text-white">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-primary dark:text-white"
                    >
                      Prove your identity
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="flex items-center gap-x-1 rounded border border-rose-600/50 bg-rose-600/10 px-2 py-1 text-sm text-rose-800 transition hover:bg-rose-600 hover:text-white dark:bg-rose-600/20 dark:text-white dark:hover:bg-rose-600"
                    >
                      <span>Close</span>
                      <XMarkIcon className="h-4 w-4" />{' '}
                    </button>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-normal lg:text-base">
                      <p>Enter the codephrase to prove you are worthy of viewing the content.</p>
                      <ul className="ml-3 mt-2 flex list-disc flex-col gap-y-0.5 lg:ml-4 lg:mt-1">
                        <li>
                          <strong>Close the modal</strong> and have{' '}
                          <span className="text-amber-600">limited access</span> to the site.
                        </li>
                        <li>
                          Click the <span className="text-teal-500">green key</span> to reopen the
                          modal.
                        </li>
                        <li>
                          <strong className="underline">Hints</strong>:{' '}
                          {secretHints.map((hint, hintIdx) => (
                            <span key={`hint-${hintIdx}`}>
                              <span>{hint}</span>
                              {hintIdx < secretHints.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                          <Link
                            target="_blank"
                            href="https://clips.twitch.tv/TardyPleasantTildeKappaClaus-jWplZLiwxcoOi6vP"
                            className="hover:text-primary dark:hover:text-secondary"
                          >
                            <ArrowTopRightOnSquareIcon className="mb-1 ml-2 inline-flex h-5 w-5" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="relative mt-4 flex flex-col gap-1">
                    <label htmlFor="password" className="sr-only">
                      Identity Codephrase for general access
                    </label>
                    <input
                      required
                      name="password"
                      type={accessCodeShown ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="relative block w-full"
                      placeholder="Password"
                      value={accessCode}
                      onKeyDown={(e) => e.key === 'Enter' && submitPassword()}
                      onChange={(e) => setAccessCode(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      title={`${accessCodeShown ? 'Hide' : 'Show'} password`}
                      aria-label={`${accessCodeShown ? 'Hide' : 'Show'} password`}
                      className="absolute right-[11px] top-[11px] rounded-full p-1 text-primary transition hover:bg-primary hover:text-white dark:text-secondary dark:hover:bg-secondary dark:hover:text-white"
                    >
                      {accessCodeShown ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {accessCodeError ? (
                    <p className="mt-0.5 text-sm text-rose-600 dark:text-rose-500">
                      Wrong codephrase. Try again.
                    </p>
                  ) : null}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={submitPassword}
                      className="w-full rounded bg-primary p-2 text-white transition hover:opacity-80 dark:bg-secondary"
                    >
                      Submit
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
