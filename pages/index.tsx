import React from 'react'
import Link from 'next/link'
import Seo from '../components/Seo'
import { socials } from '../utils/data'
import { Footer, DarkModeSwitch } from '../components/layout'
import { AboutCardLI, AccessModalCTA, NavCard, DeleteData, FinishersInfo } from '../components/hub'
import useAccessDenied from '../hooks/useAccessDenied'

export default function Hub() {
  const [accessDenied, setAccessDenied] = useAccessDenied()
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
          Navigate to the registry where you can see and manage stats related to the the diabolic
          profession that is performing finishing moves.
        </>
      ),
    },
    {
      name: 'Lab',
      href: '/lab',
      emoji: '🧪',
      description: (
        <>
          Visit the laboratory of finishers. This is where you can consult premium research findings
          and gain insight on our unholy and wicked methodology. If they let us cook, oh{' '}
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
        <div className="blob" />
        <main className="flex w-full flex-col gap-y-16 px-4 pt-8 md:py-0 md:px-4">
          {/* Hero */}
          <header className="my-auto flex min-h-full w-full flex-col items-center justify-center gap-y-8 self-center align-middle md:min-h-screen">
            <div className="max-w-2xl space-y-2">
              <h2 className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent dark:bg-gradient-to-r dark:from-slate-200 dark:to-slate-300 sm:text-6xl">
                Finishers Hub
              </h2>
              <p className="text-center text-base font-normal leading-tight md:text-lg md:leading-normal">
                The place for all finisher related content. Chaotic, outrageous, lawless on the
                fence of criminality. Perfectly unbalanced. As all things should be.
              </p>
            </div>

            <nav className="flex max-w-full flex-wrap items-center justify-center gap-3 md:max-w-5xl md:gap-6">
              {nav.map((item, itemIdx) => (
                <NavCard key={`nav-${itemIdx}`} item={item} />
              ))}
            </nav>

            <div className="mt-2 flex items-center gap-x-6 rounded-full bg-blue-50 px-4 py-2 dark:bg-blue-100/70">
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
              <DarkModeSwitch alt />
            </div>

            <div>
              <Link
                target="_blank"
                href="https://kikogoncalves.com"
                className="rounded-full bg-navy/50 px-2.5 py-1.5 text-sm font-normal text-gray-100 transition hover:bg-cyan-700/50 dark:text-white dark:hover:bg-violet-400/50"
              >
                by Francisco Gonçalves
              </Link>
            </div>
          </header>

          {/* Get full access */}
          <section id="access" className="my-auto mx-auto mb-16 flex max-w-6xl flex-col space-y-4">
            <div className="flex items-center justify-start gap-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {accessDenied ? (
                  <span className="text-rose-700 dark:text-rose-600">Get</span>
                ) : (
                  <span className="text-teal-700 dark:text-teal-500">You have</span>
                )}{' '}
                full access
              </h2>
            </div>

            <p className="font-normal">
              Performing finishing moves is hectic, intense, and on a very gray moral area. As one
              can imagine things get a little out of hand. The heat of the moment can only be
              reviewed by worthy visitors, capable of embracing the beauty and tragic nature of
              finishers. For that matter, we have protected our audio content, so that guests can
              view only a limited amount of content on this platform of pure joy and insanity. Enter
              the secret code on the form to gain full access to Finishers Hub.
            </p>

            <div className="flex justify-end">
              {accessDenied ? (
                <AccessModalCTA lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
              ) : (
                <DeleteData />
              )}
            </div>
          </section>

          <section id="info" className="my-auto mx-auto mb-16 flex max-w-6xl flex-col space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Facts and figures</h2>
            <FinishersInfo />
          </section>

          {/* About */}
          <section id="about" className="my-auto mx-auto mb-16 max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About</h2>
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
              <AboutCardLI emoji="🍿">
                The{' '}
                <Link
                  className="text-primary underline hover:opacity-80 dark:text-teal-500"
                  href="/gallery"
                >
                  gallery page
                </Link>{' '}
                will show you a museum of highlights, that are pulled from{' '}
                <span className="line-through">
                  <span className="text-[#6441a5] dark:text-[#976fe1]">Twitch</span> with the help
                  of the TwitchAPI
                </span>{' '}
                an S3 Bucket, where we manage our media content 🆕
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
                <strong>Fun fact</strong>: all the video content comes from a pool of around{' '}
                <strong>700 clips</strong>. However, they only capture around <strong>5%</strong> of
                all the finishing moves performed by Finishers Club as of March 2023.
              </AboutCardLI>

              {/* Fact #2 */}
              <AboutCardLI emoji="💻">
                Finishers Club will keep growing, and there are plans to add new sources of media,
                and further admin features like <strong>adding clips manually</strong>.
              </AboutCardLI>

              {/* Disclaimer */}
              <AboutCardLI emoji="🧊" extraClassNames="col-span-1 lg:col-span-3">
                Don&apos;t take anything too seriously, this is just for fun!
              </AboutCardLI>
            </ul>
          </section>
        </main>
        <Footer siteTitle="Finishers Hub" />
      </div>
    </>
  )
}
