import { useEffect, useState } from "react"

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key)
        setStoredValue(item ? JSON.parse(item) : initialValue)
      }
    } catch (error) {
      console.warn(error)
      setStoredValue(initialValue)
    }
  }, [key, initialValue])

  function setValue(value: any) {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(error)
    }
  }

  return [storedValue, setValue]
}

export default function useAccessDenied() {
  const key = `finishershub.access`
  const [accessDenied, setAccessDenied] = useLocalStorage(key, true)

  return [accessDenied, setAccessDenied]
}
