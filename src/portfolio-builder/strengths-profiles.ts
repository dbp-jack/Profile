import { ABOUT_CARDS, ABOUT_SECTION } from '@/content/portfolio'

export type StrengthsCard = {
  icon: string
  title: string
  subtitle: string
  description: string
}

export type StrengthsProfile = {
  id: string
  name: string
  description: string
  title: string
  intro: string
  highlights: readonly string[]
  cards: readonly StrengthsCard[]
  bulletStyle: 'legacy' | 'line'
}

export const STRENGTHS_PROFILES: readonly StrengthsProfile[] = [
  {
    id: 'default',
    name: '기존 구성',
    description: '현재 공개 포트폴리오의 Strengths 구성을 그대로 유지합니다.',
    title: ABOUT_SECTION.title,
    intro: ABOUT_SECTION.intro,
    highlights: [
      '응답시간 <span class="font-black text-[#2563EB]">91% 단축</span> · SQL <span class="font-black text-[#2563EB]">42→2/0</span>',
      '팀 스프린트 <span class="font-black text-[#2563EB]">가시성 확보</span>',
      '<span class="font-black text-[#2563EB]">기획·설계·개발을 주도적으로 진행</span>',
    ],
    cards: ABOUT_CARDS,
    bulletStyle: 'legacy',
  },
  {
    id: 'backend-validation',
    name: '백엔드 검증 중심',
    description: '조회 성능, 동시성·정합성, 인증 책임 경계의 검증 근거를 앞에 배치합니다.',
    title: '백엔드 문제를 수치와 테스트로 검증합니다',
    intro: '조회 성능, 동시성, 인증 책임 경계를 실제 지표와 테스트 결과로 설명합니다.',
    highlights: [
      '응답시간 <span class="font-black text-[#2563EB]">91% 단축</span> · DB 조회 <span class="font-black text-[#2563EB]">42회 → 2회</span>',
      '동시 <span class="font-black text-[#2563EB]">3,000명</span> · 오류 0건 · DB 중복 저장 0건',
      'CBO <span class="font-black text-[#2563EB]">0건</span> · 순환 의존 없음',
    ],
    cards: [
      {
        icon: 'ri-bar-chart-2-line',
        title: '조회 성능',
        subtitle: '병목을 재현하고 전후 지표로 검증',
        description:
          '이벤트 목록 요청 1회당 DB 조회 쿼리 수를 <span class="font-bold text-[#2563EB]">42회 → 2회</span>로 축소\n성능 테스트에서 응답시간 <span class="font-bold text-[#2563EB]">6,818ms → 638ms</span>, 약 91% 단축\nnGrinder 동시 1,000명 기준 <span class="font-bold text-[#2563EB]">TPS 216% 향상</span> 확인',
      },
      {
        icon: 'ri-shield-check-line',
        title: '동시성·정합성',
        subtitle: '중복 투표와 카운터 경합을 분리',
        description:
          '<span class="font-bold text-[#2563EB]">(event_id, voter_id) 유니크 제약</span>으로 중복 투표를 DB에서 차단\nRedis INCR로 투표 카운터를 DB 잠금 흐름에서 분리\n동시 500→3,000명 구간에서 HTTP 오류·DB 중복 저장 0건, DB 투표 이력 수와 Redis 카운터 일치 확인',
      },
      {
        icon: 'ri-node-tree',
        title: '인증 책임 경계',
        subtitle: 'Auth·User·Gateway 역할을 분리',
        description:
          'Auth는 토큰 발급, User는 사용자 정보, Gateway는 JWT 검증과 컨텍스트 전달 담당\n<span class="font-bold text-[#2563EB]">UserService → Auth 결합도(CBO) 0건</span>, 순환 의존 없음 확인\nMASTER·HUB_MANAGER·미인증 응답을 통합 테스트로 검증',
      },
    ],
    bulletStyle: 'line',
  },
]

export const DEFAULT_STRENGTHS_PROFILE = STRENGTHS_PROFILES[0]

export function getStrengthsProfile(profileId: string | null | undefined): StrengthsProfile {
  return (
    STRENGTHS_PROFILES.find((profile) => profile.id === profileId) ??
    DEFAULT_STRENGTHS_PROFILE
  )
}
