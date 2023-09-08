import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import ShuffleIcon from "../utils/icons/ShuffleIcon"
import classNames from "classnames"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
}

export default function VideoOrderToggler({ hook }: Props) {
  const [shuffle, setShuffle] = hook

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev)
  }, [setShuffle])

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 83) toggleShuffle() // s key
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleShuffle])

  return (
    <div className="flex items-end justify-center space-x-2">
      <button
        title={shuffle ? "Turn shuffle off" : "Turn shuffle on"}
        className={classNames(
          "transition hover:opacity-80",
          shuffle ? "text-primary dark:text-secondary" : "text-gray-800 dark:text-white",
        )}
        onClick={toggleShuffle}
      >
        <ShuffleIcon className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
    </div>
  )
}
