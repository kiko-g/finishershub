import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react"
import { getButtonSizeClassNames } from "@/utils"
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline"
import { useSoundAvailable } from "../../hooks/useSoundAvailable"

type Props = {
  hook: [boolean, Dispatch<SetStateAction<boolean>>]
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  limitedAccess?: boolean
}

export function AutomuteToggler({ hook, size = "sm", limitedAccess = true }: Props) {
  const [muted, setMuted] = hook
  const { soundAvailable } = useSoundAvailable()

  const toggleMute = useCallback(() => {
    if (soundAvailable) setMuted((prev) => !prev)
    else setMuted(true)
  }, [setMuted, soundAvailable])

  return (
    <button
      title={muted ? "Turn default mute off" : "Turn default mute on"}
      onClick={toggleMute}
      className="inline-flex items-center justify-center gap-x-1 rounded border border-primary bg-primary/70 px-1.5 py-1.5 text-center text-xs text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary dark:bg-primary/50 lg:px-2 lg:py-1.5 lg:text-sm"
    >
      <span className="hidden tracking-tighter lg:inline-flex">Automute</span>
      {muted ? (
        <SpeakerXMarkIcon className={getButtonSizeClassNames(size)} />
      ) : (
        <SpeakerWaveIcon className={getButtonSizeClassNames(size)} />
      )}
    </button>
  )
}
