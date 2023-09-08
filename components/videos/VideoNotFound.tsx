import Link from "next/link"
import React from "react"

type Props = {
  message?: string
}

export function VideoNotFound({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white md:text-5xl">Uh-oh!</h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">{message ? message : "We can't find that video"} ❌</p>

      <Link
        href="/"
        className="mt-6 rounded bg-gradient-to-br from-slate-800 to-slate-900 px-3 py-2 text-lg text-white transition hover:opacity-80 dark:bg-gradient-to-br dark:from-gray-200 dark:to-gray-300 dark:text-gray-800"
      >
        Go back home 🛖
      </Link>
    </div>
  )
}
