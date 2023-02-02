import React from 'react'
import classNames from 'classnames'
import Layout from '../components/layout'
import Seo from '../components/Seo'
import { Link } from 'gatsby'
import { useMediaQuery } from 'usehooks-ts'
import { OhNo, TheRock, Turtle, Saul, Doeu, Blush } from '../components/404'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export default function NotFoundPage() {
  const isMobile = useMediaQuery('(max-width: 768px)') // whether the screen is mobile or not

  const memes = [<Turtle />, <TheRock />, <OhNo />, <Doeu />, <Saul />, <Blush />]
  const randomMeme = memes[Math.floor(Math.random() * memes.length)]

  return (
    <Layout location="Oops">
      <Seo title="Oops" />
      <main className="mx-auto mt-3 flex h-full max-w-4xl flex-col items-start justify-start gap-y-4">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">404: Not Found</h2>
          <p className="font-normal">Not much too see here...</p>
        </div>

        <div className={classNames(isMobile ? 'w-full' : 'grid w-full grid-cols-3 gap-4')}>
          {isMobile ? randomMeme : memes.map((meme, memeIdx) => <div key={`block-${memeIdx}`}>{meme}</div>)}
        </div>

        <div className="flex w-full items-center justify-center">
          <Link
            to="/"
            className="group flex w-full items-center gap-x-2 rounded bg-gradient-to-br from-teal-500 
            via-teal-600 to-teal-700 px-6 py-3 transition hover:opacity-80 lg:w-auto"
          >
            <span>Country roads, take me home!</span>
            <ArrowLongRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
    </Layout>
  )
}
