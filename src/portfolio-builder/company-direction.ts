export type CompanyDirectionDraft = {
  enabled: boolean
  companyName: string
  label: string
  summary: string
  noteTitle: string
  noteBody: string
  experienceTitle: string
  experienceBody: string
  keywords: string
  flow: string
  logoUrl: string
}

export type CompanyDirectionInsight = {
  brand: string
  label: string
  summary: string
  noteTitle: string
  noteBody: string
  experienceTitle?: string
  experienceBody?: string
  keywords: readonly string[]
  flow: readonly string[]
  logoSrc?: string
  logoAlt: string
}

export const EMPTY_COMPANY_DIRECTION: CompanyDirectionDraft = {
  enabled: false,
  companyName: '',
  label: '',
  summary: '',
  noteTitle: '기업 이해',
  noteBody: '',
  experienceTitle: '제가 연결할 수 있는 경험',
  experienceBody: '',
  keywords: '',
  flow: '',
  logoUrl: '',
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanList(value: string, fallback: readonly string[] = []): readonly string[] {
  const items = value
    .split('|')
    .map((item) => item.trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 6)
  return items.length > 0 ? items : fallback
}

export function normalizeCompanyDirectionDraft(value: unknown): CompanyDirectionDraft {
  if (!value || typeof value !== 'object') return { ...EMPTY_COMPANY_DIRECTION }
  const draft = value as Partial<CompanyDirectionDraft>

  return {
    enabled: draft.enabled === true,
    companyName: cleanText(draft.companyName, 80),
    label: cleanText(draft.label, 120),
    summary: cleanText(draft.summary, 600),
    noteTitle: cleanText(draft.noteTitle, 120) || EMPTY_COMPANY_DIRECTION.noteTitle,
    noteBody: cleanText(draft.noteBody, 500),
    experienceTitle:
      cleanText(draft.experienceTitle, 120) || EMPTY_COMPANY_DIRECTION.experienceTitle,
    experienceBody: cleanText(draft.experienceBody, 600),
    keywords: cleanText(draft.keywords, 400),
    flow: cleanText(draft.flow, 400),
    logoUrl: cleanText(draft.logoUrl, 1000),
  }
}

export function hasCompanyDirectionContent(draft?: CompanyDirectionDraft | null): boolean {
  return Boolean(draft?.enabled && (draft.summary.trim() || draft.noteBody.trim()))
}

export function appendCompanyDirectionParams(
  params: URLSearchParams,
  draft?: CompanyDirectionDraft | null,
) {
  if (!hasCompanyDirectionContent(draft) || !draft) return

  const normalized = normalizeCompanyDirectionDraft(draft)
  params.set('ci', '1')
  if (normalized.companyName) params.set('cname', normalized.companyName)
  if (normalized.label) params.set('clabel', normalized.label)
  if (normalized.summary) params.set('cbody', normalized.summary)
  if (normalized.noteTitle) params.set('noteTitle', normalized.noteTitle)
  if (normalized.noteBody) params.set('note', normalized.noteBody)
  if (normalized.experienceTitle) params.set('expTitle', normalized.experienceTitle)
  if (normalized.experienceBody) params.set('exp', normalized.experienceBody)
  if (normalized.keywords) params.set('keywords', cleanList(normalized.keywords).join('|'))
  if (normalized.flow) params.set('flow', cleanList(normalized.flow).join('|'))
  if (normalized.logoUrl) params.set('logo', normalized.logoUrl)
}

export function parseCompanyDirectionFromSearch(
  search: string,
  companyKey: string,
): CompanyDirectionInsight | null {
  const params = new URLSearchParams(search)
  if (params.get('ci') !== '1' || !companyKey) return null

  const brand = cleanText(params.get('cname'), 80) || companyKey
  const summary = cleanText(params.get('cbody'), 600)
  const noteBody = cleanText(params.get('note'), 500)
  if (!summary && !noteBody) return null

  const experienceTitle = cleanText(params.get('expTitle'), 120)
  const experienceBody = cleanText(params.get('exp'), 600)

  return {
    brand,
    label: cleanText(params.get('clabel'), 120) || '기업 맞춤 포트폴리오',
    summary: summary || `${brand}의 서비스 방향을 백엔드 경험과 연결하겠습니다.`,
    noteTitle: cleanText(params.get('noteTitle'), 120) || '기업 이해',
    noteBody: noteBody || '공식 자료에서 확인한 서비스 방향과 기술적 관심사를 정리했습니다.',
    experienceTitle: experienceTitle && experienceBody ? experienceTitle : undefined,
    experienceBody: experienceTitle && experienceBody ? experienceBody : undefined,
    keywords: cleanList(params.get('keywords') ?? '', ['도메인 이해', '신뢰 설계', '데이터 일관성']),
    flow: cleanList(params.get('flow') ?? ''),
    logoSrc: cleanText(params.get('logo'), 1000) || undefined,
    logoAlt: `${brand} 로고`,
  }
}
