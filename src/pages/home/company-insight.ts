import { parseCompanyDirectionFromSearch, type CompanyDirectionInsight } from '@/portfolio-builder/company-direction'

const BANKCOW_COMPANY_KEYS = new Set(['test', 'bankcow', 'bancow', 'stockkeeper', 'stock-keeper'])

const BANKCOW_INSIGHT: CompanyDirectionInsight = {
  brand: 'bankcow',
  label: '한우 조각투자 플랫폼',
  summary:
    '뱅카우는 투자자의 자산 흐름과 한우의 생애주기가 함께 움직이는 서비스라고 이해했습니다. 투자 신청부터 정산까지 상태와 데이터가 같은 기준으로 이어져야 사용자의 신뢰를 지킬 수 있습니다.',
  noteTitle: '인상 깊었던 글',
  noteBody:
    '일을 벌이는 사람은 많아도, 끝까지 마무리하는 사람은 많지 않다는 말이 기억에 남습니다.',
  experienceTitle: '제가 연결할 수 있는 경험',
  experienceBody:
    'FeedShop에서 조회 지연과 투표 동시성 문제를 지표와 테스트로 검증했습니다. 이 경험을 바탕으로 상태 전이와 데이터 정합성을 끝까지 추적하는 백엔드를 만들고 싶습니다.',
  keywords: ['데이터는 고객의 자산', '깊은 도메인 이해', '프로세스와 개발 로직', '끝까지 마무리하는 태도'],
  flow: ['투자 신청', '사육 상태', '출하/판정/경매', '정산 반영'],
  logoSrc: `${import.meta.env.BASE_URL}bankcow-logo.png`,
  logoAlt: '뱅카우 로고',
}

function normalizeCompanyParam(value: string | null) {
  return (value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getCompanyInsightFromSearch(search: string): CompanyDirectionInsight | null {
  const params = new URLSearchParams(search)
  const companyKey = normalizeCompanyParam(params.get('company'))
  const customInsight = parseCompanyDirectionFromSearch(search, companyKey)
  if (customInsight) return customInsight

  if (BANKCOW_COMPANY_KEYS.has(companyKey)) {
    return BANKCOW_INSIGHT
  }

  return null
}
