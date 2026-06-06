export type ProjectOverviewItem = {
  name: string
  badge: string
  badgeColor: string
  icon: string
  iconColor: string
  description: string
  tech: string[]
  role: string
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
    description: '커뮤니티형 패션 커머스 플랫폼',
    tech: ['SpringBoot', 'QueryDSL', 'MySQL', 'Redis', 'GCP'],
    role: '이벤트·피드 도메인, 배포/운영, 팀 리딩',
    challenge: '이벤트 조회 성능 병목과 투표 동시성 문제 해결',
    challengeIcon: 'ri-settings-3-line',
  },
  {
    name: '3M',
    badge: 'B2B LOGISTICS',
    badgeColor: 'bg-[#2563EB]',
    icon: 'ri-truck-line',
    iconColor: 'text-[#2563EB]',
    description: 'B2B 물류 관리 및 배송 시스템',
    tech: ['SpringBoot', 'JWT', 'PostgreSQL', 'Redis', 'Docker'],
    role: 'Auth·User·Gateway 도메인, 팀 리딩',
    challenge: '인증 책임 분리와 Gateway 중심 인증 흐름 설계',
    challengeIcon: 'ri-shield-check-line',
  },
]
