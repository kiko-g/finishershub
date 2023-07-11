import Link from 'next/link'
import React from 'react'
import { socials } from '../../utils/data'
import { DarkModeSwitch } from '../layout'

type Props = {}

export default function Socials({}: Props) {
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
  )
}
