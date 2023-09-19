import { useContext } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
import { IDarkModeContext } from '../types/darkModeContext.type'

export function useDarkMode() {
  const context = useContext(DarkModeContext) as IDarkModeContext
  if (context === undefined || context === null)
    throw new Error('DarkModeContext was used outside of the DarkModeProvider')
  return context
}
