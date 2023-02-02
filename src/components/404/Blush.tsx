import React from 'react'
import BlushImage from '../../../static/images/404/blush.jpg'

type Props = {}

export default function OhNo({}: Props) {
  const title = 'You look cute and breedable.'

  return (
    <img
      title={title}
      alt={title}
      src={BlushImage}
      className="aspect-square w-auto rounded object-cover shadow lg:w-full"
    />
  )
}
