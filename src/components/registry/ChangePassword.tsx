import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import RegistryApi from '../../api/registry';
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
  const [newPassword, setNewPassword] = useState('')
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

  const submitNewPassword = () => {
    RegistryApi.updatePassword(member._id, newPassword, () => {
      setLocked(false)
      setNewPassword('')
      setIsOpen(false)
    })
  }

  return !locked && <>
    <button
      onClick={openModal}
      disabled={locked}
      title={locked ? `Prove you are ${member.name}` : `Change the password of ${member.name}`}
      className="action bg-teal-700"
    >
      <span>Change Password</span>
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
                    Change Password
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
                  Type your new codephrase for <strong>{member.name}</strong> and then submit your changes to <strong>replace the previous one</strong>.
                </p>

                <div className="relative flex flex-col gap-1 mt-3">
                  <label htmlFor="password" className="sr-only">
                    New Identity Codephrase
                  </label>
                  <input
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none focus:accent-primary relative block w-full px-3 py-2 border rounded"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    onClick={submitNewPassword}
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
}

export default ClaimIdentity
