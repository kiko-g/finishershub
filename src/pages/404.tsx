import React from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import { Link } from 'gatsby'
import { useMediaQuery } from 'usehooks-ts'
import { OhNo, TheRock, Turtle } from '../components/404'

const NotFoundPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)') // whether the screen is mobile or not

  return (
    <Layout location="Oops">
      <Seo title="Oops" />
      <main className="mx-auto flex max-w-4xl flex-col items-start justify-start gap-y-4">
        <header className="flex flex-col gap-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">404: Not Found</h2>
          <p className="font-normal">
            Not much too see here... You just hit a route that doesn&#39;t exist... the sadness.
          </p>
        </header>
        {isMobile ? (
          <div className="w-full">
            <TheRock />
          </div>
        ) : (
          <div className="grid w-full grid-cols-3 gap-4">
            <Turtle />
            <TheRock />
            <OhNo />
          </div>
        )}

        <footer className="w-full">
          <Link
            to="/"
            className="inline-flex w-full rounded bg-gradient-to-r from-tertiary via-secondary to-indigo-500 
            p-[2px] transition focus:outline-none focus:ring active:text-opacity-75"
          >
            <span
              className="flex w-full items-center justify-center space-x-2 rounded-sm bg-white px-6  py-3
              font-medium transition hover:bg-transparent hover:text-white dark:text-gray-800 dark:hover:text-white"
            >
              Country roads, take me home!
            </span>
          </Link>
        </footer>
      </main>
    </Layout>
  )
}

export default NotFoundPage
