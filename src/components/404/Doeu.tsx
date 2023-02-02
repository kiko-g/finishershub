import React from 'react'
import DoeuImage from '../../../static/images/404/doeu.png'

type Props = {}

export default function OhNo({}: Props) {
  const title = 'If you know you know.'

  return (
    <img
      title={title}
      alt={title}
      src={DoeuImage}
      className="aspect-square w-auto rounded object-cover shadow lg:w-full"
    />
  )
}
