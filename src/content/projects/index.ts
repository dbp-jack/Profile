import type { ProjectData } from './types'
import { feedShopProject } from './feedshop'
import { threeMProject } from './threeM'
import { fixTicketingProject } from './fixTicketing'

export const PROJECTS: ProjectData[] = [feedShopProject, threeMProject, fixTicketingProject]
export const MAX_VISIBLE_PROJECTS = 2
export const DEFAULT_PROJECT_IDS = PROJECTS.slice(0, MAX_VISIBLE_PROJECTS).map(
  (project) => project.id,
)

export function normalizeProjectIds(projectIds: readonly string[]): string[] {
  const allowedIds = new Set(PROJECTS.map((project) => project.id))
  const normalized = [...new Set(projectIds)]
    .filter((projectId) => allowedIds.has(projectId))
    .slice(0, MAX_VISIBLE_PROJECTS)

  return normalized.length > 0 ? normalized : [...DEFAULT_PROJECT_IDS]
}

export { feedShopProject, threeMProject, fixTicketingProject }
export { PROJECT_OVERVIEWS, type ProjectOverviewItem } from './overview'
export type { ProjectData, ProjectRoleItem } from './types'
