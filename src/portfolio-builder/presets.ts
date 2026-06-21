import {
  PORTFOLIO_BLOCK_IDS,
  isPortfolioBlockId,
  type PortfolioBlockId,
  type PortfolioPreset,
} from './types'
import { DEFAULT_PROJECT_IDS, PROJECTS } from '@/content/projects'
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
  const allowedIds = new Set(PROJECTS.map((project) => project.id))
  const selected = value
    .split(',')
    .map((item) => item.trim())
    .filter((projectId) => allowedIds.has(projectId))

  return selected.length > 0 ? [...new Set(selected)] : null
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
  const params = new URLSearchParams({
    blocks: blocks.join(','),
    projects: projectIds.join(','),
    copy: getCopyProfile(copyProfileId).id,
  })
  if (companyKey) params.set('company', companyKey)
  return `/?${params.toString()}`
}
