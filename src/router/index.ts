import { useEffect } from 'react'
import { useNavigate, useRoutes, type NavigateFunction } from 'react-router-dom'
import routes from './config'

export let navigatePromise: NavigateFunction | null = null

declare global {
  interface Window {
    REACT_APP_NAVIGATE?: NavigateFunction
  }
}

export function AppRoutes() {
  const element = useRoutes(routes)
  const navigate = useNavigate()

  useEffect(() => {
    navigatePromise = navigate
    window.REACT_APP_NAVIGATE = navigate
  }, [navigate])

  return element
}
