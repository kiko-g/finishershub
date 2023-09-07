import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Layout } from '../components/layout'
import { useMediaQuery } from 'usehooks-ts'
import { VideoNotFound, VideoSkeleton } from '../components/videos'
import type { VideoMongoDBWithUrl } from '../@types'
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'

type Props = {}

export default function Videos({}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [data, setData] = useState<VideoMongoDBWithUrl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  async function replaceRow(row: VideoMongoDBWithUrl, rowIndex: number) {
    //console.log(`update row ${rowIndex}`)
    const newData = [...data]
    newData[rowIndex] = row
    setData(newData)

    try {
      const updatedVideo = await updateVideo(row)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : null
      console.error('Error updating video:', errorMessage)
    }
  }

  async function updateVideo(row: VideoMongoDBWithUrl): Promise<VideoMongoDBWithUrl> {
    const response = await fetch('/api/mongo/videos/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
      <div className="min-w-full overflow-scroll">
        {loading && <VideoSkeleton />}
        {fetchError && <VideoNotFound />}
        {ready ? (
          <table className="min-w-full font-normal text-xs divide-y border divide-gray-200 dark:divide-gray-700 border-gray-200 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Game
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Map
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Authors
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-2 py-2 lg:px-4 lg:py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-transparent divide-y divide-transparent dark:divide-gray-700">
              {data
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((video, videoIdx) => (
                  <TableRow
                    video={video}
                    rowIndex={videoIdx}
                    replaceRowAction={replaceRow}
                    key={`admin-video-${video.id}-${video._id}`}
                  />
                ))}
            </tbody>
          </table>
        ) : null}
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
      console.error('Error replacing row:', error)
    } finally {
      setRowSaved(true)
      setIsLoading(false)
    }
  }

  return (
    <tr
      className={classNames(
        isRowFilled ? 'bg-emerald-600/[15%]' : '',
        hasRowChanged && !rowSaved ? 'bg-orange-500/[15%]' : '',
      )}
    >
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">{row.id}</td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">{row.game}</td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">{row.map}</td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">
        <input
          type="text"
          defaultValue={row.location || ''}
          placeholder="N/A"
          className="w-full min-w-[6rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, location: e.target.value })
          }}
        />
      </td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">
        <input
          type="text"
          defaultValue={row.authors ? row.authors.join(', ') : ''}
          placeholder="N/A"
          className="w-full min-w-[6rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, authors: e.target.value.split(', ') })
          }}
        />
      </td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">
        <input
          type="text"
          defaultValue={row.tags ? row.tags.join(', ') : ''}
          placeholder="N/A"
          className="w-full min-w-[6rem] text-xs"
          onChange={(e) => {
            setRowSaved(false)
            setRow({ ...row, tags: e.target.value.split(', ') })
          }}
        />
      </td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">
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
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">
        <a href={row.url} target="_blank" className="hover:scale-125">
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </a>
      </td>
      <td className="px-2 py-1 lg:px-4 lg:py-2 whitespace-nowrap">
        <button
          className={classNames('hover:scale-125', isLoading && 'opacity-50 cursor-not-allowed')}
          disabled={isLoading}
          onClick={() => {
            handleReplaceRow(row, rowIndex)
          }}
        >
          {isLoading ? (
            <ArrowPathIcon className="h-4 w-4 animate-spin" />
          ) : (
            <CheckIcon className="h-4 w-4" />
          )}
        </button>
      </td>
    </tr>
  )
}
