import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Class-based theme: `document.documentElement` gets `dark` toggled in an effect.
 * Persistence: `localStorage` key `portfolio-dark-mode` (string `"true"` / `"false"`).
 * Initial value: read that key first; if missing, fall back to `prefers-color-scheme: dark`.
 * `toggle` is stable via `useCallback` (empty deps).
 */
export interface DarkModeContextValue {
  dark: boolean
  toggle: () => void
}

const STORAGE_KEY = 'portfolio-dark-mode'

export const DarkModeContext = createContext<DarkModeContextValue>({
  dark: false,
  toggle: () => {},
})

export const useDarkModeState = (): DarkModeContextValue => {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) return stored === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  useEffect(() => {
    try {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem(STORAGE_KEY, String(dark))
    } catch {
      // ignore storage/document errors
    }
  }, [dark])

  const toggle = useCallback(() => setDark((v) => !v), [])

  return useMemo(
    () => ({
      dark,
      toggle,
    }),
    [dark, toggle],
  )
}

export const useDarkMode = (): DarkModeContextValue => useContext(DarkModeContext)
