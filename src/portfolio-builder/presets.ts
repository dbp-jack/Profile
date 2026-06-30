import {
  PORTFOLIO_BLOCK_IDS,
  isPortfolioBlockId,
  type PortfolioBlockId,
  type PortfolioPreset,
} from './types'
import { DEFAULT_PROJECT_IDS, normalizeProjectIds } from '@/content/projects'
import { DEFAULT_COPY_PROFILE, getCopyProfile } from './copy-profiles'

type CompanyPortfolioPreset = PortfolioPreset & {
  companyKeys: readonly string[]
}

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

export const COMPANY_PUBLIC_PRESETS: readonly CompanyPortfolioPreset[] = [
  {
    id: 'company-commerce',
    name: '커머스·서비스 기업용',
    description: '커머스 재방문 흐름, 성능 개선, 이벤트 기반 주문 흐름을 앞에 둡니다.',
    blocks: ['hero', 'about', 'projects', 'experience', 'resources', 'contact', 'footer'],
    projectIds: ['feedshop', 'fix-ticketing'],
    copyProfileId: 'backend-impact',
    companyKey: 'commerce',
    companyKeys: ['commerce', 'ably', 'musinsa', 'zigzag', '29cm'],
  },
  {
    id: 'company-platform',
    name: '플랫폼·MSA 기업용',
    description: '인증 경계, 서비스 분리, 이벤트 흐름 설계 경험을 앞에 둡니다.',
    blocks: ['hero', 'about', 'projects', 'experience', 'resources', 'contact', 'footer'],
    projectIds: ['three-m', 'fix-ticketing'],
    copyProfileId: 'event-driven',
    companyKey: 'platform',
    companyKeys: ['platform', 'msa', 'cloud', 'kakao', 'naver-cloud', 'line'],
  },
  {
    id: 'company-performance',
    name: '성능 개선 강조 기업용',
    description: '성능 병목과 동시성 문제를 수치로 검증한 경험에 집중합니다.',
    blocks: ['hero', 'about', 'projects', 'resources', 'contact', 'footer'],
    projectIds: ['feedshop'],
    copyProfileId: 'backend-impact',
    companyKey: 'performance',
    companyKeys: ['performance', 'backend', 'infra'],
  },
] as const

export function normalizeCompanyKey(value: string | null | undefined): string {
  return (value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getPublicPreset(presetId: string | null): PortfolioPreset {
  return PUBLIC_PRESETS.find((preset) => preset.id === presetId) ?? DEFAULT_PUBLIC_PRESET
}

export function getCompanyPreset(companyKey: string | null): PortfolioPreset | null {
  const normalizedCompanyKey = normalizeCompanyKey(companyKey)
  if (!normalizedCompanyKey) return null

  return (
    COMPANY_PUBLIC_PRESETS.find((preset) =>
      [preset.companyKey, ...preset.companyKeys].some((key) => key === normalizedCompanyKey),
    ) ?? null
  )
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
  const normalizedCompanyKey = normalizeCompanyKey(companyKey)
  const params = new URLSearchParams({
    blocks: blocks.join(','),
    projects: normalizedProjectIds.join(','),
    copy: getCopyProfile(copyProfileId).id,
  })
  if (normalizedCompanyKey) params.set('company', normalizedCompanyKey)
  return `/?${params.toString()}`
}

export function createCompanyPortfolioPath(companyKey: string) {
  const normalizedCompanyKey = normalizeCompanyKey(companyKey)
  return normalizedCompanyKey ? `/?company=${encodeURIComponent(normalizedCompanyKey)}` : null
}
