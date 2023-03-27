import React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { useDarkMode } from 'usehooks-ts'

type Props = {
  alt?: boolean
}

export default function DarkModeSwitch({ alt = false }: Props) {
  const { isDarkMode, toggle } = useDarkMode()

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const className = 'dark'
      const bodyClass = window.document.body.classList

      // @ts-ignore
      const isEnabled = typeof enabledState === 'undefined' && isDarkMode
      isEnabled ? bodyClass.add(className) : bodyClass.remove(className)
    }
  }, [isDarkMode])

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          title="Toggle Dark Mode"
          aria-label="Toggle Dark Mode"
          checked={isDarkMode}
          onChange={() => toggle()}
          className={`${isDarkMode ? 'animate-dark' : 'animate-light'} rounded-full p-0 md:p-[4px]`}
        >
          {isDarkMode ? (
            <MoonIcon
              aria-hidden="true"
              className={classNames(
                alt ? 'text-teal-700 hover:opacity-80' : 'text-blue-400 hover:text-blue-200',
                `ease block h-6 w-6 transition duration-150 md:h-7 md:w-7`
              )}
            />
          ) : (
            <SunIcon
              aria-hidden="true"
              className={classNames(
                alt
                  ? 'text-orange-400 hover:text-orange-500'
                  : 'text-orange-400/70 hover:text-orange-500/90',
                `ease block h-6 w-6 transition duration-150 md:h-7 md:w-7`
              )}
            />
          )}
        </Switch>
      </div>
    </Switch.Group>
  )
}
