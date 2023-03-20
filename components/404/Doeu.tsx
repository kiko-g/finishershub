import React from 'react'
import Image from 'next/image'

type Props = {}

export default function Doeu({}: Props) {
  const title = 'If you know you know.'

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/doeu.png"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}
