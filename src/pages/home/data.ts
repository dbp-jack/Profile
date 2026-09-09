import { feedShopProject, threeMProject } from '@/content/projects'

export const feedWiki = 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki'
export const queryWiki = `${feedWiki}/이벤트-목록-조회-성능-개선`
export const voteWiki = `${feedWiki}/피드-투표-동시성-개선`
export const boundaryWiki = 'https://github.com/sparta-i4u/sparta-msa/wiki/%5BTrouble-Shooting%5D%5B%EB%AF%BC%EC%88%98%E2%80%90User,-Auth,-Gateway-%EB%8F%84%EB%A9%94%EC%9D%B8%5D-%EC%9D%B8%EC%A6%9D-%EA%B5%AC%EC%A1%B0-%EC%84%A4%EA%B3%84%EC%99%80-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B2%BD%EA%B3%84-%EB%B6%84%EB%A6%AC'
export const authReport = threeMProject.projectReflection?.sourceUrl ?? boundaryWiki
export const survey = 'https://www.kostat.go.kr/boardDownload.es?bid=12029&list_no=428839&seq=1'
export const recoveryCommit = 'https://github.com/dbp-jack/FeedShop_Backend_Refactoring/commit/61466a2'

// 사실·수치의 기준은 확정된 PDF content.tsx. 웹의 요약만 별도로 관리한다.
export const projects = [
  {
    id: 'feedshop', number: '01', name: 'FeedShop', category: '패션 커뮤니티 · 커머스',
    description: '투표 이벤트와 참여 보상으로 구매 후 재방문을 유도하는 패션 커뮤니티 플랫폼',
    period: '2025.05–2025.09', role: '부팀장 · 백엔드', team: '4명',
    responsibility: '이벤트·투표 API, 피드·댓글·좋아요·검색 개발과 Docker·Cloud Run 배포, CI/CD 구성',
    stack: ['Java', 'Spring Boot', 'QueryDSL', 'MySQL', 'Redis', 'GCP'],
    architecture: feedShopProject.architectureImage!,
    github: feedShopProject.githubUrl, wiki: feedWiki,
    cases: [{ id: 'query', name: '이벤트 목록의 로딩 지연 개선' }, { id: 'vote', name: '중복 투표 차단과 집계 검증' }],
    learning: '개선 단계를 나누어 측정하고, 데이터의 정확성과 장애 시 응답까지 함께 확인하는 검증 기준을 얻었습니다.',
  },
  {
    id: '3m', number: '02', name: '3M', category: 'B2B 물류 · MSA',
    description: '주문 생성부터 허브 이동과 배송 담당자 배정까지, 역할별 업무를 연결하는 B2B 물류 관리 시스템',
    period: '2025.03–2025.04', role: '팀장 · 백엔드', team: '4명',
    responsibility: 'Auth·User·Gateway 설계·구현, JWT 발급·검증, AOP 권한 확인과 Docker Compose 통합 실행 환경 구성',
    stack: ['Java', 'Spring Boot', 'Spring Cloud Gateway', 'PostgreSQL', 'Redis', 'Docker'],
    architecture: threeMProject.architectureImage!,
    github: threeMProject.githubUrl, wiki: threeMProject.wikiUrl!,
    cases: [{ id: 'boundary', name: '인증 구조 개선과 서비스 경계 분리' }],
    learning: '변경이 영향을 주는 범위로 서비스 경계를 정하고, 실제 요청의 허용·차단까지 확인하는 설계·검증 기준을 얻었습니다.',
  },
] as const

export type PortfolioProject = typeof projects[number]
