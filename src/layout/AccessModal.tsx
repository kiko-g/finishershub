import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeOffIcon, FingerPrintIcon, XIcon } from '@heroicons/react/outline'

type Props = {
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}

const AccessModal = ({ lockedHook }: Props) => {
  const secret = 'Doeu'
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(locked)
  const [codephrase, setCodephrase] = useState('')
  const [codephraseShown, setCodephraseShown] = useState(true)

  const closeModal = () => {
    if (codephrase.toLowerCase() === secret.toLowerCase()) {
      setLocked(false)
      setIsOpen(false)
    }
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <header className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-primary">
                    Claim Identity
                  </Dialog.Title>
                </header>

                <p className="mt-2 text-sm text-gray-600">
                  Enter the codephrase to prove you are worthy of viewing the content.
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  <strong>Hint</strong>: <span>Levels, Bio, Window</span>
                </p>

                <div className="relative mt-3 flex flex-col gap-1">
                  <label htmlFor="password" className="sr-only">
                    Identity Codephrase
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
                    className="absolute right-[12px] top-[11px] text-primary  transition hover:opacity-80"
                  >
                    {codephraseShown ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>

                <footer className="mt-4">
                  <button
                    type="button"
                    onClick={submitPassword}
                    className="w-full rounded bg-primary p-2 text-white transition hover:opacity-80"
                  >
                    Submit
                  </button>
                </footer>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AccessModal
