import React from 'react'
import Link from 'next/link'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

type NavItem = {
  name: string
  href: string
  emoji: string
  description: JSX.Element
}

type Props = {
  item: NavItem
}

export default function NavCard({ item }: Props) {
  return (
    <Link
      key={`nav-${item.name}`}
      href={item.href}
      className="group relative flex max-w-[10rem] scale-100 flex-col gap-y-1 self-stretch rounded-md border border-navy/50 bg-navy/50 px-2 py-1.5 font-light text-white duration-100 hover:scale-105 hover:border-sky-800 hover:bg-sky-500/70 dark:border-slate-200 dark:bg-slate-800/60 dark:text-white dark:hover:border-white dark:hover:bg-violet-400/50 md:max-w-xs md:border-2 md:px-4 md:py-4"
    >
      <div className="group flex flex-row items-center justify-between gap-x-2 font-medium">
        <span className="space-x-1 md:space-x-2">
          <span className="text-sm md:text-lg">{item.emoji}</span>
          <span className="text-sm md:text-lg">{item.name}</span>
        </span>
        <span>
          <ArrowLongRightIcon className="h-5 w-5 group-hover:animate-bounce-horizontal md:h-6 md:w-6" />
        </span>
      </div>
      <p className="text-left text-xs leading-snug tracking-tight md:text-left md:text-sm md:leading-normal md:tracking-normal">
        {item.description}
      </p>
    </Link>
  )
}
