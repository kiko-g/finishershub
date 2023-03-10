import React from 'react'
import Link from 'next/link'
import Seo from '../components/Seo'
import { AboutCardLI } from '../components/hub'
import Footer from '../components/layout/Footer'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import DarkModeSwitch from '../components/layout/DarkModeSwitch'
import { socials } from '../utils/data'

export default function IndexPage() {
  const nav = [
    {
      name: 'Casino',
      href: '/casino',
      emoji: '🎰',
      description: (
        <>
          Visit our casino, where you can enjoy a random sweet finishing move highlight. Instead of
          losing your money, just press the arrows and get guaranteed entertainment{' '}
          <span className="font-semibold">for free</span>.
        </>
      ),
    },
    {
      name: 'Gallery',
      href: '/gallery',
      emoji: '🖼️',
      description: (
        <>
          Head over to the gallery. It&apos;s like a museum, but with heinous highlights of
          individuals performing the most gruesome and relentless finishing moves ever recorded.
        </>
      ),
    },
    {
      name: 'More',
      href: '/more',
      emoji: '✨',
      description: (
        <>
          Check out the more page to view <span className="font-bold">premium</span> content and
          keep up with updates on the platform. This is a portal to the future and the new
          generation of Finishers Hub.
        </>
      ),
    },
    {
      name: 'Registry',
      href: '/registry',
      emoji: '📊',
      description: (
        <>
          Navigate to the registry where you can see and manage stats related to the the deiabolic
          profession that is performing finishing moves. This is a never seen before view of the
          team of Finishers Hub.
        </>
      ),
    },
    {
      name: 'Lab',
      href: '/lab',
      emoji: '🧪',
      description: (
        <>
          Visit the laboratory of finishers. This is where you can see stats for finishing moves and
          get a closer insight on why we pick the animations we do. If they let us cook, oh{' '}
          <span className="font-bold">we will cook</span>.
        </>
      ),
    },
  ]

  return (
    <>
      <Seo title="Hub" />
      <div
        className="flex min-h-screen flex-col scroll-smooth bg-teal-50 font-prose 
        font-medium text-gray-800 opacity-[99%] dark:bg-navy dark:text-white"
      >
        <main className="flex w-full flex-col gap-y-12">
          {/* Hero */}
          <header className="my-auto flex h-screen w-full flex-col items-center justify-center gap-y-4 self-center align-middle">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-center text-5xl font-extrabold tracking-tight sm:text-6xl">
                Finishers Hub
              </h2>
              <p className="text-center text-lg font-normal">
                The place for all finisher related content. Chaotic, outrageous, lawless on the
                fence of criminality. Perfectly unbalanced. As all things should be.
              </p>
            </div>

            <nav className="flex max-w-5xl flex-wrap items-center justify-center gap-6">
              {nav.map((item) => (
                <Link
                  key={`nav-${item.name}`}
                  href={item.href}
                  className="relative flex max-w-xs scale-100 flex-col gap-y-1 self-stretch rounded-md border-2 border-primary/40 bg-primary/10 p-4 font-light text-gray-800 duration-100 hover:border-primary hover:bg-primary/40 dark:border-secondary/40 dark:bg-secondary/20 dark:text-white dark:hover:border-secondary dark:hover:bg-secondary/40"
                >
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(theme(colors.violet.50),theme(colors.sky.50)),var(theme(colors.violet.50),theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
                  <div className="group flex flex-row items-center justify-between gap-x-2 font-medium">
                    <span className="space-x-2">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-lg">{item.name}</span>
                    </span>

                    <span>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </span>
                  </div>
                  <p className="text-left text-sm">{item.description}</p>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-x-6">
              <div className="flex gap-x-2 sm:justify-center md:mt-0 md:gap-x-2">
                {socials
                  .filter((social) => social.shown)
                  .map((social, socialIdx) => (
                    <Link
                      target="_blank"
                      href={social.url}
                      key={`social-${socialIdx}`}
                      title={social.label}
                      aria-label={social.label}
                      className={`transition ${social.label}`}
                    >
                      <svg
                        className="h-6 w-6 md:h-7 md:w-7"
                        fill="currentColor"
                        viewBox={social.viewBox ? social.viewBox : '0 0 24 24'}
                        aria-hidden="true"
                      >
                        {social.svg.map((d, dIdx) => (
                          <path
                            fillRule="evenodd"
                            d={d}
                            clipRule="evenodd"
                            key={`social-${socialIdx}-svg-${dIdx}`}
                          />
                        ))}
                      </svg>
                    </Link>
                  ))}
              </div>

              <DarkModeSwitch />
            </div>
          </header>

          {/* About */}
          <div className="my-auto mx-auto mb-8 max-w-7xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">About</h2>
            <ul className="mt-3 grid grid-cols-1 gap-y-4 gap-x-4 text-base font-normal tracking-tight lg:mt-6 lg:grid-cols-3 lg:text-lg">
              {/* Description */}
              <AboutCardLI emoji="👋">
                Finishers Hub is a passion project developed by{' '}
                <Link
                  target="_blank"
                  rel="noopener"
                  href="https://linktr.ee/kikogoncalves"
                  className="text-primary underline hover:opacity-80 dark:text-teal-500"
                >
                  Francisco Gonçalves
                </Link>
                , as a result of awesome moments on Warzone that happened mostly between 2020 and
                2021. Everything you can find on the website is related to finishing moves, the
                heart and soul of Finishers Hub.
              </AboutCardLI>

              {/* Home page */}
              <AboutCardLI emoji="🏠">
                The{' '}
                <Link
                  className="text-primary underline hover:opacity-80 dark:text-teal-500"
                  href="/"
                >
                  Home page
                </Link>{' '}
                will show you a museum of highlights, that are pulled from{' '}
                <span className="text-[#6441a5] dark:text-[#976fe1]">Twitch</span> with the help of
                the TwitchAPI.
              </AboutCardLI>

              {/* Casino page */}
              <AboutCardLI emoji="🎰">
                The{' '}
                <Link
                  className="text-primary underline hover:opacity-80 dark:text-teal-500"
                  href="/casino"
                >
                  Casino page
                </Link>{' '}
                acts like the home page with a twist: instead of a museum you can view a random new
                highlight by pressing the arrows. It&apos;s called casino because it acts like a
                slot machine of finishing moves.
              </AboutCardLI>

              {/* Registry page */}
              <AboutCardLI emoji="📅">
                The{' '}
                <Link
                  className="text-primary underline hover:opacity-80 dark:text-teal-500"
                  href="/registry"
                >
                  Registry page
                </Link>{' '}
                is where you can find information and stats about the Finishers Club members. It
                also works as a platform to register new finishing moves for official members of the
                closed exclusive agency that is Finishers Club.
              </AboutCardLI>

              {/* Fact #1 */}
              <AboutCardLI emoji="🤯">
                <strong>Fun fact</strong>: all the content in the home page comes from a pool of
                around <strong>600 clips</strong>. However, they only capture around{' '}
                <strong>10%</strong> of all the finishing moves performed by Finishers Club as of
                September 2021.
              </AboutCardLI>

              {/* Fact #2 */}
              <AboutCardLI emoji="💻">
                Finishers Club will keep growing, and there are plans to add new sources of media,
                and further admin features like adding clips manually.
              </AboutCardLI>

              {/* Disclaimer */}
              <AboutCardLI emoji="🧊" extraClassNames="col-span-1 lg:col-span-3">
                Don&apos;t take anything too seriously, this is just for fun!
              </AboutCardLI>
            </ul>
          </div>

          <Footer siteTitle="Finishers Hub" />
        </main>
      </div>
    </>
  )
}
