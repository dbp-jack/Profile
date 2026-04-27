import { useCallback, useEffect, useRef, useState } from 'react'
import { HERO_NAME } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'

const NAV_LINKS = [
  { label: 'Hero', href: '#hero', icon: 'ri-home-4-line' },
  { label: 'About', href: '#about', icon: 'ri-user-heart-line' },
  { label: 'Projects', href: '#projects', icon: 'ri-code-box-line' },
  { label: 'Closing', href: '#closing', icon: 'ri-book-open-line' },
  { label: 'Resources', href: '#resources', icon: 'ri-links-line' },
  { label: 'Contact', href: '#contact', icon: 'ri-mail-line' },
]

export default function Sidebar() {
  const { dark, toggle } = useDarkMode()
  const [hovered, setHovered] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleScroll = useCallback(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))
    for (const sectionId of sectionIds) {
      const el = document.getElementById(sectionId)
      if (el && el.getBoundingClientRect().top <= 100) {
        setActiveSection(sectionId)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current)
        leaveTimer.current = null
      }
    }
  }, [handleScroll])

  const handleMouseEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
    setHovered(true)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false)
      leaveTimer.current = null
    }, 200)
  }

  /** Smooth-scroll to section id; not wrapped in `useCallback` (unlike `handleScroll`). */
  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/*
        Dual-zone hover: invisible strip (sibling) catches the left screen edge; <aside> is the real bar.
        Both sit as direct children of this Fragment (<>…</>).
      */}
      <div className="fixed left-0 top-0 z-50 hidden h-full w-4 md:block" onMouseEnter={handleMouseEnter} />
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-full flex-col overflow-hidden border-r transition-all duration-300 ease-in-out md:flex ${hovered ? 'w-52' : 'w-14'} ${dark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-gray-100 bg-white'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo row: same as first nav item — scrolls to `#hero`. */}
        <button
          onClick={() => scrollTo('#hero')}
          className={`flex h-16 flex-shrink-0 cursor-pointer items-center gap-3 overflow-hidden border-b px-4 text-left transition-colors duration-300 ${dark ? 'border-[#333333]' : 'border-gray-100'}`}
        >
          <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-lg ${dark ? 'text-[#909090]' : 'text-[#1E3A5F]'}`}><i className="ri-code-s-slash-line" /></span>
          <span className={`overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 ${hovered ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'} ${dark ? 'text-[#c0c0c0]' : 'text-[#1E3A5F]'}`}>{HERO_NAME}</span>
        </button>
        <nav className="flex flex-1 flex-col gap-1 overflow-hidden px-2 py-4">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative flex w-full cursor-pointer items-center gap-3 overflow-hidden whitespace-nowrap rounded-lg px-2 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? dark
                      ? 'bg-[#333333] text-[#e0e0e0]'
                      : 'bg-[#EFF6FF] text-[#1E3A5F]'
                    : dark
                      ? 'text-[#707070] hover:bg-[#2a2a2a] hover:text-[#b0b0b0]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E3A5F]'
                }`}
              >
                {isActive && <span className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full ${dark ? 'bg-[#8a8a8a]' : 'bg-[#1E3A5F]'}`} />}
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-base"><i className={link.icon} /></span>
                <span className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${hovered ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'}`}>{link.label}</span>
              </button>
            )
          })}
        </nav>
        <div className={`flex-shrink-0 border-t px-2 pb-6 pt-4 ${dark ? 'border-[#333333]' : 'border-gray-100'}`}>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg px-2 py-2.5 transition-all duration-200 ${dark ? 'text-[#909090] hover:bg-[#2a2a2a] hover:text-[#c0c0c0]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E3A5F]'}`}
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-base"><i className={dark ? 'ri-sun-line' : 'ri-moon-line'} /></span>
            <span className={`whitespace-nowrap text-sm font-medium transition-all duration-300 ${hovered ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'}`}>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
