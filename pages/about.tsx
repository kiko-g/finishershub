import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import CardLI from '../components/about/CardLI'

export default function AboutPage() {
  return (
    <Layout location="About" background>
      <div className="my-auto mx-auto max-w-7xl">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About</h2>
        <ul className="mt-3 grid grid-cols-1 gap-y-4 gap-x-4 text-base font-normal tracking-tight lg:mt-6 lg:grid-cols-3 lg:text-lg">
          {/* Description */}
          <CardLI emoji="👋">
            Finishers Hub is a passion project developed by{' '}
            <Link
              target="_blank"
              rel="noopener"
              href="https://linktr.ee/kikogoncalves"
              className="text-primary underline hover:opacity-80 dark:text-teal-500"
            >
              Francisco Gonçalves
            </Link>
            , as a result of awesome moments on Warzone that happened mostly between 2020 and 2021.
            Everything you can find on the website is related to finishing moves, the heart and soul
            of Finishers Hub.
          </CardLI>

          {/* Home page */}
          <CardLI emoji="🏠">
            The{' '}
            <Link className="text-primary underline hover:opacity-80 dark:text-teal-500" href="/">
              Home page
            </Link>{' '}
            will show you a museum of highlights, that are pulled from{' '}
            <span className="text-[#6441a5] dark:text-[#976fe1]">Twitch</span> with the help of the
            TwitchAPI.
          </CardLI>

          {/* Casino page */}
          <CardLI emoji="🎰">
            The{' '}
            <Link
              className="text-primary underline hover:opacity-80 dark:text-teal-500"
              href="/casino"
            >
              Casino page
            </Link>{' '}
            acts like the home page with a twist: instead of a museum you can view a random new
            highlight by pressing the arrows. It&apos;s called casino because it acts like a slot
            machine of finishing moves.
          </CardLI>

          {/* Registry page */}
          <CardLI emoji="📅">
            The{' '}
            <Link
              className="text-primary underline hover:opacity-80 dark:text-teal-500"
              href="/registry"
            >
              Registry page
            </Link>{' '}
            is where you can find information and stats about the Finishers Club members. It also
            works as a platform to register new finishing moves for official members of the closed
            exclusive agency that is Finishers Club.
          </CardLI>

          {/* Fact #1 */}
          <CardLI emoji="🤯">
            <strong>Fun fact</strong>: all the content in the home page comes from a pool of around{' '}
            <strong>600 clips</strong>. However, they only capture around <strong>10%</strong> of
            all the finishing moves performed by Finishers Club as of September 2021.
          </CardLI>

          {/* Fact #2 */}
          <CardLI emoji="💻">
            Finishers Club will keep growing, and there are plans to add new sources of media, and
            further admin features like adding clips manually.
          </CardLI>

          {/* Disclaimer */}
          <CardLI emoji="🧊" extraClassNames="col-span-1 lg:col-span-3">
            Don&apos;t take anything too seriously, this is just for fun!
          </CardLI>
        </ul>
      </div>
    </Layout>
  )
}
