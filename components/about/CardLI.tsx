import React from 'react'
import classNames from 'classnames'

type Props = {
  children: React.ReactNode
  emoji: string
  extraClassNames?: string
}

export default function CardLI({ children, emoji, extraClassNames = '' }: Props) {
  return (
    <li
      className={classNames(
        extraClassNames,
        `rounded border-2 border-slate-400 bg-slate-200/80 px-4 py-4 hover:border-primary 
        dark:border-slate-700 dark:bg-slate-800/75 dark:hover:border-secondary`
      )}
    >
      <p>
        <span>{emoji ? emoji : '👋'}&nbsp;&nbsp;</span>
        <span>{children}</span>
      </p>
    </li>
  )
}
