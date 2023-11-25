import React, { Dispatch, SetStateAction } from "react"
import classNames from "classnames"
import Link from "next/link"
import useAccessDenied from "@/hooks/useAccessDenied"
import { socials } from "@/utils/data"
import { AccessModalCTA, DarkModeSwitch, DeleteData, Footer, Seo } from "@/components/layout"
import { MostRecentVideoShowcase } from "@/components/videos"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"

export default function Hub() {
  const [accessDenied, setAccessDenied] = useAccessDenied()

  return (
    <>
      <Seo title="Hub" />
      <div className="flex min-h-screen flex-col scroll-smooth bg-teal-50 font-prose font-medium text-gray-800 opacity-[99%] dark:bg-navy dark:text-white">
        <div className="blob" />
        <header
          id="hero"
          className="my-auto flex min-h-full w-full flex-col items-center justify-center gap-y-4 self-center py-4 align-middle md:min-h-screen"
        >
          <div className="mt-4 max-w-2xl space-y-2 lg:mt-0">
            <h2 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent dark:bg-gradient-to-r dark:from-slate-200 dark:to-slate-300 sm:text-6xl">
              Finishers Hub
            </h2>
            <p className="text-center text-base font-normal leading-tight md:text-lg md:leading-normal">
              The place for all finisher related content. Chaotic, outrageous, lawless on the fence of criminality.
              Perfectly unbalanced. As all things should be.
            </p>
          </div>

          <Scrollers />
          <NavigationCards />
          <Socials />
          <AuthorCredits />
        </header>

        <main className="flex w-full flex-col gap-y-16 px-4 pt-8 md:px-4 md:py-0">
          <MostRecentHighlight />
          <GetFullAccess accessDeniedHook={[accessDenied, setAccessDenied]} />
          <ImportantFacts />
          <About />
        </main>

        <Footer siteTitle="Finishers Hub" />
      </div>
    </>
  )
}

function Scrollers() {
  const scrollers = [
    { name: "Catalogue", icon: "🖼️", href: "#showcase" },
    { name: "Access", icon: "🔐", href: "#access" },
    { name: "Facts", icon: "✅", href: "#info" },
    { name: "About", icon: "🔍", href: "#about" },
  ]

  return (
    <div className="flex max-w-full flex-wrap items-center gap-2 md:max-w-4xl md:gap-4">
      {scrollers.map((item, itemIdx) => (
        <Link
          scroll={false}
          href={item.href}
          key={`scroller-${itemIdx}`}
          className="space-x-1 rounded bg-slate-700/70 px-2 py-1.5 text-xs font-normal tracking-tight text-white shadow-xl transition hover:-translate-y-1 hover:bg-slate-700/80 dark:bg-slate-500/70 dark:text-white dark:hover:bg-slate-500/60 md:px-3 md:py-2 md:text-sm"
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  )
}

type NavItem = {
  name: string
  href: string
  emoji: string
  shown: boolean
  description: JSX.Element
}

function NavCard({ item, border = false }: { item: NavItem; border?: boolean }) {
  return (
    <Link
      key={`nav-${item.name}`}
      href={item.href}
      className={classNames(
        border
          ? `border border-transparent hover:border-primary dark:border-transparent dark:hover:border-white md:border-2`
          : ``,
        `group relative flex max-w-[10rem] scale-100 flex-col gap-y-1 self-stretch rounded-md bg-primary/80 px-2 py-1.5 font-light text-white shadow-xl duration-100 hover:scale-105 hover:bg-primary/70 dark:bg-secondary/50 dark:text-white dark:hover:bg-secondary/70 md:max-w-xs md:px-4 md:py-4`,
      )}
    >
      <div className="group flex flex-row items-center justify-between gap-x-2 font-medium">
        <span className="space-x-1 md:space-x-2">
          <span className="text-sm md:text-lg">{item.emoji}</span>
          <span className="text-sm md:text-lg">{item.name}</span>
        </span>
        <span>
          <ArrowLongRightIcon className="h-5 w-5 transition group-hover:-rotate-45 md:h-6 md:w-6" />
        </span>
      </div>
      <p className="text-left text-xs leading-snug tracking-tight md:text-left md:text-sm md:leading-normal md:tracking-normal">
        {item.description}
      </p>
    </Link>
  )
}

function NavigationCards() {
  const nav = [
    {
      name: "Casino",
      href: "/casino",
      emoji: "🎰",
      shown: true,
      description: (
        <>
          Visit our casino, where you can enjoy a random sweet finishing move highlight. Instead of losing your money,
          just press the arrows and get <span className="font-semibold">guaranteed entertainment</span>.
        </>
      ),
    },
    {
      name: "Videos",
      href: "/videos",
      emoji: "🎬",
      shown: true,
      description: (
        <>
          Get the full experience and control what content you consume. Filter by tags, map, location and artists. The
          possibilities aren&apos;t endless but this we get pretty damn close.
        </>
      ),
    },
    {
      name: "Lab",
      href: "/lab",
      emoji: "🧪",
      shown: true,
      description: (
        <>
          Visit the finishers lab. This is where you can consult premium research findings and gain insight on our
          unholy and wicked methodology. You let us in the kitchen so <span className="font-bold">we cooked</span>.
        </>
      ),
    },
    {
      name: "Registry",
      href: "/registry",
      emoji: "📊",
      shown: true,
      description: (
        <>
          Navigate to the registry where you can see and manage stats related to the the diabolic profession that is
          performing finishing moves.
        </>
      ),
    },
    {
      name: "Create",
      href: "/create",
      emoji: "📁",
      shown: true,
      description: (
        <>
          Upload your own finishing move highlight to the platform. This is a{" "}
          <span className="font-bold">members-only</span> space Finishers Club associates to contribute to the platform
          and share their own content.
        </>
      ),
    },
    {
      name: "Admin",
      href: "/admin",
      emoji: "🏢",
      shown: true,
      description: (
        <>
          Edit and manage the information associated to the videos on the platform. This is a{" "}
          <span className="font-bold">members-only</span> space: you need full access to use the features in this page.
        </>
      ),
    },
    {
      name: "More",
      href: "/more",
      emoji: "✨",
      shown: true,
      description: (
        <>
          Check out the more page to view <span className="font-bold">premium</span> content and keep up with updates on
          the platform. This is a portal to the future and the new generation of Finishers Hub.
        </>
      ),
    },
  ]

  return (
    <nav className="flex max-w-full flex-wrap items-center justify-center gap-3 md:max-w-full md:gap-6">
      {nav
        .filter(({ shown }) => shown)
        .map((item, itemIdx) => (
          <NavCard key={`nav-${itemIdx}`} item={item} />
        ))}
    </nav>
  )
}

function Socials() {
  return (
    <div className="mt-2 flex items-center gap-x-6 rounded-full bg-blue-50 px-4 py-2 shadow-xl dark:bg-blue-100/80">
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
                className="h-5 w-5 lg:h-6 lg:w-6"
                fill="currentColor"
                viewBox={social.viewBox ? social.viewBox : "0 0 24 24"}
                aria-hidden="true"
              >
                {social.svg.map((d, dIdx) => (
                  <path fillRule="evenodd" d={d} clipRule="evenodd" key={`social-${socialIdx}-svg-${dIdx}`} />
                ))}
              </svg>
            </Link>
          ))}
      </div>
      <DarkModeSwitch />
    </div>
  )
}

function AuthorCredits() {
  return (
    <Link
      target="_blank"
      href="https://kikogoncalves.com"
      className="z-50 rounded-full bg-slate-800/40 px-2.5 py-1.5 text-sm font-normal text-white transition hover:bg-slate-800 hover:shadow dark:bg-slate-800/40 dark:hover:bg-slate-800"
    >
      by Francisco Gonçalves
    </Link>
  )
}

function MostRecentHighlight() {
  return (
    <section id="showcase" className="mx-auto my-auto mb-8 flex max-w-5xl flex-col space-y-3 py-4">
      <Link href="#showcase" scroll={false} className="group flex items-center gap-x-2 transition hover:opacity-80">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Most recent highlight</h2>
        <span className="hidden text-2xl group-hover:flex sm:text-3xl">🔗</span>
      </Link>
      <p className="font-normal">
        Here is the most recently uploaded highlight to the platform. Check back here to stay in touch with the latest
        content.
      </p>
      <MostRecentVideoShowcase />
    </section>
  )
}

function GetFullAccess({ accessDeniedHook }: { accessDeniedHook: [boolean, Dispatch<SetStateAction<boolean>>] }) {
  const [accessDenied, setAccessDenied] = accessDeniedHook

  return (
    <section id="access" className="mx-auto my-auto mb-8 flex max-w-5xl flex-col space-y-3 py-4">
      <div className="flex items-center justify-start gap-3">
        <Link href="#access" scroll={false} className="group flex items-center gap-x-2 transition hover:opacity-80">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {accessDenied ? (
              <span className="text-rose-700 dark:text-rose-600">Get</span>
            ) : (
              <span className="text-teal-700 dark:text-secondary">You have</span>
            )}{" "}
            full access
          </h2>
          <span className="hidden text-2xl group-hover:flex sm:text-3xl">🔗</span>
        </Link>
      </div>

      <p className="font-normal">
        Performing finishing moves is hectic, intense, and on a very gray moral area. As one can imagine things get a
        little out of hand. The heat of the moment can only be reviewed by worthy visitors, capable of embracing the
        beauty and tragic nature of finishers. For that matter, we have protected our audio content, so that guests can
        view only a limited amount of content on this platform of pure joy and insanity. Enter the secret code on the
        form to gain full access to Finishers Hub.
      </p>

      <div className="flex justify-end">
        {accessDenied ? (
          <AccessModalCTA lockedHook={[accessDenied, setAccessDenied]} startOpen={false} />
        ) : (
          <DeleteData />
        )}
      </div>
    </section>
  )
}

function ImportantFacts() {
  return (
    <section id="info" className="mx-auto my-auto mb-8 flex max-w-5xl flex-col space-y-3 py-4">
      <Link href="#info" scroll={false} className="group flex items-center gap-x-2 transition hover:opacity-80">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Important Facts</h2>
        <span className="hidden text-2xl group-hover:flex sm:text-3xl">🔗</span>
      </Link>

      <div className="flex rounded border border-slate-200 bg-white px-6 py-6 text-sm tracking-tight dark:border-slate-300/10 dark:bg-slate-800/50 lg:px-8 lg:py-8 lg:text-base lg:tracking-normal">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 32"
          fill="none"
          className="h-6 w-6 flex-none [--icon-background:theme(colors.white)] [--icon-foreground:theme(colors.slate.900)] lg:h-8 lg:w-8"
        >
          <defs>
            <radialGradient
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              id=":R189n6:-gradient"
              gradientTransform="matrix(0 21 -21 0 20 11)"
            >
              <stop stopColor="#0EA5E9"></stop>
              <stop stopColor="#22D3EE" offset=".527"></stop>
              <stop stopColor="#818CF8" offset="1"></stop>
            </radialGradient>
            <radialGradient
              cx="0"
              cy="0"
              r="1"
              id=":R189n6:-gradient-dark"
              gradientUnits="userSpaceOnUse"
              gradientTransform="matrix(0 24.5001 -19.2498 0 16 5.5)"
            >
              <stop stopColor="#0EA5E9"></stop>
              <stop stopColor="#22D3EE" offset=".527"></stop>
              <stop stopColor="#818CF8" offset="1"></stop>
            </radialGradient>
          </defs>
          <g className="dark:hidden">
            <circle cx="20" cy="20" r="12" fill="url(#:R189n6:-gradient)"></circle>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 24.995c0-1.855 1.094-3.501 2.427-4.792C24.61 18.087 26 15.07 26 12.231 26 7.133 21.523 3 16 3S6 7.133 6 12.23c0 2.84 1.389 5.857 3.573 7.973C10.906 21.494 12 23.14 12 24.995V27a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.005Z"
              className="fill-[var(--icon-background)]"
              fillOpacity="0.5"
            ></path>
            <path
              d="M25 12.23c0 2.536-1.254 5.303-3.269 7.255l1.391 1.436c2.354-2.28 3.878-5.547 3.878-8.69h-2ZM16 4c5.047 0 9 3.759 9 8.23h2C27 6.508 21.998 2 16 2v2Zm-9 8.23C7 7.76 10.953 4 16 4V2C10.002 2 5 6.507 5 12.23h2Zm3.269 7.255C8.254 17.533 7 14.766 7 12.23H5c0 3.143 1.523 6.41 3.877 8.69l1.392-1.436ZM13 27v-2.005h-2V27h2Zm1 1a1 1 0 0 1-1-1h-2a3 3 0 0 0 3 3v-2Zm4 0h-4v2h4v-2Zm1-1a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2Zm0-2.005V27h2v-2.005h-2ZM8.877 20.921C10.132 22.136 11 23.538 11 24.995h2c0-2.253-1.32-4.143-2.731-5.51L8.877 20.92Zm12.854-1.436C20.32 20.852 19 22.742 19 24.995h2c0-1.457.869-2.859 2.122-4.074l-1.391-1.436Z"
              className="fill-[var(--icon-foreground)]"
            ></path>
            <path
              d="M20 26a1 1 0 1 0 0-2v2Zm-8-2a1 1 0 1 0 0 2v-2Zm2 0h-2v2h2v-2Zm1 1V13.5h-2V25h2Zm-5-11.5v1h2v-1h-2Zm3.5 4.5h5v-2h-5v2Zm8.5-3.5v-1h-2v1h2ZM20 24h-2v2h2v-2Zm-2 0h-4v2h4v-2Zm-1-10.5V25h2V13.5h-2Zm2.5-2.5a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5a2.5 2.5 0 0 0-2.5-2.5v2a.5.5 0 0 1 .5.5h2ZM18.5 18a3.5 3.5 0 0 0 3.5-3.5h-2a1.5 1.5 0 0 1-1.5 1.5v2ZM10 14.5a3.5 3.5 0 0 0 3.5 3.5v-2a1.5 1.5 0 0 1-1.5-1.5h-2Zm2.5-3.5a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5a2.5 2.5 0 0 0-2.5-2.5v2a.5.5 0 0 1 .5.5h2Z"
              className="fill-[var(--icon-foreground)]"
            ></path>
          </g>
          <g className="hidden dark:inline">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 2C10.002 2 5 6.507 5 12.23c0 3.144 1.523 6.411 3.877 8.691.75.727 1.363 1.52 1.734 2.353.185.415.574.726 1.028.726H12a1 1 0 0 0 1-1v-4.5a.5.5 0 0 0-.5-.5A3.5 3.5 0 0 1 9 14.5V14a3 3 0 1 1 6 0v9a1 1 0 1 0 2 0v-9a3 3 0 1 1 6 0v.5a3.5 3.5 0 0 1-3.5 3.5.5.5 0 0 0-.5.5V23a1 1 0 0 0 1 1h.36c.455 0 .844-.311 1.03-.726.37-.833.982-1.626 1.732-2.353 2.354-2.28 3.878-5.547 3.878-8.69C27 6.507 21.998 2 16 2Zm5 25a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1 3 3 0 0 0 3 3h4a3 3 0 0 0 3-3Zm-8-13v1.5a.5.5 0 0 1-.5.5 1.5 1.5 0 0 1-1.5-1.5V14a1 1 0 1 1 2 0Zm6.5 2a.5.5 0 0 1-.5-.5V14a1 1 0 1 1 2 0v.5a1.5 1.5 0 0 1-1.5 1.5Z"
              fill="url(#:R189n6:-gradient-dark)"
            ></path>
          </g>
        </svg>

        <div className="ml-2 flex-auto pr-0 lg:ml-4 lg:pr-4">
          <p className="font-display m-0 text-xl text-sky-900 dark:text-sky-400">You should know this!</p>
          <div className="prose prose-a:text-sky-900 prose-code:text-sky-900 dark:prose-code:text-slate-300 mt-2.5 font-normal text-sky-800 [--tw-prose-background:theme(colors.sky.50)] dark:text-slate-300">
            <p>
              The lifetime finisher count is the sum of all the valid finishing moves performed by any member of the
              finishers club. This metric also applies to all players across the world.
            </p>

            <p className="mt-4">
              A <span className="font-bold">valid finisher</span> must meet the following criteria:
            </p>

            <ul className="ml-1 mt-1 flex list-inside list-disc flex-col gap-y-1 lg:gap-y-0.5">
              <li>Finishing move is performed on non-downed players ✅</li>
              <li>Finishing move is performed on Warzone (Battle Royale or Resurgence) ✅</li>
            </ul>

            <p className="mt-4">
              Other <span className="font-bold">key notes</span> to keep in mind:
            </p>

            <ol className="ml-1 mt-1 flex list-inside list-decimal flex-col gap-y-1 lg:gap-y-0.5">
              <li>Finishing moves on downed players are not counted and often considered frowned upon ⚠️</li>
              <li>
                Finishing moves performed on players that have recently used their self-revive are allowed and
                considered a noble practice 🥇
              </li>
              <li>
                Even though finishing moves performed on arenas like Multiplayer do not count towards the lifetime
                finisher count, we still highly encourage performing them whenever possible, depending on the situation
                ℹ️
              </li>
              <li>
                A <span className="italic underline">pernoca</span> is a finishing move performed on opps laying prone.
                Any lover of finishing moves will tell you how riveting and delicious a{" "}
                <span className="italic underline">pernoca</span> is, as your opponent is caught lacking to the extreme
                🪓
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutCardLI({
  children,
  emoji,
  extraClassNames = "",
}: {
  children: React.ReactNode
  emoji: string
  extraClassNames?: string
}) {
  return (
    <li
      className={classNames(
        extraClassNames,
        `rounded border-2 border-slate-400 bg-white/80 px-4 py-4 hover:border-primary dark:border-slate-800 dark:bg-slate-800/75 dark:hover:border-white`,
      )}
    >
      <p>
        <span>{emoji ? emoji : "👋"}&nbsp;&nbsp;</span>
        <span>{children}</span>
      </p>
    </li>
  )
}

function About() {
  return (
    <section id="about" className="mx-auto my-auto mb-8 flex max-w-5xl flex-col space-y-3 py-4">
      <Link href="#about" scroll={false} className="group flex items-center gap-x-2 transition hover:opacity-80">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About us</h2>
        <span className="hidden text-2xl group-hover:flex sm:text-3xl">🔗</span>
      </Link>
      <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-4 text-base font-normal tracking-tight lg:mt-6 lg:grid-cols-3 lg:text-lg">
        {/* Description */}
        <AboutCardLI emoji="👋">
          Finishers Hub is a passion project developed by{" "}
          <Link
            target="_blank"
            rel="noopener"
            href="https://linktr.ee/kikogoncalves"
            className="text-primary underline hover:opacity-80 dark:text-secondary"
          >
            Francisco Gonçalves
          </Link>
          , as a result of awesome moments on Warzone that happened mostly between 2021 and early 2023. Everything you
          can find on the website is related to finishing moves, the heart and soul of Finishers Hub.
        </AboutCardLI>

        {/* Home page */}
        <AboutCardLI emoji="🍿">
          The{" "}
          <Link className="text-primary underline hover:opacity-80 dark:text-secondary" href="/videos">
            videos page
          </Link>{" "}
          will show you a museum of highlights, that are pulled from S3 Buckets, where we manage our media content.
          Interact with the filters to find your favorite finishing moves 🆕
        </AboutCardLI>

        {/* Casino page */}
        <AboutCardLI emoji="🎰">
          The{" "}
          <Link className="text-primary underline hover:opacity-80 dark:text-secondary" href="/casino">
            Casino page
          </Link>{" "}
          acts like the video page with a twist: you always geta a random new highlight by pressing the arrows. It acts
          like a slot machine of finishing moves. All for your entertainment.
        </AboutCardLI>

        {/* Registry page */}
        <AboutCardLI emoji="📅">
          The{" "}
          <Link className="text-primary underline hover:opacity-80 dark:text-secondary" href="/registry">
            Registry page
          </Link>{" "}
          is where you can find information and stats about the Finishers Club members. It also works as a platform to
          register new finishing moves for official members of the closed exclusive agency that is Finishers Club.
        </AboutCardLI>

        {/* Fact #1 */}
        <AboutCardLI emoji="🤯">
          <strong>Fun fact</strong>: all the video content comes from a pool of around <strong>900 clips</strong>.
          However, they only capture around <strong>5%</strong> of all the finishing moves performed by Finishers Club
          as of March 2023.
        </AboutCardLI>

        {/* Fact #2 */}
        <AboutCardLI emoji="💻">
          Finishers Club will keep growing, and there are plans to add new sources of media, and further admin features
          like <strong>adding clips manually</strong>.
        </AboutCardLI>

        {/* Disclaimer */}
        <AboutCardLI emoji="🧊" extraClassNames="col-span-1 lg:col-span-3">
          Don&apos;t take anything too seriously, this is just for fun!
        </AboutCardLI>
      </ul>
    </section>
  )
}
