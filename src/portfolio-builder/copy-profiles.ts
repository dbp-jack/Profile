import { ABOUT_SECTION, HERO_ROLE_TITLE, PROJECTS_SECTION } from '@/content/portfolio'

export type PortfolioCopyProfile = {
  id: string
  name: string
  description: string
  heroRoleTitle: string
  aboutIntro: string
  projectsSubtitle: string
}

export const COPY_PROFILES: readonly PortfolioCopyProfile[] = [
  {
    id: 'default',
    name: '기본 문구',
    description: '현재 공개 포트폴리오 문구를 그대로 사용합니다.',
    heroRoleTitle: HERO_ROLE_TITLE,
    aboutIntro: ABOUT_SECTION.intro,
    projectsSubtitle: PROJECTS_SECTION.subtitle,
  },
  {
    id: 'backend-impact',
    name: '백엔드 성과 중심',
    description: '성능 검증과 구조 설계 경험을 앞에 배치합니다.',
    heroRoleTitle: '성능 병목을 수치로 검증하고, 안정적인 구조를 설계하는 백엔드 개발자',
    aboutIntro:
      '성능과 동시성 문제를 수치로 검증하고, 책임 경계를 나눠 변경에 강한 구조를 설계합니다.',
    projectsSubtitle:
      '성능 병목과 인증 구조 문제를 어떤 근거와 선택으로 해결했는지 보여드립니다.',
  },
  {
    id: 'event-driven',
    name: '이벤트 기반·결제 중심',
    description: 'Kafka 이벤트 흐름과 주문·결제 실패 처리 경험을 앞에 배치합니다.',
    heroRoleTitle: '서비스 경계를 나누고, 실패 흐름까지 설계하는 백엔드 개발자',
    aboutIntro:
      '동기 호출의 장애 전파와 데이터 불일치 문제를 분석하고, 이벤트 계약과 보상 흐름으로 서비스 경계를 설계합니다.',
    projectsSubtitle:
      '주문·결제 이벤트 흐름과 동시성 문제를 어떤 책임 분리와 검증으로 해결했는지 보여드립니다.',
  },
] as const

export const DEFAULT_COPY_PROFILE = COPY_PROFILES[0]

export function getCopyProfile(profileId: string | null | undefined): PortfolioCopyProfile {
  return COPY_PROFILES.find((profile) => profile.id === profileId) ?? DEFAULT_COPY_PROFILE
}
