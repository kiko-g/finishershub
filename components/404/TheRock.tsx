import React from 'react'
import Image from 'next/image'

type Props = {}

export default function TheRock({}: Props) {
  const title = 'The Rock is sus of you mate.'

  return (
    <Image
      title={title}
      alt={title}
      width={2000}
      height={2000}
      src="/images/404/rock-sus.gif"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}
