import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: 'sm' | 'md' | 'lg' | 'xl'
  limitedAccess?: boolean
}

export default function MuteToggler({ hook, size = 'sm', limitedAccess = true }: Props) {
  const [mute, setMuted] = hook

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev)
  }, [setMuted])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 77) toggleMute()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleMute])

  return (
    <div className="flex items-end justify-center space-x-2">
      {mute ? (
        <button
          disabled={limitedAccess}
          title="Turn default mute off (or press M)"
          className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
          onClick={() => setMuted(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className={classNames(
              size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
              size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
              size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
              size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              clipRule="evenodd"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        </button>
      ) : (
        <button
          disabled={limitedAccess}
          title="Turn default mute on"
          className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
          onClick={() => setMuted(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className={classNames(
              size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
              size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
              size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
              size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
