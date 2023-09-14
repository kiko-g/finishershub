import React, { Dispatch, Fragment, SetStateAction } from "react"
import classNames from "classnames"
import type { Game } from "../../@types"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { games } from "../../utils/data"

type Props = {
  pickedHook: [Game, Dispatch<SetStateAction<Game>>]
  className?: string
}

export function FilterVideosByGame({ pickedHook, className }: Props) {
  const [pickedGame, setPickedGame] = pickedHook

  return (
    <Listbox as="div" value={pickedGame} onChange={setPickedGame}>
      {({ open }) => (
        <div className={classNames("relative z-50", className)}>
          <Listbox.Button className="inline-flex w-full items-center justify-center gap-x-0.5 rounded border border-secondary bg-secondary/70 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:py-1.5 lg:pl-2.5 lg:pr-1.5 lg:text-xs">
            <span className="whitespace-nowrap font-normal tracking-tighter">{pickedGame}</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={classNames(
                "z-40 max-h-[34rem] overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
                open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
              )}
            >
              {games.map((game: Game, arenaIdx: number) => {
                const isSelected = pickedGame === game

                return (
                  <Listbox.Option
                    key={arenaIdx}
                    value={game}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-1.5 pl-3 pr-3",
                        active ? "bg-slate-200 dark:bg-slate-600" : "",
                      )
                    }
                  >
                    {({ selected }) => {
                      const highlight = selected || isSelected
                      return (
                        <span className="flex items-center gap-2">
                          {highlight ? (
                            <CheckCircleIcon className="h-5 w-5 text-teal-500" aria-hidden="true" />
                          ) : (
                            <span className="h-5 w-5" />
                          )}
                          <span className={classNames("block truncate", highlight ? "font-bold" : "font-normal")}>
                            {game}
                          </span>
                        </span>
                      )
                    }}
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
