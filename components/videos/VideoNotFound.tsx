import Link from "next/link"
import React from "react"

type Props = {
  message?: string
  reloadPage?: boolean
  customActions?: [
    {
      text: string
      onClick: () => void
    },
  ]
}

export function VideoNotFound({ message, reloadPage = false, customActions }: Props) {
  return (
    <section className="flex min-h-[24rem] flex-col items-center justify-center rounded border border-rose-500 bg-rose-500/10 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white md:text-5xl">Uh-oh!</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-300">{message ? message : "We can't find that video"} ❌</p>

      <div className="mt-5 flex flex-wrap gap-3 px-4 text-sm">
        <Link
          href="/"
          className="rounded bg-gradient-to-br from-rose-700 to-rose-800 px-3 py-2 text-white transition hover:opacity-80 dark:bg-gradient-to-br dark:from-rose-700 dark:to-rose-600 dark:text-white"
        >
          Go back home 🛖
        </Link>

        {reloadPage ? (
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-gradient-to-br from-rose-700 to-rose-800 px-3 py-2 text-white transition hover:opacity-80 dark:bg-gradient-to-br dark:from-rose-700 dark:to-rose-600 dark:text-white"
          >
            Reload page 🔄
          </button>
        ) : null}

        {customActions &&
          customActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="rounded bg-gradient-to-br from-rose-700 to-rose-800 px-3 py-2 text-white transition hover:opacity-80 dark:bg-gradient-to-br dark:from-rose-700 dark:to-rose-600 dark:text-white"
            >
              {action.text}
            </button>
          ))}
      </div>
    </section>
  )
}
