import type { ReactNode } from 'react'
import { DEFAULT_PROJECT_IDS, normalizeProjectIds } from '@/content/projects'
import { DEFAULT_COPY_PROFILE, getCopyProfile } from './copy-profiles'
import { PortfolioCompositionContext } from './composition-state'
import { DEFAULT_STRENGTHS_PROFILE, getStrengthsProfile } from './strengths-profiles'

export function PortfolioCompositionProvider({
  projectIds = DEFAULT_PROJECT_IDS,
  copyProfileId = DEFAULT_COPY_PROFILE.id,
  strengthsProfileId = DEFAULT_STRENGTHS_PROFILE.id,
  children,
}: {
  projectIds?: readonly string[]
  copyProfileId?: string
  strengthsProfileId?: string
  children: ReactNode
}) {
  return (
    <PortfolioCompositionContext.Provider
      value={{
        projectIds: normalizeProjectIds(projectIds),
        copyProfile: getCopyProfile(copyProfileId),
        strengthsProfile: getStrengthsProfile(strengthsProfileId),
      }}
    >
      {children}
    </PortfolioCompositionContext.Provider>
  )
}
