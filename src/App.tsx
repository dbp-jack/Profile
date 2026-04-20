import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { AppRoutes } from './router'
import { DarkModeContext, useDarkModeState } from '@/hooks/useDarkMode'

/** Provider nesting (outer → inner): `I18nextProvider` → `BrowserRouter` → `DarkModeContext` → `AppRoutes`. */

function AppWithDarkMode() {
  const darkModeValue = useDarkModeState()
  return (
    <DarkModeContext.Provider value={darkModeValue}>
      <AppRoutes />
    </DarkModeContext.Provider>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <AppWithDarkMode />
      </BrowserRouter>
    </I18nextProvider>
  )
}

export default App
