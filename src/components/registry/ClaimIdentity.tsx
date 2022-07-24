import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { RegistryEntry } from '../../@types'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeOffIcon, FingerPrintIcon, XIcon } from '@heroicons/react/outline';

type Props = {
  member: RegistryEntry
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}

const ClaimIdentity = ({ member, lockedHook }: Props) => {
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false);

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown)
  }

  const submitPassword = () => {
    if (password === member.code) {
      setPassword('')
      setLocked(false)
      setIsOpen(false)
    }
    else {
      setPassword('')
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        disabled={!locked}
        title={locked ? `Prove you are ${member.name}` : `You already have access to ${member.name}'s data`}
        className="action bg-primary"
      >
        <span>Claim identity</span>
        <FingerPrintIcon className="h-5 w-5" />
      </button>

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
                  <header className="flex justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-primary"
                    >
                      Claim Identity
                    </Dialog.Title>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-1 text-primary rounded hover:text-white hover:bg-primary transition"
                    >
                      <XIcon className="h-6 w-6" />
                    </button>
                  </header>

                  <p className="mt-2 text-gray-600 ">
                    Type your codephrase to prove you are <strong>{member.name}</strong> and get access to data controls.
                  </p>

                  <div className="relative flex flex-col gap-1 mt-3">
                    <label htmlFor="password" className="sr-only">
                      Identity Codephrase
                    </label>
                    <input
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="appearance-none focus:accent-primary relative block w-full px-3 py-2 border rounded"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      className="absolute text-primary hover:opacity-80 transition  right-[12px] top-[11px]">
                      {passwordShown ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>

                  <footer className="mt-4">
                    <button
                      type="button"
                      onClick={submitPassword}
                      className="w-full p-2 bg-primary rounded text-white hover:opacity-80 transition"
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
    </>
  )
}

export default ClaimIdentity
