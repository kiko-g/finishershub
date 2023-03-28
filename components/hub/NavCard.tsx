import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

type NavItem = {
  name: string
  href: string
  emoji: string
  description: JSX.Element
}

type Props = {
  item: NavItem
  border?: boolean
}

export default function NavCard({ item, border = false }: Props) {
  return (
    <Link
      key={`nav-${item.name}`}
      href={item.href}
      className={classNames(
        border
          ? `border border-transparent hover:border-sky-500 dark:border-transparent dark:hover:border-white md:border-2`
          : ``,
        `group relative flex max-w-[10rem] scale-100 flex-col gap-y-1 self-stretch rounded-md bg-sky-700/70 px-2 py-1.5 font-light text-white shadow-xl duration-100 hover:scale-105 hover:bg-sky-600/60 dark:bg-indigo-400/50 dark:text-white dark:hover:bg-indigo-400/70 md:max-w-xs md:px-4 md:py-4`
      )}
    >
      <div className="group flex flex-row items-center justify-between gap-x-2 font-medium">
        <span className="space-x-1 md:space-x-2">
          <span className="text-sm md:text-lg">{item.emoji}</span>
          <span className="text-sm md:text-lg">{item.name}</span>
        </span>
        <span>
          <ArrowLongRightIcon className="h-5 w-5 transition group-hover:-rotate-45 md:h-6 md:w-6" />
        </span>
      </div>
      <p className="text-left text-xs leading-snug tracking-tight md:text-left md:text-sm md:leading-normal md:tracking-normal">
        {item.description}
      </p>
    </Link>
  )
}
