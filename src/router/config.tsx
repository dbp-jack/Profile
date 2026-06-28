import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/page'
import PdfPortfolioPage from '../pages/pdf/page'
import { PORTFOLIO_MANAGER_ENABLED } from '../portfolio-builder/access'

type ManagePageModule = { default: ComponentType }

function getLocalManageRoutes(): RouteObject[] {
  if (!PORTFOLIO_MANAGER_ENABLED) return []

  // 로컬 전용 관리 페이지 — 공개 저장소에는 포함하지 않음(.gitignore 처리).
  // 이 함수는 dev build에서만 호출되어 production 번들에 경로 문자열과 청크가 남지 않는다.
  const manageModules = import.meta.glob<ManagePageModule>('../pages/manage/page.tsx')
  const loadManagePage = manageModules['../pages/manage/page.tsx']
  if (!loadManagePage) return []

  const PortfolioManagerPage = lazy(loadManagePage)

  return [{
    path: '/manage',
    element: (
      <Suspense fallback={null}>
        <PortfolioManagerPage />
      </Suspense>
    ),
  }]
}

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  ...(import.meta.env.DEV ? getLocalManageRoutes() : []),
  { path: '/pdf', element: <PdfPortfolioPage /> },
  { path: '*', element: <NotFound /> },
]

export default routes
