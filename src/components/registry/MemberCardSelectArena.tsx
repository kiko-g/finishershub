import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'

type Props = {
  arenas: any
  selectedHook: [any, Dispatch<SetStateAction<any>>]
}

const MemberCardSelectArena = ({ arenas, selectedHook }: Props) => {
  const [picked, setPicked] = selectedHook

  return (
    <Listbox value={picked} onChange={setPicked}>
      <div className="relative z-20">
        <Listbox.Button
          className="inline-flex items-center space-x-2 rounded bg-emerald-600 p-2 
          text-center text-sm font-medium text-white transition hover:opacity-80"
        >
          <span className="block truncate">{picked.name}</span>
          <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options
            className="absolute mt-1 max-h-60 w-full min-w-[12rem] overflow-auto 
            rounded border border-emerald-600/20 bg-gray-100 py-1 shadow"
          >
            {arenas.map((arena: any, arenaIdx: number) => (
              <Listbox.Option
                key={arenaIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-emerald-600/20 text-emerald-600' : 'text-gray-900'
                  }`
                }
                value={arena}
              >
                <span className={`block truncate ${picked.name === arena.name ? 'font-medium' : 'font-normal'}`}>
                  {arena.name}
                </span>
                {picked.name === arena.name ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
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

export default MemberCardSelectArena
