import React from 'react'
import Link from 'next/link'
import { getVideoUrlFromVideo } from '../../utils'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { VideoType } from '../../@types/index'

type Props = {
  video: VideoType
}

export default function PopOpenVideo({ video }: Props) {
  const [url, setUrl] = React.useState<string>('')

  React.useEffect(() => {
    if (!video) return

    const videoUrl = getVideoUrlFromVideo(video)
    setUrl(videoUrl)
  }, [video])

  return url === '' ? null : (
    <Link
      href={url}
      target="_blank"
      className="text-white transition hover:opacity-80 dark:text-white"
    >
      <ArrowTopRightOnSquareIcon className="h-5 w-5 lg:h-6 lg:w-6" />
    </Link>
  )
}
