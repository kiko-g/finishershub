import React from 'react'
import { HomeIcon, CubeTransparentIcon } from '@heroicons/react/outline'

const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ')
}

const daysDifference = (before: Date, after: Date) => {
  let a = new Date(after.toString())
  let b = new Date(before.toString())

  return (a.getTime() - b.getTime()) / (1000 * 3600 * 24)
}

const randomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const navigation = [
  { title: 'Home', location: '/', icon: <HomeIcon className="mr-1.5 h-5 w-5" /> },
  { title: 'About', location: '/about', icon: <CubeTransparentIcon className="mr-1.5 h-5 w-5" /> },
]

const socials = [
  {
    shown: true,
    label: 'twitch',
    color: '6441a5',
    url: 'https://www.twitch.tv/scumbag_kiko',
    svg: 'M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z',
  },
]

export { classNames, daysDifference, randomBetween, navigation, socials }
