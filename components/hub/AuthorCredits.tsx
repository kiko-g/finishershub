import React from "react"
import Link from "next/link"

type Props = {}

export default function AuthorCredits({}: Props) {
  return (
    <Link
      target="_blank"
      href="https://kikogoncalves.com"
      className="z-50 rounded-full bg-slate-800/40 px-2.5 py-1.5 text-sm font-normal text-white transition hover:bg-slate-800 hover:shadow dark:bg-slate-800/40 dark:hover:bg-slate-800"
    >
      by Francisco Gonçalves
    </Link>
  )
}
