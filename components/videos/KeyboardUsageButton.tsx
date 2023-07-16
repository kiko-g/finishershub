import { useCallback, useEffect } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

type Props = {
  showHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}
export default function KeyboardUsageButton({ showHook }: Props) {
  const [show, setShow] = showHook

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev)
  }, [setShow])

  useEffect(() => {
    setTimeout(() => setShow(false), 5000)
  }, [setShow])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 73) {
        toggleShow() // I key
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [toggleShow])

  return (
    <button onClick={() => setShow((prev) => !prev)} className="transition hover:opacity-80">
      <InformationCircleIcon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
    </button>
  )
}
