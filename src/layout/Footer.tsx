import React from 'react'
import '../styles/utilities.css'

const socials = [
  {
    shown: true,
    label: 'twitch',
    color: '6441a5',
    url: 'https://www.twitch.tv/scumbag_kiko',
    svg: 'M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z',
  },
]

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
