import { useEffect, useState } from 'react'

const useLocalStorage = (key: string, initialValue?: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(error)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(error)
    }
  }
  return [storedValue, setValue]
}

const useAccessDenied = () => {
  const key = `finishershub.access`
  const [accessDenied, setAccessDenied] = useLocalStorage(key, true)

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(accessDenied))
  }, [accessDenied])

  return [accessDenied, setAccessDenied]
}

export default useAccessDenied
