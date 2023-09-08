import React from "react"

type Props = {}

export default function MemberCardSkeleton({}: Props) {
  return (
    <div className="flex w-full flex-col space-y-3 rounded-xl bg-lightest p-3 shadow dark:bg-white/5 xl:flex-row xl:space-y-0">
      <aside className="relative rounded-l-xl md:rounded-xl">
        <div className="h-64 w-full animate-pulse rounded-xl bg-lightish shadow dark:bg-white/20 xl:h-48 xl:w-72" />
      </aside>

      <section
        className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl 
        px-1 py-1 text-base font-normal xl:h-auto xl:max-h-full xl:w-3/4 xl:py-0 xl:pl-4 xl:pr-0"
      >
        <div className="flex h-48 flex-col justify-between">
          <span className="h-6 w-36 animate-pulse rounded bg-lightish dark:bg-white/20" />
          <span className="h-4 w-24 animate-pulse rounded bg-lightish dark:bg-white/20" />
          <span className="h-4 w-12 animate-pulse rounded bg-lightish dark:bg-white/20" />
          <span className="h-16 w-48 animate-pulse rounded bg-lightish dark:bg-white/20" />

          <div className="flex items-center gap-2">
            <button className="inline-flex h-8 w-20 animate-pulse items-center space-x-2 rounded bg-lightish p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20"></button>
            <button className="inline-flex h-8 w-20 animate-pulse items-center space-x-2 rounded bg-lightish p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20"></button>
            <button className="inline-flex h-8 w-20 animate-pulse items-center space-x-2 rounded bg-lightish p-2 text-center text-sm font-medium text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white/20"></button>
          </div>
        </div>
      </section>
    </div>
  )
}
