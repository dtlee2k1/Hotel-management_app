import { createContext, useEffect } from 'react'
import { IDarkModeContext } from '../types/darkModeContext.type'
import { useLocalStorageState } from '../hooks/useLocalStorageState'

const DarkModeContext = createContext<IDarkModeContext | null>(null)

interface DarkModeContextProps {
  children: React.ReactNode
}

function DarkModeProvider({ children }: DarkModeContextProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(false, 'isDarkMode')

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((isDark) => !isDark)

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export { DarkModeContext, DarkModeProvider }
