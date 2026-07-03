export const PORTFOLIO_BLOCK_IDS = [
  'hero',
  'about',
  'projects',
  'closing',
  'experience',
  'resources',
  'contact',
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
