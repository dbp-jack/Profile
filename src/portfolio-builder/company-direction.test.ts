import { describe, expect, it } from 'vitest'
import {
  EMPTY_COMPANY_DIRECTION,
  appendCompanyDirectionParams,
  parseCompanyDirectionFromSearch,
} from './company-direction'
import { createPublicPortfolioPath } from './presets'

const customDirection = {
  ...EMPTY_COMPANY_DIRECTION,
  enabled: true,
  companyName: 'Example',
  label: '서비스 플랫폼',
  summary: '공식 자료에서 확인한 서비스 방향입니다.',
  noteTitle: '기업 이해',
  noteBody: '사용자의 신뢰를 중요하게 다루고 있습니다.',
  experienceTitle: '제가 연결할 수 있는 경험',
  experienceBody: '데이터 정합성을 검증한 경험을 연결합니다.',
  keywords: '도메인 이해 | 데이터 정합성 | 사용자 신뢰',
  flow: '탐색 | 주문 | 결제',
  logoUrl: 'https://example.com/logo.png',
}

describe('company direction URL contract', () => {
  it('serializes and parses every public Company Direction field', () => {
    const params = new URLSearchParams({ company: 'example' })
    appendCompanyDirectionParams(params, customDirection)

    expect(parseCompanyDirectionFromSearch(`?${params.toString()}`, 'example')).toEqual({
      brand: 'Example',
      label: '서비스 플랫폼',
      summary: '공식 자료에서 확인한 서비스 방향입니다.',
      noteTitle: '기업 이해',
      noteBody: '사용자의 신뢰를 중요하게 다루고 있습니다.',
      experienceTitle: '제가 연결할 수 있는 경험',
      experienceBody: '데이터 정합성을 검증한 경험을 연결합니다.',
      keywords: ['도메인 이해', '데이터 정합성', '사용자 신뢰'],
      flow: ['탐색', '주문', '결제'],
      logoSrc: 'https://example.com/logo.png',
      logoAlt: 'Example 로고',
    })
  })

  it('does not expose a disabled or empty draft', () => {
    const params = new URLSearchParams({ company: 'example' })
    appendCompanyDirectionParams(params, {
      ...customDirection,
      enabled: false,
    })

    expect(params.get('ci')).toBeNull()
    expect(parseCompanyDirectionFromSearch(`?${params.toString()}`, 'example')).toBeNull()
  })

  it('includes custom content in the full distributable portfolio URL', () => {
    const path = createPublicPortfolioPath(
      ['hero', 'closing', 'contact'],
      ['feedshop'],
      'default',
      'example',
      'default',
      customDirection,
    )
    const params = new URLSearchParams(path.split('?')[1])

    expect(params.get('company')).toBe('example')
    expect(params.get('ci')).toBe('1')
    expect(params.get('cname')).toBe('Example')
    expect(params.get('exp')).toBe('데이터 정합성을 검증한 경험을 연결합니다.')
  })
})
