import React from 'react'
import Layout from '../components/layout'
import { TwitterAdBanner } from '../components/more'

type Props = {}

export default function MorePage({}: Props) {
  return (
    <Layout location="More">
      <main className="mb-12 flex flex-col gap-6 px-0 lg:px-4">
        <header className="flex flex-col justify-center gap-2">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Finishers Extra</h2>
          <p className="grow text-lg font-normal">
            Worthy information about updates and what to expect in the future.
          </p>
        </header>

        <TwitterAdBanner />
      </main>
    </Layout>
  )
}