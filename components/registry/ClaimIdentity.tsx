import React, { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { type FinishersClubMember } from '../../@types'
import { Dialog, Transition } from '@headlessui/react'
import {
  LockOpenIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

type Props = {
  member: FinishersClubMember
  lockedHook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function ClaimIdentity({ member, lockedHook }: Props) {
  const [locked, setLocked] = lockedHook
  const [isOpen, setIsOpen] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(true)

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
    } else {
      setPassword('')
      setWrong(true)
      setTimeout(() => setWrong(false), 4000)
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        disabled={!locked}
        title={
          locked
            ? `Prove you are ${member.name}`
            : `You already have access to ${member.name}'s data`
        }
        className="bg-slate-500p-2 inline-flex w-full items-center justify-center gap-x-2 rounded text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-gray-700"
      >
        <span className="whitespace-nowrap">Claim identity</span>
        {locked ? <LockClosedIcon className="h-5 w-5" /> : <LockOpenIcon className="h-5 w-5" />}
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-600 shadow-xl transition-all dark:bg-navy dark:text-white">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 text-primary dark:text-secondary"
                    >
                      Claim Identity
                    </Dialog.Title>

                    <button
                      onClick={closeModal}
                      className="flex items-center gap-x-1 rounded border border-rose-600/50 bg-rose-600/10 px-2 py-1 text-sm text-rose-800 transition hover:bg-rose-600 hover:text-white dark:bg-rose-600/20 dark:text-white dark:hover:bg-rose-600"
                    >
                      <span>Close</span>
                      <XMarkIcon className="h-4 w-4" />{' '}
                    </button>
                  </div>

                  <p className="mt-2">
                    Type your password to prove you are <strong>{member.name}</strong> and get
                    access to data controls.
                  </p>

                  <div className="relative mt-3 flex flex-col gap-1 rounded">
                    <label htmlFor="password" className="sr-only">
                      Identity password for <strong>{member.name}</strong>
                    </label>
                    <input
                      required
                      name="password"
                      type={passwordShown ? 'text' : 'password'}
                      autoComplete="new-password"
                      className="relative block w-full"
                      placeholder="Password"
                      value={password}
                      onKeyDown={(e) => e.key === 'Enter' && submitPassword()}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordShown}
                      className="absolute right-[11px] top-[11px] rounded-full p-1 text-primary transition hover:bg-primary hover:text-white dark:text-secondary dark:hover:bg-secondary dark:hover:text-white"
                    >
                      {passwordShown ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {wrong ? (
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
