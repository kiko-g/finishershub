import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

type Props = {}

export default function Turtle({}: Props) {
  const title = "Bro... That's not right."
  const source = '../../../static/images/404/turtle.jpg'

  return (
    <StaticImage
      alt={title}
      title={title}
      src={source}
      objectFit="cover"
      objectPosition="50% 50%"
      className="aspect-square w-auto rounded shadow lg:w-full"
    />
  )
}
