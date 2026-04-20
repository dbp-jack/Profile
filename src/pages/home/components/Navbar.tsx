import { useCallback, useEffect, useState } from 'react'
import { HERO_NAME } from '@/content/portfolio'

const NAV_LINKS = [
  { label: 'Hero', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: '마무리', href: '#closing' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleScroll = useCallback(() => {
    /* `scrolled` toggles nav chrome once the page is scrolled past 60px. */
    setScrolled(window.scrollY > 60)
    let current = 'hero'
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))
    for (const sectionId of sectionIds) {
      const el = document.getElementById(sectionId)
      if (el && el.getBoundingClientRect().top <= 80) {
        current = sectionId
      }
    }
    setActiveSection(current)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}
      style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none' }}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <span
          className="cursor-pointer whitespace-nowrap text-base font-bold text-[#1E3A5F]"
          onClick={() => scrollTo('#hero')}
        >
          {HERO_NAME}
        </span>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative cursor-pointer whitespace-nowrap pb-1 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-[#1E3A5F]' : 'text-gray-500 hover:text-[#1E3A5F]'
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

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex cursor-pointer flex-col gap-1.5 p-1 md:hidden"
        >
          {/* Three bars → “X”: outer lines rotate ±45° and translate; middle fades out. */}
          <span
            className={`block h-0.5 w-6 bg-[#1E3A5F] transition-all duration-300 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1E3A5F] transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1E3A5F] transition-all duration-300 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full cursor-pointer whitespace-nowrap px-6 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1E3A5F]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
