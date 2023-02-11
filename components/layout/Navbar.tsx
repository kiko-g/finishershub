import React from 'react'
import DarkModeSwitch from './DarkModeSwitch'
import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import {
  HomeModernIcon,
  ChartBarSquareIcon,
  CubeTransparentIcon,
  BoltIcon,
  Bars3Icon,
  XMarkIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  {
    title: 'Home',
    location: '/',
    icon: <HomeModernIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Casino',
    location: '/casino',
    icon: <BoltIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Registry',
    location: '/registry',
    icon: <ChartBarSquareIcon className="h-5 w-5" />,
    shown: true,
  },
  {
    title: 'Admin',
    location: '/admin',
    icon: <BuildingLibraryIcon className="h-5 w-5" />,
    shown: process.env.NODE_ENV === 'development',
  },
  {
    title: 'About',
    location: '/about',
    icon: <CubeTransparentIcon className="h-5 w-5" />,
    shown: true,
  },
]

const avatar = '/images/avatar.png'

type Props = {
  siteTitle: string
  location: string
}

export default function Navbar({ siteTitle, location }: Props) {
  return (
    <Disclosure
      as="nav"
      className="background sticky top-0 z-20 bg-light/80 px-4 py-3 text-gray-800 
      dark:bg-navy/90 dark:text-white md:py-0 md:px-4"
    >
      {({ open }) => {
        return (
          <header>
            <div
              className={`${
                open ? 'p-0' : 'p-2'
              } relative flex items-center justify-between md:py-0`}
            >
              <Hamburger open={open} />
              <Header title={siteTitle} location={location} />
            </div>
            <Mobile location={location} />
          </header>
        )
      }}
    </Disclosure>
  )
}

type HamburgerProps = {
  open: boolean
}

function Hamburger({ open }: HamburgerProps) {
  return (
    <div
      className={`z-50 md:hidden ${
        open
          ? 'absolute top-2 right-2 my-auto flex h-6 items-center justify-end gap-x-2'
          : 'flex w-full items-center justify-between'
      }`}
    >
      <Link href="/">
        {open ? (
          <Image
            className="avatar top-0.5 rounded-full"
            width={20}
            height={20}
            src={avatar}
            alt="Finishers Hub"
          />
        ) : (
          <Image
            className="avatar rounded-full"
            width={24}
            height={24}
            src={avatar}
            alt="Finishers Hub"
          />
        )}
      </Link>

      <div className="flex items-center gap-x-2">
        <DarkModeSwitch />
        <Disclosure.Button className="group text-gray-800 transition duration-200 ease-in dark:text-white md:hidden">
          <span className="sr-only">Open nav menu</span>
          {open ? (
            <XMarkIcon
              className="ease block h-6 w-6 transition duration-200 
              group-hover:text-sky-500 dark:group-hover:text-sky-300"
              aria-hidden="true"
            />
          ) : (
            <Bars3Icon
              className="ease block h-6 w-6 transition duration-200 
            group-hover:text-sky-500 dark:group-hover:text-sky-300"
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

function Header({ title, location }: HeaderProps) {
  return (
    <div className="z-50 flex flex-1 items-center justify-between md:items-stretch md:justify-between">
      <div className="relative hidden h-auto self-center duration-200 hover:opacity-80 md:flex md:gap-x-8">
        <Link href="/" className="flex items-center gap-x-2">
          <Image
            src={avatar}
            alt="Finishers Hub"
            width={24}
            height={24}
            className="z-20 inline-flex rounded-full transition"
          />
          <h3 className="text-xs font-bold tracking-tighter duration-150 lg:text-base">{title}</h3>
        </Link>
      </div>

      <div className="hidden self-center md:flex md:gap-x-8">
        {navigation.map((link, index) =>
          link.shown ? (
            <Link href={link.location} key={`nav-${index}`} className="relative py-1">
              <button
                type="button"
                className={`flex h-12 items-center justify-center lowercase transition ${
                  location === link.title
                    ? 'font-bold text-primary dark:text-white'
                    : 'font-normal text-gray-800/50 hover:text-gray-800 dark:text-white/40 dark:hover:text-white'
                }`}
              >
                <span className="flex items-center justify-center gap-x-1.5">
                  <span>{link.icon}</span>
                  <span>{link.title}</span>
                </span>
              </button>
            </Link>
          ) : null
        )}
      </div>

      <div className="hidden self-center md:inline-flex">
        <DarkModeSwitch />
      </div>
    </div>
  )
}

type MobileProps = {
  location: string
}

function Mobile({ location }: MobileProps) {
  return (
    <Disclosure.Panel className="flex flex-col gap-y-3 py-2 md:hidden">
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
    </Disclosure.Panel>
  )
}
