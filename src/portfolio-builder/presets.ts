import {
  PORTFOLIO_BLOCK_IDS,
  isPortfolioBlockId,
  type PortfolioBlockId,
  type PortfolioPreset,
} from './types'
import { DEFAULT_PROJECT_IDS, normalizeProjectIds } from '@/content/projects'
import { DEFAULT_COPY_PROFILE, getCopyProfile } from './copy-profiles'

export const DEFAULT_PUBLIC_PRESET: PortfolioPreset = {
  id: 'complete',
  name: '전체 포트폴리오',
  description: '현재 공개 포트폴리오의 모든 섹션을 보여줍니다.',
  blocks: PORTFOLIO_BLOCK_IDS,
  projectIds: DEFAULT_PROJECT_IDS,
  copyProfileId: DEFAULT_COPY_PROFILE.id,
}

export const PUBLIC_PRESETS: readonly PortfolioPreset[] = [
  DEFAULT_PUBLIC_PRESET,
  {
    id: 'project-focused',
    name: '프로젝트 집중형',
    description: '프로젝트와 증거 링크를 중심으로 구성한 공개 프리셋입니다.',
    blocks: ['hero', 'about', 'projects', 'resources', 'contact', 'footer'],
    projectIds: ['feedshop'],
    copyProfileId: 'backend-impact',
  },
  {
    id: 'commerce-event',
    name: '커머스·이벤트형',
    description: 'FeedShop 성능·동시성과 FIX 주문·결제 이벤트 경험을 묶습니다.',
    blocks: ['hero', 'about', 'projects', 'experience', 'resources', 'contact', 'footer'],
    projectIds: ['feedshop', 'fix-ticketing'],
    copyProfileId: 'event-driven',
  },
  {
    id: 'msa-platform',
    name: 'MSA·플랫폼형',
    description: '3M 인증 경계와 FIX Kafka 서비스 분리 경험을 묶습니다.',
    blocks: ['hero', 'about', 'projects', 'experience', 'resources', 'contact', 'footer'],
    projectIds: ['three-m', 'fix-ticketing'],
    copyProfileId: 'event-driven',
  },
] as const

export function getPublicPreset(presetId: string | null): PortfolioPreset {
  return PUBLIC_PRESETS.find((preset) => preset.id === presetId) ?? DEFAULT_PUBLIC_PRESET
}

export function parsePublicBlockSelection(value: string | null): readonly PortfolioBlockId[] | null {
  if (!value) return null

  const selected = value
    .split(',')
    .map((item) => item.trim())
    .filter(isPortfolioBlockId)

  if (selected.length === 0) return null
  return [...new Set(selected)]
}

export function parsePublicProjectSelection(value: string | null): readonly string[] | null {
  if (!value) return null
  const requested = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  const selected = normalizeProjectIds(requested)

  return requested.length > 0 ? selected : null
}

export function parsePublicCopyProfile(value: string | null): string {
  return getCopyProfile(value).id
}

export function createPublicPortfolioPath(
  blocks: readonly PortfolioBlockId[],
  projectIds: readonly string[],
  copyProfileId: string,
  companyKey?: string,
) {
  const normalizedProjectIds = normalizeProjectIds(projectIds)
  const params = new URLSearchParams({
    blocks: blocks.join(','),
    projects: normalizedProjectIds.join(','),
    copy: getCopyProfile(copyProfileId).id,
  })
  if (companyKey) params.set('company', companyKey)
  return `/?${params.toString()}`
}
