import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDarkMode } from '@/hooks/useDarkMode'
import PortfolioBody from '@/pages/home/PortfolioBody'

/**
 * 웹과 동일한 섹션·스타일을 쓰고, 미리보기 폭을 A4 가로(297mm)에 맞춥니다.
 * 인쇄·PDF 저장 시 `@page A4 landscape`와 동일 비율이 되도록 합니다.
 */
export default function PdfPortfolioPage() {
  const { dark } = useDarkMode()
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobileViewport(e.matches)
    setIsMobileViewport(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const onBeforePrint = () => window.scrollTo({ top: 0, left: 0 })
    window.addEventListener('beforeprint', onBeforePrint)
    return () => window.removeEventListener('beforeprint', onBeforePrint)
  }, [])

  /* `@page`는 CSS에서 선택자로 한정할 수 없어, /pdf에 있을 때만 가로 용지 규칙을 주입합니다. */
  useEffect(() => {
    const el = document.createElement('style')
    el.setAttribute('data-pdf-landscape-page', '')
    el.textContent = `@media print { @page { size: A4 landscape; margin: 0; } }`
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <div className="min-h-screen bg-[#e5e7eb] print:bg-transparent">
      <header className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 shadow-sm print:hidden">
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 underline-offset-2 hover:text-[#1E3A5F] hover:underline"
        >
          ← 사이트로
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-gray-500 sm:inline">
            미리보기 A4 가로 · 색이 다르면 인쇄 창에서 배경 그래픽 켜기
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-[#1E3A5F] px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-[#152a45]"
          >
            PDF로 저장
          </button>
        </div>
      </header>

      <div className="overflow-x-auto pb-8 pt-14 sm:pb-10 print:overflow-visible print:pb-0 print:pt-0">
        <div
          data-portfolio-mode={isMobileViewport ? undefined : 'pdf'}
          className={`portfolio-pdf-column mx-auto overflow-hidden ${
            isMobileViewport ? 'w-full max-w-none shadow-none' : 'w-[297mm] max-w-full shadow-2xl'
          } print:overflow-visible print:mx-0 print:w-full print:max-w-none print:shadow-none ${
            dark ? 'bg-[#0f172a] text-gray-100' : 'bg-white text-gray-900'
          }`}
        >
          <PortfolioBody pdfStackHeroAbout={!isMobileViewport} />
        </div>
      </div>
    </div>
  )
}
