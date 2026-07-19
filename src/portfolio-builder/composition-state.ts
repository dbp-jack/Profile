import { createContext, useContext } from 'react'
import { DEFAULT_PROJECT_IDS } from '@/content/projects'
import { DEFAULT_COPY_PROFILE, type PortfolioCopyProfile } from './copy-profiles'
import {
  DEFAULT_STRENGTHS_PROFILE,
  type StrengthsProfile,
} from './strengths-profiles'

export type PortfolioCompositionContextValue = {
  projectIds: readonly string[]
  copyProfile: PortfolioCopyProfile
  strengthsProfile: StrengthsProfile
}

export const PortfolioCompositionContext = createContext<PortfolioCompositionContextValue>({
  projectIds: DEFAULT_PROJECT_IDS,
  copyProfile: DEFAULT_COPY_PROFILE,
  strengthsProfile: DEFAULT_STRENGTHS_PROFILE,
})

export function usePortfolioComposition() {
  return useContext(PortfolioCompositionContext)
}
