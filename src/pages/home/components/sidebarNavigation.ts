import type { PortfolioBlockId } from '@/portfolio-builder/types'

export type SidebarAnchorKind = 'page-start' | 'hero-content' | 'section-heading' | 'project-card'

export type SidebarNavLink = {
  blockId: PortfolioBlockId
  label: string
  href: string
  icon: string
  anchorKind: SidebarAnchorKind
}

export const SIDEBAR_ANCHOR_VIEWPORT_TOP: Record<SidebarAnchorKind, number> = {
  'page-start': 0,
  'hero-content': 64,
  'section-heading': 28,
  'project-card': 28,
}

export const BASE_NAV_LINKS: readonly SidebarNavLink[] = [
  {
    blockId: 'hero',
    label: 'Profile',
    href: '#hero',
    icon: 'ri-home-4-line',
    anchorKind: 'hero-content',
  },
  {
    blockId: 'about',
    label: 'Strengths',
    href: '#about',
    icon: 'ri-user-heart-line',
    anchorKind: 'section-heading',
  },
  {
    blockId: 'projects',
    label: 'Work Style',
    href: '#collaboration',
    icon: 'ri-team-line',
    anchorKind: 'section-heading',
  },
  {
    blockId: 'projects',
    label: 'Projects',
    href: '#projects',
    icon: 'ri-code-box-line',
    anchorKind: 'section-heading',
  },
  {
    blockId: 'closing',
    label: 'Direction',
    href: '#closing',
    icon: 'ri-compass-3-line',
    anchorKind: 'section-heading',
  },
  {
    blockId: 'experience',
    label: 'Experience',
    href: '#experience',
    icon: 'ri-time-line',
    anchorKind: 'section-heading',
  },
  {
    blockId: 'resources',
    label: 'Resources',
    href: '#resources',
    icon: 'ri-links-line',
    anchorKind: 'section-heading',
  },
  {
    blockId: 'contact',
    label: 'Contact',
    href: '#contact',
    icon: 'ri-mail-line',
    anchorKind: 'section-heading',
  },
]

export function getSidebarAnchorId(href: string) {
  return href.replace('#', '')
}

export function getSidebarAnchorSelector(anchorId: string) {
  return `[data-sidebar-anchor="${anchorId}"]`
}
