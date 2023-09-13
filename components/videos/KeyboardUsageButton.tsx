import { useCallback, useEffect } from "react"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { getButtonSizeClassNames } from "../../utils"
import classNames from "classnames"

type Props = {
  showHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  size?: "sm" | "md" | "lg" | "xl"
}
export function KeyboardUsageButton({ showHook, size = "sm" }: Props) {
  const [show, setShow] = showHook

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev)
  }, [setShow])

  useEffect(() => {
    setTimeout(() => setShow(false), 5000)
  }, [setShow])

  useEffect(() => {
    function handleKeyDown(event: any) {
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
          getButtonSizeClassNames(size),
          "fill-white text-sky-800 dark:fill-cyan-500/20 dark:text-cyan-500",
        )}
        aria-hidden="true"
      />
    </button>
  )
}
