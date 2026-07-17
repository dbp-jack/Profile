import { describe, expect, it } from 'vitest'
import {
  COPY_PROFILES,
  DEFAULT_COPY_PROFILE,
  getCopyProfile,
} from './copy-profiles'

describe('copy profile presets', () => {
  it('keeps the current master copy as the default', () => {
    expect(DEFAULT_COPY_PROFILE.id).toBe('default')
    expect(DEFAULT_COPY_PROFILE.heroRoleTitle).toBe(
      '수치로 증명하고, 팀 흐름을 움직이는 백엔드 개발자',
    )
  })

  it('provides an independent recommended performance validation profile', () => {
    expect(getCopyProfile('performance-validation')).toMatchObject({
      id: 'performance-validation',
      name: '성능·동시성 검증 중심',
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
})
