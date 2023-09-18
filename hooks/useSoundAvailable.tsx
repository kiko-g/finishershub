import { useEffect, useMemo, useState } from "react"
import { getSoundStatus, turnSoundOff, turnSoundOn } from "../utils"

export function useSoundAvailable() {
  const isDevelopment = process.env.NODE_ENV === "development"

  const [toggleSound, setToggleSound] = useState<boolean | null>(null)
  const [mongoAudioAvailable, setMongoAudioAvailable] = useState(false)

  const soundAvailable = useMemo(() => mongoAudioAvailable, [mongoAudioAvailable])

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
        turnSoundOff().then(() => setMongoAudioAvailable(false))
      } else {
        turnSoundOn().then(() => setMongoAudioAvailable(true))
      }
    })
  }, [toggleSound])

  return { soundAvailable, toggleSound, setToggleSound }
}
