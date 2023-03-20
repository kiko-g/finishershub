import classNames from 'classnames'
import React from 'react'

type Props = {}

export default function InvisbleTopLayer({}: Props) {
  const [help, setHelp] = React.useState(false)

  return (
    <div
      onClick={() => setHelp(!help)}
      title="You do not have access to this content until you log in. 
      Click the green fingerprint icon to open the access modal and gain full access to Finishers Hub"
      className="group absolute inset-0 z-50 h-full w-full cursor-not-allowed
      rounded ring-0 ring-rose-800/50 hover:bg-rose-800/5 hover:ring-2 hover:backdrop-blur-xs"
    >
      <span
        className={classNames(
          help ? 'block' : 'hidden',
          `z-40 mx-auto mt-6 w-1/2 animate-pulse rounded
        bg-black/80 px-4 py-4 text-center font-lexend font-normal text-white`
        )}
      >
        Click the green fingerprint icon to open the access modal and gain full access to{' '}
        <strong>Finishers Hub</strong>.
      </span>
    </div>
  )
}
