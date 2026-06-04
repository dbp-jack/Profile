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

/* ─── HTML Content wrapper ─── */
function HtmlContent({ html }: { html: string }) {
  return (
    <div
      className="pdf-content"
      style={{ fontSize: 12, lineHeight: 1.6, color: '#334155' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

/* ════════════════════════════════════════════════════════
   PAGE 1 — Hero
════════════════════════════════════════════════════════ */
function HeroSlide() {
  const feedshop = PROJECTS[0]
  const m3 = PROJECTS[1]
  return (
    <div style={{
      width: '297mm', height: '210mm',
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
      {/* 4px blue strip */}
      <div style={{ height: 4, background: BLUE, width: '100%', flexShrink: 0 }} />

      {/* main area: 3 columns */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '16px 32px',
        gap: 32,
      }}>
        {/* Left: photo */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <img
            src={`${__BASE_PATH__}/profile.jpg`}
            alt="profile"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${BLUE}` }}
          />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: 10, marginBottom: 4 }}>Projects</div>
            <div style={{ color: WHITE, fontSize: 10, lineHeight: 1.5 }}>
              <div>{feedshop.name.split(' - ')[0]}</div>
              <div>{m3.name.split(' - ')[0]}</div>
            </div>
          </div>
        </div>

        {/* Center: name + role + tags */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{
            background: BLUE,
            color: WHITE,
            borderRadius: 4,
            padding: '3px 12px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
          }}>
            {HERO_ROLE_BADGE}
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: WHITE, lineHeight: 1.1 }}>
            {HERO_NAME}
          </div>
          <div style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center', maxWidth: 280 }}>
            {HERO_ROLE_TITLE}
          </div>
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4 }}>
            {HERO_SKILL_TAGS.map(tag => (
              <span key={tag} style={{
                background: '#1e3a5f',
                color: '#93c5fd',
                borderRadius: 4,
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 600,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: contact */}
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
          <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 700, marginBottom: 4, letterSpacing: 1 }}>CONTACT</div>
          {HERO_PERSONAL_INFO.map(row => (
            <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 24, height: 24,
                background: '#1e293b',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <i className={row.icon} style={{ color: BLUE, fontSize: 12 }} />
              </div>
              <span style={{ color: '#cbd5e1', fontSize: 11 }}>{row.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* page number */}
      <div style={{ position: 'absolute', bottom: 8, right: 16, fontSize: 9, color: '#475569' }}>
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

/* ─── Page 2: FeedShop overview ─── */
function FeedShopOverview() {
  return (
    <Slide pageNum={2} minHeight>
      <Header title="FeedShop — Service Overview" sub={`${feedshop.period} · ${feedshop.teamSize} · ${feedshop.contribution}`} />
      <Content center={false} padding="16px 24px">
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>SERVICE OVERVIEW</div>
          <HtmlContent html={feedshop.serviceOverview} />
        </div>
        <div style={{ height: 1, background: GRAY2, margin: '10px 0' }} />
        <div>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>DEVELOPER PERSPECTIVE</div>
          <HtmlContent html={feedshop.developerPerspective} />
        </div>
      </Content>
    </Slide>
  )
}

/* ─── Page 3: FeedShop tech + roles ─── */
function FeedShopTechRoles() {
  return (
    <Slide pageNum={3}>
      <Header title="FeedShop — Tech Stack & Roles" sub={feedshop.name} />
      <Content center={false} padding="16px 24px">
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>TECH STACK</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {feedshop.techStack.map(t => <Chip key={t} text={t} />)}
          </div>
        </div>
        <div style={{ height: 1, background: GRAY2, margin: '0 0 12px' }} />
        <div>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>ROLES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {feedshop.roles.map(role => (
              <div key={role.title} style={{
                background: GRAY1,
                border: `1px solid ${GRAY2}`,
                borderRadius: 8,
                padding: '10px 14px',
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{role.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{role.title}</div>
                  <HtmlContent html={role.detail} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Slide>
  )
}

/* ─── Page 4: FeedShop architecture image ─── */
function FeedShopArchImage() {
  return (
    <Slide pageNum={4}>
      <Header title="FeedShop — Architecture" sub="인프라 구조도" />
      <Content center padding="12px 24px">
        <img
          src={`${__BASE_PATH__}${feedshop.architectureImage}`}
          alt="FeedShop Architecture"
          style={{ maxWidth: '100%', maxHeight: '140mm', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
      </Content>
    </Slide>
  )
}

/* ─── Page 5: FeedShop architecture details ─── */
function FeedShopArchDetails() {
  return (
    <Slide pageNum={5} minHeight>
      <Header title="FeedShop — Architecture Details" sub="GCP + GitHub Actions" />
      <Content center={false} padding="16px 24px">
        {feedshop.architectureDetails.map(section => (
          <div key={section.title} style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 8,
              paddingBottom: 4,
              borderBottom: `2px solid ${BLUE}`,
              display: 'inline-block',
            }}>
              {section.title}
            </div>
            {section.items.map((item, idx) => (
              <ul key={idx} style={{ margin: 0, paddingLeft: 16 }}>
                {item.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: 12, color: '#334155', lineHeight: 1.7, marginBottom: 2 }}>{b}</li>
                ))}
              </ul>
            ))}
          </div>
        ))}
        <div style={{ marginTop: 8, padding: '10px 14px', background: GRAY1, borderRadius: 8, border: `1px solid ${GRAY2}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: GRAY3, marginBottom: 4 }}>TEST ENVIRONMENT</div>
          <div style={{ fontSize: 11, color: '#334155', lineHeight: 1.6 }}>{feedshop.problemEnvironment}</div>
        </div>
      </Content>
    </Slide>
  )
}

/* ─── Pages 6–9: FeedShop Problem 1 ─── */
function FeedShopP1Problem() {
  const sec = feedshop.problemSections[0]
  return (
    <Slide pageNum={6} minHeight>
      <Header title={`FeedShop — ${sec.headline}`} sub="문제 상황" />
      <Content center={false} padding="16px 24px">
        <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 12 }}>{sec.headline}</div>
        <HtmlContent html={sec.problem} />
      </Content>
    </Slide>
  )
}

function FeedShopP1Thinking() {
  const sec = feedshop.problemSections[0]
  return (
    <Slide pageNum={7} minHeight>
      <Header title="FeedShop — Problem 1 / 사고 과정" sub="Thinking" />
      <Content center={false} padding="16px 24px">
        <HtmlContent html={sec.thinking} />
      </Content>
    </Slide>
  )
}

function FeedShopP1Solution() {
  const sec = feedshop.problemSections[0]
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
  const sec = feedshop.problemSections[0]
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
  const sec = feedshop.problemSections[1]
  return (
    <Slide pageNum={10} minHeight>
      <Header title={`FeedShop — ${sec.headline}`} sub="문제 상황" />
      <Content center={false} padding="16px 24px">
        <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginBottom: 12 }}>{sec.headline}</div>
        <HtmlContent html={sec.problem} />
      </Content>
    </Slide>
  )
}

function FeedShopP2Thinking() {
  const sec = feedshop.problemSections[1]
  return (
    <Slide pageNum={11} minHeight>
      <Header title="FeedShop — Problem 2 / 사고 과정" sub="Thinking" />
      <Content center={false} padding="16px 24px">
        <HtmlContent html={sec.thinking} />
      </Content>
    </Slide>
  )
}

function FeedShopP2SolutionResult() {
  const sec = feedshop.problemSections[1]
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
    <Slide pageNum={13} minHeight>
      <Header title="3M — Service Overview" sub={`${m3.period} · ${m3.teamSize} · ${m3.contribution}`} />
      <Content center={false} padding="16px 24px">
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>SERVICE OVERVIEW</div>
          <HtmlContent html={m3.serviceOverview} />
        </div>
        <div style={{ height: 1, background: GRAY2, margin: '10px 0' }} />
        <div>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>DEVELOPER PERSPECTIVE</div>
          <HtmlContent html={m3.developerPerspective} />
        </div>
      </Content>
    </Slide>
  )
}

function M3TechRoles() {
  return (
    <Slide pageNum={14}>
      <Header title="3M — Tech Stack & Roles" sub={m3.name} />
      <Content center={false} padding="16px 24px">
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>TECH STACK</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {m3.techStack.map(t => <Chip key={t} text={t} />)}
          </div>
        </div>
        <div style={{ height: 1, background: GRAY2, margin: '0 0 12px' }} />
        <div>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>ROLES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {m3.roles.map(role => (
              <div key={role.title} style={{
                background: GRAY1,
                border: `1px solid ${GRAY2}`,
                borderRadius: 8,
                padding: '10px 14px',
                display: 'flex', alignItems: 'flex-start', gap: 10,
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{role.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{role.title}</div>
                  <HtmlContent html={role.detail} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Slide>
  )
}

function M3ArchImage() {
  return (
    <Slide pageNum={15}>
      <Header title="3M — Architecture" sub="인프라 구조도" />
      <Content center padding="12px 24px">
        <img
          src={`${__BASE_PATH__}${m3.architectureImage}`}
          alt="3M Architecture"
          style={{ maxWidth: '100%', maxHeight: '140mm', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
      </Content>
    </Slide>
  )
}

function M3ArchDetails() {
  return (
    <Slide pageNum={16} minHeight>
      <Header title="3M — Architecture Details" sub="Docker Compose + Eureka + Gateway" />
      <Content center={false} padding="16px 24px">
        {m3.architectureDetails.map(section => (
          <div key={section.title} style={{ marginBottom: 16 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 8,
              paddingBottom: 4,
              borderBottom: `2px solid ${BLUE}`,
              display: 'inline-block',
            }}>
              {section.title}
            </div>
            {section.items.map((item, idx) => (
              <ul key={idx} style={{ margin: 0, paddingLeft: 16 }}>
                {item.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: 12, color: '#334155', lineHeight: 1.7, marginBottom: 2 }}>{b}</li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </Content>
    </Slide>
  )
}

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
  return (
    <Slide pageNum={21}>
      <Header title="About — 저는 이렇게 일합니다" />
      <Content center padding="16px 24px">
        <div style={{ display: 'flex', gap: 16 }}>
          {ABOUT_CARDS.map(card => (
            <div key={card.title} style={{
              flex: 1,
              background: GRAY1,
              border: `1px solid ${GRAY2}`,
              borderRadius: 10,
              padding: '16px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <i className={card.icon} style={{ color: BLUE, fontSize: 18 }} />
                <div style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>{card.title}</div>
              </div>
              <div style={{ fontSize: 11, color: BLUE, fontWeight: 600, marginBottom: 8 }}>{card.subtitle}</div>
              <div
                className="pdf-content"
                style={{ fontSize: 12, color: '#334155', lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: card.description.replace(/\n\n/g, '<br/>') }}
              />
            </div>
          ))}
        </div>
      </Content>
    </Slide>
  )
}

/* ─── Page 22: Closing ─── */
function ClosingPage() {
  return (
    <Slide pageNum={22}>
      <Header title="앞으로의 방향 — Closing" />
      <Content center padding="16px 24px">
        <div style={{ display: 'flex', gap: 16 }}>
          {CLOSING_BLOCKS.map(block => (
            <div key={block.titleEn} style={{
              flex: 1,
              background: GRAY1,
              border: `1px solid ${GRAY2}`,
              borderRadius: 10,
              padding: '16px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <i className={block.icon} style={{ color: BLUE, fontSize: 18 }} />
                <div style={{ fontSize: 9, color: GRAY3, fontWeight: 700, letterSpacing: 1 }}>{block.titleEn}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{block.titleKo}</div>
              <HtmlContent html={block.body} />
            </div>
          ))}
        </div>
      </Content>
    </Slide>
  )
}

/* ─── Page 23: Resources + Contact ─── */
function ResourcesContactPage() {
  return (
    <Slide pageNum={23}>
      <Header title="Resources & Contact — 자료 모음" />
      <Content center={false} padding="16px 24px">
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RESOURCES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {RESOURCE_LINKS.map(link => (
              <div key={link.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px',
                background: GRAY1,
                borderRadius: 6,
                border: `1px solid ${GRAY2}`,
              }}>
                <i className={link.icon} style={{ color: BLUE, fontSize: 14, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{link.label}</div>
                  <div style={{ fontSize: 10, color: GRAY3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {link.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 1, background: GRAY2, margin: '0 0 12px' }} />
        <div>
          <div style={{ fontSize: 9, color: BLUE, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>CONTACT</div>
          <div style={{ display: 'flex', gap: 12 }}>
            {CONTACT_LINKS.map(link => (
              <div key={link.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 14px',
                background: BLUE_LIGHT,
                borderRadius: 6,
                border: `1px solid #bfdbfe`,
              }}>
                <i className={link.icon} style={{ color: BLUE, fontSize: 16 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{link.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Content>
    </Slide>
  )
}

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

      {/* Pages 2–12: FeedShop */}
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
      <AboutPage />
      <ClosingPage />
      <ResourcesContactPage />
      <FinalContactSlide />
    </>
  )
}
