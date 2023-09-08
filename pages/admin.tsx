import React, { useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import useAccessDenied from "../hooks/useAccessDenied"
import type { VideoMongoDBWithUrl } from "../@types"
import { AccessModalCTA, Layout, FullAccessBadge, LimitedAccessBadge } from "../components/layout"
import { useMediaQuery } from "usehooks-ts"
import { VideoNotFound, VideoSkeleton } from "../components/videos"
import { ArrowPathIcon, ArrowTopRightOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline"

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
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        ID
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        Game
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        Map
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        Location
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        Authors
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        Tags
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        Quantity
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
                        URL
                      </th>
                      <th className="bg-gray-700 px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:bg-gray-800 dark:text-gray-300 lg:px-4 lg:py-3">
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
        isRowFilled ? "bg-emerald-600/[15%] dark:bg-teal-400/10" : "",
        hasRowChanged && !rowSaved ? "bg-orange-500/[15%]" : "",
      )}
    >
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">{row.id}</td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">{row.game}</td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">{row.map}</td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">
        <input
          type="text"
          defaultValue={row.location || ""}
          placeholder="N/A"
          className="w-full min-w-[6rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, location: e.target.value })
          }}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">
        <input
          type="text"
          defaultValue={row.authors ? row.authors.join(", ") : ""}
          placeholder="N/A"
          className="w-full min-w-[6rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, authors: e.target.value.split(", ") })
          }}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">
        <input
          type="text"
          defaultValue={row.tags ? row.tags.join(", ") : ""}
          placeholder="N/A"
          className="w-full min-w-[6rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, tags: e.target.value.split(", ") })
          }}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">
        <input
          type="number"
          defaultValue={row.quantity}
          className="w-full min-w-[3rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, quantity: parseInt(e.target.value) })
          }}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">
        <a href={row.url} target="_blank" className="hover:scale-125">
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </td>
      <td className="whitespace-nowrap px-2 py-1 lg:px-4 lg:py-2">
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
