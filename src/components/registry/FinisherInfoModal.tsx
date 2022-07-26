import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline'

const FinisherInfoModal = () => {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={openModal}
        title="Further information about counting"
        className="flex w-min items-center gap-1 text-center text-sm font-medium 
        transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="whitespace-nowrap">Lifetime finisher count</span>
        <InformationCircleIcon className="mt-[1px] inline-flex h-4 w-4" />
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <header className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-primary">
                      Lifetime Finisher Count
                    </Dialog.Title>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded p-1 text-primary transition hover:bg-primary hover:text-white"
                    >
                      <XIcon className="h-6 w-6" />
                    </button>
                  </header>

                  <div className="mt-3 flex flex-col text-gray-700">
                    <p>
                      The <strong>lifetime finisher count</strong> is the sum of all the <strong>truthful</strong>{' '}
                      finishing moves performed by any member of the finishers club. We believe this metric also applies
                      to all players across the world.
                    </p>
                    <p className="mt-3">
                      A <strong>truthful</strong> finisher must meet the following criteria:
                    </p>
                    <ul className="mt-1 ml-4 list-disc">
                      <li>Finishing move is performed on Warzone.</li>
                      <li>Finishing move is performed on non-downed players.</li>
                    </ul>
                    <p className="mt-3">
                      Other <strong>key notes</strong> to keep in mind:
                    </p>
                    <ul className="mt-1 ml-4 list-disc">
                      <li>
                        Finishing moves on downed players are <strong>not counted</strong> and often considered{' '}
                        <strong>frowned upon</strong>.
                      </li>
                      <li>
                        Finishing moves performed on players that have recently used their <strong>self-revive</strong>{' '}
                        are allowed and considered a <strong>noble practice</strong>.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-8">
                    <button
                      type="button"
                      className="flex items-center space-x-2 rounded bg-primary px-3 py-2 text-center text-sm font-medium text-white 
                      transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={closeModal}
                    >
                      <span>Got it, thanks!</span>
                      <CheckIcon className="h-5 w-5" />
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

export default FinisherInfoModal
