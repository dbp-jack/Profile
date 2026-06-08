import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PdfPortfolio from '@/pages/pdf/PdfPortfolio'

const A4_LANDSCAPE_WIDTH_PX = 1123

/**
 * PDF 전용 A4 가로 슬라이드 레이아웃입니다.
 * 웹 본문과 분리해 인쇄 시 페이지 중간 잘림을 줄입니다.
 */
export default function PdfPortfolioPage() {
  const [isMobileViewport, setIsMobileViewport] = useState(
    () => window.matchMedia('(max-width: 767px)').matches,
  )
  const [previewScale, setPreviewScale] = useState(() =>
    Math.min(1, (window.innerWidth - 16) / A4_LANDSCAPE_WIDTH_PX),
  )

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) => setIsMobileViewport(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const updatePreviewScale = () => {
      setPreviewScale(Math.min(1, (window.innerWidth - 16) / A4_LANDSCAPE_WIDTH_PX))
    }

    updatePreviewScale()
    window.addEventListener('resize', updatePreviewScale)
    window.addEventListener('orientationchange', updatePreviewScale)
    return () => {
      window.removeEventListener('resize', updatePreviewScale)
      window.removeEventListener('orientationchange', updatePreviewScale)
    }
  }, [])

  useEffect(() => {
    const onBeforePrint = () => window.scrollTo({ top: 0, left: 0 })
    window.addEventListener('beforeprint', onBeforePrint)
    return () => window.removeEventListener('beforeprint', onBeforePrint)
  }, [])

  const pdfColumnStyle = {
    '--pdf-preview-scale': isMobileViewport ? previewScale : 1,
  } as React.CSSProperties

  return (
    <div className="min-h-screen bg-[#0b1220] print:bg-transparent">
      <style>{`
        @media screen and (max-width: 767px) {
          .portfolio-pdf-column {
            width: 297mm !important;
            max-width: none !important;
            zoom: var(--pdf-preview-scale);
          }
        }

        @media print {
          .portfolio-pdf-column {
            width: 100% !important;
            max-width: none !important;
            zoom: 1 !important;
          }
        }
      `}</style>
      <header className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 shadow-sm print:hidden">
        <Link
          to="/"
          className="text-base font-medium text-gray-600 underline-offset-2 hover:text-[#1E3A5F] hover:underline"
        >
          ← 사이트로
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-gray-500 sm:inline">
            A4 가로 PDF 미리보기 · 색이 다르면 인쇄 창에서 배경 그래픽 켜기
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
          className={`portfolio-pdf-column mx-auto overflow-hidden ${
            isMobileViewport ? 'w-full max-w-none shadow-none' : 'w-[297mm] max-w-full shadow-2xl'
          } bg-[#0f172a] text-gray-100 print:overflow-visible print:mx-0 print:w-full print:max-w-none print:shadow-none`}
          style={pdfColumnStyle}
        >
          <PdfPortfolio />
        </div>
      </div>
    </div>
  )
}
