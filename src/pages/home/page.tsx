import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDarkMode } from '@/hooks/useDarkMode'
import { PORTFOLIO_MANAGER_ENABLED } from '@/portfolio-builder/access'
import {
  getCompanyPreset,
  getPublicPreset,
  parsePublicBlockSelection,
  parsePublicCopyProfile,
  parsePublicProjectSelection,
} from '@/portfolio-builder/presets'
import PortfolioBody from './PortfolioBody'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Home() {
  const { dark } = useDarkMode()
  const [searchParams] = useSearchParams()
  const composition = useMemo(() => {
    const preset =
      getCompanyPreset(searchParams.get('company')) ?? getPublicPreset(searchParams.get('preset'))
    return {
      blockIds: parsePublicBlockSelection(searchParams.get('blocks')) ?? preset.blocks,
      projectIds: parsePublicProjectSelection(searchParams.get('projects')) ?? preset.projectIds,
      copyProfileId: searchParams.has('copy')
        ? parsePublicCopyProfile(searchParams.get('copy'))
        : preset.copyProfileId,
    }
  }, [searchParams])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-[#0f172a] text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <div className="fixed right-3 top-3 z-[60] flex items-center gap-2 print:hidden sm:right-4 sm:top-4">
        {PORTFOLIO_MANAGER_ENABLED ? (
          <Link
            to="/manage"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-[#1E3A5F] shadow-md transition-colors hover:bg-slate-50 sm:text-base"
          >
            <i className="ri-layout-grid-line" aria-hidden="true" />
            관리
          </Link>
        ) : null}
        <Link
          to="/pdf"
          className={`inline-flex h-10 items-center rounded-lg px-3 text-sm font-semibold shadow-md transition-colors sm:text-base ${
            dark
              ? 'bg-[#1e293b] text-gray-100 ring-1 ring-white/10 hover:bg-[#334155]'
              : 'bg-[#1E3A5F] text-white hover:bg-[#152a45]'
          }`}
        >
          PDF
        </Link>
      </div>
      <div className="md:hidden">
        <Navbar blockIds={composition.blockIds} />
      </div>
      <Sidebar blockIds={composition.blockIds} projectIds={composition.projectIds} />
      <div className="pt-16 md:pt-0 md:pl-14">
        <PortfolioBody {...composition} />
      </div>
    </div>
  )
}
