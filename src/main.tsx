import { StrictMode } from 'react'
/* i18n must load before React tree / CSS so init runs first (SECTION 22). */
import './i18n'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
