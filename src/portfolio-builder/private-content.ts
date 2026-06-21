export type PrivatePortfolioSession = {
  userId: string
  expiresAt: string
}

export type PrivateEvidence = {
  id: string
  title: string
  url: string
  summary?: string
}

/**
 * 추후 인증 서버를 연결할 때 구현할 경계입니다.
 * 비공개 자료는 공개 Vite 환경 변수나 정적 콘텐츠 파일에 넣지 않습니다.
 */
export interface PrivateContentProvider {
  getSession(): Promise<PrivatePortfolioSession | null>
  listEvidence(): Promise<readonly PrivateEvidence[]>
  signOut(): Promise<void>
}
