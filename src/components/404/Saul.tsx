import React from 'react'
import SaulImage from '../../../static/images/404/saul.jpg'

type Props = {}

export default function OhNo({}: Props) {
  const title = 'Your honor I think we got off on the wrong foot.'

  return <img title={title} alt={title} src={SaulImage} className="aspect-square w-auto rounded shadow lg:w-full" />
}
