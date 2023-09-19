import Link from "next/link"
import React from "react"
import { socials } from "@/utils/data"

type Props = {
  siteTitle: string
}

export function Footer({ siteTitle }: Props) {
  const showSocials = false

  return (
    <footer className="z-[5] flex items-center justify-between px-4 py-3 text-xs text-gray-500 opacity-80 dark:text-gray-300 md:px-4 md:py-3 md:text-sm">
      <span className="text-gray-700 dark:text-gray-300 sm:text-center">
        © {new Date().getFullYear()} {siteTitle}™
      </span>
      <div className="flex gap-x-3 sm:justify-center md:mt-0 md:gap-x-4">
        {showSocials &&
          socials
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
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="currentColor"
                  viewBox={social.viewBox ? social.viewBox : "0 0 24 24"}
                  aria-hidden="true"
                >
                  {social.svg.map((d, dIdx) => (
                    <path fillRule="evenodd" d={d} clipRule="evenodd" key={`social-${socialIdx}-svg-${dIdx}`} />
                  ))}
                </svg>
              </Link>
            ))}
      </div>
    </footer>
  )
}
