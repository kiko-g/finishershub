import React from "react"
import Image from "next/image"

type Props = {}

export default function OhNo({}: Props) {
  const title = "Oh dear lord what have you stumbled upon..?"

  return (
    <Image
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/oh-no.gif"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}
