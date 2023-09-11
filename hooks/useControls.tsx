import { useState } from "react"

export function useControls() {
  const [muted, setMuted] = useState<boolean>(true)
  const [autoplay, setAutoplay] = useState<boolean>(false)
  const [showInstructions, setShowInstructions] = useState<boolean>(false)
  const [expandedView, setExpandedView] = useState<boolean>(false)

  return {
    muted,
    setMuted,
    autoplay,
    setAutoplay,
    showInstructions,
    setShowInstructions,
    expandedView,
    setExpandedView,
  }
}
