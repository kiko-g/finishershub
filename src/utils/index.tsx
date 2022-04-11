import React from 'react'
import { HomeIcon, CubeTransparentIcon } from '@heroicons/react/outline'

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ')
}

export const daysDifference = (dateString: string) => {
  let now = new Date()
  let date = new Date(dateString)
  let difference = (now.getTime() - date.getTime()) / (1000 * 3600 * 24)

  return difference
}

export const navigation = [
  { title: 'Home', location: '/', icon: <HomeIcon className="mr-1.5 h-5 w-5" /> },
  { title: 'About', location: '/about', icon: <CubeTransparentIcon className="mr-1.5 h-5 w-5" /> },
]
