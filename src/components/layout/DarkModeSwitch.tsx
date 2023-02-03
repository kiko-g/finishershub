import React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import useDarkMode from '../../hooks/useDarkMode'

export default function DarkModeSwitch() {
  const [enabled, setEnabled] = useDarkMode()

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          title="Toggle Dark Mode"
          aria-label="Toggle Dark Mode"
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className={`${enabled ? 'animate-dark' : 'animate-light'} rounded-full`}
        >
          {enabled ? (
            <MoonIcon
              aria-hidden="true"
              className="ease block h-6 w-6 text-blue-400 transition duration-150 
              hover:text-blue-300 md:h-8 md:w-8"
            />
          ) : (
            <SunIcon
              aria-hidden="true"
              className="ease block h-6 w-6 text-orange-400 transition duration-150 
              hover:text-orange-500/80 md:h-8 md:w-8"
            />
          )}
        </Switch>
      </div>
    </Switch.Group>
  )
}
