import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HERO_NAME } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'
import { PORTFOLIO_MANAGER_ENABLED } from '@/portfolio-builder/access'
import { DEFAULT_PUBLIC_PRESET } from '@/portfolio-builder/presets'
import type { PortfolioBlockId } from '@/portfolio-builder/types'

const NAV_LINKS = [
  { blockId: 'hero', label: 'Hero', href: '#hero' },
  { blockId: 'about', label: 'About', href: '#about' },
  { blockId: 'projects', label: 'How I Work', href: '#collaboration' },
  { blockId: 'projects', label: 'Projects', href: '#projects' },
  { blockId: 'experience', label: 'Experience', href: '#experience' },
  { blockId: 'closing', label: '마무리', href: '#closing' },
  { blockId: 'resources', label: 'Resources', href: '#resources' },
  { blockId: 'contact', label: 'Contact', href: '#contact' },
] as const satisfies readonly {
  blockId: PortfolioBlockId
  label: string
  href: string
}[]

type NavbarProps = {
  blockIds?: readonly PortfolioBlockId[]
}

export default function Navbar({ blockIds = DEFAULT_PUBLIC_PRESET.blocks }: NavbarProps) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const { dark, toggle } = useDarkMode()
  const visibleNavLinks = useMemo(
    () => NAV_LINKS.filter((link) => blockIds.includes(link.blockId)),
    [blockIds],
  )
  const firstVisibleHref = visibleNavLinks[0]?.href ?? '#hero'

  const handleScroll = useCallback(() => {
    /* `scrolled` toggles nav chrome once the page is scrolled past 60px. */
    setScrolled(window.scrollY > 60)
    let current = 'hero'
    const sectionIds = visibleNavLinks.map((link) => link.href.replace('#', ''))
    for (const sectionId of sectionIds) {
      const el = document.getElementById(sectionId)
      if (el && el.getBoundingClientRect().top <= 80) {
        current = sectionId
      }
    }
    setActiveSection(current)
  }, [visibleNavLinks])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navBg = scrolled
    ? dark
      ? 'bg-[#1e1e1e] shadow-sm'
      : 'bg-white shadow-sm'
    : 'bg-transparent'

  const logoColor = dark ? 'text-[#c0c0c0]' : 'text-[#1E3A5F]'
  const hamburgerColor = dark ? 'bg-[#c0c0c0]' : 'bg-[#1E3A5F]'

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 print:hidden ${navBg}`}
      style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none' }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <span
          className={`cursor-pointer whitespace-nowrap text-lg font-bold ${logoColor}`}
          onClick={() => scrollTo(firstVisibleHref)}
        >
          {HERO_NAME}
        </span>

        <ul className="hidden items-center gap-8 lg:flex">
          {visibleNavLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative cursor-pointer whitespace-nowrap pb-1 text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#1E3A5F]' : 'text-slate-700 hover:text-[#1E3A5F]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#1E3A5F]" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 ${
              dark
                ? 'text-[#c0c0c0] hover:bg-[#2a2a2a]'
                : 'text-slate-700 hover:bg-gray-100'
            }`}
          >
            <i className={`text-xl ${dark ? 'ri-sun-line' : 'ri-moon-line'}`} />
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex cursor-pointer flex-col gap-1.5 p-1 lg:hidden"
          >
            <span className={`block h-0.5 w-6 transition-all duration-300 ${hamburgerColor} ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${hamburgerColor} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 transition-all duration-300 ${hamburgerColor} ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`border-t shadow-sm lg:hidden ${dark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-gray-100 bg-white'}`}>
          {visibleNavLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`block w-full cursor-pointer whitespace-nowrap px-6 py-3 text-left text-base font-medium transition-colors duration-200 ${
                dark
                  ? 'text-[#d1d5db] hover:bg-[#2a2a2a] hover:text-[#c0c0c0]'
                  : 'text-slate-800 hover:bg-gray-50 hover:text-[#1E3A5F]'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className={`grid gap-2 border-t px-6 py-3 ${dark ? 'border-[#333333]' : 'border-gray-100'}`}>
            <Link
              to="/pdf"
              onClick={() => setMenuOpen(false)}
              className={`flex h-10 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                dark
                  ? 'bg-[#334155] text-gray-100 hover:bg-[#475569]'
                  : 'bg-[#1E3A5F] text-white hover:bg-[#152a45]'
              }`}
            >
              PDF 보기
            </Link>
            {PORTFOLIO_MANAGER_ENABLED ? (
              <Link
                to="/manage"
                onClick={() => setMenuOpen(false)}
                className={`flex h-10 items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
                  dark
                    ? 'border-[#475569] text-[#dbeafe] hover:bg-[#2a2a2a]'
                    : 'border-slate-200 text-[#1E3A5F] hover:bg-slate-50'
                }`}
              >
                관리
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  )
}
