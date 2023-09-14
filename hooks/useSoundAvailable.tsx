import { useState } from "react"

export function useSoundAvailable() {
  const [soundAvailable, setSoundAvailable] = useState(() =>
    process.env.NEXT_PUBLIC_SENSITIVE === "true" ? false : true,
  )

  return [soundAvailable]
}
