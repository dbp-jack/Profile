import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDarkMode } from '@/hooks/useDarkMode'
import PortfolioBody from './PortfolioBody'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import type { HeroVariant } from './components/HeroSection'

export default function Home() {
  const { dark } = useDarkMode()
  const [heroVariant, setHeroVariant] = useState<HeroVariant>('current')

  const comparisonButtonClass = (variant: HeroVariant) => {
    const selected = heroVariant === variant
    if (selected) {
      return dark ? 'bg-[#e5e7eb] text-[#202020]' : 'bg-[#1E3A5F] text-white'
    }
    return dark
      ? 'text-[#a5a5ad] hover:bg-[#3a3a40] hover:text-white'
      : 'text-slate-500 hover:bg-slate-100 hover:text-[#1E3A5F]'
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-[#0f172a] text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <Link
        to="/pdf"
        className={`fixed right-3 top-3 z-[60] rounded-lg px-3 py-2 text-sm font-semibold shadow-md transition-colors print:hidden sm:right-4 sm:top-4 sm:text-base ${
          dark
            ? 'bg-[#1e293b] text-gray-100 ring-1 ring-white/10 hover:bg-[#334155]'
            : 'bg-[#1E3A5F] text-white hover:bg-[#152a45]'
        }`}
      >
        PDF
      </Link>
      <div
        className={`fixed bottom-4 right-4 z-[70] flex items-center gap-1 rounded-xl border p-1.5 shadow-lg print:hidden ${
          dark
            ? 'border-[#44444b] bg-[#29292f]/95'
            : 'border-slate-200 bg-white/95'
        }`}
        aria-label="Hero 버전 비교"
      >
        <span className={`px-2 text-xs font-extrabold ${dark ? 'text-[#8f95a3]' : 'text-slate-400'}`}>
          HERO
        </span>
        <button
          type="button"
          onClick={() => setHeroVariant('current')}
          aria-pressed={heroVariant === 'current'}
          className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${comparisonButtonClass('current')}`}
        >
          현재
        </button>
        <button
          type="button"
          onClick={() => setHeroVariant('revised')}
          aria-pressed={heroVariant === 'revised'}
          className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${comparisonButtonClass('revised')}`}
        >
          수정
        </button>
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
      <Sidebar heroVariant={heroVariant} onHeroVariantChange={setHeroVariant} />
      <div className="pt-16 md:pt-0 md:pl-14">
        <PortfolioBody heroVariant={heroVariant} />
      </div>
    </div>
  )
}
