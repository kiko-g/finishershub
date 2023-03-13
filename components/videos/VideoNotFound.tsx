import React from 'react'

type Props = {
  message?: string
}

export default function VideoNotFound({ message }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="text-center">
        <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</h1>
        <p className="mt-4 text-gray-500">{message ? message : "We can't find that video"} ❌</p>
      </div>
    </div>
  )
}
