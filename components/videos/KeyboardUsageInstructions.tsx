import { Fragment } from "react"
import { Transition } from "@headlessui/react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/20/solid"

type Props = {
  showHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export function KeyboardUsageInstructions({ showHook }: Props) {
  const [show, setShow] = showHook
  const keysMapping = [
    { key: "<", description: "Previous video" },
    { key: ">", description: "Next video" },
    { key: "q", description: "Minimize button controls" },
    { key: "m", description: "Toggle mute" },
    { key: "e", description: "Toggle expanded view" },
    { key: "c", description: "Copy video URL to clipboard" },
    { key: "p", description: "Pop open video in new tab" },
    { key: "i", description: "Toggle keyboard information" },
    { key: "s", description: "Toggle shuffle" },
  ]

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div aria-live="assertive" className="pointer-events-none absolute bottom-0 left-0 z-[9999] w-full opacity-100">
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
          <div className="pointer-events-auto w-full max-w-xs overflow-hidden rounded-tr bg-white opacity-100">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-6 w-6 text-teal-600" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-left text-sm font-medium text-gray-900">Keyboard Shortcuts</p>
                  <ul className="mt-2 flex flex-col space-y-1 text-sm text-gray-500">
                    {keysMapping.map((keyMapping) => (
                      <li
                        key={`key-${keyMapping.key}`}
                        className="flex items-center justify-start gap-x-2 tracking-tight"
                      >
                        <span className="w-4 self-stretch rounded bg-primary/10 text-center text-gray-900">
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
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500"
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
    </>
  )
}
