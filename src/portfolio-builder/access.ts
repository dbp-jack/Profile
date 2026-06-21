const LOCAL_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1'])

export const PORTFOLIO_MANAGER_ENABLED =
  import.meta.env.DEV && LOCAL_HOSTNAMES.has(window.location.hostname)

export const PUBLIC_PORTFOLIO_URL =
  import.meta.env.VITE_PUBLIC_PORTFOLIO_URL ?? 'https://dbp-jack.github.io/Profile/'
