import React, { Fragment, useEffect, useMemo, useState } from "react"
import classNames from "classnames"
import useAccessDenied from "../hooks/useAccessDenied"
import { Layout, FullAccessBadge, LimitedAccessBadge } from "../components/layout"
import { VideoNotFound, VideoSkeleton } from "../components/videos"
import type { Author, VideoMongoDBWithUrl } from "../@types"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

type Props = {}

export default function Videos({}: Props) {
  const tagsAndDescriptions = [
    { name: "None", description: "Nothing too special about the finishers in the clip" },
    { name: "Pernoca", description: "Involves at least one pernoca" },
    { name: "Self", description: "Involves opp self reviving and getting punished" },
    { name: "Public", description: "At least one opp teammate watching" },
    { name: "Co-op", description: "Finishers club cooperation aka tiki-taka" },
    { name: "Storm", description: "At least one finisher inside or very near the storm" },
    { name: "Insane", description: "Insane situation" },
    { name: "Edited", description: "Clip has been edited (is not raw)" },
    { name: "Hop", description: "At least one finisher happens after agile hop" },
    { name: "Hop V", description: "At least one finisher is done on the greenie balcony hop" },
    { name: "Angled", description: "Taboo player rotation (minimum 45 deg angle)" },
    { name: "Endgame", description: "Finisher happens near the end of the game" },
    { name: "OG", description: "Clip is from the good old days" },
  ]

  const tags = tagsAndDescriptions.map((item) => item.name).sort()
  const authors = ["Bagger", "Levels", "Reicalo", "Koba", "Junhó", "Castro"]

  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  const [data, setData] = useState<VideoMongoDBWithUrl[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])

  const filteredData = useMemo(() => {
    let result = data

    if (selectedTags.length > 0) {
      result = result
        .filter((video) => video.tags !== null)
        .filter((video) => selectedTags.some((tag) => video.tags.includes(tag)))
    }

    if (selectedAuthors.length > 0) {
      result = result
        .filter((video) => video.authors !== null)
        .filter((video) => selectedAuthors.some((selectedAuthor) => video.authors.includes(selectedAuthor)))
    }

    return result
  }, [data, selectedTags, selectedAuthors])

  useEffect(() => {
    fetch(`/api/mongo/videos/urls`)
      .then((res) => res.json())
      .then((vids: VideoMongoDBWithUrl[]) => {
        setData(vids)
        setLoading(false)
        setFetchError(false)
      })
      .catch((err) => {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      })
  }, [])

  return (
    <Layout location="Videos">
      <div className="flex flex-col gap-y-4">
        <div className="mb-3 text-lg font-normal">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Videos</h2>
            {accessDenied ? <LimitedAccessBadge /> : <FullAccessBadge />}
          </div>
          <p className="mt-1 max-w-3xl">
            This is your control panel. Filter as you see fit and relive some of our greatest moments.
          </p>
        </div>

        <main>
          {loading && <VideoSkeleton />}
          {fetchError && <VideoNotFound />}

          {ready && (
            <div>
              <div className="flex w-full items-center justify-end gap-2">
                <PickTags tags={tags} hook={[selectedTags, setSelectedTags]} />
                <PickAuthors authors={authors} hook={[selectedAuthors, setSelectedAuthors]} />
              </div>

              <div className="font-normal">
                <p>{filteredData.length} results matching your filtering criteria.</p>
                <div></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}

function PickAuthors({
  authors,
  hook,
  className,
}: {
  authors: string[]
  hook: [string[], React.Dispatch<React.SetStateAction<string[]>>]
  className?: string
}) {
  const [pickedAuthors, setPickedAuthors] = hook
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
          <Listbox.Button className="inline-flex w-full items-center justify-center gap-x-1 rounded border border-secondary bg-secondary/50 py-2 pl-3 pr-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:px-3 lg:py-1.5">
            <span className="text-sm font-normal">Authors</span>
            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
          </Listbox.Button>

          <Listbox.Options
            className={classNames(
              "z-40 rounded-md px-0 py-1 text-sm shadow-xl",
              "max-h-[34rem] overflow-scroll border-2 border-white bg-white dark:border-[#434b51] dark:bg-[#2e373d]",
              open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
            )}
          >
            {/* Option box header */}
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

            {/* Option box body (options list) */}
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

function PickTags({
  tags,
  hook,
  className,
}: {
  tags: string[]
  hook: [string[], React.Dispatch<React.SetStateAction<string[]>>]
  className?: string
}) {
  const [pickedTags, setPickedTags] = hook
  const displayedText = useMemo(() => {
    if (pickedTags.length === 0) return "Tags"
    else if (pickedTags.length === tags.length) return "All tags"
    else return pickedTags.map((person) => person).join(", ")
  }, [pickedTags, tags])

  return (
    <Listbox
      as="div"
      multiple
      value={pickedTags}
      onChange={setPickedTags}
      className={classNames("relative h-full", className)}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="inline-flex w-full items-center justify-center gap-x-1 rounded border border-secondary bg-secondary/50 py-2 pl-3 pr-2 text-center text-sm font-medium tracking-tight text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-secondary dark:bg-secondary/50 lg:px-3 lg:py-1.5">
            <span className="text-sm font-normal">Tags</span>
            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
          </Listbox.Button>

          <Listbox.Options
            className={classNames(
              "z-40 rounded-md px-0 py-1 text-sm shadow-xl",
              "max-h-[34rem] overflow-scroll border-2 border-white bg-white dark:border-[#434b51] dark:bg-[#2e373d]",
              open ? "absolute right-0 mt-2 w-full min-w-[12rem] lg:w-48" : "hidden",
            )}
          >
            <div
              className="flex w-full items-center justify-between border-b 
              px-3 pb-2 pt-1 font-normal tracking-tighter"
            >
              <span>{pickedTags.length} selected</span>
              <button
                type="button"
                className="tracking-tighter text-secondary underline hover:font-bold hover:opacity-80 dark:text-secondary"
                onClick={() => setPickedTags([])}
              >
                Reset
              </button>
            </div>

            <div className="pt-1">
              {tags.map((tag: string, tagIdx: number) => {
                const isSelected = pickedTags.some((pickedTag) => pickedTag === tag)

                return (
                  <Listbox.Option
                    key={`category-${tagIdx}`}
                    value={tag}
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
                            {tag}
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
