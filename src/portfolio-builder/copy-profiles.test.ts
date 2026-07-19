import { describe, expect, it } from 'vitest'
import {
  COPY_PROFILES,
  DEFAULT_COPY_PROFILE,
  getCopyProfile,
} from './copy-profiles'
import { COMPANY_PUBLIC_PRESETS, PUBLIC_PRESETS } from './presets'

describe('copy profile presets', () => {
  it('keeps the current master copy as the default', () => {
    expect(DEFAULT_COPY_PROFILE.id).toBe('default')
    expect(DEFAULT_COPY_PROFILE.heroRoleTitle).toBe(
      '수치로 검증하고, 팀 흐름을 움직이는 백엔드 개발자',
    )
  })

  it('keeps performance validation as the only recommended profile', () => {
    expect(COPY_PROFILES.filter((profile) => profile.recommended).map((profile) => profile.id)).toEqual([
      'performance-validation',
    ])
  })

  it('provides the exact recommended performance validation copy', () => {
    expect(getCopyProfile('performance-validation')).toMatchObject({
      id: 'performance-validation',
      name: '성능·동시성 검증 중심',
      description: 'FeedShop의 응답 지연과 투표 동시성 검증 경험을 앞에 배치합니다.',
      recommended: true,
      heroRoleTitle:
        '성능 병목과 동시성 문제를 수치와 테스트로 검증하는 백엔드 개발자',
      aboutIntro:
        '응답 지연과 동시성 문제를 지표와 테스트로 재현하고, 데이터 정합성과 서비스 안정성을 검증합니다.',
      projectsSubtitle:
        '성능 병목과 동시성 문제를 어떤 지표와 테스트로 확인하고 해결했는지 보여드립니다.',
    })
  })

  it('does not replace the existing backend impact profile', () => {
    expect(getCopyProfile('backend-impact').heroRoleTitle).toBe(
      '성능 병목을 수치로 검증하고, 안정적인 구조를 설계하는 백엔드 개발자',
    )
    expect(COPY_PROFILES.map((profile) => profile.id)).toContain('backend-impact')
  })

  it('keeps the event-driven profile and its core copy available', () => {
    expect(getCopyProfile('event-driven')).toMatchObject({
      id: 'event-driven',
      heroRoleTitle: '서비스 경계를 나누고, 실패 흐름까지 설계하는 백엔드 개발자',
      aboutIntro:
        '동기 호출의 장애 전파와 데이터 불일치 문제를 분석하고, 이벤트 계약과 보상 흐름으로 서비스 경계를 설계합니다.',
      projectsSubtitle:
        '주문·결제 이벤트 흐름과 동시성 문제를 어떤 책임 분리와 검증으로 해결했는지 보여드립니다.',
    })
  })

  it('keeps public preset copy profile mappings unchanged', () => {
    expect(PUBLIC_PRESETS.map(({ id, copyProfileId }) => [id, copyProfileId])).toEqual([
      ['complete', 'default'],
      ['project-focused', 'backend-impact'],
      ['commerce-event', 'event-driven'],
      ['msa-platform', 'event-driven'],
    ])
  })

  it('keeps company preset copy profile mappings unchanged', () => {
    expect(COMPANY_PUBLIC_PRESETS.map(({ id, copyProfileId }) => [id, copyProfileId])).toEqual([
      ['company-commerce', 'backend-impact'],
      ['company-platform', 'event-driven'],
      ['company-performance', 'backend-impact'],
    ])
  })
})
