import { Link } from 'react-router-dom'
import { useDarkMode } from '@/hooks/useDarkMode'
import PortfolioBody from './PortfolioBody'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

export default function Home() {
  const { dark } = useDarkMode()

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-[#0f172a] text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <Link
        to="/pdf"
        className={`fixed right-3 top-3 z-[60] rounded-lg px-3 py-2 text-xs font-semibold shadow-md transition-colors print:hidden sm:right-4 sm:top-4 sm:text-sm ${
          dark
            ? 'bg-[#1e293b] text-gray-100 ring-1 ring-white/10 hover:bg-[#334155]'
            : 'bg-[#1E3A5F] text-white hover:bg-[#152a45]'
        }`}
      >
        PDF
      </Link>
      <div className="md:hidden">
        <Navbar />
      </div>
      <Sidebar />
      <div className="pt-16 md:pt-0 md:pl-14">
        <PortfolioBody />
      </div>
    </div>
  )
}
