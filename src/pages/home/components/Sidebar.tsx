import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { HERO_NAME } from '@/content/portfolio'
import { PROJECT_OVERVIEWS } from '@/content/projects'
import { useDarkMode } from '@/hooks/useDarkMode'
import { DEFAULT_PUBLIC_PRESET } from '@/portfolio-builder/presets'
import type { PortfolioBlockId } from '@/portfolio-builder/types'
import {
  BASE_NAV_LINKS,
  SIDEBAR_ANCHOR_VIEWPORT_TOP,
  getSidebarAnchorId,
  getSidebarAnchorSelector,
  type SidebarNavLink,
} from './sidebarNavigation'

const ACTIVE_SECTION_THRESHOLD = 1
const SIDEBAR_PEEK_MS = 2600

const getTranslateY = (el: HTMLElement) => {
  const transform = window.getComputedStyle(el).transform
  if (!transform || transform === 'none') return 0

  const matrix = transform.match(/^matrix\((.+)\)$/)
  if (matrix) {
    const values = matrix[1].split(',').map((value) => Number.parseFloat(value.trim()))
    return Number.isFinite(values[5]) ? values[5] : 0
  }

  const matrix3d = transform.match(/^matrix3d\((.+)\)$/)
  if (matrix3d) {
    const values = matrix3d[1].split(',').map((value) => Number.parseFloat(value.trim()))
    return Number.isFinite(values[13]) ? values[13] : 0
  }

  return 0
}

const getCumulativeTranslateY = (el: HTMLElement) => {
  let translateY = 0
  let node: HTMLElement | null = el
  while (node && node !== document.body) {
    translateY += getTranslateY(node)
    node = node.parentElement
  }
  return translateY
}

const getAnchorPageTop = (el: HTMLElement) => {
  return el.getBoundingClientRect().top + window.scrollY - getCumulativeTranslateY(el)
}

const getSidebarAnchorElement = (link: SidebarNavLink) => {
  const anchorId = getSidebarAnchorId(link.href)
  return (
    document.querySelector<HTMLElement>(getSidebarAnchorSelector(anchorId)) ??
    document.getElementById(anchorId)
  )
}

const getLinkScrollTop = (link: SidebarNavLink) => {
  const anchorEl = getSidebarAnchorElement(link)
  if (!anchorEl) return null
  return getAnchorPageTop(anchorEl) - SIDEBAR_ANCHOR_VIEWPORT_TOP[link.anchorKind]
}

const getMaxScrollTop = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

const getReachableScrollTop = (top: number) => {
  return Math.min(Math.max(0, top), getMaxScrollTop())
}

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
  const projectNavLinks = useMemo<SidebarNavLink[]>(
    () =>
      projectIds
        .map((projectId) => PROJECT_OVERVIEWS.find((project) => project.id === projectId))
        .filter((project): project is (typeof PROJECT_OVERVIEWS)[number] => Boolean(project))
        .map((project, index) => ({
          blockId: 'projects',
          label: `P${index + 1} ${project.name}`,
          href: `#project-${project.id}`,
          icon: 'ri-folder-2-line',
          anchorKind: 'project-card',
        })),
    [projectIds],
  )
  const navLinks = useMemo<SidebarNavLink[]>(() => {
    const projectsIndex = BASE_NAV_LINKS.findIndex((link) => link.href === '#projects')
    return [
      ...BASE_NAV_LINKS.slice(0, projectsIndex + 1),
      ...projectNavLinks,
      ...BASE_NAV_LINKS.slice(projectsIndex + 1),
    ]
  }, [projectNavLinks])
  const visibleNavLinks = useMemo(
    () => navLinks.filter((link) => blockIds.includes(link.blockId)),
    [navLinks, blockIds],
  )
  const firstVisibleLink = visibleNavLinks[0] ?? BASE_NAV_LINKS[0]
  const expanded = hovered || autoPeek

  const handleScroll = useCallback(() => {
    let current = getSidebarAnchorId(visibleNavLinks[0]?.href ?? '#hero')
    for (const link of visibleNavLinks) {
      const top = getLinkScrollTop(link)
      if (top === null) continue
      const targetTop = getReachableScrollTop(top)
      if (targetTop - window.scrollY <= ACTIVE_SECTION_THRESHOLD) {
        current = getSidebarAnchorId(link.href)
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

  const scrollTo = (link: SidebarNavLink) => {
    const sectionId = getSidebarAnchorId(link.href)
    const top = getLinkScrollTop(link)
    if (top === null) return
    setActiveSection(sectionId)
    window.scrollTo({ top: getReachableScrollTop(top), behavior: 'smooth' })
  }

  return (
    <>
      {/*
        Dual-zone hover: invisible strip (sibling) catches the left screen edge; <aside> is the real bar.
        Both sit as direct children of this Fragment (<>…</>).
      */}
      <div className="fixed left-0 top-0 z-50 hidden h-full w-4 lg:block" onMouseEnter={handleMouseEnter} />
      <button
        type="button"
        onClick={handleMouseEnter}
        aria-label="포트폴리오 목차 열기"
        className={`fixed left-[4.75rem] top-4 z-50 hidden items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-extrabold shadow-lg transition-all duration-300 lg:inline-flex ${
          expanded
            ? 'pointer-events-none -translate-x-2 opacity-0'
            : dark
              ? 'border-[#475569] bg-[#1e293b] text-[#dbeafe] shadow-black/25 hover:border-[#8fb5ff] hover:text-white'
              : 'border-[#bfdbfe] bg-white text-[#1E3A5F] shadow-blue-900/10 hover:border-[#2563EB] hover:text-[#2563EB]'
        }`}
      >
        <i className="ri-arrow-left-s-line text-base" aria-hidden />
        포트폴리오 목차
      </button>
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-full flex-col overflow-hidden border-r transition-all duration-300 ease-in-out lg:flex ${expanded ? 'w-56 shadow-2xl' : 'w-16 shadow-[8px_0_24px_rgba(30,58,95,0.08)]'} ${dark ? 'border-[#333333] bg-[#1e1e1e]' : 'border-blue-100 bg-white'}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo row: scrolls to the first block included in the current preset. */}
        <button
          onClick={() => scrollTo(firstVisibleLink)}
          aria-label="첫 섹션으로 이동"
          className={`flex h-16 flex-shrink-0 cursor-pointer items-center gap-3 overflow-hidden border-b px-4 text-left transition-colors duration-300 ${dark ? 'border-[#333333]' : 'border-blue-100'}`}
        >
          <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-xl ${dark ? 'bg-[#2a2a2a] text-[#dbeafe]' : 'bg-[#EFF6FF] text-[#1E3A5F]'}`}><i className="ri-code-s-slash-line" /></span>
          <span className={`overflow-hidden whitespace-nowrap text-base font-bold transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'} ${dark ? 'text-[#c0c0c0]' : 'text-[#1E3A5F]'}`}>{HERO_NAME}</span>
        </button>
        <nav className="flex flex-1 flex-col gap-1 overflow-hidden px-2 py-4">
          {visibleNavLinks.map((link) => {
            const sectionId = getSidebarAnchorId(link.href)
            const isActive = activeSection === sectionId
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link)}
                aria-label={`${link.label} 섹션으로 이동`}
                className={`relative flex w-full cursor-pointer items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl px-2 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? dark
                      ? 'bg-[#333333] text-[#e0e0e0] shadow-sm'
                      : 'bg-[#EFF6FF] text-[#1E3A5F] shadow-sm ring-1 ring-blue-100'
                    : dark
                      ? 'text-[#cbd5e1] hover:bg-[#2a2a2a] hover:text-[#d1d5db]'
                      : 'text-slate-700 hover:bg-gray-50 hover:text-[#1E3A5F]'
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
            className={`flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg px-2 py-2.5 transition-all duration-200 ${dark ? 'text-[#d1d5db] hover:bg-[#2a2a2a] hover:text-[#c0c0c0]' : 'text-slate-700 hover:bg-gray-50 hover:text-[#1E3A5F]'}`}
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-lg"><i className={dark ? 'ri-sun-line' : 'ri-moon-line'} /></span>
            <span className={`whitespace-nowrap text-base font-medium transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </aside>
    </>
  )
}
