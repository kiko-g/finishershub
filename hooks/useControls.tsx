import { useState } from "react"

export function useControls() {
  const [muted, setMuted] = useState<boolean>(false)
  const [autoplay, setAutoplay] = useState<boolean>(true)
  const [shuffled, setShuffled] = useState<boolean>(true)
  const [showInstructions, setShowInstructions] = useState<boolean>(false)
  const [expandedView, setExpandedView] = useState<boolean>(false)

  return {
    muted,
    setMuted,
    autoplay,
    setAutoplay,
    shuffled,
    setShuffled,
    showInstructions,
    setShowInstructions,
    expandedView,
    setExpandedView,
  }
}
