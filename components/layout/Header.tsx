import React from 'react'
import DarkModeSwitch from './DarkModeSwitch'
import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import {
  ChartBarSquareIcon,
  ArrowUpTrayIcon,
  BoltIcon,
  Bars3Icon,
  XMarkIcon,
  BeakerIcon,
  PlusSmallIcon,
  FilmIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  {
    title: 'Hub',
    location: '/',
    icon: <Square3Stack3DIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Casino',
    location: '/casino',
    icon: <BoltIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Gallery',
    location: '/gallery',
    icon: <FilmIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Registry',
    location: '/registry',
    icon: <ChartBarSquareIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Lab',
    location: '/lab',
    icon: <BeakerIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Create',
    location: '/create',
    icon: <ArrowUpTrayIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'More',
    location: '/more',
    icon: <PlusSmallIcon className="h-5 w-5" />,
    shown: true,
  },
]

const avatar = '/images/avatar.png'

type Props = {
  siteTitle: string
  location: string
}

export default function Header({ siteTitle, location }: Props) {
  return (
    <Disclosure
      as="nav"
      className="background sticky top-0 z-20 bg-light/90 px-3 py-3 text-gray-800 
      dark:bg-navy/90 dark:text-white lg:py-2 lg:px-4"
    >
      {({ open }) => {
        return (
          <header>
            <div
              className={`${
                open ? 'p-0' : 'p-2'
              } relative flex items-center justify-between lg:py-0`}
            >
              <Hamburger title={siteTitle} open={open} />
              <Navbar title={siteTitle} location={location} />
            </div>
            <Mobile location={location} />
          </header>
        )
      }}
    </Disclosure>
  )
}

type HamburgerProps = {
  title: string
  open: boolean
}

function Hamburger({ title, open }: HamburgerProps) {
  return (
    <div
      className={`z-50 lg:hidden ${
        open
          ? 'absolute top-2 right-2 my-auto flex h-6 items-center justify-end gap-x-3'
          : 'flex w-full items-center justify-between gap-x-3'
      }`}
    >
      {open ? null : (
        <Link href="/" className="flex items-center gap-x-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow dark:bg-gradient-to-br dark:from-blue-500 dark:to-blue-600">
            <Image
              className="avatar z-20 rounded-full"
              width={256}
              height={256}
              src={avatar}
              alt="Finishers Hub"
            />
          </div>
          <span className="whitespace-nowrap font-bold tracking-tight">{title}</span>
        </Link>
      )}
      <div className="flex items-center gap-x-2">
        <DarkModeSwitch />
        <Disclosure.Button
          className="group -ml-[3px] py-[3px] text-gray-800 transition duration-200 
        ease-in dark:text-white lg:hidden"
        >
          <span className="sr-only">Open nav menu</span>
          {open ? (
            <XMarkIcon
              className="ease block h-7 w-7 transition duration-200 
              group-hover:text-rose-600 dark:group-hover:text-rose-500"
              aria-hidden="true"
            />
          ) : (
            <Bars3Icon
              className="ease block h-7 w-7 transition duration-200 
            group-hover:text-primary dark:group-hover:text-secondary"
              aria-hidden="true"
            />
          )}
        </Disclosure.Button>
      </div>
    </div>
  )
}

type HeaderProps = {
  title: string
  location: string
}

function Navbar({ title, location }: HeaderProps) {
  return (
    <div className="z-50 flex flex-1 items-center justify-between lg:items-stretch lg:justify-between">
      <div className="relative hidden h-auto self-center duration-200 hover:opacity-80 lg:flex lg:gap-x-8">
        <Link
          href="/"
          className="relative flex h-7 w-7 items-center gap-x-2 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 dark:bg-gradient-to-br dark:from-blue-500 dark:to-blue-600"
        >
          <Image
            src={avatar}
            alt="Finishers Hub"
            width={256}
            height={256}
            className="z-20 inline-flex rounded-full transition"
          />
          <h3 className="whitespace-nowrap text-sm font-bold tracking-tighter duration-150 lg:text-base">
            {title}
          </h3>
        </Link>
      </div>

      <div className="hidden self-center lg:flex lg:gap-x-8">
        {navigation.map((link, index) => {
          if (link.shown === false) return null
          const isActive = location === link.title

          return (
            <Link key={`nav-${index}`} href={link.location}>
              <button
                type="button"
                className={`relative flex items-center justify-center gap-x-[5px] py-2 lowercase tracking-tight transition ${
                  isActive
                    ? 'font-bold text-primary dark:text-white'
                    : 'font-normal text-gray-800/50 hover:text-gray-800 dark:text-white/40 dark:hover:text-white'
                }`}
              >
                {/* <span>{link.icon}</span> */}
                <span>{link.title}</span>
                {isActive && (
                  <span className="dark:via-secondary420 absolute bottom-0 h-[2px] w-full rounded-xl bg-primary/50 dark:bg-secondary/50" />
                )}
              </button>
            </Link>
          )
        })}
      </div>

      <div className="hidden self-center lg:inline-flex lg:items-center lg:justify-center lg:gap-x-2">
        <DarkModeSwitch />
      </div>
    </div>
  )
}

type MobileProps = {
  location: string
}

const socials = [
  {
    shown: true,
    label: 'github',
    url: 'https://github.com/kiko-g',
    svg: [
      'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
    ],
    viewBox: '0 0 496 512',
  },
  {
    shown: true,
    label: 'twitch',
    url: 'https://www.twitch.tv/scumbag_kiko',
    svg: [
      'M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z',
    ],
    viewBox: '0 0 512 512',
  },
  {
    shown: true,
    label: 'twitter',
    url: 'https://twitter.com/finishershub',
    svg: [
      'M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z',
    ],
    viewBox: '0 0 512 512',
  },
  {
    shown: true,
    label: 'youtube',
    url: 'https://www.youtube.com/@scumbag_kiko/videos',
    svg: [
      'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z',
    ],
    viewBox: '0 0 576 512',
  },
]

function Mobile({ location }: MobileProps) {
  return (
    <Disclosure.Panel className="flex flex-col gap-y-3 py-2 lg:hidden">
      {navigation.map((link, index) =>
        link.shown ? (
          <Link href={link.location} className="relative h-auto" key={`mobile-nav-${index}`}>
            <button
              type="button"
              className={`flex h-auto items-center justify-center lowercase transition ${
                location === link.title
                  ? 'font-bold text-primary dark:text-white'
                  : 'font-normal text-gray-800/50 hover:text-gray-800 dark:text-white/40 dark:hover:text-white'
              }`}
            >
              <span className="flex items-center justify-center gap-x-3">
                <span>{link.icon}</span>
                <span>{link.title}</span>
              </span>
            </button>
          </Link>
        ) : null
      )}
      <div
        className="relative flex h-auto items-center justify-end gap-x-4 border-t border-primary/25 
        pt-4 dark:border-secondary/25"
      >
        {socials.map((social, socialIdx) =>
          social.shown ? (
            <Link
              target="_blank"
              href={social.url}
              key={`social-${socialIdx}`}
              title={social.label}
              aria-label={social.label}
              className={`transition ${social.label}`}
            >
              <svg
                className="h-6 w-6"
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
          ) : null
        )}
      </div>
    </Disclosure.Panel>
  )
}
