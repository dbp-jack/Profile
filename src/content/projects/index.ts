import type { ProjectData } from './types'
import { feedShopProject } from './feedshop'
import { threeMProject } from './threeM'

export const PROJECTS: ProjectData[] = [feedShopProject, threeMProject]

export { feedShopProject, threeMProject }
export { PROJECT_OVERVIEWS, type ProjectOverviewItem } from './overview'
export type { ProjectData, ProjectRoleItem } from './types'
