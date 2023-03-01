import React from 'react'
import Image from 'next/image'

type Props = {
  square?: boolean
}

export default function Frankie({ square }: Props) {
  const title = 'Coming to theaters soon...'

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/frankie.jpeg"
      className={`${
        square ? 'aspect-square' : ''
      } h-full w-full rounded object-cover shadow lg:w-full`}
    />
  )
}
