import React from 'react'

export default function ShuffleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      fill="currentColor"
      {...props}
    >
      <title>{'Shuffle'}</title>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m400 304 48 48-48 48m0-288 48 48-48 48M64 352h85.19a80 80 0 0 0 66.56-35.62L256 256"
      />
      <path
        d="M64 160h85.19a80 80 0 0 1 66.56 35.62l80.5 120.76A80 80 0 0 0 362.81 352H416m0-192h-53.19a80 80 0 0 0-66.56 35.62L288 208"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
