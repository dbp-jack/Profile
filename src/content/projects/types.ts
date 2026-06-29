export interface ProjectRoleItem {
  icon: string
  title: string
  detail: string
}

export interface ProjectData {
  /** 기업별 조합 링크에서 사용하는 변경되지 않는 공개 식별자 */
  id: string
  name: string
  period: string
  teamSize: string
  contribution?: string
  /** 마지막 `\n\n` 블록에 `→`가 있으면 사용자 여정으로 파싱합니다. */
  description: string
  /** 채용자가 프로젝트 상세를 빠르게 훑을 수 있는 3줄 요약. */
  summary?: {
    problem: string
    action: string
    result: string
  }
  /** 기획·배경 카드 본문 (선택). */
  planningBackground?: string
  /** 구현 목표 카드 본문 (선택). */
  implementationGoal?: string
  /** 서비스 개요 — 설정 시 `기획 배경` 대신 상단에 노출 (예: FeedShop). */
  serviceOverview?: string
  /** 아키텍처 이미지 URL — 서비스 소개와 담당 업무 사이에 노출 (선택). */
  architectureImage?: string
  /** 아키텍처 이미지 위 담당 범위 표시 문구 (기본값: 맡은 작업). */
  architectureOwnershipLabel?: string
  /** 아키텍처 이미지 아래 세부 작업 내용 카드 (선택). */
  architectureDetails?: Array<{
    title: string
    description?: string
    items: Array<{
      label?: string
      bullets: string[]
    }>
  }>
  /** 개발자 관점 핵심 과제 — perspectiveSection 대신 단순 텍스트 카드로 노출 (선택). */
  developerPerspective?: string
  /** 사용자 관점 기획 카드 — `serviceOverview`와 함께 사용 */
  userPerspectivePlanning?: {
    subtitle: string
    cards: Array<{
      title: string
      /** 2열 레이아웃용 (bullet 미사용 시) */
      userProblem?: string
      designDirection?: string
      /** 설정 시 제목 아래 중첩 카드 + bullet 리스트로 표시 */
      problemBullets?: string[]
      directionBullets?: string[]
    }>
  }
  /** 프로젝트 개요 — `서비스 개요`가 없을 때만 상단 노출 (제목: 프로젝트 개요) */
  projectOverview?: string
  /** 설계 관점 카드 — `serviceOverview` 또는 `projectOverview`와 함께 사용 (인식한 문제 / 설계 판단) */
  designPerspectivePlanning?: {
    subtitle: string
    cards: Array<{
      title: string
      recognizedProblem: string
      designJudgment: string
    }>
  }
  techStack: string[]
  roles: ProjectRoleItem[]
  problemHeadline?: string
  problem?: string
  thinking?: string
  solution?: string
  result?: string
  /** 테스트 환경 정보 — problemSections 상단에 한 번만 표시 */
  problemEnvironment?: string
  /** 다중 문제 섹션 — 설정 시 단일 problem/thinking/solution/result 대신 사용 */
  problemSections?: Array<{
    headline: string
    problem: string
    thinking: string
    solution: string
    result: string
  }>
  /** 프로젝트의 문제 해결 섹션을 모두 마친 뒤 노출하는 통합 회고 (선택). */
  projectReflection?: {
    title: string
    body: string
    sourceUrl?: string
  }
  githubUrl: string
  wikiUrl?: string
  demoUrl?: string
}
