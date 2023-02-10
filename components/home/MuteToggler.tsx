import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function MuteToggler({ hook }: Props) {
  const [mute, setMuted] = hook

  return (
    <div className="flex items-end justify-center space-x-2 text-primary dark:text-light">
      {mute ? (
        <button
          title="Turn default mute off"
          className="transition hover:opacity-80"
          onClick={() => setMuted(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 lg:h-8 lg:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
          title="Turn default mute on"
          className="transition hover:opacity-80"
          onClick={() => setMuted(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 lg:h-8 lg:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
