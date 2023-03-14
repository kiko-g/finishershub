import React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import useDarkMode from '../../hooks/useDarkMode'
import classNames from 'classnames'

type Props = {
  alt?: boolean
}

export default function DarkModeSwitch({ alt = false }: Props) {
  const [enabled, setEnabled] = useDarkMode()

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          title="Toggle Dark Mode"
          aria-label="Toggle Dark Mode"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className={`${enabled ? 'animate-dark' : 'animate-light'} rounded-full p-0 md:p-[4px]`}
        >
          {enabled ? (
            <MoonIcon
              aria-hidden="true"
              className={classNames(
                alt ? 'text-slate-700 hover:opacity-80' : 'text-blue-400 hover:text-blue-200',
                `ease block h-6 w-6  transition duration-150 md:h-8 md:w-8`
              )}
            />
          ) : (
            <SunIcon
              aria-hidden="true"
              className={classNames(
                alt
                  ? 'text-orange-400 hover:text-orange-500'
                  : 'text-orange-400/70 hover:text-orange-500/90',
                `ease block h-6 w-6  transition duration-150 md:h-8 md:w-8`
              )}
            />
          )}
        </Switch>
      </div>
    </Switch.Group>
  )
}
