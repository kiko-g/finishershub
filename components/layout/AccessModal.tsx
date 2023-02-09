import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import classNames from 'classnames'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon, XMarkIcon, FingerPrintIcon } from '@heroicons/react/24/outline'

type Props = {
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
  special?: boolean
}

export default function AccessModal({ lockedHook, special = false }: Props) {
  const secret = 'Doeu'
  const secretHints = ['Levels', 'Bio', 'Window', 'Clip']
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(locked)
  const [codephrase, setCodephrase] = useState('')
  const [codephraseShown, setCodephraseShown] = useState(true)

  const closeModal = () => {
    setIsOpen(false)
  }

  const togglePasswordShown = () => {
    setCodephraseShown(!codephraseShown)
  }

  const submitPassword = () => {
    if (codephrase.toLowerCase() === secret.toLowerCase()) {
      setCodephrase('')
      setLocked(false)
      setIsOpen(false)
    } else {
      setCodephrase('')
    }
  }

  if (!locked) return null

  return (
    <>
      {/* Button */}
      <button
        title="Open access modal"
        className={classNames(
          'flex items-end justify-center gap-x-2 transition',
          special
            ? 'hover w-full rounded border-2 border-teal-600/50 bg-teal-600/50 px-3 py-2 text-white hover:bg-teal-600/80'
            : 'text-teal-700 hover:opacity-50 dark:text-teal-600'
        )}
        onClick={() => setIsOpen(true)}
      >
        <FingerPrintIcon
          className={classNames(special ? 'h-5 w-5 lg:h-6 lg:w-6' : 'h-7 w-7 lg:h-8 lg:w-8')}
        />
        {special ? <span>Get access</span> : null}
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left 
                  align-middle text-gray-600 shadow-xl transition-all dark:bg-dark dark:text-white"
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-primary dark:text-secondary"
                    >
                      Prove your identity
                    </Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="rounded p-1 transition hover:bg-rose-600 hover:text-white"
                    >
                      <XMarkIcon className="h-5 w-5" />{' '}
                    </button>
                  </div>

                  <div className="mt-2">
                    <div className="text-sm font-normal lg:text-base">
                      <p>Enter the codephrase to prove you are worthy of viewing the content.</p>
                      <ul className="ml-4 list-disc">
                        <li>
                          You can <strong>close the modal</strong> and have{' '}
                          <strong className="text-rose-600">limited access</strong> to the site.
                        </li>
                        <li>
                          Tou can click the{' '}
                          <strong className="text-emerald-500">green fingerprint</strong> to reopen
                          the modal.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="mt-2 text-right tracking-wide text-gray-500 dark:text-gray-400">
                    <strong>Hints</strong>:{' '}
                    {secretHints.map((hint, hintIdx) => (
                      <span key={`hint-${hintIdx}`}>
                        <span>{hint}</span>
                        {hintIdx < secretHints.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>

                  <div className="relative mt-4 flex flex-col gap-1">
                    <label htmlFor="password" className="sr-only">
                      Identity Codephrase for general access
                    </label>
                    <input
                      required
                      name="password"
                      type={codephraseShown ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="relative block w-full appearance-none rounded border px-3 py-2 
                      focus:accent-primary dark:focus:accent-secondary"
                      placeholder="Password"
                      value={codephrase}
                      onKeyDown={(e) => e.key === 'Enter' && submitPassword()}
                      onChange={(e) => setCodephrase(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      title={`${codephraseShown ? 'Hide' : 'Show'} password`}
                      aria-label={`${codephraseShown ? 'Hide' : 'Show'} password`}
                      className="absolute right-[12px] top-[11px] text-primary transition 
                      hover:opacity-80 dark:text-secondary"
                    >
                      {codephraseShown ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={submitPassword}
                      className="w-full rounded bg-primary p-2 text-white 
                      transition hover:opacity-80 dark:bg-secondary"
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
