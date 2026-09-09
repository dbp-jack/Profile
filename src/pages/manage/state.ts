import { DEFAULT_PROJECT_IDS, normalizeProjectIds } from '@/content/projects'
import { getCopyProfile } from '@/portfolio-builder/copy-profiles'
import { getStrengthsProfile } from '@/portfolio-builder/strengths-profiles'
import { normalizeCompanyDirectionDraft, type CompanyDirectionDraft } from '@/portfolio-builder/company-direction'
import { DEFAULT_PUBLIC_PRESET, normalizeCompanyKey } from '@/portfolio-builder/presets'
import { isPortfolioBlockId, migrateDefaultBlockOrder, type PortfolioBlockId, type PortfolioPreset } from '@/portfolio-builder/types'

export const WORKSPACE_KEY = 'portfolio-manager-workspace-v2'
export type Draft = {
  blockIds: readonly PortfolioBlockId[]
  projectIds: readonly string[]
  copyProfileId: string
  strengthsProfileId: string
  companyKey: string
}
export type SavedComposition = PortfolioPreset & { strengthsProfileId?: string }
export type Workspace = {
  draft: Draft
  saved: readonly SavedComposition[]
  companies: Record<string, CompanyDirectionDraft>
}
export function defaultDraft(): Draft {
  return { blockIds: DEFAULT_PUBLIC_PRESET.blocks, projectIds: DEFAULT_PROJECT_IDS, copyProfileId: 'default', strengthsProfileId: 'default', companyKey: '' }
}
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
const strings = (value: unknown) => Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
const text = (value: unknown) => typeof value === 'string' ? value.trim() : ''
function blocks(value: unknown): readonly PortfolioBlockId[] {
  const valid = [...new Set(strings(value).filter(isPortfolioBlockId))]
  return valid.length ? migrateDefaultBlockOrder(valid) : DEFAULT_PUBLIC_PRESET.blocks
}
function normalizeDraft(value: unknown): Draft {
  const raw = record(value)
  return { blockIds: blocks(raw.blockIds), projectIds: normalizeProjectIds(strings(raw.projectIds)), copyProfileId: getCopyProfile(text(raw.copyProfileId)).id, strengthsProfileId: getStrengthsProfile(text(raw.strengthsProfileId)).id, companyKey: normalizeCompanyKey(text(raw.companyKey)) }
}
function normalizeSaved(value: unknown): SavedComposition[] {
  if (!Array.isArray(value)) return []
  return value.flatMap(item => {
    const raw = record(item)
    if (!text(raw.name) || !text(raw.id)) return []
    return [{ id: text(raw.id), name: text(raw.name), description: text(raw.description), blocks: blocks(raw.blocks), projectIds: normalizeProjectIds(strings(raw.projectIds)), copyProfileId: getCopyProfile(text(raw.copyProfileId)).id, strengthsProfileId: getStrengthsProfile(text(raw.strengthsProfileId)).id, companyKey: normalizeCompanyKey(text(raw.companyKey)) }]
  })
}
function normalizeCompanies(value: unknown) {
  return Object.fromEntries(Object.entries(record(value)).flatMap(([key, draft]) => normalizeCompanyKey(key) ? [[normalizeCompanyKey(key), normalizeCompanyDirectionDraft(draft)]] : []))
}
export function loadWorkspace(storage: Pick<Storage, 'getItem'>): Workspace {
  const read = (key: string) => { try { return storage.getItem(key) } catch { return null } }
  const parse = (key: string): unknown => { try { return JSON.parse(read(key) ?? 'null') } catch { return null } }
  const current = record(parse(WORKSPACE_KEY))
  if (current.draft) return { draft: normalizeDraft(current.draft), saved: normalizeSaved(current.saved), companies: normalizeCompanies(current.companies) }
  // 기존 저장 키는 지우지 않는다. 처음 편집할 때 새 작업실 상태로 함께 저장한다.
  return {
    draft: normalizeDraft({ blockIds: parse('portfolio-manager-blocks'), projectIds: parse('portfolio-manager-projects'), copyProfileId: read('portfolio-manager-copy'), strengthsProfileId: read('portfolio-manager-strengths'), companyKey: read('portfolio-manager-company-key') }),
    saved: normalizeSaved(parse('portfolio-manager-custom-presets')),
    companies: normalizeCompanies(parse('portfolio-manager-company-directions')),
  }
}
export function draftFromPreset(preset: SavedComposition): Draft {
  return { blockIds: migrateDefaultBlockOrder(preset.blocks), projectIds: normalizeProjectIds(preset.projectIds), copyProfileId: getCopyProfile(preset.copyProfileId).id, strengthsProfileId: getStrengthsProfile(preset.strengthsProfileId).id, companyKey: normalizeCompanyKey(preset.companyKey) }
}
export function changeProjectSlot(ids: readonly string[], slot: number, selected: string): readonly string[] {
  if (!selected && slot === 1) return ids.slice(0, 1)
  const next = [...ids]
  const previous = next[slot]
  const other = ids.indexOf(selected)
  if (other >= 0 && other !== slot) {
    if (!previous) return ids
    next[other] = previous
  }
  next[slot] = selected
  return normalizeProjectIds(next)
}
export function moveItem<T>(items: readonly T[], index: number, direction: -1 | 1): readonly T[] {
  const target = index + direction
  if (index < 0 || target < 0 || target >= items.length) return items
  const next = [...items]
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}
export function addBlock(ids: readonly PortfolioBlockId[], id: PortfolioBlockId): readonly PortfolioBlockId[] {
  if (ids.includes(id)) return ids
  const next = [...ids]
  const footer = next.indexOf('footer')
  next.splice(footer < 0 ? next.length : footer, 0, id)
  return next
}
export function companyKeyForName(name: string): string {
  const latin = normalizeCompanyKey(name)
  if (latin) return latin
  let hash = 2166136261
  for (const character of name.trim()) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
  return name.trim() ? `company-${(hash >>> 0).toString(36)}` : ''
}
