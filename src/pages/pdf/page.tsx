import { Link } from 'react-router-dom'
import PdfPortfolio from './PdfPortfolio'

export default function PdfPortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-200">
      {/* 상단 컨트롤 바 */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-12 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 shadow-sm print:hidden">
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 underline-offset-2 hover:text-[#1E3A5F] hover:underline"
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

      {/* 슬라이드 미리보기 영역 */}
      <div className="flex flex-col items-center gap-4 pb-8 pt-16 print:gap-0 print:p-0">
        <PdfPortfolio />
      </div>
    </div>
  )
}
