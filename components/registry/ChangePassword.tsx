import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { type FinishersClubMember } from '../../@types'
import RegistryAPI from '../../utils/api/registry'
import { Dialog, Transition } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon, FingerPrintIcon, XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  member: FinishersClubMember
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function ClaimIdentity({ member, lockedHook }: Props) {
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

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
    RegistryAPI.updatePassword(member._id, newPassword, () => {
      setLocked(false)
      setNewPassword('')
      setIsOpen(false)
    })
  }

  return (
    <>
      <button
        title={
          locked
            ? `You need to claim identity for ${member.name} first`
            : `Change the password of ${member.name}`
        }
        onClick={openModal}
        disabled={locked}
        className="inline-flex w-full items-center justify-center gap-x-2 rounded bg-slate-500
        p-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 
        disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-gray-700"
      >
        <span className="whitespace-nowrap">Change password</span>
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
            <div className="fixed inset-0 bg-black bg-opacity-80" />
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
                  align-middle text-gray-600 shadow-xl transition-all dark:bg-navy dark:text-white"
                >
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-primary dark:text-secondary"
                    >
                      Change Password
                    </Dialog.Title>

                    <button
                      onClick={closeModal}
                      className="flex items-center gap-x-1 rounded border border-rose-600/50 
                      bg-rose-600/10 px-2 py-1 text-sm text-rose-800 transition 
                      hover:bg-rose-600 hover:text-white dark:bg-rose-600/20 dark:text-white dark:hover:bg-rose-600"
                    >
                      <span>Close</span>
                      <XMarkIcon className="h-4 w-4" />{' '}
                    </button>
                  </div>

                  <p className="mt-2">
                    Type your new password for <strong>{member.name}</strong> and then submit your
                    changes to <strong>replace the previous one</strong>.
                  </p>

                  <div className="relative mt-3 flex flex-col gap-1">
                    <label htmlFor="password" className="sr-only">
                      New Identity password for <strong>{member.name}</strong>
                    </label>
                    <input
                      required
                      name="password"
                      type={passwordShown ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="relative block w-full"
                      placeholder="New password"
                      value={newPassword}
                      onKeyDown={(e) => e.key === 'Enter' && submitNewPassword()}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      className="absolute right-[11px] top-[11px] rounded-full p-1 
                      text-primary transition hover:bg-primary hover:text-white 
                      dark:text-secondary dark:hover:bg-secondary dark:hover:text-white"
                    >
                      {passwordShown ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={submitNewPassword}
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
