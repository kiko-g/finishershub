import Image from 'next/image'
import React from 'react'

type Props = {}

export default function Saul({}: Props) {
  const title = 'Your honor I think we got off on the wrong foot.'

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/saul.jpg"
      className="aspect-square h-full w-full rounded bg-black object-contain shadow lg:w-full"
    />
  )
}
