import type { ReactNode } from 'react'
import { DEFAULT_PROJECT_IDS } from '@/content/projects'
import { DEFAULT_COPY_PROFILE, getCopyProfile } from './copy-profiles'
import { PortfolioCompositionContext } from './composition-state'

export function PortfolioCompositionProvider({
  projectIds = DEFAULT_PROJECT_IDS,
  copyProfileId = DEFAULT_COPY_PROFILE.id,
  children,
}: {
  projectIds?: readonly string[]
  copyProfileId?: string
  children: ReactNode
}) {
  return (
    <PortfolioCompositionContext.Provider
      value={{ projectIds, copyProfile: getCopyProfile(copyProfileId) }}
    >
      {children}
    </PortfolioCompositionContext.Provider>
  )
}
