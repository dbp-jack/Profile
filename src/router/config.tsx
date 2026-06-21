import type { RouteObject } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/page'
import PortfolioManagerPage from '../pages/manage/page'
import PdfPortfolioPage from '../pages/pdf/page'
import { PORTFOLIO_MANAGER_ENABLED } from '../portfolio-builder/access'

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  ...(PORTFOLIO_MANAGER_ENABLED
    ? [{ path: '/manage', element: <PortfolioManagerPage /> }]
    : []),
  { path: '/pdf', element: <PdfPortfolioPage /> },
  { path: '*', element: <NotFound /> },
]

export default routes
