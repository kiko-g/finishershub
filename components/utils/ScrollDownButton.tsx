import Link from 'next/link'
import React from 'react'

type Props = {
  href: string
}

export default function ScrollDownButton({ href }: Props) {
  if (!href || !href.startsWith('#')) return null

  return (
    <Link
      href={href}
      scroll={false}
      className="hover:.outline-white .outline hover:.outline-offset-4 active:.outline-offset-2 absolute bottom-4 right-1/2 z-10 flex aspect-square w-fit min-w-max basis-1 translate-x-1/2 items-center justify-center gap-2 rounded-full  bg-primary/20 p-2 px-5 text-center text-sm font-medium outline-primary/50 backdrop-blur-sm transition-all hover:!bg-white hover:bg-slate-700/50 hover:bg-opacity-100 hover:!text-primary active:bg-opacity-90 md:text-base"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        height="20"
        className="inline text-slate-100"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7"></path>
      </svg>
    </Link>
  )
}
