import React, { Dispatch, Fragment, SetStateAction, useEffect, useMemo } from "react"
import classNames from "classnames"
import type { Game } from "@/@types"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { getMaps } from "@/utils/data"

type Props = {
  game: Game
  pickedHook: [string, Dispatch<SetStateAction<string>>]
  className?: string
}

export function FilterVideosByMap({ game, pickedHook, className }: Props) {
  const [pickedMap, setPickedMap] = pickedHook
  const nothingSelected = useMemo(() => pickedMap === "", [pickedMap])
  const maps = useMemo(() => getMaps(game), [game])

  useEffect(() => {
    if (!getMaps(game).includes(pickedMap)) setPickedMap("")
  }, [pickedMap, setPickedMap, game])

  return (
    <Listbox as="div" value={pickedMap} onChange={setPickedMap}>
      {({ open }) => (
        <div className={classNames("relative z-50", className)}>
          <Listbox.Button
            className={classNames(
              "inline-flex w-full items-center justify-center gap-x-0.5 rounded border py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 lg:py-1.5 lg:pl-2.5 lg:pr-1.5 lg:text-xs",
              nothingSelected
                ? "border-secondary bg-secondary/70 dark:border-secondary dark:bg-secondary/50"
                : "border-teal-600 bg-teal-600/70 dark:border-teal-600 dark:bg-teal-600/50",
            )}
          >
            <span className="whitespace-nowrap font-normal tracking-tighter">
              {nothingSelected ? "Map" : pickedMap}
            </span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={classNames(
                "z-40 max-h-[34rem] overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
                open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
              )}
            >
              <div className="flex w-full items-center justify-end border-b px-3 pb-2 pt-1 font-normal tracking-tighter">
                <button
                  type="button"
                  className="tracking-tighter text-secondary underline hover:font-bold hover:opacity-80 dark:text-secondary"
                  onClick={() => setPickedMap("")}
                >
                  Reset
                </button>
              </div>

              {maps.map((map: string, mapIdx: number) => {
                const isSelected = pickedMap === map

                return (
                  <Listbox.Option
                    key={`map-${mapIdx}`}
                    value={map}
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
                            {map}
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
