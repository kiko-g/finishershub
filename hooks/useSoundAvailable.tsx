import { useEffect, useState } from "react"
import { getSoundStatus, turnSoundOff, turnSoundOn } from "@/utils"

export function useSoundAvailable() {
  const isDevelopment = process.env.NODE_ENV === "development"
  const [isEmergency, setIsEmergency] = useState(process.env.NEXT_PUBLIC_SENSITIVE === "true")

  const [willToggleSound, setWillToggleSound] = useState<boolean | null>(null)
  const [mongoAudioAvailable, setMongoAudioAvailable] = useState(false)

  const soundAvailable = mongoAudioAvailable

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
    if (willToggleSound === null) return

    getSoundStatus().then((status: boolean) => {
      if (status === true) {
        turnSoundOff().then(() => setMongoAudioAvailable(false))
      } else {
        turnSoundOn().then(() => setMongoAudioAvailable(true))
      }
    })
  }, [willToggleSound])

  return {
    soundAvailable,
    willToggleSound,
    setWillToggleSound,
    isEmergency,
    setIsEmergency,
  }
}
