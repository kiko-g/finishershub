import React from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import useDarkMode from '../hooks/useDarkMode'

export const DarkModeSwitchMinimal: React.FC = () => {
  const [enabled, setEnabled] = useDarkMode()

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          className={`${enabled ? 'animate-dark' : 'animate-light'} rounded-full`}
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        >
          {enabled ? (
            <MoonIcon
              className="ease block h-6 w-6 text-light1 transition duration-100 hover:text-light1/75 md:h-8 md:w-8"
              aria-hidden="true"
            />
          ) : (
            <SunIcon
              className="ease block h-6 w-6 text-orange-300 transition duration-100 hover:text-orange-400/80 md:h-8 md:w-8"
              aria-hidden="true"
            />
          )}
        </Switch>
      </div>
    </Switch.Group>
  )
}
