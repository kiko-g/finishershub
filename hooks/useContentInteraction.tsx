import { useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import useAccessDenied from "./useAccessDenied"

export function useContentInteraction() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [accessDenied, setAccessDenied] = useAccessDenied()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const isContentReady = useMemo(() => !isLoading && !fetchError, [isLoading, fetchError])

  return {
    isMobile,
    accessDenied,
    setAccessDenied,
    isLoading,
    setIsLoading,
    fetchError,
    setFetchError,
    isContentReady,
  }
}
