import type { RouteObject } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/page'
import PdfPortfolioPage from '../pages/pdf/page'

const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/pdf', element: <PdfPortfolioPage /> },
  { path: '*', element: <NotFound /> },
]

export default routes
