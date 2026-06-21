/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_PORTFOLIO_ADMIN?: string
  readonly VITE_PRIVATE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Injected by Vite `define` in `vite.config.ts` — used as `BrowserRouter` basename. */
declare const __BASE_PATH__: string
