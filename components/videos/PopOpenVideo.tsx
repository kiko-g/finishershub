import React from 'react'
import Link from 'next/link'
import type { VideoType } from '../../@types'
import { getVideoUrlFromVideo } from '../../utils'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

type Props = {
  video: VideoType
  alt?: boolean
}

export default function PopOpenVideo({ video, alt = false }: Props) {
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
      <ArrowTopRightOnSquareIcon
        className={classNames(alt ? `h-7 w-7 lg:h-8 lg:w-8` : `h-5 w-5 lg:h-6 lg:w-6`)}
      />
    </Link>
  )
}
