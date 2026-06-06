import React from 'react'
import {
  HERO_NAME, HERO_ROLE_BADGE, HERO_ROLE_TITLE,
  HERO_PERSONAL_INFO, HERO_SKILL_GROUPS,
  ABOUT_CARDS, EXPERIENCE_ITEMS, CLOSING_BLOCKS, RESOURCE_LINKS, CONTACT_LINKS,
} from '@/content/portfolio'
import { PROJECTS } from '@/content/projects'

declare const __BASE_PATH__: string

/* ─── Design Tokens ─── */
const NAVY       = '#0f172a'
const BLUE       = '#2563eb'
const BLUE_LIGHT = '#eff6ff'
const GRAY1      = '#f8fafc'
const GRAY2      = '#e2e8f0'
const GRAY3      = '#64748b'
const WHITE      = '#ffffff'
const HERO_SKILL_TAGS = HERO_SKILL_GROUPS.flatMap((group) => group.tags)

/* ─── Slide wrapper ─── */
function Slide({
  children,
  bg = WHITE,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pageNum: _pageNum,
  minHeight = false,
}: {
  children: React.ReactNode
  bg?: string
  pageNum: number
  minHeight?: boolean
}) {
  return (
    <div
      style={{
        width: '297mm',
        ...(minHeight ? { minHeight: '210mm' } : { height: '210mm' }),
        background: bg,
        overflow: 'hidden',
        pageBreakAfter: 'always',
        breakAfter: 'page',
        boxSizing: 'border-box',
        fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
        position: 'relative',
      }}
    >
      {/* 4px blue top strip */}
      <div style={{ height: 4, background: BLUE, width: '100%' }} />
      {children}
    </div>
  )
}

/* ─── Header bar ─── */
function Header({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{
      height: 40,
      background: NAVY,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      <span style={{ color: WHITE, fontWeight: 700, fontSize: 15 }}>{title}</span>
      {sub && <span style={{ color: '#94a3b8', fontSize: 11 }}>{sub}</span>}
    </div>
  )
}

/* ─── Content area ─── */
function Content({
  children,
  center = true,
  padding = '16px 24px',
}: {
  children: React.ReactNode
  center?: boolean
  padding?: string
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: center ? 'center' : 'flex-start',
      padding,
      /* minHeight 부모에서도 중앙 정렬이 되도록 min-height 고정값 사용 */
      minHeight: 'calc(210mm - 44px)',
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}


/* ─── HTML Content wrapper (이미지 src에 BASE_PATH 주입) ─── */
function HtmlContent({ html }: { html: string }) {
  const fixed = html.replace(
    /src="(?!http|data|\/\/)([^"]+)"/g,
    (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`
  )
  return (
    <div
      className="pdf-content"
      style={{ fontSize: 12, lineHeight: 1.6, color: '#334155' }}
      dangerouslySetInnerHTML={{ __html: fixed }}
    />
  )
}

/* ════════════════════════════════════════════════════════
   PAGE 1 — Hero (웹 HeroSection과 동일한 레이아웃)
════════════════════════════════════════════════════════ */
function HeroSlide() {
  return (
    <div style={{
      width: '297mm', height: '210mm',
      background: WHITE,
      overflow: 'hidden',
      pageBreakAfter: 'always',
      breakAfter: 'page',
      boxSizing: 'border-box',
      fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* 메인 콘텐츠 — 텍스트 왼쪽, 사진 오른쪽 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 44,
        padding: '0 52px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* 왼쪽: 텍스트 */}
        <div style={{ minWidth: 0, flex: 1, maxWidth: 500 }}>
          {/* 뱃지 */}
          <div style={{
            display: 'inline-block',
            border: `1px solid ${NAVY}`,
            color: NAVY,
            borderRadius: 999,
            padding: '4px 14px',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            {HERO_ROLE_BADGE}
          </div>

          {/* 이름 */}
          <div style={{
            fontSize: 54,
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.1,
            marginBottom: 8,
            letterSpacing: '-1px',
          }}>
            {HERO_NAME}
          </div>

          {/* 태그라인 */}
          <p style={{
            fontSize: 14,
            color: '#6b7280',
            lineHeight: 1.6,
            marginBottom: 14,
          }}>
            {HERO_ROLE_TITLE}
          </p>

          {/* 구분선 */}
          <div style={{ height: 1, background: `${NAVY}12`, marginBottom: 12 }} />

          {/* 연락처 */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 14 }}>
            {HERO_PERSONAL_INFO.map((item) => (
              <li key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 9,
                fontSize: 12.5, color: '#4b5563',
                marginBottom: 5,
              }}>
                <i className={item.icon} style={{ color: NAVY, fontSize: 13, width: 18, textAlign: 'center', flexShrink: 0 }} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          {/* 기술 스택 라벨 */}
          <p style={{
            fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 2,
            color: BLUE, marginBottom: 7,
          }}>
            기술 스택
          </p>

          {/* 기술 스택 태그 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {HERO_SKILL_TAGS.map((tag) => (
              <span key={tag} style={{
                border: `1px solid ${BLUE}22`,
                background: BLUE_LIGHT,
                color: NAVY,
                borderRadius: 999,
                padding: '3px 11px',
                fontSize: 11,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 오른쪽: 증명사진 */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 162, height: 216,
            borderRadius: 14,
            border: `1.5px solid ${NAVY}20`,
            background: '#f4f7fb',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(15,23,42,0.10)',
          }}>
            <img
              src={`${__BASE_PATH__}profile-photo.png`}
              alt="정민수 증명사진"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

/* ════════════════════════════════════════════════════════
   PROJECT SLIDES helper
════════════════════════════════════════════════════════ */
const feedshop = PROJECTS[0]
const m3 = PROJECTS[1]

/* ─── Page 2: FeedShop overview + tech + roles (합쳐서 1페이지) ─── */
function FeedShopOverview() {
  return (
    <Slide pageNum={2}>
      <Header title="FeedShop — Service Overview · Tech Stack · Roles" sub={`${feedshop.period} · ${feedshop.teamSize} · ${feedshop.contribution}`} />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '18px 28px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* 1. SERVICE OVERVIEW */}
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>SERVICE OVERVIEW</div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: feedshop.serviceOverview ?? '' }} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          {/* 2. TECH STACK */}
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>TECH STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {feedshop.techStack.map(t => (
                <span key={t} style={{
                  background: BLUE_LIGHT, color: BLUE, borderRadius: 6,
                  padding: '3px 10px', fontSize: 12, fontWeight: 600,
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          {/* 3. ROLES */}
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>ROLES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {feedshop.roles.map(role => (
                <div key={role.title} style={{
                  background: GRAY1, border: `1px solid ${GRAY2}`,
                  borderRadius: 8, padding: '9px 14px',
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{role.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 3 }}>{role.title}</div>
                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}
                      dangerouslySetInnerHTML={{ __html: role.detail }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}

function FeedShopTechRoles() { return null }

/* ─── Page 4: FeedShop architecture image ─── */
function FeedShopArchImage() {
  return (
    <Slide pageNum={4} minHeight>
      <Header title="FeedShop — Architecture" sub="인프라 구조도 · Architecture Details" />
      <div style={{
        height: 'calc(210mm - 44px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px 28px', boxSizing: 'border-box',
      }}>
        {/* 이미지 (크게) */}
        <img
          src={`${__BASE_PATH__}${feedshop.architectureImage?.replace(/^\//, '')}`}
          alt="FeedShop Architecture"
          style={{ maxWidth: '100%', maxHeight: '95mm', objectFit: 'contain', display: 'block', marginBottom: 16 }}
        />
        <div style={{ height: 1, background: GRAY2, width: '100%', marginBottom: 16 }} />
        {/* Architecture Details — 세로 나열 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {feedshop.architectureDetails?.map(section => (
            <div key={section.title}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 6,
                paddingBottom: 4, borderBottom: `2px solid ${BLUE}`, display: 'inline-block',
              }}>
                {section.title}
              </div>
              {section.items.map((item, idx) => (
                <ul key={idx} style={{ margin: '4px 0 0', paddingLeft: 18 }}>
                  {item.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: 12, color: '#334155', lineHeight: 1.65, marginBottom: 3 }}>{b}</li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function FeedShopArchDetails() { return null }

/* ─── Pages 6–9: FeedShop Problem 1 ─── */
function FeedShopP1Problem() {
  const sec = feedshop.problemSections![0]
  return (
    <Slide pageNum={6} minHeight>
      <Header title={`FeedShop — ${sec.headline}`} sub="Problem" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '14px 24px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        {feedshop.developerPerspective && (
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>DEVELOPER PERSPECTIVE</div>
            <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: feedshop.developerPerspective }} />
          </div>
        )}
        <div style={{ height: 1, background: GRAY2 }} />
        {feedshop.problemEnvironment && (
          <div style={{ padding: '8px 14px', background: GRAY1, borderRadius: 8, border: `1px solid ${GRAY2}` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: GRAY3, marginBottom: 3 }}>🖥️ 로컬 테스트 환경</div>
            <div style={{ fontSize: 11, color: '#334155', lineHeight: 1.5 }}>{feedshop.problemEnvironment}</div>
          </div>
        )}
        <div style={{ height: 1, background: GRAY2 }} />
        <div>
          <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>PROBLEM</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: sec.problem.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`) }} />
        </div>
      </div>
    </Slide>
  )
}

/* Thinking + Solution 1단계 */
function FeedShopP1Thinking() {
  const sec = feedshop.problemSections![0]
  // solution HTML에서 1단계만 추출 (2단계 시작 전까지)
  const sol = sec.solution
  const idx2 = sol.indexOf('2단계')
  const block2Start = idx2 > 0 ? sol.lastIndexOf('<div', idx2) : sol.length
  const stage1Html = sol.substring(0, block2Start) + '</div>'
  const fixSrc = (html: string) => html.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`)

  return (
    <Slide pageNum={7} minHeight>
      <Header title="FeedShop — Problem 1 / Thinking · Solution 1단계" sub="쿼리 최적화" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '14px 24px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>THINKING</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(sec.thinking) }} />
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        <div>
          <div style={{ fontSize: 10, color: '#2563eb', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>SOLUTION — 1단계</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(stage1Html) }} />
        </div>
      </div>
    </Slide>
  )
}

/* Solution 2단계 */
function FeedShopP1Solution() {
  const sec = feedshop.problemSections![0]
  const sol = sec.solution
  const idx2 = sol.indexOf('2단계')
  const block2Start = idx2 > 0 ? sol.lastIndexOf('<div', idx2) : 0
  const stage2Html = sol.substring(block2Start)
  const fixSrc = (html: string) => html.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`)

  // result에서 표만 추출 (<table>...</table>)
  const result = sec.result
  const tableStart = result.indexOf('<table')
  const tableEnd = result.indexOf('</table>') + '</table>'.length
  // 표 감싸는 div까지 추출
  const wrapStart = result.lastIndexOf('<div', tableStart)
  const wrapEnd = result.indexOf('</div>', tableEnd) + '</div>'.length
  const tableWrapHtml = wrapStart >= 0 ? result.substring(wrapStart, wrapEnd) : ''

  return (
    <Slide pageNum={8} minHeight>
      <Header title="FeedShop — Problem 1 / Solution 2단계" sub="캐시 전략 적용" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '16px 24px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#2563eb', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>SOLUTION — 2단계</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(stage2Html) }} />
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        <div>
          <div style={{ fontSize: 10, color: '#059669', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>RESULT — 성능 수치</div>
          <div className="pdf-content" style={{ fontSize: 12, lineHeight: 1.6, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(tableWrapHtml) }} />
        </div>
      </div>
    </Slide>
  )
}

function FeedShopP1Result() {
  const sec = feedshop.problemSections![0]
  const fixSrc = (html: string) => html.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`)
  // 표 이후 이미지 그리드만 추출
  const result = sec.result
  const tableEnd = result.indexOf('</table>') + '</table>'.length
  const afterTableDiv = result.indexOf('</div>', tableEnd) + '</div>'.length
  const imagesHtml = result.substring(afterTableDiv)

  return (
    <Slide pageNum={9} minHeight>
      <Header title="FeedShop — Problem 1 / 결과" sub="nGrinder Before / After" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '16px 24px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#059669', fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>RESULT — nGrinder 성능 비교</div>
          <div className="pdf-content" style={{ fontSize: 12, lineHeight: 1.6, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(imagesHtml) }} />
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        {/* 핵심 성과 요약 */}
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: '14px 18px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#065f46', marginBottom: 10 }}>🎯 핵심 성과 요약</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 20px' }}>
            {[
              '응답시간 91% 단축 (6,818ms → 638ms, 동시 1,000명)',
              'TPS 216% 향상 (138.7 → 438.3, 동시 1,000명)',
              'SQL 실행 횟수 42회 → 0회 (Cache Hit 시)',
              '쿼리 최적화 + Redis 캐시 2-Layer 전략',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, alignItems: 'flex-start', fontSize: 12, color: '#065f46' }}>
                <span style={{ color: '#059669', flexShrink: 0, fontWeight: 700 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}

/* ─── Pages 10–12: FeedShop Problem 2 ─── */
function FeedShopP2Problem() {
  const sec = feedshop.problemSections![1]
  return (
    <Slide pageNum={10} minHeight>
      <Header title={`FeedShop — ${sec.headline}`} sub="Problem · Thinking" />
      <Content center padding="14px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <div>
            <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>PROBLEM</div>
            <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: sec.problem.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`) }} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>THINKING</div>
            <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: sec.thinking.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`) }} />
          </div>
        </div>
      </Content>
    </Slide>
  )
}

function FeedShopP2Thinking() { return null }

function FeedShopP2SolutionResult() {
  const sec = feedshop.problemSections![1]
  const fixSrc = (html: string) => html.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`)
  return (
    <Slide pageNum={12} minHeight>
      <Header title="FeedShop — Problem 2 / 해결 & 결과" sub="Solution + Result" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '16px 24px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div>
          <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>SOLUTION</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(sec.solution) }} />
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        {/* 설계 요약 */}
        <div style={{ background: BLUE_LIGHT, border: `1px solid ${BLUE}22`, borderRadius: 10, padding: '12px 16px' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: NAVY, marginBottom: 8 }}>설계 요약</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 16px' }}>
            {[
              ['DB 유니크 제약', '물리적 중복 차단 (코드 레벨 우회 불가)'],
              ['NOT_SUPPORTED 전파', '외부 트랜잭션 없이 예외 처리 가능'],
              ['Redis INCR', '원자적 연산으로 락 경합 제거'],
              ['DB = Redis 정합성', '항상 일치 보장'],
            ].map(([k, v]) => (
              <div key={k} style={{ fontSize: 11, color: '#334155', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: NAVY }}>{k}: </span>{v}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        {/* 수치 강조 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
          {[
            { num: '0%', label: '에러율', sub: '동시 50명 ~ 3,000명', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0' },
            { num: '0건', label: '중복 투표', sub: 'DB 유니크 제약 + 예외 처리', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
            { num: '100%', label: '데이터 정합성', sub: 'DB count = Redis count', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
            { num: '3,000명', label: '확장성', sub: 'nGrinder 부하 테스트 검증', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
          ].map((s) => (
            <div key={s.label} style={{
              background: s.bg, border: `1px solid ${s.border}`,
              borderRadius: 10, padding: '10px 8px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: s.color, marginTop: 3 }}>{s.label}</div>
              <div style={{ fontSize: 8.5, color: '#6b7280', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}

/* ─── Pages 13–19: 3M Project ─── */
function M3Overview() {
  return (
    <Slide pageNum={13}>
      <Header title="3M — Service Overview · Tech Stack · Roles" sub={`${m3.period} · ${m3.teamSize} · ${m3.contribution}`} />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '14px 28px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>SERVICE OVERVIEW</div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: m3.serviceOverview ?? '' }} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>DEVELOPER PERSPECTIVE</div>
            <div style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: m3.developerPerspective ?? '' }} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>TECH STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[...m3.techStack, 'Eureka', 'RabbitMQ', 'Zipkin'].map(t => (
                <span key={t} style={{ background: BLUE_LIGHT, color: BLUE, borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>ROLES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {m3.roles.map(role => (
                <div key={role.title} style={{
                  background: GRAY1, border: `1px solid ${GRAY2}`,
                  borderRadius: 8, padding: '8px 12px',
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{role.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 2 }}>{role.title}</div>
                    <HtmlContent html={role.detail} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}

function M3TechRoles() { return null }


function M3ArchImage() {
  return (
    <Slide pageNum={15} minHeight>
      <Header title="3M — Architecture" sub="인프라 구조도 · Architecture Details" />
      <div style={{
        height: 'calc(210mm - 44px)', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-evenly', padding: '14px 28px', boxSizing: 'border-box',
      }}>
        {/* 이미지 */}
        <img
          src={`${__BASE_PATH__}${m3.architectureImage?.replace(/^\//, '')}`}
          alt="3M Architecture"
          style={{ maxWidth: '100%', maxHeight: '95mm', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
        <div style={{ height: 1, background: GRAY2, width: '100%' }} />
        {/* Architecture Details — 세로 나열 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {m3.architectureDetails?.map(section => (
            <div key={section.title}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 5,
                paddingBottom: 3, borderBottom: `2px solid ${BLUE}`, display: 'inline-block',
              }}>
                {section.title}
              </div>
              {section.description && (
                <p style={{ fontSize: 12, color: GRAY3, marginBottom: 3, lineHeight: 1.5 }}>{section.description}</p>
              )}
              {section.items.map((item, idx) => (
                <ul key={idx} style={{ margin: '3px 0 0', paddingLeft: 18 }}>
                  {item.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: 12, color: '#334155', lineHeight: 1.6, marginBottom: 2 }}>{b}</li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function M3ArchDetails() { return null }

function M3ProblemThinking() {
  const fixSrc = (html: string) => html.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`)
  // solution에서 1단계만 추출 (2단계 시작 전까지)
  const sol = m3.solution ?? ''
  const idx2 = sol.indexOf('2단계')
  const stage1Html = idx2 > 0 ? sol.substring(0, sol.lastIndexOf('<div', idx2)) + '</div>' : sol

  return (
    <Slide pageNum={17} minHeight>
      <Header title={`3M — ${m3.problemHeadline ?? '인증 구조 설계 및 서비스 경계 문제'}`} sub="Problem · Thinking · Solution 1단계" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '16px 28px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#ef4444', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>PROBLEM</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(m3.problem ?? '') }} />
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        <div>
          <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>THINKING</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(m3.thinking ?? '') }} />
        </div>
        <div style={{ height: 1, background: GRAY2 }} />
        <div>
          <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 7 }}>SOLUTION — 1단계</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(stage1Html) }} />
        </div>
      </div>
    </Slide>
  )
}

function M3Solution() { return null }

function M3Result() {
  const fixSrc = (html: string) => html.replace(/src="(?!http|data|\/\/)([^"]+)"/g, (_, p) => `src="${__BASE_PATH__}${p.replace(/^\//, '')}"`)

  const stage2Content = [
    'Gateway 인증 필터에서 JWT 검증 후 X-User-* 헤더로 사용자 컨텍스트 전달',
    '권한 검증은 AOP(@RequiresMasterRole)로 분리 → 역할 체크 로직 통합',
    '대부분 경로에서 User 서비스 재호출 없이 처리, 추가 정보 필요 시에만 선택 호출',
  ]

  return (
    <Slide pageNum={19} minHeight>
      <Header title="3M — Solution 2단계 · Result" sub="인증 흐름 단순화 · 결과" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '16px 28px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        {/* 2단계 — 인증 흐름 단순화 */}
        <div style={{ background: GRAY1, border: `1px solid ${GRAY2}`, borderRadius: 12, padding: '16px 20px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 10, paddingBottom: 6, borderBottom: `2px solid ${BLUE}`, display: 'inline-block' }}>
            2단계 — 인증 흐름 단순화
          </div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {stage2Content.map((b, i) => (
              <li key={i} style={{ fontSize: 13, color: '#334155', lineHeight: 1.7, marginBottom: 4 }}>{b}</li>
            ))}
          </ul>
        </div>

        <div style={{ height: 1, background: GRAY2 }} />

        {/* Result */}
        <div>
          <div style={{ fontSize: 10, color: '#059669', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RESULT</div>
          <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: fixSrc(m3.result ?? '') }} />
        </div>
      </div>
    </Slide>
  )
}

/* ─── Page 20: Experience ─── */
function ExperiencePage() {
  const categoryColor: Record<string, string> = {
    '경력': '#7c3aed',
    '교육': BLUE,
    '대외활동': '#059669',
  }
  return (
    <Slide pageNum={20}>
      <Header title="Experience — 걸어온 여정" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '16px 28px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        {EXPERIENCE_ITEMS.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex', gap: 20,
            padding: '14px 0',
            borderBottom: idx < EXPERIENCE_ITEMS.length - 1 ? `1px solid ${GRAY2}` : 'none',
            alignItems: 'flex-start',
          }}>
            <div style={{ minWidth: 140, flexShrink: 0 }}>
              <div style={{ fontSize: 13, color: GRAY3, fontWeight: 600, marginBottom: 5 }}>{item.period}</div>
              <div style={{
                display: 'inline-block',
                background: categoryColor[item.category] ?? BLUE,
                color: WHITE, borderRadius: 4,
                padding: '3px 10px', fontSize: 12, fontWeight: 700,
              }}>
                {item.category}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 5 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: '#334155', lineHeight: 1.65 }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}

/* ─── Page 21: About ─── */
function AboutPage() {
  const accentColors = [
    { border: '#2563eb', bg: '#eff6ff', iconBg: '#dbeafe', text: '#1e40af' },
    { border: '#059669', bg: '#ecfdf5', iconBg: '#d1fae5', text: '#065f46' },
    { border: '#7c3aed', bg: '#f5f3ff', iconBg: '#ede9fe', text: '#5b21b6' },
  ]
  return (
    <Slide pageNum={21}>
      {/* 상단 헤더 영역 */}
      <div style={{ background: NAVY, padding: '20px 32px 16px' }}>
        <div style={{ fontSize: 9, color: '#60a5fa', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 5 }}>About</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#ffffff', marginBottom: 5 }}>저는 이렇게 일합니다</div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>문제는 수치로 파악해 해결하고, 협력은 팀 흐름을 맞춰 정리하며, 맡은 임무는 끝까지 완수합니다.</div>
      </div>

      {/* 카드 3개 — 남은 높이 꽉 채우기 */}
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 16,
        padding: '18px 28px',
        flex: 1,
        height: 'calc(210mm - 108px)',
        boxSizing: 'border-box',
      }}>
        {ABOUT_CARDS.map((card, i) => {
          const c = accentColors[i % accentColors.length]
          return (
            <div key={card.title} style={{
              flex: 1,
              background: c.bg,
              border: `1.5px solid ${c.border}22`,
              borderRadius: 14,
              padding: '22px 20px',
              display: 'flex',
              flexDirection: 'column',
              borderTop: `4px solid ${c.border}`,
            }}>
              {/* 아이콘 + 제목 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: c.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className={card.icon} style={{ color: c.border, fontSize: 22 }} />
                </div>
                <div style={{ fontSize: 19, fontWeight: 800, color: NAVY }}>{card.title}</div>
              </div>

              {/* 소제목 */}
              <div
                style={{ fontSize: 13, color: c.text, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}
                dangerouslySetInnerHTML={{ __html: card.subtitle }}
              />

              {/* 구분선 */}
              <div style={{ height: 1, background: `${c.border}30`, marginBottom: 14 }} />

              {/* 내용 */}
              <div
                className="pdf-content"
                style={{ fontSize: 13, color: '#334155', lineHeight: 1.75, flex: 1 }}
                dangerouslySetInnerHTML={{ __html: card.description.replace(/\n\n/g, '<br/><br/>') }}
              />
            </div>
          )
        })}
      </div>

    </Slide>
  )
}

/* ─── Page 22: Closing ─── */
/* ─── Closing + Resources 합쳐서 1페이지 ─── */
function ClosingPage() {
  return (
    <Slide pageNum={22}>
      <Header title="앞으로의 방향 — Closing · 자료 모음 · 연락처" />
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly',
        padding: '14px 24px', height: 'calc(210mm - 44px)', boxSizing: 'border-box',
      }}>
        {/* Closing 카드 2개 */}
        <div style={{ display: 'flex', gap: 14 }}>
          {CLOSING_BLOCKS.map(block => (
            <div key={block.titleEn} style={{
              flex: 1, background: GRAY1, border: `1px solid ${GRAY2}`,
              borderRadius: 12, padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <i className={block.icon} style={{ color: BLUE, fontSize: 18 }} />
                <div style={{ fontSize: 9, color: GRAY3, fontWeight: 700, letterSpacing: 1 }}>{block.titleEn}</div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, marginBottom: 10 }}>{block.titleKo}</div>
              <HtmlContent html={block.body} />
            </div>
          ))}
        </div>

        <div style={{ height: 1, background: GRAY2 }} />

        {/* Resources */}
        <div>
          <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RESOURCES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {RESOURCE_LINKS.map(link => (
              <div key={link.label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 14px', background: GRAY1, borderRadius: 8, border: `1px solid ${GRAY2}`,
              }}>
                <i className={link.icon} style={{ color: BLUE, fontSize: 15, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{link.label}</div>
                  <div style={{ fontSize: 11, color: GRAY3 }}>{link.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: GRAY2 }} />

        {/* Contact */}
        <div>
          <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CONTACT</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {CONTACT_LINKS.map(link => (
              <div key={link.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 18px', background: BLUE_LIGHT, borderRadius: 8, border: `1px solid #bfdbfe`,
              }}>
                <i className={link.icon} style={{ color: BLUE, fontSize: 16 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  )
}

function ResourcesContactPage() { return null }

/* ─── Page 24: Final contact card ─── */
function FinalContactSlide() {
  return (
    <div style={{
      width: '297mm',
      height: '210mm',
      background: NAVY,
      overflow: 'hidden',
      pageBreakAfter: 'always',
      breakAfter: 'page',
      boxSizing: 'border-box',
      fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ height: 4, background: BLUE, width: '100%', flexShrink: 0 }} />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
      }}>
        <div style={{ fontSize: 9, color: '#94a3b8', fontWeight: 700, letterSpacing: 2 }}>CONTACT</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: WHITE }}>{HERO_NAME}</div>
        <div style={{ fontSize: 14, color: '#94a3b8' }}>{HERO_ROLE_BADGE}</div>
        <div style={{ height: 1, width: 80, background: BLUE, margin: '4px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          {HERO_PERSONAL_INFO.map(row => (
            <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className={row.icon} style={{ color: BLUE, fontSize: 14 }} />
              <span style={{ color: '#cbd5e1', fontSize: 13 }}>{row.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {CONTACT_LINKS.map(link => (
            <div key={link.label} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px',
              background: '#1e293b',
              borderRadius: 6,
              border: `1px solid #334155`,
            }}>
              <i className={link.icon} style={{ color: BLUE, fontSize: 14 }} />
              <span style={{ color: '#94a3b8', fontSize: 12 }}>{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════
   ROOT COMPONENT
════════════════════════════════════════════════════════ */
export default function PdfPortfolio() {
  return (
    <>
      <style>{`
        .pdf-content img { max-width: 100%; height: auto; object-fit: contain; }
        .pdf-content table { width: 100%; font-size: 11px; }
        .pdf-content pre, .pdf-content .font-mono { font-size: 10px; }

        /* 강조 키워드 스타일 */
        .pdf-content strong, .pdf-content b,
        .pdf-content .font-bold { font-weight: 700 !important; }
        .pdf-content .font-semibold { font-weight: 600 !important; }

        /* 색상 강조 */
        .pdf-content .text-\\[\\#2563EB\\], .pdf-content [style*="color: #2563"] { color: #2563eb !important; }
        .pdf-content .text-blue-600, .pdf-content .text-blue-700 { color: #2563eb !important; font-weight: 600; }
        .pdf-content .text-blue-300, .pdf-content .text-\\[\\#8aa8e8\\] { color: #2563eb !important; font-weight: 600; }
        .pdf-content .text-red-600, .pdf-content .text-red-300 { color: #dc2626 !important; font-weight: 600; }
        .pdf-content .text-red-500, .pdf-content .text-red-400 { color: #ef4444 !important; font-weight: 600; }
        .pdf-content .text-emerald-600, .pdf-content .text-emerald-400 { color: #059669 !important; font-weight: 600; }
        .pdf-content .text-amber-600, .pdf-content .text-amber-300 { color: #d97706 !important; font-weight: 700; }
        .pdf-content .text-slate-900, .pdf-content .text-slate-100 { color: #0f172a !important; font-weight: 700; }

        /* Closing 카드 소제목 */
        .pdf-content .block.font-bold { display: block; font-weight: 700; color: #0f172a; margin-bottom: 4px; }

        /* 코드 인라인 */
        .pdf-content .font-mono { font-family: monospace; background: #f1f5f9; padding: 1px 4px; border-radius: 3px; font-size: 11px; }

        /* 링크 색상 */
        .pdf-content a { color: #2563eb; font-weight: 600; }
      `}</style>

      {/* Page 1 */}
      <HeroSlide />

      {/* Page 2: About */}
      <AboutPage />

      {/* Pages 3–: FeedShop */}
      <FeedShopOverview />
      <FeedShopTechRoles />
      <FeedShopArchImage />
      <FeedShopArchDetails />
      <FeedShopP1Problem />
      <FeedShopP1Thinking />
      <FeedShopP1Solution />
      <FeedShopP1Result />
      <FeedShopP2Problem />
      <FeedShopP2Thinking />
      <FeedShopP2SolutionResult />

      {/* Pages 13–19: 3M */}
      <M3Overview />
      <M3TechRoles />
      <M3ArchImage />
      <M3ArchDetails />
      <M3ProblemThinking />
      <M3Solution />
      <M3Result />

      {/* Pages 20–24: Portfolio sections */}
      <ExperiencePage />
      <ClosingPage />
      <ResourcesContactPage />
      <FinalContactSlide />
    </>
  )
}
