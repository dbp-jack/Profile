import { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/page'
import PdfPortfolioPage from '../pages/pdf/page'
import { PORTFOLIO_MANAGER_ENABLED } from '../portfolio-builder/access'

// 로컬 전용 관리 페이지 — 공개 저장소에는 포함하지 않음(.gitignore 처리).
// import.meta.glob은 매칭되는 파일이 없으면 빈 객체를 반환해서
// 파일이 없는 환경(공개 배포 빌드)에서도 빌드가 깨지지 않음.
const manageModules = import.meta.glob<{ default: ComponentType }>('../pages/manage/page.tsx')
const loadManagePage = manageModules['../pages/manage/page.tsx']
const PortfolioManagerPage = loadManagePage ? lazy(loadManagePage) : null

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  ...(PORTFOLIO_MANAGER_ENABLED && PortfolioManagerPage
    ? [{
        path: '/manage',
        element: (
          <Suspense fallback={null}>
            <PortfolioManagerPage />
          </Suspense>
        ),
      }]
    : []),
  { path: '/pdf', element: <PdfPortfolioPage /> },
  { path: '*', element: <NotFound /> },
]

export default routes
