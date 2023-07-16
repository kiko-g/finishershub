import { Fragment, useCallback, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'

type Props = {}

export default function KeyUsageNotification() {
  const [show, setShow] = useState(true)

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev)
  }, [setShow])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 73) {
        toggleShow() // I key
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleShow])

  return (
    <button onClick={() => setShow((prev) => !prev)}>
      <InformationCircleIcon className="h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
      <KeyUsage showHook={[show, setShow]} />
    </button>
  )
}

type KeyUsageProps = {
  showHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

function KeyUsage({ showHook }: KeyUsageProps) {
  const keysMapping = [
    { key: '<', description: 'Previous video' },
    { key: '>', description: 'Next video' },
    { key: 'm', description: 'Toggle mute' },
    { key: 'e', description: 'Toggle expanded view' },
    { key: 'c', description: 'Copy video URL to clipboard' },
    { key: 'p', description: 'Pop open video in new tab' },
    { key: 'i', description: 'Toggle keyboard information' },
  ]
  const [show, setShow] = showHook

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-left text-sm font-medium text-gray-900">
                      Keyboard Shortcuts
                    </p>
                    <ul className="mt-2 flex flex-col space-y-1 text-sm text-gray-500">
                      {keysMapping.map((keyMapping) => (
                        <li key={`key-${keyMapping.key}`} className="flex items-center gap-x-3">
                          <span className="self-stretch rounded text-gray-900">
                            {keyMapping.key}
                          </span>
                          <span>{keyMapping.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
