import React from 'react'
import TheRockGIF from '../../../static/images/404/rock-sus.gif'

type Props = {}

export default function TheRock({}: Props) {
  const title = 'The Rock is sus of you mate.'

  return (
    <img
      title={title}
      alt={title}
      src={TheRockGIF}
      className="aspect-square w-auto rounded object-cover object-center shadow lg:w-full"
    />
  )
}
