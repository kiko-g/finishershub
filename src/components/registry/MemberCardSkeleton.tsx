import React from 'react'

const MemberCardSkeleton = () => (
  <div className="member-card">
    <aside className="relative rounded-l-xl md:rounded-xl">
      <div className="h-64 w-full rounded-xl animate-pulse bg-lightish dark:bg-darkish shadow lg:h-48 lg:w-72"></div>
    </aside>

    <section className="relative flex w-auto grow flex-col justify-between space-y-6 rounded-r-xl px-1 py-1 text-base font-normal lg:h-auto lg:max-h-full lg:w-3/4 lg:py-0 lg:pl-4 lg:pr-0">
      <div className="flex h-48 flex-col justify-between">
        <span className="bg-lightish dark:bg-darkish w-36 h-6 rounded animate-pulse" />
        <span className="bg-lightish dark:bg-darkish w-24 h-4 rounded animate-pulse" />
        <span className="bg-lightish dark:bg-darkish w-12 h-4 rounded animate-pulse" />
        <span className="bg-lightish dark:bg-darkish w-48 h-16 rounded animate-pulse" />

        <div className="flex items-center gap-2">
          <button className="action bg-lightish dark:bg-darkish h-8 w-24 animate-pulse"></button>
          <button className="action bg-lightish dark:bg-darkish h-8 w-24 animate-pulse"></button>
          <button className="action bg-lightish dark:bg-darkish h-8 w-24 animate-pulse"></button>
        </div>
      </div>
    </section>
  </div>
)

export default MemberCardSkeleton
