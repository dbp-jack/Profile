import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const basePath = process.env.BASE_PATH || '/'
const localManagerSourcePath = '/src/pages/manage/'

function blockLocalManagerInPublicBuild(): PluginOption {
  return {
    name: 'block-local-manager-in-public-build',
    apply: 'build' as const,
    generateBundle(_options: unknown, bundle: Record<string, { type: string; modules?: Record<string, unknown>; code?: string }>) {
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue

        const bundledManageModule = Object.keys(output.modules ?? {}).find((moduleId) =>
          moduleId.split(path.sep).join('/').includes(localManagerSourcePath),
        )

        if (bundledManageModule) {
          throw new Error(
            `Local portfolio manager source was included in a public build: ${bundledManageModule}`,
          )
        }

        if (
          output.code?.includes('Local Portfolio Manager') ||
          output.code?.includes('portfolio-manager-') ||
          output.code?.includes('포트폴리오 블록 조합') ||
          output.code?.includes('../pages/manage/page.tsx')
        ) {
          throw new Error('Local portfolio manager strings were included in a public build.')
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [react(), blockLocalManagerInPublicBuild()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify(basePath),
  },
})
