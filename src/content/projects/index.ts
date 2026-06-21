import type { ProjectData } from './types'
import { feedShopProject } from './feedshop'
import { threeMProject } from './threeM'

export const PROJECTS: ProjectData[] = [feedShopProject, threeMProject]
export const DEFAULT_PROJECT_IDS = PROJECTS.map((project) => project.id)

export { feedShopProject, threeMProject }
export { PROJECT_OVERVIEWS, type ProjectOverviewItem } from './overview'
export type { ProjectData, ProjectRoleItem } from './types'
