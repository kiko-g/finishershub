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
      className="relative flex max-w-[10rem] scale-100 flex-col gap-y-1 self-stretch rounded-md border border-primary/40 bg-gradient-to-tr from-indigo-500/10 via-blue-500/10 to-emerald-500/10 px-2 py-1.5 font-light text-gray-800 duration-100 hover:scale-105 hover:border-primary dark:border-gray-400/60 dark:bg-secondary/20 dark:bg-gradient-to-br dark:from-indigo-500/30 dark:via-blue-500/30 dark:to-teal-500/30 dark:text-white dark:hover:border-slate-200 md:max-w-xs md:border-2 md:px-4 md:py-4"
    >
      <div className="group flex flex-row items-center justify-between gap-x-2 font-medium">
        <span className="space-x-1 md:space-x-2">
          <span className="text-sm md:text-lg">{item.emoji}</span>
          <span className="text-sm md:text-lg">{item.name}</span>
        </span>
        <span>
          <ArrowLongRightIcon className="h-5 w-5 md:h-6 md:w-6" />
        </span>
      </div>
      <p className="text-left text-xs leading-snug tracking-tight md:text-left md:text-sm md:leading-normal md:tracking-normal">
        {item.description}
      </p>
    </Link>
  )
}
