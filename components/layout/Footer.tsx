import Link from 'next/link'
import React from 'react'
import { socials } from '../../utils/data'

type Props = {
  siteTitle: string
}

export default function Footer({ siteTitle }: Props) {
  return (
    <footer
      className="z-10 flex items-center justify-between px-4 py-3 
      text-xs text-gray-500 opacity-80 dark:text-gray-300 md:px-6 md:py-4 md:text-sm"
    >
      <span className="text-gray-700 dark:text-gray-300 sm:text-center">
        © {new Date().getFullYear()} {siteTitle}™
      </span>
      <div className="flex gap-x-3 sm:justify-center md:mt-0 md:gap-x-4">
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
    </footer>
  )
}
