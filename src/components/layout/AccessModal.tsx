import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function AccessModal({ lockedHook }: Props) {
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
      <div className="flex items-end justify-center space-x-2 text-teal-700 dark:text-teal-600">
        <button title="Open access modal" className="transition hover:opacity-75" onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-7 w-7 lg:h-8 lg:w-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
            />
          </svg>
        </button>
      </div>

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
                  className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white 
                  p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-primary">
                      Prove your identity
                    </Dialog.Title>
                    <button onClick={closeModal} className="rounded p-1 transition hover:bg-rose-600 hover:text-white">
                      <XMarkIcon className="h-5 w-5" />{' '}
                    </button>
                  </div>

                  <div className="mt-2">
                    <div className="text-sm font-normal tracking-tight text-gray-600 lg:text-base">
                      <p>Enter the codephrase to prove you are worthy of viewing the content.</p>
                      <ul className="ml-4 list-disc">
                        <li>
                          You can <strong>close the modal</strong> and have{' '}
                          <strong className="text-rose-600">limited access</strong> to the site.
                        </li>
                        <li>
                          Tou can click the <strong className="text-teal-700">green fingerprint</strong> to reopen the
                          modal.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="mt-3 text-right text-xs tracking-tight text-gray-600 dark:text-gray-400 lg:text-sm">
                    <strong>Hints</strong>:{' '}
                    {secretHints.map((hint, hintIdx) => (
                      <span key={`hint-${hintIdx}`}>
                        <span>{hint}</span>
                        {hintIdx < secretHints.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>

                  <div className="relative mt-3 flex flex-col gap-1">
                    <label htmlFor="password" className="sr-only">
                      Identity Codephrase for general access
                    </label>
                    <input
                      required
                      name="password"
                      type={codephraseShown ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="relative block w-full appearance-none rounded border px-3 py-2 focus:accent-primary"
                      placeholder="Password"
                      value={codephrase}
                      onKeyDown={e => e.key === 'Enter' && submitPassword()}
                      onChange={e => setCodephrase(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      title={`${codephraseShown ? 'Hide' : 'Show'} password`}
                      aria-label={`${codephraseShown ? 'Hide' : 'Show'} password`}
                      className="absolute right-[12px] top-[11px] text-primary  transition hover:opacity-80"
                    >
                      {codephraseShown ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={submitPassword}
                      className="w-full rounded bg-primary p-2 text-white transition hover:opacity-80"
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
