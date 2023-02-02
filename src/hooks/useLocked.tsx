import { useEffect, useState } from 'react'
import { FinishersClubMember } from '../@types'

const useLocalStorage = (key: string, initialValue?: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      console.warn(error)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(error)
    }
  }
  return [storedValue, setValue]
}

export default function useLocked(member: FinishersClubMember) {
  const key = `finishershub.members.${member.name}`
  const [locked, setLocked] = useLocalStorage(key, true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(locked))
    }
  }, [locked])

  return [locked, setLocked]
}
