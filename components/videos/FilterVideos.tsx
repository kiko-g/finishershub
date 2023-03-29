import React, { Dispatch, Fragment, SetStateAction } from 'react'
import type { FilterType } from '../../@types'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

type Props = {
  arenas: FilterType[]
  pickedHook: [any, Dispatch<SetStateAction<FilterType>>]
}

export default function FilterVideos({ arenas, pickedHook }: Props) {
  const [picked, setPicked] = pickedHook

  return (
    <Listbox value={picked} onChange={setPicked}>
      <div className="relative z-50 w-full">
        <Listbox.Button
          as="button"
          className="inline-flex w-full items-center justify-center gap-x-1 rounded border border-secondary bg-secondary/50 py-2 pl-3 pr-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:px-2 lg:py-1.5"
        >
          <span className="block truncate text-sm font-normal">{picked.name}</span>
          <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-gray-100 py-2 shadow lg:w-full">
            {arenas.map((arena: any, arenaIdx: number) => (
              <Listbox.Option
                key={arenaIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-1.5 pl-10 pr-5 text-sm font-normal tracking-tight ${
                    active ? 'bg-secondary/10 text-secondary' : 'text-gray-800'
                  }`
                }
                value={arena}
              >
                <span
                  className={`block truncate ${
                    picked.name === arena.name ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  {arena.name}
                </span>
                {picked.name === arena.name ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-secondary">
                    <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
