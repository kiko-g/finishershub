import React from 'react'
import '../styles/colors.css'
import { socials } from '../utils'

type Props = {
  siteTitle: string
}

export const Footer: React.FC<Props> = ({ siteTitle }) => {
  return (
    <footer className="z-10 flex items-center justify-between p-2 text-xs text-gray-500 opacity-80 dark:text-gray-300 md:p-3 md:text-sm">
      <span className="text-gray-700 dark:text-gray-300 sm:text-center">© 2022 {siteTitle}™</span>
      <div className="flex space-x-2 sm:justify-center md:mt-0 md:space-x-4">
        {socials
          .filter(social => social.shown)
          .map((social, socialIdx) => (
            <a
              target="_blank"
              href={social.url}
              key={`social-${socialIdx}`}
              aria-labelledby={social.label}
              className={`transition ${social.label}`}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                <path fillRule="evenodd" d={social.svg} clipRule="evenodd" />
              </svg>
            </a>
          ))}
      </div>
    </footer>
  )
}
