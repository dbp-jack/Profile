export const PORTFOLIO_BLOCK_IDS = [
  'hero',
  'about',
  'projects',
  'experience',
  'closing',
  'contact',
  'resources',
  'footer',
] as const

export type PortfolioBlockId = (typeof PORTFOLIO_BLOCK_IDS)[number]

export type PortfolioPreset = {
  id: string
  name: string
  description: string
  blocks: readonly PortfolioBlockId[]
  projectIds: readonly string[]
  copyProfileId: string
  companyKey?: string
}

export function isPortfolioBlockId(value: string): value is PortfolioBlockId {
  return PORTFOLIO_BLOCK_IDS.includes(value as PortfolioBlockId)
}

/** 이전 기본 전체 순서만 새 기본값으로 옮기고, 사용자 지정 순서는 보존한다. */
export function migrateDefaultBlockOrder(blocks: readonly PortfolioBlockId[]): readonly PortfolioBlockId[] {
  return blocks.join(',') === 'hero,about,projects,closing,experience,resources,contact,footer'
    ? PORTFOLIO_BLOCK_IDS
    : blocks
}
