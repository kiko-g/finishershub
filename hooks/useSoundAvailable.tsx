import { useEffect, useMemo, useState, useRef } from "react"
import { getSoundStatus, turnSoundOff, turnSoundOn } from "../utils"

export function useSoundAvailable() {
  const [toggleSound, setToggleSound] = useState<boolean | null>(null)
  const [mongoAudioAvailable, setMongoAudioAvailable] = useState(false)

  const soundAvailable = useMemo(() => {
    const isDevelopment = process.env.NODE_ENV === "development"
    return mongoAudioAvailable && isDevelopment
  }, [mongoAudioAvailable])

  useEffect(() => {
    async function fetchData() {
      try {
        const status = await getSoundStatus()
        setMongoAudioAvailable(status)
      } catch (error) {
        console.error(`Error fetching sound status: ${error}`)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (toggleSound === null) return

    getSoundStatus().then((status: boolean) => {
      if (status === true) {
        turnSoundOff()
        setMongoAudioAvailable(false)
      } else {
        turnSoundOn()
        setMongoAudioAvailable(true)
      }
    })
  }, [toggleSound])

  return { soundAvailable, toggleSound, setToggleSound }
}
