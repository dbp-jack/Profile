import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const basePath = process.env.BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify(basePath),
  },
})
