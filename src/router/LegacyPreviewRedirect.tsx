import { Navigate, useLocation } from 'react-router-dom'

// 과거 시안 북마크도 현재 정본만 열도록 한다. 쿼리와 페이지 번호는 보존한다.
export default function LegacyPreviewRedirect({ to }: { to: string }) {
  const location = useLocation()
  return <Navigate to={{ pathname: to, search: location.search, hash: location.hash }} replace />
}
