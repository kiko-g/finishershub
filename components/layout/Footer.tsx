import Link from 'next/link'
import React from 'react'

type Props = {
  siteTitle: string
}

const socials = [
  {
    shown: true,
    label: 'github',
    url: 'https://github.com/kiko-g',
    svg: [
      'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    ],
  },
  {
    shown: true,
    label: 'linkedin',
    url: 'https://linkedin.com/in/kikogoncalves',
    svg: [
      'M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z',
    ],
    viewBox: '0 0 512 512',
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
    label: 'linktree',
    url: 'https://linktr.ee/kikogoncalves',
    svg: [
      'M8.92,2.44a1.06,1.06,0,0,0-1.86,0L.1,15.07A1,1,0,0,0,1,16.44h4.7v4.78a.9.9,0,0,0,.89.89H9.33a.91.91,0,0,0,.89-.89V16.44H8.92a1.05,1.05,0,0,1-1-.89A1,1,0,0,1,8,15.07l3.89-7h0Z',
      'M15.08,2.44a1.06,1.06,0,0,1,1.86,0l7,12.63A1,1,0,0,1,23,16.44H18.39v4.78a.9.9,0,0,1-.89.89H14.59a.9.9,0,0,1-.89-.89V16.44H15a1.05,1.05,0,0,0,1.06-.89,1,1,0,0,0-.08-.48L12.08,8h0Z',
    ],
  },
]

export default function Footer({ siteTitle }: Props) {
  return (
    <footer
      className="z-10 flex items-center justify-between px-2 py-2 
      text-xs text-gray-500 opacity-80 dark:text-gray-300 md:px-3 md:py-3 md:text-sm"
    >
      <span className="text-gray-700 dark:text-gray-300 sm:text-center">© 2022 {siteTitle}™</span>
      <div className="flex gap-x-3 sm:justify-center md:mt-0 md:gap-x-3">
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
                className="h-7 w-7"
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
