import React from 'react'

const MemberCardSkeleton = () => (
  <div className="member-card">
    <aside className="relative rounded-l-xl md:rounded-xl">
      <div className="h-64 w-full animate-pulse rounded-xl bg-lightish shadow dark:bg-darkish lg:h-48 lg:w-72"></div>
    </aside>

    <section className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl px-1 py-1 text-base font-normal lg:h-auto lg:max-h-full lg:w-3/4 lg:py-0 lg:pl-4 lg:pr-0">
      <div className="flex h-48 flex-col justify-between">
        <span className="h-6 w-36 animate-pulse rounded bg-lightish dark:bg-darkish" />
        <span className="h-4 w-24 animate-pulse rounded bg-lightish dark:bg-darkish" />
        <span className="h-4 w-12 animate-pulse rounded bg-lightish dark:bg-darkish" />
        <span className="h-16 w-48 animate-pulse rounded bg-lightish dark:bg-darkish" />

        <div className="flex items-center gap-2">
          <button className="action h-8 w-24 animate-pulse bg-lightish dark:bg-darkish"></button>
          <button className="action h-8 w-24 animate-pulse bg-lightish dark:bg-darkish"></button>
          <button className="action h-8 w-24 animate-pulse bg-lightish dark:bg-darkish"></button>
        </div>
      </div>
    </section>
  </div>
)

export default MemberCardSkeleton
