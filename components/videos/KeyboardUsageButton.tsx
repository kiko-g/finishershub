import { useCallback, useEffect } from "react"
import { getButtonSizeClassNames } from "@/utils"
import { InformationCircleIcon as InformationCircleIconSolid } from "@heroicons/react/24/solid"
import { InformationCircleIcon as InformationCircleIconOutline } from "@heroicons/react/24/outline"

type Props = {
  showHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
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
    <button
      title={show ? "Turn autoplay off" : "Turn autoplay on"}
      onClick={() => setShow((show) => !show)}
      className="inline-flex w-full items-center justify-center gap-x-1 rounded border border-primary bg-primary/70 px-1.5 py-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary dark:bg-primary/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      {show ? (
        <InformationCircleIconSolid className={getButtonSizeClassNames(size)} />
      ) : (
        <InformationCircleIconOutline className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
