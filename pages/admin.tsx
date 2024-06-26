import React, { useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
import useAccessDenied from "@/hooks/useAccessDenied"
import type { VideoMongoDBWithUrl } from "@/@types"
import { AccessModalCTA, Layout, AccessBadge } from "@/components/layout"
import { VideoNotFound, VideoSkeleton } from "@/components/videos"
import { ArrowPathIcon, ArrowTopRightOnSquareIcon, CheckIcon } from "@heroicons/react/24/outline"
import { PickAuthors, PickGame, PickLocation, PickMap, PickQuantity, PickTags } from "@/components/admin"
import { Switch, Tab } from "@headlessui/react"
import { useSoundAvailable } from "@/hooks/useSoundAvailable"
import { getSoundStatus, updateVideo } from "@/utils"

export default function Admin() {
  const tabs = [
    {
      name: "Mongo",
      component: <VideoManagementTable />,
    },
    {
      name: "S3",
      component: <S3ListSearch />,
    },
    {
      name: "Sound",
      component: <SoundManagement />,
    },
  ]

  return (
    <Layout location="Admin">
      <div className="flex min-w-full flex-col overflow-scroll">
        <div className="mb-3 text-lg font-normal">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight sm:text-5xl">Admin</h2>
            <AccessBadge />
          </div>
          <p className="mt-0.5 max-w-5xl text-sm">
            Welcome to the back office of Finishers Hub. This is where we can document and report all acts of
            ungodliness committed.
          </p>
        </div>

        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex space-x-2 rounded-xl bg-primary/10 p-1 dark:bg-secondary/10">
            {tabs.map((item, itemIdx) => (
              <Tab
                key={`item-${itemIdx}-${item.name}`}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary ring-white ring-opacity-60 ring-offset-2 ring-offset-primary transition focus:outline-none focus:ring-2 dark:text-secondary dark:ring-offset-secondary",
                    selected
                      ? "bg-primary/80 text-white shadow dark:bg-secondary/80 dark:text-white"
                      : "hover:bg-primary/40 hover:text-white dark:hover:bg-secondary/40 dark:hover:text-white",
                  )
                }
              >
                {item.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-3">
            {tabs.map((item, itemIdx) => (
              <Tab.Panel key={`tab-panel-${item.name}`}>{item.component}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  )
}

function LockedContent({ hook }: { hook: [boolean, React.Dispatch<React.SetStateAction<boolean>>] }) {
  const [accessDenied, setAccessDenied] = hook
  return (
    <div className="mt-2 flex flex-col items-start justify-start gap-4 rounded border border-gray-600 bg-gray-500/20 px-8 py-8 font-normal">
      <p>
        You <span className="font-bold underline">do not have access</span> to this page. Please contact the
        administrator if you believe this is a mistake. To get full access click on the button below.
      </p>

      <div className="flex justify-center">
        <AccessModalCTA lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
      </div>
    </div>
  )
}

function SoundManagement() {
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [allowedToggleDisabled, setAllowedToggleDisabled] = useState(false)
  const { soundAvailable, willToggleSound, setWillToggleSound, isEmergency, setIsEmergency } = useSoundAvailable()

  function toggleSound() {
    setAllowedToggleDisabled(true)
    setWillToggleSound((prev) => !prev)
    setTimeout(() => setAllowedToggleDisabled(false), 500)
  }

  function toggleEmergency() {
    const userCode = window.prompt(`Please enter the code to toggle emergency mode ${isEmergency ? "OFF" : "ON"}:`)
    const expectedCode = process.env.NEXT_PUBLIC_SOUND_EMERGENCY_CODE || "insano"

    if (userCode === expectedCode) setIsEmergency((prev) => !prev)
    else alert("Incorrect code. Emergency mode was not changed.")
  }

  return accessDenied ? (
    <LockedContent hook={[accessDenied, setAccessDenied]} />
  ) : (
    <ul className="space-y-3 font-normal">
      <li
        className={classNames(
          "flex items-center justify-start gap-2 rounded px-8 py-8",
          soundAvailable ? "bg-teal-600/20" : "bg-rose-600/20",
        )}
      >
        <span>Sound 🔈</span>
        <Switch
          disabled={allowedToggleDisabled}
          checked={willToggleSound === null ? soundAvailable : willToggleSound}
          onChange={() => {
            // only prompt for code if sound is not available
            if (willToggleSound === false || (willToggleSound === null && soundAvailable === false)) {
              const userCode = window.prompt("Please enter the code to toggle sound:")
              const expectedCode = process.env.NEXT_PUBLIC_SOUND_CODE || "verdoca"

              if (userCode === expectedCode) toggleSound()
              else alert("Incorrect code. Sound settings were not changed.")
            } else {
              toggleSound()
            }
          }}
          className={classNames(
            soundAvailable ? "bg-teal-600" : "bg-rose-600",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:focus:ring-secondary",
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              soundAvailable ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            )}
          />
        </Switch>
      </li>

      <li
        className={classNames(
          "flex items-center justify-start gap-2 rounded px-8 py-8",
          isEmergency ? "bg-rose-600/20" : "bg-teal-600/20",
        )}
      >
        <span>Emergency Mode 🚨</span>
        <Switch
          checked={isEmergency}
          onChange={toggleEmergency}
          className={classNames(
            isEmergency ? "bg-rose-800" : "bg-slate-600",
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:focus:ring-secondary",
          )}
        >
          <span className="sr-only">Toggle emergency mode</span>
          <span
            aria-hidden="true"
            className={classNames(
              isEmergency ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            )}
          />
        </Switch>
      </li>
    </ul>
  )
}

function FilterByName({ hook }: { hook: [string, React.Dispatch<React.SetStateAction<string>>] }) {
  const [searchQuery, setSearchQuery] = hook

  return (
    <input
      type="search"
      placeholder="Search by finishing move name"
      className="w-full flex-1 self-stretch"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  )
}

type S3Videos = {
  url: string
  date: string
  filename: string
}

function S3ListSearch() {
  const [videos, setVideos] = useState<S3Videos[]>([])
  const [filtered, setFiltered] = useState<S3Videos[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchS3 = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/s3`)
        setVideos(await response.json())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchS3()
  }, [])

  useEffect(() => {
    if (searchQuery !== "") setFiltered(videos.filter((video) => video.filename.includes(searchQuery)))
    else setFiltered(videos)
  }, [videos, searchQuery])

  return loading ? (
    <VideoSkeleton />
  ) : (
    <div className="space-y-2">
      <div className="flex items-center justify-start gap-2">
        <FilterByName hook={[searchQuery, setSearchQuery]} />
        <div className="flex items-center gap-1 self-stretch rounded border border-gray-600 bg-gray-500/10 px-2 text-sm font-normal">
          <span>{filtered.length}</span>
          <span className="hidden xl:inline-flex">results</span>
        </div>
      </div>
      {filtered.length > 0 ? (
        <ul className="flex flex-col items-start justify-start rounded border border-gray-600 bg-gray-500/10 px-4 py-2 text-sm font-normal">
          {filtered.map((video) => (
            <li className="flex w-full items-center gap-2 border-b border-gray-400 py-1" key={video.filename}>
              <a href={video.url} className="hover:underline">
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
              <span>{new Date(video.date).toLocaleDateString()}</span>
              <span className="flex-1">{video.filename}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded border border-gray-600 bg-gray-500/10 px-4 py-8 text-sm font-normal">
          No files with matching your search.
        </div>
      )}
    </div>
  )
}

function VideoManagementTable() {
  const [totalVideos, setTotalVideos] = useState<number>(0)
  const [videos, setVideos] = useState<VideoMongoDBWithUrl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [accessDenied, setAccessDenied] = useAccessDenied()

  const itemsPerPage = 30
  const [currentPage, setCurrentPage] = useState(1)

  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])
  const leftDisabled = useMemo(() => currentPage === 1, [currentPage])
  const rightDisabled = useMemo(() => currentPage * itemsPerPage >= totalVideos, [currentPage, totalVideos])

  async function replaceRow(video: VideoMongoDBWithUrl, videoIndex: number) {
    try {
      const updatedVideo = await updateVideo(video)
      setVideos((prev) => {
        const newData = [...prev]
        newData[videoIndex] = video
        return newData
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : null
      console.error("Error updating video:", errorMessage)
    }
  }

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await fetch(`/api/mongo/videos/count`)
        const count: number = await response.json()
        setTotalVideos(count)
      } catch (err) {
        console.error(err)
      }
    }

    fetchTotalCount()
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage
        const response = await fetch(`/api/mongo/videos/urls/partial/${startIndex}`)
        const vids: VideoMongoDBWithUrl[] = await response.json()

        setVideos(vids)
        setLoading(false)
        setFetchError(false)
      } catch (err) {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      }
    }

    const fetchVideosEmpty = async () => {
      try {
        const startIndex = (currentPage - 1) * itemsPerPage
        const response = await fetch(`/api/mongo/videos/urls/partial/${startIndex}`)
        const vids: VideoMongoDBWithUrl[] = await response.json()

        setVideos(vids)
        setLoading(false)
        setFetchError(false)
      } catch (err) {
        setLoading(false)
        setFetchError(true)
        console.error(err)
      }
    }

    fetchVideos()
  }, [currentPage])

  return accessDenied ? (
    <LockedContent hook={[accessDenied, setAccessDenied]} />
  ) : (
    <>
      {loading && <VideoSkeleton />}
      {fetchError && <VideoNotFound message="Admin content failed loading" />}
      {ready ? (
        <>
          <table className="min-w-full max-w-full divide-y divide-gray-200 overflow-x-scroll border border-gray-200 text-xs font-normal dark:divide-gray-700 dark:border-gray-700">
            <thead>
              <tr className="text-left text-xs font-normal uppercase tracking-tighter text-gray-100 dark:text-gray-300">
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">ID</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Filename</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">URL</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Edit</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Game</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Map</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Location</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Authors</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Tags</th>
                <th className="py.1.5 bg-gray-700 px-1.5 dark:bg-gray-800 lg:px-2 lg:py-2">Quantity</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-transparent bg-white dark:divide-transparent dark:bg-transparent">
              {videos
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((video, videoIdx) => (
                  <TableRow video={video} rowIndex={videoIdx} replaceRowAction={replaceRow} key={`video-${video.id}`} />
                ))}
            </tbody>
          </table>

          <nav
            aria-label="Pagination"
            className="mb-72 mt-4 flex min-w-full flex-1 items-center justify-between self-stretch bg-white px-4 py-3 text-sm font-normal text-gray-800 dark:bg-gray-800 dark:text-white sm:px-6"
          >
            <div className="hidden sm:block">
              <p>
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                <span className="font-medium">{currentPage * itemsPerPage}</span> of{" "}
                <span className="font-medium">{totalVideos}</span> results
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

              <span className={classNames("relative inline-flex items-center border px-3 py-2 dark:border-gray-700")}>
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
  )
}

type TableRowProps = {
  video: VideoMongoDBWithUrl
  rowIndex: number
  replaceRowAction: (row: VideoMongoDBWithUrl, rowIndex: number) => Promise<void>
}

function TableRow({ video, rowIndex, replaceRowAction }: TableRowProps) {
  const [row, setRow] = useState<VideoMongoDBWithUrl | null>(video)
  const [rowSaved, setRowSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const initialRowRef = useRef(video)
  const hasRowChanged = useMemo(() => {
    return JSON.stringify(row) !== JSON.stringify(initialRowRef.current)
  }, [row])

  const isRowFilled = useMemo(() => row !== null && row.location && row.authors && row.quantity && row.tags, [row])

  const handleReplaceRow = async (row: VideoMongoDBWithUrl, rowIndex: number) => {
    setIsLoading(true)
    try {
      await Promise.all([
        replaceRowAction(row, rowIndex),
        new Promise((resolve) => setTimeout(resolve, 500)), // ensures at least 500 ms delay
      ])
    } catch (error) {
      console.error("Error replacing row:", error)
    } finally {
      setRowSaved(true)
      setIsLoading(false)
    }
  }

  if (row === null) return null

  return (
    <tr
      className={classNames(
        "tracking-tighter",
        isRowFilled ? "bg-emerald-600/[15%] dark:bg-teal-500/20" : "",
        hasRowChanged && !rowSaved ? "bg-orange-500/20 dark:bg-orange-400/30" : "",
      )}
    >
      <td className="whitespace-nowrap px-1.5 lg:px-2">{row.id}</td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">{row.filename}</td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <a href={row.url} target="_blank" className="hover:scale-125">
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
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
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <PickGame setVideoSaved={setRowSaved} videoHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <PickMap game={row.game} setVideoSaved={setRowSaved} videoHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <PickLocation game={row.game} map={row.map} setVideoSaved={setRowSaved} videoHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <PickAuthors setVideoSaved={setRowSaved} videoHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <PickTags setVideoSaved={setRowSaved} videoHook={[row, setRow]} />
      </td>
      <td className="whitespace-nowrap px-1.5 lg:px-2">
        <PickQuantity setVideoSaved={setRowSaved} videoHook={[row, setRow]} />
      </td>
    </tr>
  )
}
