import React, { useEffect, useMemo, useState } from 'react'
import { Layout } from '../components/layout'
import { useMediaQuery } from 'usehooks-ts'
import { VideoNotFound, VideoSkeleton } from '../components/videos'
import type { VideoMongoDBWithUrl } from '../@types'
import { ArrowTopRightOnSquareIcon, CheckIcon, PencilIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function Videos({}: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [data, setData] = useState<VideoMongoDBWithUrl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)

  const ready = useMemo(() => !loading && !fetchError, [loading, fetchError])

  useEffect(() => {
    fetch(`/api/videos/urls`)
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
      <div className="min-w-full overflow-scroll">
        {loading && <VideoSkeleton />}
        {fetchError && <VideoNotFound />}
        {ready ? (
          <table className="min-w-full font-normal text-xs divide-y border divide-gray-200 dark:divide-gray-700 border-gray-200 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Authors
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Map
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Game
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-4 py-3 bg-gray-700 dark:bg-gray-800 text-left text-xs font-medium text-gray-100 dark:text-gray-300 uppercase tracking-wider">
                  Edit
                </th>
              </tr>
            </thead>

            <tbody className="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
              {data
                .sort((a, b) => (a.id > b.id ? 1 : -1))
                .map((video, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 whitespace-nowrap">{video.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        defaultValue={video.authors ? video.authors.join(', ') : ''}
                        placeholder="N/A"
                        className="w-full text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="number"
                        defaultValue={video.quantity}
                        className="w-full text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        defaultValue={video.tags ? video.tags.join(', ') : ''}
                        placeholder="N/A"
                        className="w-full text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{video.map}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <input
                        type="text"
                        defaultValue={video.location || ''}
                        placeholder="N/A"
                        className="w-full text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">{video.game}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <a href={video.url} target="_blank">
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </a>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <button className="hover:text-teal-600">
                        <CheckIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </Layout>
  )
}
