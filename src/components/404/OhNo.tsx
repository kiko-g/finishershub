import React from 'react'
import GIF from '../../../static/images/404/oh-no.gif'

type Props = {}

export default function OhNo({}: Props) {
  const title = 'Oh dear lord what have you stumbled upon..?'

  return (
    <img alt={title} src={GIF} className="aspect-square w-auto rounded object-cover shadow lg:w-full" />
  )
}
