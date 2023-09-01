import React, { useState, useEffect } from 'react'

// Custom Hook persist data into local storage
type UseLocalStorageStateReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>]

export const useLocalStorageState = function <T>(
  initialState: T,
  key: string
): UseLocalStorageStateReturnType<T> {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key)
    if (!storedValue) return initialState
    return JSON.parse(storedValue) as T
  })

  // Set localStorage for value state
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
