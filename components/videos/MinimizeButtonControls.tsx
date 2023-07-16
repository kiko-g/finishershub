import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useCallback, useEffect } from 'react'

type Props = {
  buttonControlsRef: React.MutableRefObject<HTMLDivElement | null>
  minimizeHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function MinimizeButtonControls({ buttonControlsRef, minimizeHook }: Props) {
  const [minimizeButtonControls, setMinimizeButtonControls] = minimizeHook

  const toggleMinimize = useCallback(() => {
    setMinimizeButtonControls((isMinimized) => {
      if (isMinimized) {
        // will minimize
        return false
      } else {
        // will maximize
        return true
      }
    })
  }, [setMinimizeButtonControls])

  useEffect(() => {
    setTimeout(() => setMinimizeButtonControls(false), 5000)
  }, [setMinimizeButtonControls])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 81) toggleMinimize() // Q key
    }

    const timerA = setTimeout(() => {
      if (buttonControlsRef.current) buttonControlsRef.current.classList.add('opacity-50')
    }, 4000)

    const timerB = setTimeout(() => {
      if (buttonControlsRef.current) buttonControlsRef.current.classList.remove('opacity-50')
      if (buttonControlsRef.current) buttonControlsRef.current.classList.add('opacity-0')
    }, 8000)

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(timerA)
      clearTimeout(timerB)
    }
  }, [buttonControlsRef, toggleMinimize])

  return (
    <button
      onClick={() => setMinimizeButtonControls((prev) => !prev)}
      title="Fold button controls menu"
      className="transition hover:opacity-80"
    >
      {minimizeButtonControls ? (
        <EyeSlashIcon className="inline-flex h-5 w-5 lg:h-6 lg:w-6" />
      ) : (
        <EyeIcon className="inline-flex h-5 w-5 lg:h-6 lg:w-6" />
      )}
    </button>
  )
}
