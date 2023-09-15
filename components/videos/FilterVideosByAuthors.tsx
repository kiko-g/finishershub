import React, { useMemo } from "react"
import classNames from "classnames"
import { Listbox } from "@headlessui/react"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

export function FilterVideosByAuthors({
  authors,
  hook,
  className,
}: {
  authors: string[]
  hook: [string[], React.Dispatch<React.SetStateAction<string[]>>]
  className?: string
}) {
  const [pickedAuthors, setPickedAuthors] = hook
  const nothingSelected = useMemo(() => pickedAuthors.length === 0, [pickedAuthors])
  const displayedText = useMemo(() => {
    if (pickedAuthors.length === 0) return "Authors"
    else if (pickedAuthors.length === authors.length) return "Everyone"
    else return pickedAuthors.map((person) => person).join(", ")
  }, [pickedAuthors, authors])

  return (
    <Listbox
      as="div"
      multiple
      value={pickedAuthors}
      onChange={setPickedAuthors}
      className={classNames("relative h-full", className)}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={classNames(
              "inline-flex w-full items-center justify-center gap-x-0.5 rounded border py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 lg:py-1.5 lg:pl-2.5 lg:pr-1.5 lg:text-xs",
              nothingSelected
                ? "border-secondary bg-secondary/70 dark:border-secondary dark:bg-secondary/50"
                : "border-teal-600 bg-teal-600/70 dark:border-teal-600 dark:bg-teal-600/50",
            )}
          >
            <span className="whitespace-nowrap font-normal tracking-tighter">Authors</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Listbox.Options
            className={classNames(
              "z-40 max-h-[34rem] overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
              open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
            )}
          >
            <div
              className="flex w-full items-center justify-between border-b 
              px-3 pb-2 pt-1 font-normal tracking-tighter"
            >
              <span>{pickedAuthors.length} selected</span>
              <button
                type="button"
                className="tracking-tighter text-secondary underline hover:font-bold hover:opacity-80 dark:text-secondary"
                onClick={() => setPickedAuthors([])}
              >
                Reset
              </button>
            </div>

            <div className="pt-1">
              {authors.map((author: string, authorIdx: number) => {
                const isSelected = pickedAuthors.some((pickedAuthor) => pickedAuthor === author)
                return (
                  <Listbox.Option
                    key={`category-${authorIdx}`}
                    value={author}
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-3 pr-3",
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
                            {author}
                          </span>
                        </span>
                      )
                    }}
                  </Listbox.Option>
                )
              })}
            </div>
          </Listbox.Options>
        </>
      )}
    </Listbox>
  )
}
