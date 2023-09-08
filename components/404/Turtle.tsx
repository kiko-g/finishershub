import React from "react"
import Image from "next/image"

type Props = {}

export function Turtle({}: Props) {
  const title = "Bro... That's not right."

  return (
    <Image
      key="turtle"
      alt={title}
      width={2000}
      height={2000}
      title={title}
      src="/images/404/turtle.jpg"
      className="aspect-square h-full w-full rounded object-cover shadow lg:w-full"
    />
  )
}
