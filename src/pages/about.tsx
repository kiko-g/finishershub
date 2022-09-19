import React from 'react'
import Layout from '../layout'
import Seo from '../components/Seo'
import '../styles/pages/about.css'
import { Link } from 'gatsby'

const AboutPage = () => (
  <Layout location="About" background={true} wrapperClassNames="max-w-7xl">
    <Seo title="About" />
    <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">About</h2>
    <div className="mt-3 rounded bg-light px-4 py-4 lg:px-8 lg:py-6 dark:bg-dark">
      <ul className="flex flex-col gap-y-3 font-normal">
        <li>
          👋 Finishers Hub is a passion project developed by{' '}
          <a
            target="_blank"
            rel="noopener"
            href="https://linktr.ee/kikogoncalves"
            className="text-primary underline hover:opacity-80 dark:text-teal-500"
          >
            Francisco Gonçalves
          </a>
          , as a result of awesome moments on Warzone that happened mostly between 2020 and 2021. Everything you can
          find on the website is related to finishing moves, the heart and soul of Finishers Hub.
        </li>
        <li>
          🏠 The{' '}
          <Link className="text-primary underline hover:opacity-80 dark:text-teal-500" to="/">
            Home page
          </Link>{' '}
          will show you a museum of highlights, that are pulled from{' '}
          <span className="text-[#6441a5] dark:text-[#976fe1]">Twitch</span> with the help of the TwitchAPI.
        </li>
        <li>
          🎰 The{' '}
          <Link className="text-primary underline hover:opacity-80 dark:text-teal-500" to="/">
            Casino page
          </Link>{' '}
          acts like the home page with a twist: instead of a museum you can view a random new highlight by pressing the
          arrows. It's called casino because it acts like a slot machine of finishing moves.
        </li>
        <li>
          📅 The{' '}
          <Link className="text-primary underline hover:opacity-80 dark:text-teal-500" to="/">
            Registry page
          </Link>{' '}
          is where you can find information and stats about the Finishers Club members. It also works as a platform to
          register new finishing moves for official members of the closed exclusive agency that is Finishers Club.
        </li>
        <li>
          🤯 <strong>Fun fact</strong>: all the content in the home page comes from a pool of around{' '}
          <strong>600 clips</strong>. However, they only capture around <strong>10%</strong> of all the finishing moves
          performed by Finishers Club as of September 2021.
        </li>
        <li>
          💻 Finishers Club will keep growing, and there are plans to add new sources of media, and further admin
          features like adding clips manually.
        </li>
        <li>
          🧊 <span className="italic"> Don't take anything too seriously, this is just for fun!</span>
        </li>
      </ul>
    </div>
  </Layout>
)

export default AboutPage
