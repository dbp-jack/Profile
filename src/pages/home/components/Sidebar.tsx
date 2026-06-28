import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HERO_NAME } from '@/content/portfolio'
import { PROJECT_OVERVIEWS } from '@/content/projects'
import { useDarkMode } from '@/hooks/useDarkMode'
import { DEFAULT_PUBLIC_PRESET } from '@/portfolio-builder/presets'
import type { PortfolioBlockId } from '@/portfolio-builder/types'

type NavLink = {
  blockId: PortfolioBlockId
  label: string
  href: string
  icon: string
  /** Optional scroll adjustment for anchors that should not land on their exact section boundary. */
  offset?: number
}

const DEFAULT_SCROLL_OFFSET = 0
const ACTIVE_SECTION_THRESHOLD = 1
const SIDEBAR_PEEK_MS = 2600

const BASE_NAV_LINKS: readonly NavLink[] = [
  { blockId: 'hero', label: 'Hero', href: '#hero', icon: 'ri-home-4-line' },
  { blockId: 'about', label: 'About', href: '#about', icon: 'ri-user-heart-line' },
  { blockId: 'projects', label: 'Projects', href: '#projects', icon: 'ri-code-box-line' },
  { blockId: 'projects', label: 'How I Work', href: '#collaboration', icon: 'ri-team-line' },
  { blockId: 'experience', label: 'Experience', href: '#experience', icon: 'ri-time-line' },
  { blockId: 'closing', label: 'Closing', href: '#closing', icon: 'ri-book-open-line' },
  { blockId: 'resources', label: 'Resources', href: '#resources', icon: 'ri-links-line' },
  { blockId: 'contact', label: 'Contact', href: '#contact', icon: 'ri-mail-line' },
]

type SidebarProps = {
  blockIds?: readonly PortfolioBlockId[]
  projectIds?: readonly string[]
}

export default function Sidebar({
  blockIds = DEFAULT_PUBLIC_PRESET.blocks,
  projectIds = DEFAULT_PUBLIC_PRESET.projectIds,
}: SidebarProps) {
  const { dark, toggle } = useDarkMode()
  const [hovered, setHovered] = useState(false)
  const [autoPeek, setAutoPeek] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const peekTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const projectNavLinks = useMemo<NavLink[]>(
    () =>
      projectIds
        .map((projectId) => PROJECT_OVERVIEWS.find((project) => project.id === projectId))
        .filter((project): project is (typeof PROJECT_OVERVIEWS)[number] => Boolean(project))
        .map((project) => ({
          blockId: 'projects',
          label: project.name,
          href: `#project-${project.id}`,
          icon: 'ri-folder-2-line',
        })),
    [projectIds],
  )
  const navLinks = useMemo<NavLink[]>(() => {
    const howIWorkIndex = BASE_NAV_LINKS.findIndex((link) => link.href === '#collaboration')
    return [
      ...BASE_NAV_LINKS.slice(0, howIWorkIndex + 1),
      ...projectNavLinks,
      ...BASE_NAV_LINKS.slice(howIWorkIndex + 1),
    ]
  }, [projectNavLinks])
  const visibleNavLinks = useMemo(
    () => navLinks.filter((link) => blockIds.includes(link.blockId)),
    [navLinks, blockIds],
  )
  const firstVisibleHref = visibleNavLinks[0]?.href ?? '#hero'
  const expanded = hovered || autoPeek

  const handleScroll = useCallback(() => {
    const sectionIds = visibleNavLinks.map((link) => link.href.replace('#', ''))
    let current = sectionIds[0] ?? 'hero'
    for (const sectionId of sectionIds) {
      const el = document.getElementById(sectionId)
      if (el && el.getBoundingClientRect().top <= ACTIVE_SECTION_THRESHOLD) {
        current = sectionId
      }
    }
    setActiveSection(current)
  }, [visibleNavLinks])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    const initialScrollFrame = window.requestAnimationFrame(handleScroll)
    return () => {
      window.cancelAnimationFrame(initialScrollFrame)
      window.removeEventListener('scroll', handleScroll)
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current)
        leaveTimer.current = null
      }
      if (peekTimer.current) {
        clearTimeout(peekTimer.current)
        peekTimer.current = null
      }
    }
  }, [handleScroll])

  useEffect(() => {
    peekTimer.current = setTimeout(() => {
      setAutoPeek(false)
      peekTimer.current = null
    }, SIDEBAR_PEEK_MS)

    return () => {
      if (peekTimer.current) {
        clearTimeout(peekTimer.current)
        peekTimer.current = null
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current)
      leaveTimer.current = null
    }
    if (peekTimer.current) {
      clearTimeout(peekTimer.current)
      peekTimer.current = null
    }
    setAutoPeek(false)
    setHovered(true)
  }

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(false)
      leaveTimer.current = null
    }, 200)
  }

  /** Smooth-scroll to the section boundary so the color/section break lands exactly at the viewport top. */
  const scrollTo = (href: string, offset = DEFAULT_SCROLL_OFFSET) => {
    const sectionId = href.replace('#', '')
    const el = document.getElementById(sectionId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    setActiveSection(sectionId)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      {/*
        Dual-zone hover: invisible strip (sibling) catches the left screen edge; <aside> is the real bar.
        Both sit as direct children of this Fragment (<>…</>).
      */}
      <div className="fixed left-0 top-0 z-50 hidden h-full w-4 md:block" onMouseEnter={handleMouseEnter} />
      <button
        type="button"
        onClick={handleMouseEnter}
        aria-label="사이드바 탐색 메뉴 열기"
        className={`fixed left-3 top-24 z-50 hidden items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-extrabold shadow-lg transition-all duration-300 md:inline-flex ${
          expanded
            ? 'pointer-events-none -translate-x-3 opacity-0'
            : dark
              ? 'border-[#475569] bg-[#1e293b] text-[#dbeafe] shadow-black/25 hover:border-[#8fb5ff] hover:text-white'
              : 'border-[#bfdbfe] bg-white text-[#1E3A5F] shadow-blue-900/10 hover:border-[#2563EB] hover:text-[#2563EB]'
        }`}
      >
        <i className="ri-menu-2-line text-base" aria-hidden />
        탐색
        <i className="ri-arrow-right-s-line text-base" aria-hidden />
      </button>
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-full flex-col overflow-hidden border-r transition-all duration-300 ease-in-out md:flex ${expanded ? 'w-56 shadow-2xl' : 'w-16 shadow-[8px_0_24px_rgba(30,58,95,0.08)]'} ${dark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-blue-100 bg-white'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo row: scrolls to the first block included in the current preset. */}
        <button
          onClick={() => scrollTo(firstVisibleHref)}
          aria-label="첫 섹션으로 이동"
          className={`flex h-16 flex-shrink-0 cursor-pointer items-center gap-3 overflow-hidden border-b px-4 text-left transition-colors duration-300 ${dark ? 'border-[#333333]' : 'border-blue-100'}`}
        >
          <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-xl ${dark ? 'bg-[#2a2a2a] text-[#dbeafe]' : 'bg-[#EFF6FF] text-[#1E3A5F]'}`}><i className="ri-code-s-slash-line" /></span>
          <span className={`overflow-hidden whitespace-nowrap text-base font-bold transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'} ${dark ? 'text-[#c0c0c0]' : 'text-[#1E3A5F]'}`}>{HERO_NAME}</span>
        </button>
        <nav className="flex flex-1 flex-col gap-1 overflow-hidden px-2 py-4">
          {visibleNavLinks.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href, link.offset)}
                aria-label={`${link.label} 섹션으로 이동`}
                className={`relative flex w-full cursor-pointer items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl px-2 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? dark
                      ? 'bg-[#333333] text-[#e0e0e0] shadow-sm'
                      : 'bg-[#EFF6FF] text-[#1E3A5F] shadow-sm ring-1 ring-blue-100'
                    : dark
                      ? 'text-[#707070] hover:bg-[#2a2a2a] hover:text-[#b0b0b0]'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E3A5F]'
                }`}
              >
                {isActive && <span className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full ${dark ? 'bg-[#8a8a8a]' : 'bg-[#2563EB]'}`} />}
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-xl"><i className={link.icon} /></span>
                <span className={`overflow-hidden whitespace-nowrap text-base font-semibold transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>{link.label}</span>
              </button>
            )
          })}
        </nav>
        <div className={`flex-shrink-0 border-t px-2 pb-6 pt-4 ${dark ? 'border-[#333333]' : 'border-blue-100'}`}>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className={`flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg px-2 py-2.5 transition-all duration-200 ${dark ? 'text-[#909090] hover:bg-[#2a2a2a] hover:text-[#c0c0c0]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#1E3A5F]'}`}
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-lg"><i className={dark ? 'ri-sun-line' : 'ri-moon-line'} /></span>
            <span className={`whitespace-nowrap text-base font-medium transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
