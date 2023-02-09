import React from 'react'

type Props = {}

export default function InvisbleTopLayer({}: Props) {
  return (
    <div
      title="You do not have access to this content until you log in."
      className="absolute inset-0 z-50 h-full w-full cursor-not-allowed
      rounded ring-0 ring-rose-800/50 hover:bg-rose-800/5 hover:ring-2 hover:backdrop-blur-xs"
    />
  )
}
