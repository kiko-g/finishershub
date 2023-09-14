import { Dispatch, Fragment, SetStateAction, useMemo } from "react"
import { VideoMongoDBWithUrl } from "../../@types"
import { Listbox, Transition } from "@headlessui/react"
import classNames from "classnames"
import { CheckCircleIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid"
import { games } from "../../utils/data"

export function PickGame({
  videoHook,
  setVideoSaved,
  className,
}: {
  setVideoSaved: Dispatch<SetStateAction<boolean>>
  videoHook: [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl | null>>]
  className?: string
}) {
  const [row, setRow] = videoHook
  const picked = useMemo(() => row.game, [row])

  return (
    <Listbox
      as="div"
      value={picked}
      onChange={(newValue) => {
        setVideoSaved(false)
        setRow({ ...row, game: newValue })
      }}
    >
      {({ open }) => (
        <div className={classNames("relative", className)}>
          <Listbox.Button className="inline-flex w-full items-center justify-between gap-x-2 bg-black/50 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20 lg:py-1 lg:pl-2 lg:pr-1 lg:text-sm">
            <span className="font-normal tracking-tighter">{picked}</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={classNames(
                "z-[999] max-h-96 overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
                open ? "absolute left-0 mt-2 w-full min-w-[8rem] lg:w-48" : "hidden",
              )}
            >
              {games.map((game: string, gameIdx: number) => {
                const isSelected = picked === game

                return (
                  <Listbox.Option
                    key={gameIdx}
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
