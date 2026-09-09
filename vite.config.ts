import { defineConfig } from 'vite'
import type { PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { mkdir, writeFile } from 'node:fs/promises'

const basePath = process.env.BASE_PATH || '/'
const localManagerSourcePath = '/src/pages/manage/'

// GitHub Pages에서도 /pdf 직접 접속과 새로고침에 앱 진입점을 제공한다.
function pdfPageEntry(): PluginOption {
  return {
    name: 'pdf-page-entry',
    apply: 'build',
    async writeBundle({ dir }, bundle) {
      const entry = bundle['index.html']
      if (!dir || entry?.type !== 'asset') {
        this.error('PDF 페이지의 HTML 진입점을 찾을 수 없습니다.')
      }
      const pdfDirectory = path.join(dir, 'pdf')
      await mkdir(pdfDirectory, { recursive: true })
      await writeFile(path.join(pdfDirectory, 'index.html'), entry.source)
    },
  }
}

function blockLocalManagerInPublicBuild(): PluginOption {
  return {
    name: 'block-local-manager-in-public-build',
    apply: 'build' as const,
    generateBundle(_options: unknown, bundle: Record<string, {
      type: string
      modules?: Record<string, unknown>
      code?: string
      source?: string | Uint8Array
    }>) {
      for (const output of Object.values(bundle)) {
        const bundledManageModule =
          output.type === 'chunk'
            ? Object.keys(output.modules ?? {}).find((moduleId) =>
                moduleId.split(path.sep).join('/').includes(localManagerSourcePath),
              )
            : null

        if (bundledManageModule) {
          throw new Error(
            `Local portfolio manager source was included in a public build: ${bundledManageModule}`,
          )
        }

        const outputText =
          output.code ?? (typeof output.source === 'string' ? output.source : '')

        if (
          outputText.includes('Local Portfolio Manager') ||
          outputText.includes('portfolio-manager-') ||
          outputText.includes('포트폴리오 블록 조합') ||
          outputText.includes('한 페이지 포트폴리오 관리') ||
          outputText.includes('../pages/manage/page.tsx')
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
  plugins: [react(), blockLocalManagerInPublicBuild(), pdfPageEntry()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __BASE_PATH__: JSON.stringify(basePath),
  },
})
