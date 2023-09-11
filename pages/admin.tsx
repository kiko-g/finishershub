import React, { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import useAccessDenied from "../hooks/useAccessDenied"
import type { VideoMongoDBWithUrl } from "../@types"
import { AccessModalCTA, Layout, FullAccessBadge, LimitedAccessBadge } from "../components/layout"
import { useMediaQuery } from "usehooks-ts"
import { VideoNotFound, VideoSkeleton } from "../components/videos"
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline"
import { Listbox, Transition } from "@headlessui/react"
import { authors, games, getLocations, tags } from "../utils/data"

type Props = {}

export default function Videos({}: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [data, setData] = useState<VideoMongoDBWithUrl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const itemsPerPage = 50
  const [currentPage, setCurrentPage] = useState(1)

  const displayedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return data.sort((a, b) => (a.id > b.id ? 1 : -1)).slice(start, end)
  }, [data, currentPage])

  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])
  const leftDisabled = useMemo(() => currentPage === 1, [currentPage])
  const rightDisabled = useMemo(() => currentPage * itemsPerPage >= data.length, [currentPage, data.length])

  async function replaceRow(row: VideoMongoDBWithUrl, rowIndex: number) {
    const newData = [...data]
    newData[rowIndex] = row
    setData(newData)

    try {
      const updatedVideo = await updateVideo(row)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : null
      console.error("Error updating video:", errorMessage)
    }
  }

  async function updateVideo(row: VideoMongoDBWithUrl): Promise<VideoMongoDBWithUrl> {
    const response = await fetch("/api/mongo/videos/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    })

    if (!response.ok) {
      const errorMessage = await response.json()
      throw new Error(errorMessage.message)
    }

    return response.json()
  }

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
    <Layout location="Admin">
      <div className="mb-8 min-w-full overflow-scroll">
        <div className="mb-3 text-lg font-normal">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Admin</h2>
            {accessDenied ? <LimitedAccessBadge /> : <FullAccessBadge />}
          </div>
          <p className="mt-1 max-w-3xl">
            Welcome to the back office of Finishers Hub. This is where we can document and report all acts of
            ungodliness committed.
          </p>
        </div>

        {accessDenied ? (
          <div className="mt-2 flex max-w-3xl flex-col items-start justify-start gap-4 rounded border border-gray-600 bg-gray-500/20 px-8 py-8 font-normal">
            <p>
              You <span className="font-bold underline">do not have access</span> to this page. Please contact the
              administrator if you believe this is a mistake. To get full access click on the button below.
            </p>

            <div className="flex justify-center">
              <AccessModalCTA lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
            </div>
          </div>
        ) : (
          <>
            {loading && <VideoSkeleton />}
            {fetchError && <VideoNotFound />}
            {ready ? (
              <>
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200 text-xs font-normal dark:divide-gray-700 dark:border-gray-700">
                  <thead>
                    <tr>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        ID
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Game
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Map
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Location
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Authors
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Tags
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Quantity
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        URL
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-3 lg:py-3">
                        Edit
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-transparent bg-white dark:divide-transparent dark:bg-transparent">
                    {displayedData.map((video, videoIdx) => (
                      <TableRow
                        video={video}
                        rowIndex={videoIdx}
                        replaceRowAction={replaceRow}
                        key={`admin-video-${video.id}-${video._id}`}
                      />
                    ))}
                  </tbody>
                </table>

                <nav
                  aria-label="Pagination"
                  className="mt-4 flex items-center justify-between bg-white px-4 py-3 text-sm font-normal text-gray-800 dark:bg-gray-800 dark:text-white sm:px-6"
                >
                  <div className="hidden sm:block">
                    <p>
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                      <span className="font-medium">{currentPage * itemsPerPage}</span> of{" "}
                      <span className="font-medium">{data.length}</span> results
                    </p>
                  </div>

                  <div className="flex flex-1 items-center justify-between text-xs sm:justify-end">
                    <button
                      disabled={leftDisabled}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      className="relative inline-flex items-center rounded-l border-y border-l px-3 py-2 transition enabled:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:enabled:hover:bg-gray-700"
                    >
                      Previous
                    </button>

                    <span
                      className={classNames("relative inline-flex items-center border px-3 py-2 dark:border-gray-700")}
                    >
                      Page {currentPage}
                    </span>

                    <button
                      disabled={rightDisabled}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      className={classNames(
                        "relative inline-flex items-center rounded-r border-y border-r px-3 py-2 transition enabled:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:enabled:hover:bg-gray-700",
                      )}
                    >
                      Next
                    </button>
                  </div>
                </nav>
              </>
            ) : null}
          </>
        )}
      </div>
    </Layout>
  )
}

type TableRowProps = {
  video: VideoMongoDBWithUrl
  rowIndex: number
  replaceRowAction: (row: VideoMongoDBWithUrl, rowIndex: number) => Promise<void>
}

function TableRow({ video, rowIndex, replaceRowAction }: TableRowProps) {
  const [row, setRow] = useState<VideoMongoDBWithUrl>(video)
  const [rowSaved, setRowSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialRowRef = useRef(video)
  const hasRowChanged = useMemo(() => {
    return JSON.stringify(row) !== JSON.stringify(initialRowRef.current)
  }, [row])

  const isRowFilled = useMemo(() => row.location && row.authors && row.quantity && row.tags, [row])

  const handleReplaceRow = async (row: VideoMongoDBWithUrl, rowIndex: number) => {
    setIsLoading(true)
    try {
      await Promise.all([
        replaceRowAction(row, rowIndex),
        new Promise((resolve) => setTimeout(resolve, 800)), // ensures at least 800 ms delay
      ])
    } catch (error) {
      console.error("Error replacing row:", error)
    } finally {
      setRowSaved(true)
      setIsLoading(false)
    }
  }

  return (
    <tr
      className={classNames(
        isRowFilled ? "bg-emerald-600/[15%] dark:bg-teal-500/20" : "",
        hasRowChanged && !rowSaved ? "bg-orange-500/20 dark:bg-orange-400/30" : "",
      )}
    >
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">{row.id}</td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <PickGame setRowSaved={setRowSaved} rowHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">{row.map}</td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <PickLocation game={row.game} map={row.map} setRowSaved={setRowSaved} rowHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <PickAuthors setRowSaved={setRowSaved} rowHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <PickTags setRowSaved={setRowSaved} rowHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <input
          type="number"
          defaultValue={row.quantity}
          className="admin max-w-[8rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, quantity: parseInt(e.target.value) })
          }}
        />
      </td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <a href={row.url} target="_blank" className="hover:scale-125">
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </td>
      <td className="whitespace-nowrap px-2 pt-0.5 lg:px-3">
        <button
          className={classNames("hover:scale-125", isLoading && "cursor-not-allowed opacity-50")}
          disabled={isLoading}
          onClick={() => {
            handleReplaceRow(row, rowIndex)
          }}
        >
          {isLoading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckIcon className="h-4 w-4" />}
        </button>
      </td>
    </tr>
  )
}

function PickGame({
  rowHook,
  setRowSaved,
  className,
}: {
  setRowSaved: Dispatch<SetStateAction<boolean>>
  rowHook: [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]
  className?: string
}) {
  const [row, setRow] = rowHook
  const picked = useMemo(() => row.game, [row])

  return (
    <Listbox
      as="div"
      value={picked}
      onChange={(newValue) => {
        setRowSaved(false)
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

function PickLocation({
  game,
  map,
  rowHook,
  setRowSaved,
  className,
}: {
  game: string
  map: string
  setRowSaved: Dispatch<SetStateAction<boolean>>
  rowHook: [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]
  className?: string
}) {
  const [row, setRow] = rowHook
  const picked = useMemo(() => row.location, [row])
  const locations = getLocations(game, map)

  return (
    <Listbox
      as="div"
      value={row.location}
      onChange={(newValue) => {
        setRowSaved(false)
        setRow({ ...row, location: newValue })
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
                open ? "absolute right-0 mt-2 w-full min-w-[15rem] lg:w-48" : "hidden",
              )}
            >
              {locations.map((poi: string, poiIdx: number) => {
                const isSelected = picked === poi

                return (
                  <Listbox.Option
                    key={poiIdx}
                    value={poi}
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
                            {poi}
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

function PickAuthors({
  rowHook,
  setRowSaved,
  className,
}: {
  setRowSaved: Dispatch<SetStateAction<boolean>>
  rowHook: [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]
  className?: string
}) {
  const [row, setRow] = rowHook
  const picked = useMemo(() => row.authors, [row])

  return (
    <Listbox
      as="div"
      multiple
      value={row.authors}
      onChange={(newValue) => {
        setRowSaved(false)
        setRow({ ...row, authors: newValue })
      }}
    >
      {({ open }) => (
        <div className={classNames("relative", className)}>
          <Listbox.Button className="inline-flex w-full items-center justify-between gap-x-2 bg-black/50 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20 lg:py-1 lg:pl-2 lg:pr-1 lg:text-sm">
            <span className="truncate font-normal tracking-tighter">{picked.join(", ")}</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={classNames(
                "z-[999] max-h-96 overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
                open ? "absolute right-0 mt-2 w-full min-w-[15rem] lg:w-48" : "hidden",
              )}
            >
              {authors.map((author: string, authorIdx: number) => {
                const isSelected = picked.includes(author)

                return (
                  <Listbox.Option
                    key={authorIdx}
                    value={author}
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
                            {author}
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

function PickTags({
  rowHook,
  setRowSaved,
  className,
}: {
  setRowSaved: Dispatch<SetStateAction<boolean>>
  rowHook: [VideoMongoDBWithUrl, Dispatch<SetStateAction<VideoMongoDBWithUrl>>]
  className?: string
}) {
  const [row, setRow] = rowHook
  const picked = useMemo(() => row.tags, [row])

  return (
    <Listbox
      as="div"
      multiple
      value={row.tags}
      onChange={(newValue) => {
        setRowSaved(false)
        setRow({ ...row, tags: newValue })
      }}
    >
      {({ open }) => (
        <div className={classNames("relative", className)}>
          <Listbox.Button className="inline-flex w-full items-center justify-between gap-x-2 bg-black/50 py-1.5 pl-2 pr-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20 lg:py-1 lg:pl-2 lg:pr-1 lg:text-sm">
            <span className="truncate font-normal tracking-tighter">{picked.join(", ")}</span>
            <ChevronUpDownIcon className="h-4 w-4 lg:h-5 lg:w-5" aria-hidden="true" />
          </Listbox.Button>

          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className={classNames(
                "z-[999] max-h-96 overflow-scroll rounded-md bg-white px-0 py-1 text-sm shadow-xl dark:bg-[#2e373d]",
                open ? "absolute right-0 mt-2 w-full min-w-[15rem] lg:w-48" : "hidden",
              )}
            >
              {tags.map((tag: string, tagIdx: number) => {
                const isSelected = picked.includes(tag)

                return (
                  <Listbox.Option
                    key={tagIdx}
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
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
