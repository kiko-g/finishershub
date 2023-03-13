import React from 'react'
import Link from 'next/link'
import { getVideoUrlFromIndex } from '../../utils'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type Props = {
  index: number
}

export default function PopOpenVideo({ index }: Props) {
  const url = getVideoUrlFromIndex(index)

  return (
    <Link
      href={url}
      target="_blank"
      className="text-white transition hover:opacity-80 dark:text-white"
    >
      <ArrowTopRightOnSquareIcon className="h-5 w-5 lg:h-6 lg:w-6" />
    </Link>
  )
}
