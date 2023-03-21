import React from 'react'
import { Layout } from '../components/layout'
import { TwitterAdBanner, YoutubeAdBanner } from '../components/more'

type Props = {}

export default function More({}: Props) {
  return (
    <Layout location="More">
      <main className="mb-12 flex flex-col gap-4 px-0 lg:px-4">
        <header className="flex flex-col justify-center gap-1">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Finishers Extra</h2>
          <p className="grow text-lg font-normal">
            Worthy information about updates and what to expect in the future.
          </p>
        </header>

        <TwitterAdBanner />
        <YoutubeAdBanner />
      </main>
    </Layout>
  )
}
