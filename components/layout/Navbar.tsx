import React from 'react'
import { Disclosure } from '@headlessui/react'
import DarkModeSwitch from './DarkModeSwitch'
import {
  HomeModernIcon,
  ChartBarSquareIcon,
  CubeTransparentIcon,
  BoltIcon,
  Bars3Icon,
  XMarkIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'

const avatar = '/images/avatar.png'

const navigation = [
  { title: 'Home', location: '/', icon: <HomeModernIcon className="mr-1.5 h-5 w-5" /> },
  { title: 'Casino', location: '/casino', icon: <BoltIcon className="mr-1.5 h-5 w-5" /> },
  {
    title: 'Registry',
    location: '/registry',
    icon: <ChartBarSquareIcon className="mr-1.5 h-5 w-5" />,
  },
  { title: 'Admin', location: '/admin', icon: <BuildingLibraryIcon className="mr-1.5 h-5 w-5" /> },
  { title: 'About', location: '/about', icon: <CubeTransparentIcon className="mr-1.5 h-5 w-5" /> },
]

type Props = {
  siteTitle: string
  location: string
}

export default function Navbar({ siteTitle, location }: Props) {
  return (
    <Disclosure
      as="nav"
      className="background sticky top-0 z-20 bg-light/80 px-3 py-2 text-dark 
      dark:bg-darkest/80 dark:text-white md:py-0 md:px-3"
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

const Hamburger = ({ open }: HamburgerProps) => (
  <div
    className={`z-50 md:hidden ${
      open
        ? 'absolute top-2 right-2 my-auto flex h-6 items-center justify-end space-x-2'
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

    <div className="flex items-center space-x-1">
      <DarkModeSwitch />
      <Disclosure.Button className="group text-dark transition duration-200 ease-in dark:text-white md:hidden">
        <span className="sr-only">Open nav menu</span>
        {open ? (
          <XMarkIcon
            className="ease block h-6 w-6 transition duration-200 group-hover:text-primary/75 dark:group-hover:text-primary/75"
            aria-hidden="true"
          />
        ) : (
          <Bars3Icon
            className="ease dark:group-hover:text-/75 block h-6 w-6 transition duration-200 group-hover:text-dark/75"
            aria-hidden="true"
          />
        )}
      </Disclosure.Button>
    </div>
  </div>
)

type HeaderProps = {
  title: string
  location: string
}

const Header = ({ title, location }: HeaderProps) => (
  <div className="z-50 flex flex-1 items-center justify-between md:items-stretch md:justify-between">
    <div className="relative hidden h-auto space-x-12 self-center duration-200 hover:opacity-75 md:inline-flex">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={avatar}
          alt="Finishers Hub"
          width={24}
          height={24}
          className="z-20 inline-flex rounded-full transition"
        />
        <h2 className="text-xs font-bold tracking-tighter duration-150 lg:text-base">{title}</h2>
      </Link>
    </div>

    <div className="hidden space-x-6 self-center md:inline-flex md:space-x-9">
      {navigation.map((link, index) => (
        <Link href={link.location} key={`nav-${index}`} className="relative py-1">
          <button
            type="button"
            className={`flex h-12 items-center justify-center lowercase transition ${
              location === link.title
                ? 'font-bold text-primary dark:text-white'
                : 'font-normal text-dark/50 hover:text-dark dark:text-white/40 dark:hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center">
              {link.icon}
              {link.title}
            </span>
          </button>
        </Link>
      ))}
    </div>

    <div className="hidden self-center md:inline-flex">
      <DarkModeSwitch />
    </div>
  </div>
)

type MobileProps = {
  location: string
}

const Mobile = ({ location }: MobileProps) => (
  <Disclosure.Panel className="flex flex-col space-y-3 py-2 md:hidden">
    {navigation.map((link, index) => (
      <Link href={link.location} className="relative h-auto" key={`mobile-nav-${index}`}>
        <button
          type="button"
          className={`flex h-auto items-center justify-center lowercase transition ${
            location === link.title
              ? 'font-bold text-primary dark:text-white'
              : 'font-normal text-dark/50 hover:text-dark dark:text-white/40 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center justify-center">
            {link.icon}
            {link.title}
          </span>
        </button>
      </Link>
    ))}
  </Disclosure.Panel>
)
