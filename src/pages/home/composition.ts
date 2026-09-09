import { getCopyProfile } from '@/portfolio-builder/copy-profiles'
import { getStrengthsProfile } from '@/portfolio-builder/strengths-profiles'
import {
  getCompanyPreset, getPublicPreset,
  parsePublicBlockSelection, parsePublicCopyProfile,
  parsePublicProjectSelection, parsePublicStrengthsProfile,
} from '@/portfolio-builder/presets'
import { getCompanyInsightFromSearch } from './company-insight'

import { migrateDefaultBlockOrder } from '@/portfolio-builder/types'

export function resolveWebComposition(search: string) {
  const params = new URLSearchParams(search)
  const preset = getCompanyPreset(params.get('company')) ?? getPublicPreset(params.get('preset'))
  const selectedBlocks = parsePublicBlockSelection(params.get('blocks')) ?? preset.blocks
  return {
    blockIds: migrateDefaultBlockOrder(selectedBlocks),
    projectIds: parsePublicProjectSelection(params.get('projects')) ?? preset.projectIds,
    copyProfile: getCopyProfile(params.has('copy') ? parsePublicCopyProfile(params.get('copy')) : preset.copyProfileId),
    strengthsProfile: getStrengthsProfile(parsePublicStrengthsProfile(params.get('strengths'))),
    companyInsight: getCompanyInsightFromSearch(search),
  }
}
