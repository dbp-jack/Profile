export type ProjectOverviewItem = {
  name: string
  badge: string
  badgeColor: string
  icon: string
  iconColor: string
  description: string
  tech: string[]
  challenge: string
  challengeIcon: string
}

export const PROJECT_OVERVIEWS: ProjectOverviewItem[] = [
  {
    name: 'FeedShop',
    badge: 'B2C PLATFORM',
    badgeColor: 'bg-[#2563EB]',
    icon: 'ri-shopping-bag-line',
    iconColor: 'text-[#2563EB]',
    description:
      '\'나라면 이 쇼핑몰 쓸까?\'라는 질문에서 출발한 커뮤니티형 패션 커머스 플랫폼입니다. 피드 공유·투표·이벤트로 유저가 스스로 활동하며 재방문하는 선순환 구조를 설계했습니다.',
    tech: ['SpringBoot', 'QueryDSL', 'Redis', 'MySQL', 'GCP'],
    challenge: 'N+1 쿼리 최적화(응답시간 91% 단축)와 투표 동시성(TOCTOU) 문제 해결에 집중했습니다.',
    challengeIcon: 'ri-settings-3-line',
  },
  {
    name: '3M',
    badge: 'B2B LOGISTICS',
    badgeColor: 'bg-[#2563EB]',
    icon: 'ri-truck-line',
    iconColor: 'text-[#2563EB]',
    description:
      '허브 센터 기반 B2B 물류 관리 시스템입니다. Auth·User·Gateway 도메인을 전담하며 서비스 간 의존성을 최소화하는 MSA 인증 구조를 설계했습니다.',
    tech: ['Spring Cloud', 'Gateway', 'Eureka', 'JWT', 'PostgreSQL'],
    challenge: '인증·사용자 책임 혼재 문제를 SRP로 분리하고, JWT payload 활용으로 서비스 간 User 재조회 없는 인증 구조를 구현했습니다.',
    challengeIcon: 'ri-shield-check-line',
  },
]
