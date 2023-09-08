import { useCallback, useEffect } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"

type Props = {
  showHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  size?: "sm" | "md" | "lg" | "xl"
}
export default function KeyboardUsageButton({ showHook, size = "sm" }: Props) {
  const [show, setShow] = showHook

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev)
  }, [setShow])

  useEffect(() => {
    setTimeout(() => setShow(false), 5000)
  }, [setShow])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 73) toggleShow() // I key
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleShow])

  return (
    <button onClick={() => setShow((prev) => !prev)} className="hidden transition hover:opacity-80 lg:inline-flex">
      <InformationCircleIcon
        className={classNames(
          size === "sm" ? "h-4 w-4 lg:h-6 lg:w-6" : "",
          size === "md" ? "h-5 w-5 lg:h-7 lg:w-7" : "",
          size === "lg" ? "h-6 w-6 lg:h-8 lg:w-8" : "",
          size === "xl" ? "h-8 w-8 lg:h-10 lg:w-10" : "",
        )}
        aria-hidden="true"
      />
    </button>
  )
}
