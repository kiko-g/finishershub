import React, { useEffect } from "react"
import classNames from "classnames"

type Props = {}

export default function DarkModeSwitch({}: Props) {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none")
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none")
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle("dark")

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = isDarkMode
    }
  }

  return (
    <div className="pointer-events-auto">
      <button type="button" onClick={toggleMode} aria-label="Toggle dark mode" className="group">
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={classNames(
            "h-8 w-8 transition dark:hidden",
            "fill-white",
            "stroke-orange-400",
            "[@media(prefers-color-scheme:dark)]:fill-orange-400",
            "[@media(prefers-color-scheme:dark)]:stroke-orange-400",
            "group-hover:fill-orange-400",
            "[@media(prefers-color-scheme:dark)]:group-hover:fill-orange-50",
            "[@media(prefers-color-scheme:dark)]:group-hover:stroke-orange-400",
          )}
        >
          <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"></path>
          <path
            d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
            fill="none"
          ></path>
        </svg>

        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={classNames(
            "hidden h-8 w-8 transition dark:block",
            "stroke-blue-50",
            "[@media(prefers-color-scheme:dark)]:fill-blue-400",
            "[@media(prefers-color-scheme:dark)]:stroke-blue-400",
            "group-hover:fill-blue-400",
            "[@media(prefers-color-scheme:dark)]:group-hover:fill-blue-50",
            "[@media(prefers-color-scheme:dark)]:group-hover:stroke-blue-400",
          )}
        >
          <path
            d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  )
}
