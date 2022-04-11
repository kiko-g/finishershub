import React from 'react'

type Props = {
  siteTitle: string
}

export const Footer: React.FC<Props> = ({ siteTitle }) => {
  return (
    <footer className="z-10 flex items-center justify-between p-2 text-xs text-gray-500 opacity-80 dark:text-gray-300 md:p-3 md:text-sm">
      <span className="text-gray-700 dark:text-gray-300 sm:text-center">© 2022 {siteTitle}™</span>
    </footer>
  )
}
