import React from 'react'
import Link from 'next/link'
import { Seo } from '../components/layout'
import { OhNo, TheRock, Frankie, Turtle, Saul, Doeu, Blush } from '../components/404'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  const memes = [
    <Turtle key="turtle" />,
    <TheRock key="rock" />,
    <OhNo key="ohno" />,
    <Doeu key="doeu" />,
    <Saul key="saul" />,
    <Blush key="blush" />,
  ]

  return (
    <>
      <Seo title="Hub" />
      <main className="mx-auto mt-0 flex h-full min-h-screen flex-col items-center justify-center gap-y-4 bg-primary/10">
        <div className="max-w-4xl">
          <div className="flex w-full flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-y-1">
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">404: Not Found</h2>
              <p className="font-normal">Not much too see here...</p>
            </div>

            <div className="w-full self-stretch lg:w-auto lg:self-auto">
              <Link
                href="/"
                className="group flex h-full w-full items-center justify-center gap-x-2 rounded bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 px-6 py-4 text-white transition hover:opacity-80 lg:w-auto"
              >
                <span className="font-normal tracking-tight">Country roads, take me home!</span>
                <ArrowLongRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-2 mb-2 flex w-full md:hidden">
            <Frankie />
          </div>

          <div className="mt-2 hidden w-full gap-3 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
            {memes.map((meme, memeIdx) => (
              <div key={`block-${memeIdx}`}>{meme}</div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
