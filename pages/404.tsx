import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import { useMediaQuery } from 'usehooks-ts'
import { OhNo, TheRock, Turtle, Saul, Doeu, Blush } from '../components/404'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function NotFoundPage() {
  const isMobile = useMediaQuery('(max-width: 768px)') // whether the screen is mobile or not

  const memes = [
    <Turtle key="turtle" />,
    <TheRock key="rock" />,
    <OhNo key="ohno" />,
    <Doeu key="doeu" />,
    <Saul key="saul" />,
    <Blush key="blush" />,
  ]

  return (
    <Layout location="Oops">
      <main className="mx-auto mt-3 flex h-full max-w-4xl flex-col items-start justify-start gap-y-4">
        <div className="flex w-full flex-col items-start justify-between gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">404: Not Found</h2>
            <p className="font-normal">Not much too see here...</p>
          </div>

          <div className="w-full self-stretch lg:w-auto lg:self-auto">
            <Link
              href="/"
              className="group flex h-full w-full items-center justify-center gap-x-2 rounded 
              bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 px-6 py-4 text-white 
              transition hover:opacity-80 lg:w-auto"
            >
              <span className="font-normal tracking-tight">Country roads, take me home!</span>
              <ArrowLongRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {memes.map((meme, memeIdx) => (
            <div key={`block-${memeIdx}`}>{meme}</div>
          ))}
        </div>
      </main>
    </Layout>
  )
}