import React from "react"
import Link from "next/link"
import { ArrowLongRightIcon } from "@heroicons/react/24/outline"

type Props = {}

export default function TwitterAdBanner({}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded bg-blue-500/10 px-4 py-4 lg:flex-row">
      {/* Logo */}
      <Link
        target="_blank"
        href="https://twitter.com/finishershub"
        className="hidden h-auto max-w-full rounded bg-gradient-to-br from-[#1da1f2] to-blue-500 px-16 
        py-16 text-white transition hover:opacity-80 lg:flex lg:max-w-[16rem]"
      >
        <svg className="h-full w-full" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
          <path
            fillRule="evenodd"
            d={`M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z`}
            clipRule="evenodd"
          />
        </svg>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-2 font-light">
        <div className="flex flex-col gap-2">
          <p>
            While we are working on getting Finishers Hub to the{" "}
            <span className="text-slate-700 dark:text-pink-600">next level</span>, you can check out{" "}
            <span className="text-slate-700 dark:text-pink-600">new content</span> on our{" "}
            <Link target="_blank" href="https://twitter.com/finishershub" className="text-[#1da1f2] hover:underline">
              new twitter page
            </Link>
            , where we post new clips regularly. This content is not available on the website yet, so make sure to
            follow us. This page represents a big breakthrough for us, and we are excited to announce it as a temporary
            solution to delivering new content. In the near future we are planning on:
          </p>

          <ul className="ml-0.5 font-light">
            <li>
              <span className="mr-1">⏳</span> Adding admin functionality for users to upload content to the platform.
            </li>
            <li>
              <span className="mr-1">⏳</span> Metadata and information for the clips that will make them easier to find
              in the platform.
            </li>
          </ul>
        </div>

        <Link
          target="_blank"
          href="https://twitter.com/finishershub"
          className="flex items-center justify-center gap-x-2 self-stretch rounded bg-gradient-to-br from-[#1da1f2] to-blue-600 px-4 py-2 font-normal text-white transition hover:opacity-90 lg:justify-start lg:self-end"
        >
          <span>Show me that new content on Twitter!</span>
          <ArrowLongRightIcon className="h-5 w-5 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
