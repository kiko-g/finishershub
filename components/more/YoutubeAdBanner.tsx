import React from 'react'
import Link from 'next/link'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function TwitterAdBanner({}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded bg-rose-600/10 px-4 py-4 lg:flex-row">
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-4 font-light">
        <div className="flex flex-col gap-y-3">
          <p>
            We also made some{' '}
            <Link
              target="_blank"
              href="https://www.youtube.com/@scumbag_kiko/videos"
              className="text-rose-700 hover:underline"
            >
              compilations on YouTube
            </Link>
            , and some even have chapters with descriptions. Stop by and show some love, I&apos; am
            confident you will not regret it, it&apos;s fun stuff. We hope to deliver more content
            on YouTube, with good editing rather than just long highlight reels. Here are the{' '}
            <span className="font-bold text-rose-800">amusingly obscene</span> videos you should not
            miss out on:
          </p>
          <ul className="ml-0.5 font-light">
            <li>
              <span className="mr-2">🔨</span>
              <Link href="https://youtu.be/ds0LFOKbDZg" className="font-normal hover:underline">
                3 Hours of Raw Finisher Footage (2021)
              </Link>
            </li>
            <li>
              <span className="mr-2">🩹</span>
              <Link href="https://youtu.be/psAOI1KyIyA" className="font-normal hover:underline">
                The lost files of the International Finisher&apos; Day (19 July 2021){' '}
                <span className="font-light text-gray-600 dark:text-gray-400">w/ chapters</span>.
              </Link>
            </li>
            <li>
              <span className="mr-2">💨</span>
              <Link href="https://youtu.be/FaMvNffuhQQ" className="font-normal hover:underline">
                Typical hectic 8 minute session of finishers at HQ/Greenie
              </Link>
            </li>
          </ul>
        </div>

        <Link
          target="_blank"
          href="https://www.youtube.com/@scumbag_kiko/videos"
          className="flex items-center justify-center gap-x-2 self-stretch rounded bg-gradient-to-br from-rose-700 to-rose-600 px-4 py-2 font-normal text-white transition hover:opacity-90 lg:justify-start lg:self-start"
        >
          <span>I definitely have to checkout this YouTube stuff</span>
          <ArrowLongRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Logo */}
      <Link
        target="_blank"
        href="https://www.youtube.com/@scumbag_kiko/videos"
        className="hidden h-auto max-w-full rounded bg-gradient-to-br from-rose-700 
          to-rose-600 py-16 px-16 text-white transition hover:opacity-80 lg:flex lg:max-w-xs"
      >
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 576 512" aria-hidden="true">
          <path
            fillRule="evenodd"
            d={`M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z`}
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  )
}
