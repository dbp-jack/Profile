/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_PORTFOLIO_URL?: string
  readonly VITE_PRIVATE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Injected by Vite `define` in `vite.config.ts` — used as `BrowserRouter` basename. */
declare const __BASE_PATH__: string
