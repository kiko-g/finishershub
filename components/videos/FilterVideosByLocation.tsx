import React, { Dispatch, Fragment, SetStateAction, useMemo } from "react"
import classNames from "classnames"
import type { Game } from "../../@types"
import { Listbox, Transition } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { getLocations } from "../../utils/data"

type Props = {
  game: Game
  map: string
  pickedHook: [string, Dispatch<SetStateAction<string>>]
  className?: string
}

export function FilterVideosByLocation({ game, map, pickedHook, className }: Props) {
  const [pickedLocation, setPickedLocation] = pickedHook
  const locations = useMemo(() => getLocations(game, map), [game, map])

  return (
    <Listbox as="div" value={pickedLocation} onChange={setPickedLocation}>
      {({ open }) => (
        <div className={classNames("relative z-50", className)}>
          <Listbox.Button className="inline-flex w-full items-center justify-center gap-x-0.5 rounded border border-secondary bg-secondary/70 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:py-1.5 lg:pl-2.5 lg:pr-1.5 lg:text-xs">
            <span className="whitespace-nowrap font-normal tracking-tighter">
              {pickedLocation === "" ? "POI" : pickedLocation}
            </span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={classNames(
                "z-40 max-h-[34rem] overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
                open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-64" : "hidden",
              )}
            >
              <div className="flex w-full items-center justify-end border-b px-3 pb-2 pt-1 font-normal tracking-tighter">
                <button
                  type="button"
                  className="tracking-tighter text-secondary underline hover:font-bold hover:opacity-80 dark:text-secondary"
                  onClick={() => setPickedLocation("")}
                >
                  Reset
                </button>
              </div>

              {locations.map((location: string, locationIdx: number) => {
                const isSelected = pickedLocation === location

                return (
                  <Listbox.Option
                    key={`location-${locationIdx}`}
                    value={location}
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
                            {location}
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
