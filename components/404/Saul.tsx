import Image from 'next/image'
import React from 'react'

type Props = {}

export default function OhNo({}: Props) {
  const title = 'Your honor I think we got off on the wrong foot.'

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/saul.jpg"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}