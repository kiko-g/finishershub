import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React from 'react'

type Props = {
  nextVideo: () => void
  disabled: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function NextVideo({ nextVideo, disabled, size = 'sm' }: Props) {
  return (
    <button
      onClick={nextVideo}
      disabled={disabled}
      title="Go to the next highlight (or press the right arrow key)"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
    >
      <ChevronDoubleRightIcon
        className={classNames(
          size === 'sm' ? 'h-4 w-4 lg:h-6 lg:w-6' : '',
          size === 'md' ? 'h-5 w-5 lg:h-7 lg:w-7' : '',
          size === 'lg' ? 'h-6 w-6 lg:h-8 lg:w-8' : '',
          size === 'xl' ? 'h-8 w-8 lg:h-10 lg:w-10' : '',
        )}
      />
    </button>
  )
}