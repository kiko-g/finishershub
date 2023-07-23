import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React from 'react'

type Props = {
  prevVideo: () => void
  disabled: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function PreviousVideo({ prevVideo, disabled, size = 'sm' }: Props) {
  return (
    <button
      onClick={prevVideo}
      disabled={disabled}
      title="Go to the previous highlight (or press the left arrow key)"
      className="transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
    >
      <ChevronDoubleLeftIcon
        className={classNames(
          size === 'sm' ? 'h-5 w-5 lg:h-6 lg:w-6' : '',
          size === 'md' ? 'h-6 w-6 lg:h-7 lg:w-7' : '',
          size === 'lg' ? 'h-7 w-7 lg:h-8 lg:w-8' : '',
          size === 'xl' ? 'h-9 w-9 lg:h-10 lg:w-10' : '',
        )}
      />
    </button>
  )
}
