import React from 'react'
import Image from 'next/image'

type Props = {}

export default function Blush({}: Props) {
  const title = 'You look cute and breedable.'

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/blush.jpg"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}
