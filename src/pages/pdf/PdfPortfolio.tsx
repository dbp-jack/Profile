import React from 'react'
import {
  HERO_NAME, HERO_ROLE_BADGE, HERO_ROLE_TITLE,
  HERO_PERSONAL_INFO, HERO_SKILL_TAGS,
  ABOUT_CARDS, EXPERIENCE_ITEMS, CLOSING_BLOCKS, RESOURCE_LINKS, CONTACT_LINKS,
} from '@/content/portfolio'
import { PROJECTS } from '@/mocks/projects'

declare const __BASE_PATH__: string

/* ─── Design Tokens ─── */
const NAVY       = '#0f172a'
const BLUE       = '#2563eb'
const BLUE_LIGHT = '#eff6ff'
const GRAY1      = '#f8fafc'
const GRAY2      = '#e2e8f0'
const GRAY3      = '#64748b'
const WHITE      = '#ffffff'

const TOTAL_PAGES = 24

/* ─── Slide wrapper ─── */
function Slide({
  children,
  bg = WHITE,
  pageNum,
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
      {/* page number */}
      <div style={{
        position: 'absolute', bottom: 8, right: 16,
        fontSize: 9, color: '#94a3b8', fontWeight: 500,
      }}>
        {pageNum} / {TOTAL_PAGES}
      </div>
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
      height: 'calc(100% - 44px)', // 4px strip + 40px header
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

/* ─── Chip ─── */
function Chip({ text, bg = BLUE_LIGHT, color = BLUE }: { text: string; bg?: string; color?: string }) {
  return (
    <span style={{
      display: 'inline-block',
      background: bg,
      color,
      borderRadius: 4,
      padding: '2px 8px',
      fontSize: 11,
      fontWeight: 600,
      marginRight: 4,
      marginBottom: 4,
    }}>
      {text}
    </span>
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
      {/* 우상단 그라디언트 장식 */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 300, height: 300, borderRadius: '50%',
        transform: 'translate(30%, -30%)',
        background: 'radial-gradient(circle, rgba(30,58,95,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* 좌하단 그라디언트 장식 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 200, height: 200, borderRadius: '50%',
        transform: 'translate(-40%, 40%)',
        background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* 메인 콘텐츠 — 중앙 정렬 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        padding: '0 60px',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {/* 왼쪽: 세로형 프로필 사진 (한 단계 키움) */}
        <div style={{ flexShrink: 0 }}>
          <div style={{
            width: 178, height: 236,
            borderRadius: 18,
            border: '1px solid rgba(30,58,95,0.2)',
            background: '#f4f7fb',
            overflow: 'hidden',
          }}>
            <img
              src={`${__BASE_PATH__}profile-photo.png`}
              alt="정민수 증명사진"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* 오른쪽: 텍스트 정보 (한 단계 키움) */}
        <div style={{ minWidth: 0, maxWidth: 520 }}>
          {/* 뱃지 */}
          <div style={{
            display: 'inline-block',
            border: '1px solid #1E3A5F',
            color: '#1E3A5F',
            borderRadius: 999,
            padding: '5px 16px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}>
            {HERO_ROLE_BADGE}
          </div>

          {/* 이름 */}
          <div style={{
            fontSize: 62,
            fontWeight: 800,
            color: '#111827',
            lineHeight: 1.1,
            marginBottom: 10,
          }}>
            {HERO_NAME}
          </div>

          {/* 태그라인 */}
          <p style={{
            fontSize: 17,
            color: '#6b7280',
            lineHeight: 1.6,
            marginBottom: 18,
          }}>
            {HERO_ROLE_TITLE}
          </p>

          {/* 연락처 */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 18 }}>
            {HERO_PERSONAL_INFO.map((item) => (
              <li key={item.text} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: 14, color: '#4b5563',
                marginBottom: 8,
              }}>
                <i className={item.icon} style={{ color: '#1E3A5F', fontSize: 16, width: 20, textAlign: 'center' }} />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>

          {/* 기술 스택 라벨 */}
          <p style={{
            fontSize: 12, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 2,
            color: '#2563EB', marginBottom: 9,
          }}>
            기술 스택
          </p>

          {/* 기술 스택 태그 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {HERO_SKILL_TAGS.map((tag) => (
              <span key={tag} style={{
                border: '1px solid rgba(30,58,95,0.15)',
                background: '#f0f4fa',
                color: '#1E3A5F',
                borderRadius: 999,
                padding: '4px 14px',
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 페이지 번호 */}
      <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 9, color: '#d1d5db' }}>
        1 / {TOTAL_PAGES}
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
      <Content center padding="18px 28px">
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
      </Content>
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
      <Header title={`FeedShop — ${sec.headline}`} sub="Problem · Thinking" />
      <Content center={false} padding="14px 24px">
        {/* DEVELOPER PERSPECTIVE */}
        {feedshop.developerPerspective && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>DEVELOPER PERSPECTIVE</div>
            <div className="pdf-content" style={{ fontSize: 13, lineHeight: 1.65, color: '#334155' }}
              dangerouslySetInnerHTML={{ __html: feedshop.developerPerspective }} />
          </div>
        )}
        <div style={{ height: 1, background: GRAY2, marginBottom: 12 }} />
        {/* TEST ENVIRONMENT */}
        {feedshop.problemEnvironment && (
          <div style={{ marginBottom: 12, padding: '8px 14px', background: GRAY1, borderRadius: 8, border: `1px solid ${GRAY2}` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: GRAY3, marginBottom: 3 }}>🖥️ 로컬 테스트 환경</div>
            <div style={{ fontSize: 11, color: '#334155', lineHeight: 1.5 }}>{feedshop.problemEnvironment}</div>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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

function FeedShopP1Thinking() { return null }

function FeedShopP1Solution() {
  const sec = feedshop.problemSections![0]
  return (
    <Slide pageNum={8} minHeight>
      <Header title="FeedShop — Problem 1 / 해결 방법" sub="Solution" />
      <Content center={false} padding="16px 24px">
        <HtmlContent html={sec.solution} />
      </Content>
    </Slide>
  )
}

function FeedShopP1Result() {
  const sec = feedshop.problemSections![0]
  return (
    <Slide pageNum={9} minHeight>
      <Header title="FeedShop — Problem 1 / 결과" sub="Result" />
      <Content center={false} padding="16px 24px">
        <HtmlContent html={sec.result} />
      </Content>
    </Slide>
  )
}

/* ─── Pages 10–12: FeedShop Problem 2 ─── */
function FeedShopP2Problem() {
  const sec = feedshop.problemSections![1]
  return (
    <Slide pageNum={10} minHeight>
      <Header title={`FeedShop — ${sec.headline}`} sub="Problem · Thinking" />
      <Content center={false} padding="14px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <div style={{ fontSize: 9, color: '#ef4444', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PROBLEM</div>
            <HtmlContent html={sec.problem} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 9, color: '#f59e0b', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>THINKING</div>
            <HtmlContent html={sec.thinking} />
          </div>
        </div>
      </Content>
    </Slide>
  )
}

function FeedShopP2Thinking() { return null }

function FeedShopP2SolutionResult() {
  const sec = feedshop.problemSections![1]
  return (
    <Slide pageNum={12} minHeight>
      <Header title="FeedShop — Problem 2 / 해결 & 결과" sub="Solution + Result" />
      <Content center={false} padding="16px 24px">
        <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Solution</div>
        <HtmlContent html={sec.solution} />
        <div style={{ height: 1, background: GRAY2, margin: '12px 0' }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Result</div>
        <HtmlContent html={sec.result} />
      </Content>
    </Slide>
  )
}

/* ─── Pages 13–19: 3M Project ─── */
function M3Overview() {
  return (
    <Slide pageNum={13}>
      <Header title="3M — Service Overview · Tech Stack · Roles" sub={`${m3.period} · ${m3.teamSize} · ${m3.contribution}`} />
      <Content center={false} padding="14px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>SERVICE OVERVIEW</div>
            <HtmlContent html={m3.serviceOverview ?? ''} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>DEVELOPER PERSPECTIVE</div>
            <HtmlContent html={m3.developerPerspective ?? ''} />
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>TECH STACK</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {m3.techStack.map(t => <Chip key={t} text={t} />)}
            </div>
          </div>
          <div style={{ height: 1, background: GRAY2 }} />
          <div>
            <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>ROLES</div>
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
      </Content>
    </Slide>
  )
}

function M3TechRoles() { return null }


function M3ArchImage() {
  return (
    <Slide pageNum={15} minHeight>
      <Header title="3M — Architecture" sub="인프라 구조도 · Architecture Details" />
      <Content center={false} padding="12px 24px">
        {/* 이미지 (축소) */}
        <div style={{ marginBottom: 14 }}>
          <img
            src={`${__BASE_PATH__}${m3.architectureImage?.replace(/^\//, '')}`}
            alt="3M Architecture"
            style={{ maxWidth: '100%', maxHeight: '80mm', objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
        </div>
        <div style={{ height: 1, background: GRAY2, marginBottom: 12 }} />
        {/* Architecture Details */}
        <div style={{ display: 'flex', gap: 20 }}>
          {m3.architectureDetails?.map(section => (
            <div key={section.title} style={{ flex: 1 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: NAVY, marginBottom: 6,
                paddingBottom: 3, borderBottom: `2px solid ${BLUE}`, display: 'inline-block',
              }}>
                {section.title}
              </div>
              {section.description && (
                <p style={{ fontSize: 10, color: GRAY3, marginBottom: 4, lineHeight: 1.5 }}>{section.description}</p>
              )}
              {section.items.map((item, idx) => (
                <ul key={idx} style={{ margin: 0, paddingLeft: 14 }}>
                  {item.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: 11, color: '#334155', lineHeight: 1.6, marginBottom: 2 }}>{b}</li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </Content>
    </Slide>
  )
}

function M3ArchDetails() { return null }

function M3ProblemThinking() {
  return (
    <Slide pageNum={17} minHeight>
      <Header title={`3M — ${m3.problemHeadline ?? '문제 해결'}`} sub="Problem + Thinking" />
      <Content center={false} padding="16px 24px">
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Problem</div>
          <HtmlContent html={m3.problem ?? ''} />
        </div>
        <div style={{ height: 1, background: GRAY2, margin: '0 0 12px' }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>Thinking</div>
          <HtmlContent html={m3.thinking ?? ''} />
        </div>
      </Content>
    </Slide>
  )
}

function M3Solution() {
  return (
    <Slide pageNum={18} minHeight>
      <Header title="3M — Solution" sub="해결 방법" />
      <Content center={false} padding="16px 24px">
        <HtmlContent html={m3.solution ?? ''} />
      </Content>
    </Slide>
  )
}

function M3Result() {
  return (
    <Slide pageNum={19} minHeight>
      <Header title="3M — Result" sub="결과" />
      <Content center={false} padding="16px 24px">
        <HtmlContent html={m3.result ?? ''} />
      </Content>
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
      <Content center={false} padding="16px 24px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              gap: 14,
              paddingBottom: 10,
              borderBottom: idx < EXPERIENCE_ITEMS.length - 1 ? `1px solid ${GRAY2}` : 'none',
              alignItems: 'flex-start',
            }}>
              <div style={{ minWidth: 110, flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: GRAY3, fontWeight: 600 }}>{item.period}</div>
                <div style={{
                  display: 'inline-block',
                  marginTop: 3,
                  background: categoryColor[item.category] ?? BLUE,
                  color: WHITE,
                  borderRadius: 3,
                  padding: '1px 6px',
                  fontSize: 9,
                  fontWeight: 700,
                }}>
                  {item.category}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 3 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </Content>
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
      <div style={{
        background: NAVY, padding: '22px 32px 18px',
      }}>
        <div style={{ fontSize: 9, color: '#60a5fa', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>About</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>저는 이렇게 일합니다</div>
        <div style={{ fontSize: 13, color: '#94a3b8' }}>문제는 수치로 파악해 해결하고, 협력은 팀 흐름을 맞춰 정리하며, 맡은 임무는 끝까지 완수합니다.</div>
      </div>

      {/* 카드 3개 — 세로 꽉 채우기 */}
      <div style={{
        display: 'flex',
        gap: 16,
        padding: '20px 28px',
        height: 'calc(210mm - 110px)',
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
              padding: '20px 18px',
              display: 'flex',
              flexDirection: 'column',
              borderTop: `4px solid ${c.border}`,
            }}>
              {/* 아이콘 + 제목 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: c.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <i className={card.icon} style={{ color: c.border, fontSize: 18 }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{card.title}</div>
              </div>

              {/* 소제목 */}
              <div
                style={{ fontSize: 11, color: c.text, fontWeight: 700, marginBottom: 12, lineHeight: 1.4 }}
                dangerouslySetInnerHTML={{ __html: card.subtitle }}
              />

              {/* 구분선 */}
              <div style={{ height: 1, background: `${c.border}30`, marginBottom: 12 }} />

              {/* 내용 */}
              <div
                className="pdf-content"
                style={{ fontSize: 12, color: '#334155', lineHeight: 1.7, flex: 1 }}
                dangerouslySetInnerHTML={{ __html: card.description.replace(/\n\n/g, '<br/><br/>') }}
              />
            </div>
          )
        })}
      </div>

      {/* 페이지 번호 */}
      <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 9, color: '#94a3b8' }}>
        21 / {TOTAL_PAGES}
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
      <Content center={false} padding="14px 24px">
        {/* Closing 카드 2개 */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          {CLOSING_BLOCKS.map(block => (
            <div key={block.titleEn} style={{
              flex: 1, background: GRAY1, border: `1px solid ${GRAY2}`,
              borderRadius: 10, padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <i className={block.icon} style={{ color: BLUE, fontSize: 16 }} />
                <div style={{ fontSize: 8, color: GRAY3, fontWeight: 700, letterSpacing: 1 }}>{block.titleEn}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>{block.titleKo}</div>
              <HtmlContent html={block.body} />
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: GRAY2, marginBottom: 14 }} />
        {/* Resources */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>RESOURCES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {RESOURCE_LINKS.map(link => (
              <div key={link.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 12px', background: GRAY1, borderRadius: 6, border: `1px solid ${GRAY2}`,
              }}>
                <i className={link.icon} style={{ color: BLUE, fontSize: 13, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>{link.label}</div>
                  <div style={{ fontSize: 10, color: GRAY3 }}>{link.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: GRAY2, marginBottom: 10 }} />
        {/* Contact */}
        <div>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>CONTACT</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {CONTACT_LINKS.map(link => (
              <div key={link.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', background: BLUE_LIGHT, borderRadius: 6, border: `1px solid #bfdbfe`,
              }}>
                <i className={link.icon} style={{ color: BLUE, fontSize: 14 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Content>
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
      <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 9, color: '#475569' }}>
        {TOTAL_PAGES} / {TOTAL_PAGES}
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
