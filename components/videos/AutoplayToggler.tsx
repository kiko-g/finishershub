import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import classNames from "classnames"
import { getButtonSizeClassNames } from "../../utils"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "sm" | "md" | "lg" | "xl"
}

export function AutoplayToggler({ hook, size = "sm" }: Props) {
  const [autoplay, setAutoplay] = hook

  const toggleAutoplay = useCallback(() => {
    setAutoplay((prev) => !prev)
  }, [setAutoplay])

  useEffect(() => {
    function handleKeyDown(event: any) {
      if (event.keyCode === 75) toggleAutoplay() // K key
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleAutoplay])

  return (
    <div className="flex items-end justify-center space-x-2">
      {autoplay ? (
        <button title="Turn autoplay off" className="transition hover:opacity-80" onClick={() => setAutoplay(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={getButtonSizeClassNames(size)}
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <button title="Turn autoplay on" className="transition hover:opacity-80" onClick={() => setAutoplay(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className={getButtonSizeClassNames(size)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
    </div>
  )
}
