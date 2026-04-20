import type { Config } from 'tailwindcss'

/** Class-based dark mode on `document.documentElement`. `content` is required by Tailwind. */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
