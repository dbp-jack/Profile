import { CLOSING_BLOCKS, CLOSING_SECTION } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'

const BANKCOW_COMPANY_KEYS = new Set(['bankcow', 'bancow', 'stockkeeper', 'stock-keeper'])

type CompanyInsight = {
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

const BANKCOW_INSIGHT: CompanyInsight = {
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

function getListParam(params: URLSearchParams, key: string, fallback: readonly string[]) {
  const value = params.get(key)
  if (!value) return fallback
  const items = value
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6)
  return items.length > 0 ? items : fallback
}

function getCompanyInsightFromSearch(search: string): CompanyInsight | null {
  const params = new URLSearchParams(search)
  const companyKey = normalizeCompanyParam(params.get('company'))
  const hasCustomInsight = params.get('ci') === '1'

  if (hasCustomInsight && companyKey) {
    const brand = params.get('cname')?.trim() || companyKey
    const label = params.get('clabel')?.trim() || '기업 맞춤 포트폴리오'
    const summary = params.get('cbody')?.trim()
    const noteBody = params.get('note')?.trim()

    if (!summary && !noteBody) return null

    return {
      brand,
      label,
      summary: summary || `${brand}의 문제를 백엔드 관점으로 이해하고 연결하겠습니다.`,
      noteTitle: params.get('noteTitle')?.trim() || '기업 이해 메모',
      noteBody: noteBody || '도메인과 사용자 흐름을 함께 이해하는 개발자로 접근하겠습니다.',
      keywords: getListParam(params, 'keywords', ['도메인 이해', '신뢰 설계', '데이터 일관성']),
      flow: getListParam(params, 'flow', []),
      logoSrc: params.get('logo')?.trim() || undefined,
      logoAlt: `${brand} 로고`,
    }
  }

  if (companyKey === '' || BANKCOW_COMPANY_KEYS.has(companyKey)) {
    return BANKCOW_INSIGHT
  }

  return null
}

function CompanyInsightCard({
  companyInsight,
  dark,
}: {
  companyInsight: CompanyInsight
  dark: boolean
}) {
  return (
    <article
      className={`rounded-[1.5rem] border px-5 py-5 shadow-md md:col-span-2 md:px-6 md:py-6 ${
        dark
          ? 'border-[#424242] bg-[#2b2b2b] text-[#f4f4f4] shadow-black/20'
          : 'border-indigo-100/90 bg-white text-slate-950 shadow-slate-200/90'
      }`}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.58fr)] md:items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            {companyInsight.logoSrc ? (
              <img
                src={companyInsight.logoSrc}
                alt={companyInsight.logoAlt}
                className="h-16 w-16 shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] text-2xl font-black text-white">
                {companyInsight.brand.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-3xl font-black leading-none tracking-normal">{companyInsight.brand}</p>
              <p className={`mt-2 text-base font-black ${dark ? 'text-[#8fb5ff]' : 'text-[#1d4ed8]'}`}>
                {companyInsight.label}
              </p>
            </div>
          </div>

          <p
            className={`mt-6 max-w-4xl text-base font-bold leading-8 break-keep md:text-lg ${
              dark ? 'text-[#d8d8d8]' : 'text-slate-700'
            }`}
          >
            {companyInsight.summary}
          </p>
        </div>

        <div
          className={`rounded-2xl border px-5 py-4 md:px-6 md:py-5 ${
            dark
              ? 'border-[#315342] bg-emerald-400/10 text-emerald-100'
              : 'border-emerald-200 bg-emerald-50 text-emerald-950'
          }`}
        >
          <h3 className="text-lg font-black leading-snug break-keep md:text-xl">{companyInsight.noteTitle}</h3>
          <p className="mt-3 text-base font-bold leading-8 break-keep">{companyInsight.noteBody}</p>
        </div>
      </div>

      {companyInsight.experienceTitle && companyInsight.experienceBody && (
        <div
          className={`mt-6 border-l-4 px-5 py-4 md:px-6 ${
            dark
              ? 'border-l-[#8fb5ff] bg-[#30333a] text-[#e5e7eb]'
              : 'border-l-[#2563EB] bg-[#F8FAFF] text-slate-800'
          }`}
        >
          <h3 className={`text-lg font-black leading-snug break-keep ${dark ? 'text-[#8fb5ff]' : 'text-[#1d4ed8]'}`}>
            {companyInsight.experienceTitle}
          </h3>
          <p className="mt-2 text-base font-bold leading-8 break-keep">{companyInsight.experienceBody}</p>
        </div>
      )}

      {companyInsight.flow.length > 0 && (
        <div
          className={`mt-6 rounded-2xl border px-5 py-4 md:px-6 ${
            dark ? 'border-[#424242] bg-[#303030] text-[#d8d8d8]' : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          <div className="flex flex-wrap items-center gap-3 text-base font-black md:text-lg">
            <span className={dark ? 'text-[#8fb5ff]' : 'text-[#1d4ed8]'}>핵심 흐름</span>
            {companyInsight.flow.map((step, index) => (
              <span className="flex items-center gap-3" key={step}>
                <span>{step}</span>
                {index < companyInsight.flow.length - 1 && (
                  <i className={`ri-arrow-right-line text-xl ${dark ? 'text-[#777777]' : 'text-slate-300'}`} aria-hidden />
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {companyInsight.keywords.map((keyword) => (
          <span
            key={keyword}
            className={`rounded-full px-4 py-2 text-base font-black ${
              dark ? 'bg-[#333333] text-[#d8d8d8]' : 'bg-[#EEF2FF] text-[#3730a3]'
            }`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function PhilosophyClosingSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()
  const companyInsight =
    typeof window === 'undefined' ? null : getCompanyInsightFromSearch(window.location.search)

  const allParagraphs = CLOSING_BLOCKS.map((block) =>
    block.body.split(/\n\n+/).map((p) => p.trim()),
  )
  const maxRows = Math.max(...allParagraphs.map((p) => p.length))

  return (
    <section
      id="closing"
      lang="ko"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`border-t py-20 transition-colors duration-300 md:py-24 ${
        dark ? 'border-[#3d3d3d] bg-[#242424]' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="pdf-closing-bunch">
          <div data-sidebar-anchor="closing" className="mb-8 text-center md:mb-12">
            <span
              className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${
                dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'
              }`}
            >
              {CLOSING_SECTION.kicker}
            </span>
            <h2
              className={`break-keep text-3xl font-bold tracking-tight text-balance md:text-4xl ${
                dark ? 'text-[#e8e8e8]' : 'text-gray-900'
              }`}
            >
              {CLOSING_SECTION.title}
            </h2>
            <p
              className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed break-keep md:text-base ${
                dark ? 'text-[#d1d5db]' : 'text-slate-800'
              }`}
            >
              {CLOSING_SECTION.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {CLOSING_BLOCKS.map((block) => (
              <div
                key={block.titleKo}
                className={`overflow-hidden rounded-2xl border shadow-md ${
                  dark
                    ? 'border-[#424242] bg-[#333333] shadow-black/25'
                    : 'border-indigo-100/90 bg-white shadow-slate-200/90'
                }`}
              >
                <div
                  className={`px-5 pb-2.5 pt-3 sm:px-6 ${
                    dark ? 'bg-[#363636]/50' : 'bg-gradient-to-br from-[#fafbff] to-white'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        dark ? 'bg-[#2a3148] text-[#b4c2f0]' : 'bg-[#EEF2FF] text-[#1e3a8a]'
                      }`}
                    >
                      <i className={`${block.icon} text-xl`} aria-hidden />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p
                        className={`text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${
                          dark ? 'text-[#8aa8e8]' : 'text-[#3730a3]'
                        }`}
                      >
                        {block.titleEn}
                      </p>
                      <h3
                        className={`mt-1 text-lg font-extrabold leading-snug tracking-tight break-keep md:text-xl ${
                          dark ? 'text-[#f4f4f4]' : 'text-gray-900'
                        }`}
                      >
                        {block.titleKo}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {Array.from({ length: maxRows }).map((_, rowIdx) =>
              CLOSING_BLOCKS.map((block, colIdx) => {
                const para = allParagraphs[colIdx][rowIdx]
                if (!para) return <div key={`empty-${colIdx}-${rowIdx}`} />
                const isFirst = rowIdx === 0
                const isLast = rowIdx === allParagraphs[colIdx].length - 1
                const blockShell = dark
                  ? isFirst
                    ? 'border-[#3d4460] bg-[#323848]/90'
                    : isLast
                      ? 'border-[#4a4a55] bg-[#383838]/80'
                      : 'border-[#40404a] bg-[#363636]/70'
                  : isFirst
                    ? 'border-indigo-200/70 bg-white shadow-sm ring-1 ring-indigo-100/40'
                    : isLast
                      ? 'border-slate-200/90 bg-white shadow-sm'
                      : 'border-slate-200/70 bg-white/90 shadow-sm'
                const accent = colIdx === 0 ? 'border-l-[#6366f1]' : 'border-l-[#10b981]'
                const badgeColor =
                  colIdx === 0
                    ? dark
                      ? 'bg-[#2a3148] text-[#b4c2f0]'
                      : 'bg-[#EEF2FF] text-[#3730a3]'
                    : dark
                      ? 'bg-[#1f3a30] text-[#7ee0bb]'
                      : 'bg-[#ECFDF5] text-[#047857]'
                return (
                  <div
                    key={`${block.titleKo}-${rowIdx}`}
                    className={`flex items-start gap-3.5 rounded-xl border border-l-[3px] px-5 py-3 md:px-6 md:py-3.5 ${blockShell} ${accent}`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-extrabold tabular-nums md:h-11 md:w-11 md:text-lg ${badgeColor}`}
                      aria-hidden
                    >
                      {String(rowIdx + 1).padStart(2, '0')}
                    </span>
                    {para.includes('<') ? (
                      <div
                        className={`closing-card-body-html min-w-0 flex-1 text-base leading-[1.58] break-keep ${
                          dark ? 'text-[#d8d8d8]' : 'text-slate-700'
                        } ${isFirst && !dark ? 'text-slate-800' : ''} ${isLast ? 'font-medium' : ''}`}
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ) : (
                      <p
                        className={`min-w-0 flex-1 whitespace-pre-line text-base leading-[1.58] break-keep ${
                          dark ? 'text-[#d8d8d8]' : 'text-slate-700'
                        } ${isFirst && !dark ? 'text-slate-800' : ''} ${isLast ? 'font-medium' : ''}`}
                      >
                        {para}
                      </p>
                    )}
                  </div>
                )
              }),
            )}

            {companyInsight && (
              <>
                <div className="mt-10 flex items-center gap-4 md:col-span-2 md:mt-14" aria-hidden="true">
                  <span className={`h-px flex-1 ${dark ? 'bg-[#464646]' : 'bg-slate-200'}`} />
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.18em] ${
                      dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'
                    }`}
                  >
                    Company Direction
                  </span>
                  <span className={`h-px flex-1 ${dark ? 'bg-[#464646]' : 'bg-slate-200'}`} />
                </div>
                <CompanyInsightCard companyInsight={companyInsight} dark={dark} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
