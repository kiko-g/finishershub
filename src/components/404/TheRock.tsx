import React from 'react'
import GIF from '../../../static/images/404/rock-sus.gif'

type Props = {}

export default function TheRock({}: Props) {
  const title = 'The Rock is sus.'

  return (
    <img alt={title} src={GIF} className="aspect-square w-auto rounded object-cover object-center shadow lg:w-full" />
  )
}
