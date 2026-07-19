import React from 'react'
import {
  ABOUT_CARDS,
  ABOUT_SECTION,
  COLLABORATION_SECTION,
  CLOSING_BLOCKS,
  CLOSING_SECTION,
  CONTACT_LINKS,
  EXPERIENCE_ITEMS,
  HERO_NAME,
  HERO_PERSONAL_INFO,
  HERO_ROLE_BADGE,
  HERO_ROLE_TITLE,
  HERO_SKILL_GROUPS,
  PROJECTS_SECTION,
  PROJECT_WORKFLOW,
  RESOURCE_LINKS,
  RESOURCES_SECTION,
  WORK_STYLE_SECTION,
} from '@/content/portfolio'
import { DEFAULT_PROJECT_IDS, PROJECTS, PROJECT_OVERVIEWS } from '@/content/projects'

declare const __BASE_PATH__: string

const navy = '#0f172a'
const blue = '#2563eb'
const slate = '#334155'
const muted = '#64748b'
const line = '#dbe3ef'
const soft = '#f8fafc'
const white = '#ffffff'
const green = '#059669'
const amber = '#d97706'
const red = '#dc2626'
const violet = '#7c3aed'
const teal = '#0f766e'

type ReflectionHighlight = {
  no: string
  title: string
  desc: string
  color: string
  background: string
  borderColor: string
}

const feedshop = PROJECTS[0]
const m3 = PROJECTS[1]
type PdfProjectCard = {
  overview: (typeof PROJECT_OVERVIEWS)[number]
  detail: (typeof PROJECTS)[number]
}

const pdfProjectCards = DEFAULT_PROJECT_IDS.map((projectId) => {
  const overview = PROJECT_OVERVIEWS.find((project) => project.id === projectId)
  const detail = PROJECTS.find((project) => project.id === projectId)
  return overview && detail ? { overview, detail } : null
}).filter((project): project is PdfProjectCard => Boolean(project))
const pdfResourceLinks = RESOURCE_LINKS.filter(
  (link) => !link.projectId || DEFAULT_PROJECT_IDS.includes(link.projectId),
)
const heroSkillTags = HERO_SKILL_GROUPS.flatMap((group) => group.tags)

function asset(path?: string): string {
  if (!path) return ''
  return `${__BASE_PATH__}${path.replace(/^\//, '')}`
}

function withAssetSrc(html = ''): string {
  return html.replace(
    /src="(?!http|data|\/\/)([^"]+)"/g,
    (_, src) => `src="${asset(src)}"`,
  )
}

function extractTable(html: string): string {
  const tableStart = html.indexOf('<table')
  if (tableStart < 0) return ''
  const tableEnd = html.indexOf('</table>', tableStart) + '</table>'.length
  const wrapStart = html.lastIndexOf('<div', tableStart)
  const wrapEnd = html.indexOf('</div>', tableEnd) + '</div>'.length
  return html.slice(wrapStart >= 0 ? wrapStart : tableStart, wrapEnd > 0 ? wrapEnd : tableEnd)
}

function toPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()
}

function parseClosingItems(body: string): Array<{ title: string; text: string }> {
  return Array.from(body.matchAll(/<div><span[^>]*>(.*?)<\/span><span[^>]*>(.*?)<\/span><\/div>/gs)).map((match) => ({
    title: toPlainText(match[1]),
    text: toPlainText(match[2]),
  }))
}

function ParagraphRich({
  html,
  size,
  lineHeight,
}: {
  html: string
  size: number
  lineHeight: number
}) {
  const paragraphs = html.split(/\n+/).filter((line) => line.trim())

  return (
    <div style={{ display: 'grid', gap: 9 }}>
      {paragraphs.map((paragraph) => (
        <Rich key={paragraph} html={paragraph} size={size} lineHeight={lineHeight} />
      ))}
    </div>
  )
}

function Slide({
  eyebrow,
  title,
  subtitle,
  children,
  tone = 'light',
  dense = false,
}: {
  eyebrow?: string
  title?: string
  subtitle?: string
  children: React.ReactNode
  tone?: 'light' | 'navy'
  dense?: boolean
}) {
  const isNavy = tone === 'navy'
  return (
    <section
      className="pdf-slide"
      style={{
        width: '297mm',
        height: '210mm',
        breakAfter: 'page',
        pageBreakAfter: 'always',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: isNavy ? navy : white,
        color: isNavy ? white : navy,
        fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
        position: 'relative',
        padding: dense ? '13mm 16mm' : '16mm 18mm',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: 4,
          width: '100%',
          background: blue,
        }}
      />
      {(eyebrow || title || subtitle) && (
        <header style={{ flexShrink: 0, marginBottom: dense ? 12 : 16, position: 'relative', zIndex: 1 }}>
          {eyebrow && (
            <div
              style={{
                color: isNavy ? '#93c5fd' : blue,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 5,
              }}
            >
              {eyebrow}
            </div>
          )}
          {title && (
            <h1
              style={{
                margin: 0,
                fontSize: dense ? 25 : 30,
                lineHeight: 1.16,
                letterSpacing: '-0.02em',
                fontWeight: 900,
              }}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p
              style={{
                margin: '7px 0 0',
                color: isNavy ? '#cbd5e1' : muted,
                fontSize: 13.6,
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </p>
          )}
        </header>
      )}
      <div style={{ minHeight: 0, flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </section>
  )
}

function Rich({
  html,
  className = '',
  size = 12,
  lineHeight = 1.55,
}: {
  html: string
  className?: string
  size?: number
  lineHeight?: number
}) {
  return (
    <div
      className={`pdf-rich ${className}`}
      style={{ fontSize: size, lineHeight, color: slate }}
      dangerouslySetInnerHTML={{ __html: withAssetSrc(html) }}
    />
  )
}

function SectionLabel({ children, color = blue }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        color,
        fontSize: 12.4,
        fontWeight: 950,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: 7,
      }}
    >
      {children}
    </div>
  )
}

function Panel({
  children,
  pad = 12,
  borderColor = line,
  background = soft,
  accent,
}: {
  children: React.ReactNode
  pad?: number
  borderColor?: string
  background?: string
  accent?: string
}) {
  return (
    <div
      style={{
        background,
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        padding: pad,
        minHeight: 0,
        borderTop: accent ? `4px solid ${accent}` : `1px solid ${borderColor}`,
      }}
    >
      {children}
    </div>
  )
}

function KpiCard({
  label,
  value,
  caption,
  color = blue,
}: {
  label: string
  value: string
  caption?: string
  color?: string
}) {
  return (
    <div
      style={{
        background: white,
        border: `1px solid ${color}30`,
        borderTop: `4px solid ${color}`,
        borderRadius: 14,
        padding: '13px 14px',
      }}
    >
      <div style={{ color, fontSize: 25, lineHeight: 1, fontWeight: 950, letterSpacing: '-0.03em', whiteSpace: 'nowrap' }}>{value}</div>
      <div style={{ marginTop: 6, color: navy, fontSize: 13, fontWeight: 950 }}>{label}</div>
      {caption && <div style={{ marginTop: 4, color: muted, fontSize: 12.6, lineHeight: 1.36 }}>{caption}</div>}
    </div>
  )
}

function ProjectCaseCover({
  projectName,
  eyebrow,
  statement,
  description,
  metrics,
}: {
  projectName: string
  eyebrow: string
  statement: string
  description: string
  metrics: Array<{ label: string; value: string; caption?: string; color?: string }>
}) {
  return (
    <Slide tone="navy" dense>
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1.08fr 0.92fr',
          gap: 28,
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ color: '#93c5fd', fontSize: 13, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            {eyebrow}
          </div>
          <h1 style={{ margin: 0, color: white, fontSize: 43, lineHeight: 1.12, fontWeight: 950, letterSpacing: '-0.035em' }}>
            {projectName}
          </h1>
          <p style={{ margin: '20px 0 0', color: '#e2e8f0', fontSize: 25, lineHeight: 1.34, fontWeight: 900, letterSpacing: '-0.025em' }}>
            {statement}
          </p>
          <p style={{ margin: '18px 0 0', color: '#94a3b8', fontSize: 13.5, lineHeight: 1.6, maxWidth: 620 }}>
            {description}
          </p>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          {metrics.map((metric) => (
            <KpiCard key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </Slide>
  )
}

function Tags({ items }: { items: readonly string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
      {items.map((item) => (
        <span
          key={item}
          style={{
            padding: '5px 10px',
            borderRadius: 999,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            color: '#1e3a8a',
            fontSize: 13,
            fontWeight: 850,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function HeroSlide() {
  const personalBadges = ['LOC', 'TEL', 'GH', 'IN'] as const

  return (
    <Slide tone="light">
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '180px 1fr',
          gap: 42,
          alignItems: 'center',
          padding: '0 18mm',
        }}
      >
        <div
          style={{
            width: 178,
            height: 236,
            borderRadius: 18,
            overflow: 'hidden',
            border: `1px solid ${line}`,
            background: '#f1f5f9',
          }}
        >
          <img src={asset('profile-photo.png')} alt="정민수 증명사진" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div
            style={{
              display: 'inline-flex',
              border: `1px solid ${navy}`,
              borderRadius: 999,
              padding: '5px 15px',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.17em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            {HERO_ROLE_BADGE}
          </div>
          <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.08, fontWeight: 950 }}>
            {HERO_NAME}
          </h1>
          <p style={{ margin: '12px 0 18px', fontSize: 20, color: '#6b7280', fontWeight: 800 }}>
            {HERO_ROLE_TITLE}
          </p>
          <div style={{ height: 1, background: line, marginBottom: 16 }} />
          <div style={{ display: 'grid', gap: 7, marginBottom: 18 }}>
            {HERO_PERSONAL_INFO.map((row, idx) => (
              <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: slate, fontSize: 14 }}>
                <span style={{ width: 30, color: blue, fontSize: 12.2, fontWeight: 950 }}>{personalBadges[idx] ?? 'INFO'}</span>
                <span>{row.text}</span>
              </div>
            ))}
          </div>
          <SectionLabel>기술 스택</SectionLabel>
          <Tags items={heroSkillTags} />
        </div>
      </div>
    </Slide>
  )
}

function AboutSlide() {
  return (
    <Slide eyebrow={ABOUT_SECTION.kicker} title={ABOUT_SECTION.title} subtitle={ABOUT_SECTION.intro}>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: 10, height: '100%' }}>
        {ABOUT_CARDS.map((card, idx) => (
          <Panel key={card.title} pad={12} background={white} accent={idx === 0 ? blue : idx === 1 ? green : violet}>
            <div style={{ display: 'grid', gridTemplateColumns: '112px 1fr', gap: 18, alignItems: 'center', height: '100%' }}>
              <div style={{ borderRight: `1px solid ${line}`, height: '100%', display: 'grid', placeItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: blue, fontSize: 34, fontWeight: 950, lineHeight: 1 }}>{String(idx + 1).padStart(2, '0')}</div>
                  <div style={{ marginTop: 8, fontWeight: 950, fontSize: 14.2, lineHeight: 1.25 }}>{card.title}</div>
                </div>
              </div>
              <div style={{ display: 'grid', alignContent: 'center', gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: 20.2, fontWeight: 950, lineHeight: 1.25 }}>{card.subtitle}</h2>
                <div style={{ display: 'grid', gap: 6, color: slate, fontSize: 14.1, lineHeight: 1.46 }}>
                  {card.description.split('\n').map((line) => (
                    <div key={line} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 3 }}>
                      <strong style={{ color: blue }}>✓</strong>
                      <Rich html={line} size={14.1} lineHeight={1.46} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Slide>
  )
}

function ProjectsOverviewSlide() {
  const highlights = [
    [
      ['91% 단축', '동시 1,000명 기준 응답시간 6,818ms → 638ms · 사용자 이탈 방지'],
      ['SQL 42회 → 2회', 'fetchJoin 적용 후 Cache Hit 0회 분리'],
      ['오류·중복 0건', '동시 3,000명 투표 테스트 · 투표 수 정합성 유지'],
    ],
    [
      ['CBO 0건', 'UserService → Auth 도메인 결합도 제거 · 장애 전파 위험 방지'],
      ['단방향 의존', 'Feign DTO 중심 참조 · 순환 의존 없음'],
      ['Gateway 권한 판단', 'JWT payload 기반 User 재조회 감소'],
    ],
    [
      ['비동기 경계', '주문 요청이 결제 완료를 직접 기다리지 않음'],
      ['이벤트 타입 분리', '성공·실패·취소 상태 전이를 코드로 분리'],
      ['보상 흐름 구현', '결제 실패·취소 시 주문 취소 이벤트 연계'],
    ],
  ] as const
  const accentColors = [blue, violet, teal]

  return (
    <Slide eyebrow={PROJECTS_SECTION.kicker} title={PROJECTS_SECTION.title} subtitle={PROJECTS_SECTION.subtitle}>
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 9, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${pdfProjectCards.length}, 1fr)`, gap: 13, minHeight: 0 }}>
          {pdfProjectCards.map(({ overview: project, detail }, idx) => {
            const summary = detail.overviewSummary
            const accent = accentColors[idx]
            const projectHighlights = highlights[idx] ?? []

            return (
              <Panel key={project.name} pad={14} background={white} accent={accent}>
                <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto auto auto 1fr auto auto', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <span style={{ color: accent, fontWeight: 900, fontSize: 13 }}>프로젝트 {idx + 1}</span>
                    <span style={{ background: accent, color: white, borderRadius: 999, padding: '5px 10px', fontSize: 12.4, fontWeight: 900 }}>{project.badge}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 14 }}>
                    <h2 style={{ margin: 0, fontSize: 27, fontWeight: 950, letterSpacing: '-0.03em' }}>{project.name}</h2>
                    <div style={{ color: muted, fontSize: 11.8, lineHeight: 1.35, fontWeight: 850, textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div>{detail.period}</div>
                      <div>{detail.contribution ?? detail.teamSize}</div>
                    </div>
                  </div>
                  <p style={{ margin: 0, color: slate, fontSize: 13.3, lineHeight: 1.45, fontWeight: 780 }}>{project.description}</p>
                  <div style={{ borderTop: `1px solid ${accent}35`, borderBottom: `1px solid ${accent}35`, background: '#f8fafc', padding: '10px 3px', display: 'grid', alignContent: 'start', gap: 8 }}>
                    <div>
                      <SectionLabel color={accent}>소개</SectionLabel>
                      <p style={{ margin: 0, color: slate, fontSize: 12.8, lineHeight: 1.42, fontWeight: 770 }}>{summary?.intro ?? detail.description}</p>
                    </div>
                    <div>
                      <SectionLabel color={accent}>핵심 성과</SectionLabel>
                      <div style={{ display: 'grid', gap: 5 }}>
                        {projectHighlights.map(([value, caption]) => (
                          <div
                            key={value}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'max-content 1fr',
                              gap: 10,
                              alignItems: 'center',
                              borderRadius: 10,
                              padding: '6px 8px',
                              background: white,
                              border: `1px solid ${accent}30`,
                            }}
                          >
                            <span style={{ color: accent, fontSize: 15.5, lineHeight: 1.12, fontWeight: 950, whiteSpace: 'nowrap' }}>
                              {value}
                            </span>
                            <span style={{ color: slate, fontSize: 11.4, lineHeight: 1.3, fontWeight: 800 }}>
                              {caption}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Tags items={project.tech} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderTop: `1px solid ${line}`, paddingTop: 9 }}>
                    <div>
                      <SectionLabel color={accent}>담당 역할</SectionLabel>
                      <p style={{ margin: 0, color: slate, fontSize: 12.3, lineHeight: 1.38, fontWeight: 760 }}>{project.role}</p>
                    </div>
                    <div style={{ borderLeft: `1px solid ${line}`, paddingLeft: 12 }}>
                      <SectionLabel color={accent}>핵심 과제</SectionLabel>
                      <p style={{ margin: 0, color: slate, fontSize: 12.3, lineHeight: 1.38, fontWeight: 760 }}>{project.challenge}</p>
                    </div>
                  </div>
                </div>
              </Panel>
            )
          })}
        </div>
        {feedshop.problemEnvironment && (
          <Panel pad={10} background="#f1f5f9">
            <div style={{ fontSize: 12, fontWeight: 900, color: navy, marginBottom: 3 }}>로컬 테스트 환경</div>
            <div style={{ fontSize: 12, color: slate, whiteSpace: 'pre-line' }}>{feedshop.problemEnvironment}</div>
          </Panel>
        )}
      </div>
    </Slide>
  )
}

function CollaborationEvidence({
  item,
  imageHeight,
}: {
  item: (typeof COLLABORATION_SECTION.evidence)[number]
  imageHeight: string
}) {
  return (
    <Panel pad={10} background={white} borderColor="#cbd5e1">
      <div style={{ display: 'grid', gridTemplateRows: `${imageHeight} auto`, gap: 9 }}>
        <div style={{ minHeight: 0, borderRadius: 8, overflow: 'hidden', border: `1px solid ${line}`, background: soft }}>
          <img src={asset(item.image)} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        <div>
          <div style={{ color: blue, fontSize: 12.2, fontWeight: 950, letterSpacing: '0.13em', textTransform: 'uppercase' }}>{item.label}</div>
          <div style={{ marginTop: 3, color: navy, fontSize: 15.8, lineHeight: 1.16, fontWeight: 950 }}>{item.title}</div>
          <div style={{ marginTop: 4, color: slate, fontSize: 12.2, lineHeight: 1.38, fontWeight: 740 }}>{item.description}</div>
        </div>
      </div>
    </Panel>
  )
}

function CollaborationSlide() {
  const evidenceItems = COLLABORATION_SECTION.evidence

  return (
    <Slide eyebrow={WORK_STYLE_SECTION.kicker} title={WORK_STYLE_SECTION.title} subtitle={WORK_STYLE_SECTION.subtitle} dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto', gap: 15, height: '100%', minHeight: 0, alignContent: 'start' }}>
        <div>
          <SectionLabel>{COLLABORATION_SECTION.kicker}</SectionLabel>
          <div style={{ color: navy, fontSize: 20.4, fontWeight: 950, lineHeight: 1.2, marginBottom: 8 }}>{COLLABORATION_SECTION.title}</div>
          <div style={{ color: slate, fontSize: 14, lineHeight: 1.45, fontWeight: 780 }}>{COLLABORATION_SECTION.intro}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, minHeight: 0 }}>
          {evidenceItems.map((item) => (
            <CollaborationEvidence key={item.title} item={item} imageHeight="62mm" />
          ))}
        </div>
        <a
          href={COLLABORATION_SECTION.guideUrl}
          style={{ color: blue, fontSize: 13.2, fontWeight: 950, textDecoration: 'none' }}
        >
          JIRA 가이드라인 보기 · {COLLABORATION_SECTION.guideUrl}
        </a>
      </div>
    </Slide>
  )
}

function AiWorkflowSlide() {
  const stepColors = [blue, teal, violet, green] as const

  return (
    <Slide eyebrow={PROJECT_WORKFLOW.label} title={PROJECT_WORKFLOW.title} subtitle={PROJECT_WORKFLOW.description} dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto auto 40mm 36mm', gap: 9, height: '100%', minHeight: 0, alignContent: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
          <SectionLabel>{PROJECT_WORKFLOW.flowTitle}</SectionLabel>
          <div style={{ color: slate, fontSize: 13, lineHeight: 1.35, fontWeight: 760 }}>
            {PROJECT_WORKFLOW.flowDescription}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 8, minHeight: 0, alignContent: 'start' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9, minHeight: 0, alignItems: 'stretch' }}>
            {PROJECT_WORKFLOW.steps.map((step, idx) => {
              const color = stepColors[idx % stepColors.length]
              return (
                <Panel key={step.label} pad={12} background={white} borderColor="#cbd5e1">
                  <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto', gap: 8, height: '100%', alignContent: 'start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ color, fontSize: 14, fontWeight: 950 }}>{String(idx + 1).padStart(2, '0')}</span>
                      <span style={{ color, fontSize: 13.2, fontWeight: 900 }}>{step.label}</span>
                    </div>
                    <h3 style={{ margin: 0, color: navy, fontSize: 17.2, lineHeight: 1.22, fontWeight: 950 }}>
                      {step.tool}
                    </h3>
                    <p
                      lang="ko"
                      style={{
                        margin: 0,
                        color: slate,
                        fontSize: 13.2,
                        lineHeight: 1.5,
                        fontWeight: 760,
                        whiteSpace: 'pre-line',
                        wordBreak: 'keep-all',
                        overflowWrap: 'break-word',
                        lineBreak: 'strict',
                      }}
                    >
                      {step.detail}
                    </p>
                  </div>
                </Panel>
              )
            })}
          </div>
          <div style={{ color: navy, fontSize: 13, lineHeight: 1.42, fontWeight: 820 }}>
            검증 기준 · {PROJECT_WORKFLOW.verificationNote}
          </div>
        </div>

        <Panel pad={14} background="#f8fafc" accent={blue} borderColor="#bfdbfe">
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 235px', gap: 18, alignItems: 'center' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    background: blue,
                    color: white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12.5,
                    fontWeight: 950,
                  }}
                >
                  01
                </span>
                <div style={{ color: blue, fontSize: 15, lineHeight: 1.2, fontWeight: 950 }}>
                  {PROJECT_WORKFLOW.currentStage.label}
                </div>
              </div>
              <div style={{ color: navy, fontSize: 19.2, lineHeight: 1.18, fontWeight: 950 }}>
                {PROJECT_WORKFLOW.currentStage.title}
              </div>
              <div style={{ marginTop: 7, color: slate, fontSize: 13.2, lineHeight: 1.42, fontWeight: 780 }}>
                {PROJECT_WORKFLOW.currentStage.description}
              </div>
            </div>
            <div style={{ borderLeft: `1px solid ${line}`, paddingLeft: 18 }}>
              <div style={{ color: slate, fontSize: 11.8, lineHeight: 1.35, fontWeight: 780, marginBottom: 8 }}>
                현재 활용 근거
              </div>
              <a
                href={PROJECT_WORKFLOW.currentStage.linkUrl}
                style={{ color: blue, fontSize: 13, lineHeight: 1.35, fontWeight: 950, textDecoration: 'none' }}
              >
                {PROJECT_WORKFLOW.currentStage.linkLabel} ↗
              </a>
            </div>
          </div>
        </Panel>

        <Panel pad={13} background="#ecfdf5" accent={green} borderColor="#a7f3d0">
          <div style={{ height: '100%', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                  background: green,
                  color: white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12.5,
                  fontWeight: 950,
                }}
              >
                02
              </span>
              <div style={{ color: green, fontSize: 15, lineHeight: 1.2, fontWeight: 950 }}>
                {PROJECT_WORKFLOW.nextStage.label}
              </div>
            </div>
            <div style={{ color: navy, fontSize: 19.2, lineHeight: 1.18, fontWeight: 950 }}>
              {PROJECT_WORKFLOW.nextStage.title}
            </div>
            <div style={{ marginTop: 7, color: slate, fontSize: 13.2, lineHeight: 1.42, fontWeight: 780 }}>
              {PROJECT_WORKFLOW.nextStage.description}
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function ProjectIntroSlide({
  project,
  title,
  showRoleLabels = true,
}: {
  project: typeof feedshop
  title: string
  showRoleLabels?: boolean
}) {
  const roleColors = [blue, green, violet]
  const roleLabels = ['Domain Ownership', 'Deployment', 'Team Leading']

  return (
    <Slide eyebrow={title} title="서비스 소개 · 기술 스택 · 담당 업무" subtitle={`${project.period} · ${project.teamSize} · ${project.contribution ?? ''}`}>
      <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 12, height: '100%' }}>
        <Panel pad={18} background={white} accent={blue}>
          <div style={{ display: 'grid', gap: 10 }}>
            <SectionLabel>Service Overview</SectionLabel>
            <ParagraphRich html={project.serviceOverview ?? project.projectOverview ?? ''} size={16.3} lineHeight={1.48} />
          </div>
        </Panel>
        <Panel pad={13} background="#f8fbff" accent={green}>
          <SectionLabel>Tech Stack</SectionLabel>
          <Tags items={project.techStack} />
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${project.roles.length}, 1fr)`, gap: 11, minHeight: 0 }}>
          {project.roles.map((role, idx) => {
            const color = roleColors[idx % roleColors.length]
            const detailLines = role.detail.split(/\n+/).filter(Boolean)

            return (
            <Panel key={role.title} pad={0} background={white} accent={color}>
              <div style={{ height: '100%', display: 'grid', gridTemplateRows: showRoleLabels ? 'auto 1fr auto' : 'auto 1fr' }}>
                <div
                  style={{
                    padding: '13px 14px 11px',
                    background: idx === 0 ? '#eff6ff' : idx === 1 ? '#ecfdf5' : '#f5f3ff',
                    borderBottom: `1px solid ${color}33`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color, fontSize: 12.2, fontWeight: 950, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: 5 }}>
                        ROLE {String(idx + 1).padStart(2, '0')}
                      </div>
                      <h3 style={{ margin: 0, color: navy, fontSize: 19.2, fontWeight: 950, lineHeight: 1.18 }}>{role.title}</h3>
                    </div>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 12,
                        background: white,
                        border: `1px solid ${color}40`,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 22,
                        flexShrink: 0,
                      }}
                    >
                      {role.icon}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '16px 16px 12px', display: 'grid', alignContent: 'start' }}>
                  <div style={{ display: 'grid', gap: detailLines.length > 1 ? 9 : 0 }}>
                    {detailLines.map((line) => (
                      <div
                        key={line}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '10px 1fr',
                          gap: 10,
                          alignItems: 'start',
                          padding: detailLines.length > 1 ? '7px 0' : 0,
                        }}
                      >
                        <span style={{ width: 8, height: 8, borderRadius: 999, background: color, marginTop: 8 }} />
                        <Rich html={line} size={15.6} lineHeight={1.42} />
                      </div>
                    ))}
                  </div>
                </div>
                {showRoleLabels && (
                  <div
                    style={{
                      margin: '0 16px 15px',
                      borderRadius: 10,
                      border: `1px solid ${color}2f`,
                      background: idx === 0 ? '#f8fbff' : idx === 1 ? '#f7fefb' : '#fbf9ff',
                      color,
                      padding: '8px 10px',
                      fontSize: 12.5,
                      fontWeight: 950,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                    }}
                  >
                    {roleLabels[idx] ?? 'Responsibility'}
                  </div>
                )}
              </div>
            </Panel>
            )
          })}
        </div>
      </div>
    </Slide>
  )
}

function ArchitectureSlide({
  project,
  title,
  showOwnershipLabel = true,
  showDetailMarkers = false,
}: {
  project: typeof feedshop
  title: string
  showOwnershipLabel?: boolean
  showDetailMarkers?: boolean
}) {
  const ownershipLabel = project.architectureOwnershipLabel ?? '맡은 작업'

  return (
    <Slide eyebrow={title} title="아키텍처" dense>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 12, height: '100%' }}>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={asset(project.architectureImage)}
              alt={`${title} architecture`}
              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
            />
            {showOwnershipLabel && (
              <div
                style={{
                  position: 'absolute',
                  right: 10,
                  bottom: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  border: `2px solid ${blue}`,
                  borderRadius: 8,
                  background: 'rgba(255,255,255,0.94)',
                  color: blue,
                  padding: '5px 9px',
                  fontSize: 13.6,
                  fontWeight: 950,
                }}
              >
                <span style={{ width: 9, height: 9, border: `2px solid ${blue}`, display: 'inline-block' }} />
                {ownershipLabel}
              </div>
            )}
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateRows: `repeat(${project.architectureDetails?.length ?? 1}, minmax(0, 1fr))`, gap: 9, minHeight: 0 }}>
          {project.architectureDetails?.map((section, sectionIdx) => (
            <Panel key={section.title} pad={0} background="#f8fafc" accent={blue}>
              <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '44px 1fr', alignItems: 'stretch' }}>
                <div
                  style={{
                    height: '100%',
                    borderRight: `1px solid ${line}`,
                    display: 'grid',
                    placeItems: 'center',
                    color: blue,
                    fontSize: 18,
                    fontWeight: 950,
                  }}
                >
                  {String(sectionIdx + 1).padStart(2, '0')}
                </div>
                <div style={{ padding: '10px 12px', display: 'grid', alignContent: 'center' }}>
                  <h3 style={{ margin: '0 0 6px', color: blue, fontSize: 16.6, fontWeight: 950, lineHeight: 1.16, textTransform: 'uppercase', wordBreak: 'keep-all' }}>{section.title}</h3>
                  {section.description && <p style={{ margin: '0 0 6px', color: slate, fontSize: 13.7, lineHeight: 1.36, fontWeight: 760, wordBreak: 'keep-all' }}>{section.description}</p>}
                  {section.items.map((item, idx) => (
                    <ul key={idx} style={{ margin: 0, paddingLeft: showDetailMarkers ? 0 : 17, color: slate }}>
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          style={{
                            listStyle: showDetailMarkers ? 'none' : undefined,
                            display: showDetailMarkers ? 'grid' : undefined,
                            gridTemplateColumns: showDetailMarkers ? '7px 1fr' : undefined,
                            gap: showDetailMarkers ? 8 : undefined,
                            alignItems: showDetailMarkers ? 'start' : undefined,
                            fontSize: 14.6,
                            lineHeight: 1.36,
                            marginBottom: 5,
                            fontWeight: 760,
                            wordBreak: 'keep-all',
                          }}
                        >
                          {showDetailMarkers && (
                            <span style={{ width: 6, height: 6, borderRadius: 999, background: blue, marginTop: 7 }} />
                          )}
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function FeedShopDeveloperPerspectiveSlide() {
  const focusItems = [
    ['이벤트 목록 조회 병목 개선', '응답 지연으로 이벤트 탐색 중 사용자 이탈이 발생할 수 있는 위험을 줄이는 과제입니다.'],
    ['투표 동시성·정합성 보장', '중복 투표로 결과와 서비스에 대한 신뢰가 저하될 수 있는 위험을 막는 과제입니다.'],
  ]
  const riskItems = [
    ['01', '목록 응답 지연', 'N+1·메모리 필터링으로 탐색 중 이탈 위험', red, '#fef2f2', '#fecaca'],
    ['02', '중복 투표', '확인·저장 분리로 결과 신뢰 저하 위험', amber, '#fff7ed', '#fed7aa'],
    ['03', '핵심 과제', '조회 병목 개선·동시성 및 정합성 보장', blue, '#eff6ff', '#bfdbfe'],
  ] as const

  return (
    <Slide eyebrow="FeedShop" title={feedshop.developerPerspectiveTitle ?? '서비스 흐름에서 발견한 핵심 문제'} subtitle="재방문 흐름의 진입점에서 발견한 성능·정합성 위험" dense>
      <div style={{ display: 'grid', gridTemplateRows: '92mm 38mm', gap: 12, height: '100%', minHeight: 0, alignContent: 'start' }}>
        <Panel pad={17} background={white} accent={blue}>
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: 20, alignItems: 'center' }}>
            <div>
              <SectionLabel>Developer Perspective</SectionLabel>
              <ParagraphRich html={feedshop.developerPerspective ?? ''} size={18.4} lineHeight={1.5} />
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {riskItems.map(([no, title, desc, color, background, borderColor]) => (
                <div
                  key={title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '44px 1fr',
                    gap: 11,
                    alignItems: 'center',
                    padding: '11px 13px',
                    borderRadius: 12,
                    background,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: 'grid',
                      placeItems: 'center',
                      background: white,
                      color,
                      fontSize: 16.2,
                      fontWeight: 950,
                    }}
                  >
                    {no}
                  </div>
                  <div>
                    <div style={{ color, fontSize: 14.4, lineHeight: 1.15, fontWeight: 950 }}>{title}</div>
                    <div style={{ marginTop: 4, color: slate, fontSize: 13, lineHeight: 1.34, fontWeight: 800 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {focusItems.map(([title, desc], idx) => (
            <Panel key={title} pad={15} background={idx === 0 ? '#eff6ff' : '#fff7ed'} borderColor={idx === 0 ? '#bfdbfe' : '#fed7aa'} accent={idx === 0 ? blue : amber}>
              <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 13, alignItems: 'center', height: '100%' }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: white,
                    color: idx === 0 ? blue : amber,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 20,
                    fontWeight: 950,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px', color: navy, fontSize: 19.6, fontWeight: 950, lineHeight: 1.18 }}>{title}</h3>
                  <p style={{ margin: 0, color: slate, fontSize: 13.6, lineHeight: 1.4, fontWeight: 760 }}>{desc}</p>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function FeedShopP1ProblemSlide() {
  const metrics = [
    { label: '조회 쿼리', value: '42회', caption: '요청 1회 기준', tone: red },
    { label: '동시 1,000명', value: '6,818ms', caption: 'TPS 138.7', tone: red },
    { label: '동시 100명', value: '645ms', caption: 'TPS 154.6', tone: red },
  ]

  return (
    <Slide eyebrow="FeedShop" title={feedshop.problemSections![0].headline} subtitle="Problem · Scouter Evidence" dense>
      <div style={{ display: 'grid', height: '100%' }}>
        <Panel pad={13} background="#f8fafc" accent={red}>
          <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 11 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.08fr 0.92fr', gap: 12, alignItems: 'stretch' }}>
              <div style={{ display: 'grid', gap: 10 }}>
                <SectionLabel color={red}>Problem Cause</SectionLabel>
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    ['N+1 쿼리 발생', '이벤트 목록 조회 시 eventDetail, rewards 연관 데이터 로딩'],
                    ['메모리 필터링 구조', '전체 조회 후 필터링 → 데이터 증가 시 성능 저하 우려'],
                  ].map(([title, desc]) => (
                    <div key={title} style={{ display: 'grid', gridTemplateColumns: '9px 1fr', gap: 9, alignItems: 'start' }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: red, marginTop: 8 }} />
                      <div>
                        <div style={{ color: navy, fontSize: 15.2, fontWeight: 950, lineHeight: 1.22 }}>{title}</div>
                        <div style={{ color: slate, fontSize: 14.6, fontWeight: 720, lineHeight: 1.38, marginTop: 2 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid #fecaca`, paddingTop: 10 }}>
                  <SectionLabel color={red}>Measured Impact</SectionLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {metrics.map((metric) => (
                      <div
                        key={metric.label}
                        style={{
                          borderRadius: 12,
                          border: `1px solid ${metric.tone}30`,
                          background: white,
                          padding: '10px 10px',
                        }}
                      >
                        <div style={{ color: muted, fontSize: 12.5, fontWeight: 900, lineHeight: 1.2 }}>{metric.label}</div>
                        <div style={{ color: metric.tone, fontSize: 22.5, fontWeight: 950, lineHeight: 1.05, marginTop: 6 }}>{metric.value}</div>
                        <div style={{ color: slate, fontSize: 12.5, fontWeight: 800, marginTop: 5 }}>{metric.caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderRadius: 12,
                  background: '#fff7ed',
                  border: '1px solid #fed7aa',
                  padding: '13px 14px',
                  display: 'grid',
                  alignContent: 'center',
                  gap: 8,
                }}
              >
                <SectionLabel color={red}>Scouter Evidence</SectionLabel>
                <div style={{ color: navy, fontSize: 18, fontWeight: 950, lineHeight: 1.22 }}>
                  이벤트 목록 요청 1회당 조회 쿼리 42회 확인
                </div>
                <div style={{ color: '#9a3412', fontSize: 13.6, lineHeight: 1.45, fontWeight: 780 }}>
                  `/api/events/all` 요청마다 동일한 연관 데이터 조회가 반복되어 목록 조회 성능 병목으로 이어졌습니다.
                </div>
              </div>
            </div>
            <div style={{ minHeight: 0, display: 'grid' }}>
              <img
                src={asset('before-scouter-sql42.png')}
                alt="Scouter XLog 이벤트 목록 조회 쿼리 42회"
                style={{ width: '100%', height: '100%', maxHeight: '88mm', objectFit: 'contain', objectPosition: 'center', borderRadius: 10, border: `1px solid ${line}`, display: 'block', background: white }}
              />
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP1ThinkingSolutionSlide() {
  const alternatives = [
    ['findAll() + 메모리 필터링', '구현 단순', '데이터 증가 시 조회량·N+1 확대', '제외'],
    ['Redis 캐시만 적용', '반복 조회 감소', 'Cache Miss 시 N+1 유지', '제외'],
    ['QueryDSL fetchJoin', '조회 쿼리 42회 → 2회', '반복 조회마다 DB 접근', '부분 적용'],
    ['fetchJoin + Redis', '쿼리 개선 후 반복 조회 제거', '캐시 정합성 관리 필요', '최종 선택'],
  ]
  const cacheStrategies = [
    ['캐시 대상', '이벤트 목록', '조회 빈번 · 변경 적음'],
    ['캐시 방식', '@Cacheable + Redis', '분산 환경 캐시 유지'],
    ['정합성', 'TTL · @CacheEvict', '변경 시 캐시 무효화'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — Thinking" subtitle="쿼리 구조와 캐시 전략을 분리해 판단" dense>
      <div style={{ display: 'grid', gridTemplateRows: '1.05fr 0.95fr', gap: 10, height: '100%', minHeight: 0 }}>
        <Panel pad={11} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking 1 · 해결 순서</SectionLabel>
          <div style={{ color: slate, fontSize: 14.2, fontWeight: 760, lineHeight: 1.34, marginBottom: 7 }}>
            쿼리 비효율과 반복 조회 비용을 분리한 뒤 해결방안을 비교했습니다.
          </div>
          <div style={{ overflow: 'hidden', borderRadius: 10, border: `1px solid ${line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.24fr 1.1fr 1.48fr 0.74fr', background: '#f1f5f9', color: slate, fontSize: 12.4, fontWeight: 950 }}>
              {['검토안', '장점', '한계', '판단'].map((label) => <div key={label} style={{ padding: '6px 8px' }}>{label}</div>)}
            </div>
            {alternatives.map(([option, strength, limit, decision], idx) => (
              <div
                key={option}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.24fr 1.1fr 1.48fr 0.74fr',
                  borderTop: `1px solid ${idx === 3 ? '#bfdbfe' : line}`,
                  background: idx === 3 ? '#eff6ff' : white,
                  color: navy,
                  fontSize: 12.7,
                  lineHeight: 1.28,
                  fontWeight: 760,
                }}
              >
                <div style={{ padding: '6px 8px', fontWeight: 920, color: idx === 3 ? blue : navy }}>{option}</div>
                <div style={{ padding: '6px 8px', whiteSpace: strength.includes('→') ? 'nowrap' : undefined }}>{strength}</div>
                <div style={{ padding: '6px 8px' }}>{limit}</div>
                <div style={{ padding: '6px 8px', fontWeight: 950, color: idx === 3 ? blue : idx === 2 ? amber : red }}>{decision}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 7, borderRadius: 9, border: '1px solid #fed7aa', background: '#fff7ed', color: '#9a3412', padding: '7px 10px', fontSize: 13.8, lineHeight: 1.32, fontWeight: 850 }}>
            캐시로 문제를 가리기보다 쿼리 구조를 먼저 개선하고, 반복 조회 비용만 Redis로 분리했습니다.
          </div>
        </Panel>
        <Panel pad={11} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking 2 · 캐시 선택</SectionLabel>
          <div style={{ borderRadius: 10, border: '1px solid #fde68a', background: '#fffbeb', padding: '8px 11px', marginBottom: 8 }}>
            <div style={{ color: '#92400e', fontSize: 12.5, fontWeight: 950, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>분산 캐시로 Redis를 선택한 이유</div>
            <div style={{ color: '#78350f', fontSize: 12.8, lineHeight: 1.38, fontWeight: 760 }}>
              인메모리 캐시(ConcurrentMapCacheManager)는 GCP Cloud Run 수평 확장 시 인스턴스마다 캐시가 달라질 수 있었습니다. 외부 공유 캐시인 Redis를 선택해 동일한 캐시를 참조하도록 했습니다.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {cacheStrategies.map(([label, value, caption]) => (
              <div key={label} style={{ borderRadius: 12, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '9px 10px' }}>
                <div style={{ color: blue, fontSize: 12.3, fontWeight: 950, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                <div style={{ color: navy, fontSize: 14.4, fontWeight: 950, marginTop: 4, lineHeight: 1.18 }}>{value}</div>
                <div style={{ color: slate, fontSize: 12.7, fontWeight: 760, marginTop: 3, lineHeight: 1.28 }}>{caption}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP1SolutionResultSlide() {
  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — Solution 1단계 / 2단계" subtitle="쿼리 최적화 → Redis 캐시 전략 적용" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 10, height: '100%', minHeight: 0 }}>
        <Panel pad={12} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 12, height: '100%', minHeight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <SectionLabel>Solution 1</SectionLabel>
              <h3 style={{ margin: '0 0 7px', color: navy, fontSize: 19.5, fontWeight: 950, lineHeight: 1.18 }}>1단계 — 쿼리 최적화</h3>
              <div style={{ color: slate, fontSize: 14.1, lineHeight: 1.38, fontWeight: 780 }}>
                QueryDSL leftJoin + fetchJoin으로 eventDetail·rewards를 한 번에 조회해 <span style={{ color: blue, fontWeight: 950 }}>N+1을 제거</span>하고, 페이징 count 쿼리는 <span style={{ color: blue, fontWeight: 950 }}>countDistinct</span>로 분리해 집계 결과를 보정했습니다.
              </div>
              <div style={{ marginTop: 9, borderRadius: 11, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '9px 10px' }}>
                <div style={{ color: slate, fontSize: 12.7, fontWeight: 900 }}>Scouter 측정</div>
                <div style={{ color: blue, fontSize: 17, fontWeight: 950, marginTop: 3 }}>조회 쿼리 42 → 2회</div>
              </div>
              <a href="https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%AA%A9%EB%A1%9D-%EC%A1%B0%ED%9A%8C-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0" style={{ color: blue, fontSize: 12.4, fontWeight: 900, textDecoration: 'none', marginTop: 'auto' }}>
                구현 코드·실패 과정·커밋 근거 → Wiki
              </a>
            </div>
            <div style={{ minHeight: 0, display: 'grid', alignItems: 'center' }}>
              <img
                src={asset('phase1-scouter-sql2.png')}
                alt="fetchJoin SQL 2회"
                style={{ width: '100%', height: '100%', maxHeight: '66mm', objectFit: 'contain', objectPosition: 'center', borderRadius: 10, border: `1px solid ${line}`, display: 'block' }}
              />
            </div>
          </div>
        </Panel>
        <Panel pad={12} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.82fr 1.18fr', gap: 12, height: '100%', minHeight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <SectionLabel>Solution 2</SectionLabel>
              <h3 style={{ margin: '0 0 7px', color: navy, fontSize: 19.5, fontWeight: 950, lineHeight: 1.18 }}>2단계 — 캐시 전략 적용</h3>
              <div style={{ color: slate, fontSize: 14.1, lineHeight: 1.38, fontWeight: 780 }}>
                <span style={{ color: blue, fontWeight: 950 }}>@Cacheable</span>로 이벤트 목록을 캐싱하고, <span style={{ color: blue, fontWeight: 950 }}>TTL·@CacheEvict</span>로 변경 시점의 캐시를 무효화해 반복 조회 비용과 캐시 정합성을 함께 관리했습니다.
              </div>
              <div style={{ marginTop: 9, borderRadius: 11, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '9px 10px' }}>
                <div style={{ color: slate, fontSize: 12.7, fontWeight: 900 }}>Scouter 재요청 측정</div>
                <div style={{ color: blue, fontSize: 17, fontWeight: 950, marginTop: 3 }}>재요청 SQL Count 0회</div>
              </div>
              <a href="https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%AA%A9%EB%A1%9D-%EC%A1%B0%ED%9A%8C-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0" style={{ color: blue, fontSize: 12.4, fontWeight: 900, textDecoration: 'none', marginTop: 'auto' }}>
                @Cacheable·TTL·무효화 구현 상세 → Wiki
              </a>
            </div>
            <div style={{ minHeight: 0, display: 'grid', alignItems: 'center' }}>
              <img
                src={asset('phase2a-scouter-cache-hit2.png')}
                alt="Redis 캐시 적용 후 재요청 확인"
                style={{ width: '100%', height: '100%', maxHeight: '66mm', objectFit: 'contain', objectPosition: 'center', borderRadius: 10, border: `1px solid ${line}`, display: 'block' }}
              />
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP1ResultTableSlide() {
  const sec = feedshop.problemSections![0]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — 성능 개선 결과" subtitle="QueryDSL fetchJoin + Redis 캐시 적용 결과" dense>
      <div style={{ display: 'grid', gridTemplateRows: '1.08fr 0.92fr', gap: 11, height: '100%', minHeight: 0 }}>
        <Panel pad={13} background="#f8fafc" borderColor="#bbf7d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto', gap: 10, height: '100%', alignContent: 'center' }}>
            <SectionLabel color={green}>Result Summary · 동시 1,000명 기준</SectionLabel>
            <div style={{ display: 'grid', gap: 5, wordBreak: 'keep-all' }}>
              <div style={{ color: green, fontSize: 20.5, lineHeight: 1.18, fontWeight: 950 }}>
                응답시간 91% 단축 · TPS 216% 향상
              </div>
              <div style={{ color: slate, fontSize: 14.5, lineHeight: 1.35, fontWeight: 800 }}>
                fetchJoin으로 쿼리 구조를 개선한 뒤 Redis로 반복 조회 비용을 분리했습니다.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '0.66fr 1.34fr', alignItems: 'center', marginTop: 4, color: slate, fontSize: 16.5, lineHeight: 1.38, fontWeight: 850 }}>
                <div style={{ whiteSpace: 'nowrap' }}>
                  <strong style={{ color: green }}>TPS</strong> 138.7 → 438.3 (+216%)
                </div>
                <div style={{ borderLeft: '1px solid #bbf7d0', paddingLeft: 12 }}>
                  <strong style={{ color: green }}>사용자 효과</strong> 재방문 진입점의 응답 지연을 줄여 이벤트 탐색 중 사용자 이탈 방지
                </div>
              </div>
            </div>
            <div style={{ overflow: 'hidden', border: '1px solid #bbf7d0', borderRadius: 12, background: white, display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'stretch' }}>
              <div style={{ display: 'grid', alignContent: 'center', textAlign: 'center', padding: '11px 12px', background: '#fff7f7' }}>
                <div style={{ color: muted, fontSize: 12.8, fontWeight: 900 }}>Before</div>
                <div style={{ color: red, fontSize: 22, fontWeight: 950, lineHeight: 1.1, marginTop: 3 }}>6,818ms</div>
                <div style={{ color: slate, fontSize: 12.8, fontWeight: 850, marginTop: 5 }}>SQL 42회</div>
              </div>
              <div style={{ display: 'grid', placeItems: 'center', color: slate, fontSize: 20, fontWeight: 950, padding: '0 8px' }}>→</div>
              <div style={{ display: 'grid', alignContent: 'center', textAlign: 'center', padding: '11px 12px', background: '#fff7ed' }}>
                <div style={{ color: muted, fontSize: 12.8, fontWeight: 900 }}>fetchJoin 적용 후</div>
                <div style={{ color: amber, fontSize: 22, fontWeight: 950, lineHeight: 1.1, marginTop: 3 }}>4,191ms</div>
                <div style={{ color: amber, fontSize: 12.8, fontWeight: 900, marginTop: 5 }}>-39% · SQL 2회</div>
              </div>
              <div style={{ display: 'grid', placeItems: 'center', color: slate, fontSize: 20, fontWeight: 950, padding: '0 8px' }}>→</div>
              <div style={{ display: 'grid', alignContent: 'center', textAlign: 'center', padding: '11px 12px', background: '#ecfdf5' }}>
                <div style={{ color: muted, fontSize: 12.8, fontWeight: 900 }}>Redis 캐시 후</div>
                <div style={{ color: green, fontSize: 22, fontWeight: 950, lineHeight: 1.1, marginTop: 3 }}>638ms</div>
                <div style={{ color: green, fontSize: 12.8, fontWeight: 900, marginTop: 5 }}>91% · Cache Hit SQL 0회</div>
              </div>
            </div>
          </div>
        </Panel>
        <Panel pad={13} background="#f0fdf4" borderColor="#bbf7d0" accent={green}>
          <SectionLabel color={green}>Result Table · 동일 부하 조건 상세 비교</SectionLabel>
          <div style={{ marginTop: 8 }}>
            <Rich html={extractTable(sec.result)} size={14} lineHeight={1.4} className="pdf-table-fit" />
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP1ResultImagesSlide() {
  const comparisons = [
    {
      load: '동시 100명',
      before: 'before-ngrinder-v100.png',
      after: 'phase2a-ngrinder-v100.png',
      response: '645ms → 209ms',
      responseChange: '68% 단축',
      tps: '154.6 → 470.1',
      tpsChange: '+204%',
    },
    {
      load: '동시 1,000명',
      before: 'before-ngrinder-v1000.png',
      after: 'phase2a-ngrinder-v1000.png',
      response: '6,818ms → 638ms',
      responseChange: '91% 단축',
      tps: '138.7 → 438.3',
      tpsChange: '+216%',
    },
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — nGrinder 부하 테스트 결과" subtitle="Before / After 성능 수치 비교" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 7, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'center', border: '1px solid #a7f3d0', borderLeft: `4px solid ${green}`, borderRadius: 8, background: '#ecfdf5', padding: '7px 11px' }}>
          <div style={{ color: green, fontSize: 13.2, fontWeight: 950 }}>동일 부하 조건</div>
          <div style={{ color: slate, fontSize: 13.4, lineHeight: 1.3, fontWeight: 780 }}>
            Before / After의 응답시간과 TPS를 nGrinder 결과 화면으로 검증했습니다.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 8, minHeight: 0 }}>
          {comparisons.map((comparison) => (
            <Panel key={comparison.load} pad={8} background={white} accent={blue}>
              <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 6, height: '100%', minHeight: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, alignItems: 'center', color: slate, fontSize: 14.2, lineHeight: 1.25, fontWeight: 850 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, whiteSpace: 'nowrap' }}>
                    <strong style={{ color: red }}>Before</strong>
                    <strong style={{ color: navy }}>{comparison.load}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, minWidth: 0, whiteSpace: 'nowrap' }}>
                    <strong style={{ color: green }}>After</strong>
                    <span>
                      응답시간 <strong style={{ color: navy }}>{comparison.response}</strong>{' '}
                      <strong style={{ color: green }}>({comparison.responseChange})</strong>
                    </span>
                    <span>
                      TPS <strong style={{ color: navy }}>{comparison.tps}</strong>{' '}
                      <strong style={{ color: green }}>({comparison.tpsChange})</strong>
                    </span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, minHeight: 0 }}>
                  {[
                    ['Before', comparison.before],
                    ['After', comparison.after],
                  ].map(([label, src]) => (
                    <div key={src} style={{ minHeight: 0 }}>
                      <img
                        src={asset(src)}
                        alt={`nGrinder ${comparison.load} ${label}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          minHeight: 0,
                          objectFit: 'contain',
                          objectPosition: 'center',
                          borderRadius: 7,
                          border: `1px solid ${line}`,
                          display: 'block',
                          background: white,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function FeedShopP2ProblemThinkingSlide() {
  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — 피드 투표 동시성 문제" subtitle="Problem · Thinking" dense>
      <div style={{ display: 'grid', gridTemplateRows: '0.88fr 1.12fr', gap: 20, height: '100%', minHeight: 0 }}>
        <Panel pad={10} background={white} accent={red}>
          <SectionLabel color={red}>Problem</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto', gap: 8, alignContent: 'start' }}>
            <div style={{ color: slate, fontSize: 14.8, lineHeight: 1.4, fontWeight: 800 }}>
                중복 투표 방지 로직이 코드 레벨에만 존재하고, DB 유니크 제약이 없어 동시 요청 시
                <strong style={{ color: red, fontWeight: 950 }}> TOCTOU 취약점</strong>이 발생했습니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
                {[
                  ['원인', 'DB 제약 없음'],
                ['취약점', '중복 체크와 저장 사이 틈'],
                  ['결과', '중복 투표 삽입'],
                ].map(([label, value]) => (
                <div key={label} style={{ border: `1px solid #fecaca`, borderRadius: 10, background: '#fff7f7', padding: '9px 11px', display: 'grid', alignContent: 'center' }}>
                  <div style={{ color: red, fontSize: 12.8, fontWeight: 950, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: navy, fontSize: 15.6, fontWeight: 950, lineHeight: 1.18 }}>{value}</div>
                  </div>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 6, alignItems: 'start' }}>
              <div style={{ color: red, fontSize: 14.2, fontWeight: 950 }}>수정 전 경쟁 구간</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignContent: 'start' }}>
                <div style={{ border: `1px solid #fecaca`, borderRadius: 10, background: '#fff7f7', padding: '8px 11px' }}>
                  <div style={{ color: red, fontSize: 13.5, fontWeight: 950, marginBottom: 4 }}>① 중복 체크</div>
                  <div style={{ color: slate, fontSize: 13.8, lineHeight: 1.32, fontWeight: 780 }}>
                    <strong style={{ color: red }}>existsByEventIdAndUserId</strong> 통과 후 저장 전까지 경쟁 구간이 생김
                  </div>
                </div>
                <div style={{ border: `1px solid #fecaca`, borderRadius: 10, background: '#fff7f7', padding: '8px 11px' }}>
                  <div style={{ color: red, fontSize: 13.5, fontWeight: 950, marginBottom: 4 }}>② 투표 저장</div>
                  <div style={{ color: slate, fontSize: 13.8, lineHeight: 1.32, fontWeight: 780 }}>
                    두 요청이 동시에 통과하면 <strong style={{ color: red }}>save</strong>가 중복 실행될 수 있음
                  </div>
                </div>
              </div>
              <a href="https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki/%ED%94%BC%EB%93%9C-%ED%88%AC%ED%91%9C-%EB%8F%99%EC%8B%9C%EC%84%B1-%EA%B0%9C%EC%84%A0" style={{ color: blue, fontSize: 12.9, fontWeight: 900, textDecoration: 'none' }}>
                수정 전 코드·재현 근거 → Wiki
              </a>
            </div>
          </div>
        </Panel>
        <Panel pad={10} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 9 }}>
            <div style={{ overflow: 'hidden', borderRadius: 10, border: `1px solid ${line}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.28fr 1.12fr 1.48fr 0.78fr', background: '#f1f5f9', color: slate, fontSize: 13.2, fontWeight: 950 }}>
                {['검토안', '장점', '한계', '판단'].map((label) => <div key={label} style={{ padding: '8px 9px' }}>{label}</div>)}
              </div>
              {[
                ['코드 중복 검사', '구현 단순', '동시 요청이 검사를 함께 통과', '제외'],
                ['DB 내 저장·카운터 갱신', '트랜잭션 단일 처리', '락 교차로 데드락·처리량 저하', '제외'],
                ['DB 유니크 제약', '중복 물리 차단', '예외·카운터 락 별도 처리', '부분 적용'],
                ['제약 + NOT_SUPPORTED + INCR', '중복·예외·카운터 분리', 'DB·Redis 정합성 검증 필요', '최종 선택'],
              ].map(([option, strength, limit, decision], idx) => (
                <div key={option} style={{ display: 'grid', gridTemplateColumns: '1.28fr 1.12fr 1.48fr 0.78fr', borderTop: `1px solid ${idx === 3 ? '#bfdbfe' : line}`, background: idx === 3 ? '#eff6ff' : white, color: navy, fontSize: 13.1, lineHeight: 1.3, fontWeight: 780 }}>
                  <div style={{ padding: '8px 9px', fontWeight: 920, color: idx === 3 ? blue : navy }}>{option}</div>
                  <div style={{ padding: '8px 9px' }}>{strength}</div>
                  <div style={{ padding: '8px 9px' }}>{limit}</div>
                  <div style={{ padding: '8px 9px', fontWeight: 950, color: idx === 3 ? blue : idx === 2 ? amber : red }}>{decision}</div>
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid #fdba74`, background: '#fffbeb', borderRadius: 10, padding: '10px 12px', color: '#9a3412', fontSize: 14.2, lineHeight: 1.34, fontWeight: 900 }}>
              중복 차단은 DB 제약으로 보장하고, 빈번한 카운터 갱신은 Redis 원자 연산으로 분리해 락 경합을 제거했습니다.
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP2SolutionSlide() {
  const transactionOptions = [
    ['제외', 'REQUIRES_NEW', '내부 rollback이 외부 Hibernate Session을 오염시켜 포인트 지급 등 정상 작업까지 실패'],
    ['제외', 'noRollbackFor', 'JPA flush 이전에 세션 오염이 먼저 발생해 예외 전파를 막지 못함'],
    ['최종 선택', 'NOT_SUPPORTED', '저장·포인트·활동 기록을 독립 트랜잭션으로 분리해 예외 전파 차단'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — Solution" subtitle="DB 유니크 제약 · 예외 처리 · Redis INCR" dense>
      <div style={{ display: 'grid', gridTemplateRows: '0.56fr 1.12fr 1.12fr', gap: 9, height: '100%', minHeight: 0 }}>
        <Panel pad={9} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.72fr 1.28fr', gap: 15, alignItems: 'center', height: '100%' }}>
            <div>
              <SectionLabel>Solution 1</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 18, lineHeight: 1.18, fontWeight: 950 }}>1단계 — DB 유니크 제약</h2>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={{ color: slate, fontSize: 14.3, lineHeight: 1.34, fontWeight: 800 }}>
                <strong style={{ color: navy }}>(event_id, voter_id)</strong> 조합을 유니크 키로 지정해 동시 요청의 중복 저장을 DB에서 차단했습니다.
              </div>
              <div style={{ borderRadius: 9, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '7px 10px', color: navy, fontSize: 13.8, lineHeight: 1.28, fontWeight: 850 }}>
                중복 INSERT를 막는 <strong style={{ color: blue }}>최종 방어선</strong>
              </div>
            </div>
          </div>
        </Panel>
        <Panel pad={9} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 6, height: '100%', minHeight: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.72fr 1.28fr', gap: 15, alignItems: 'end' }}>
              <div>
                <SectionLabel>Solution 2</SectionLabel>
                <h2 style={{ margin: 0, color: navy, fontSize: 18, lineHeight: 1.18, fontWeight: 950 }}>2단계 — 저장·예외 분리</h2>
              </div>
              <div style={{ color: slate, fontSize: 13.8, lineHeight: 1.32, fontWeight: 800 }}>
                유니크 제약 위반은 <strong>DataIntegrityViolationException</strong>으로 감지하고 중복 응답으로 변환했습니다.
              </div>
            </div>
            <div style={{ overflow: 'hidden', borderRadius: 9, border: `1px solid ${line}`, display: 'grid', gridTemplateRows: 'repeat(3, minmax(0, 1fr))', minHeight: 0 }}>
              {transactionOptions.map(([decision, option, reason], idx) => (
                <div key={option} style={{ display: 'grid', gridTemplateColumns: '0.5fr 0.9fr 2.6fr', gap: 8, alignItems: 'center', borderTop: idx === 0 ? 'none' : `1px solid ${idx === 2 ? '#bfdbfe' : line}`, background: idx === 2 ? '#eff6ff' : '#fffbeb', padding: '6px 9px', color: navy, fontSize: 13.1, lineHeight: 1.26, fontWeight: 780 }}>
                  <div style={{ color: idx === 2 ? blue : red, fontWeight: 950 }}>{decision}</div>
                  <div style={{ color: idx === 2 ? blue : '#92400e', fontWeight: 950 }}>{option}</div>
                  <div>{reason}</div>
                  </div>
              ))}
            </div>
            <div style={{ borderRadius: 9, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '7px 10px', color: navy, fontSize: 13.3, lineHeight: 1.3, fontWeight: 850 }}>
              저장·flush는 REQUIRED에서 끝내고, NOT_SUPPORTED 흐름에서 지정된 유니크 제약 위반만 중복 응답으로 변환
            </div>
          </div>
        </Panel>
        <Panel pad={9} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 6, height: '100%', minHeight: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.72fr 1.28fr', gap: 15, alignItems: 'end' }}>
              <div>
                <SectionLabel>Solution 3</SectionLabel>
                <h2 style={{ margin: 0, color: navy, fontSize: 18, lineHeight: 1.18, fontWeight: 950 }}>3단계 — Redis INCR</h2>
              </div>
              <div style={{ color: slate, fontSize: 13.8, lineHeight: 1.32, fontWeight: 800 }}>
                투표 카운터 갱신을 Redis 원자 연산으로 분리해 DB 락 경합을 제거했습니다.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8, minHeight: 0 }}>
              <div style={{ borderRadius: 9, border: '1px solid #fed7aa', background: '#fff7ed', padding: '8px 10px', display: 'grid', alignContent: 'center' }}>
                <div style={{ color: '#c2410c', fontSize: 12.8, fontWeight: 950, marginBottom: 4 }}>기존 DB 카운터</div>
                <div style={{ color: '#7c2d12', fontSize: 13.2, lineHeight: 1.3, fontWeight: 780 }}>
                  INSERT의 S-lock과 UPDATE의 X-lock이 교차해 서로를 기다리는 데드락 발생
                </div>
              </div>
              <div style={{ borderRadius: 9, border: '1px solid #a7f3d0', background: '#ecfdf5', padding: '8px 10px', display: 'grid', alignContent: 'center' }}>
                <div style={{ color: green, fontSize: 12.8, fontWeight: 950, marginBottom: 4 }}>Redis INCR</div>
                <div style={{ color: '#065f46', fontSize: 13.2, lineHeight: 1.3, fontWeight: 780 }}>
                  DB 잠금 체계 밖에서 단일 명령으로 카운터를 갱신해 카운터 락 경합 제거
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 8 }}>
              <div style={{ borderRadius: 9, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '7px 10px', color: navy, fontSize: 13.1, lineHeight: 1.3, fontWeight: 820 }}>
                복구: Redis 키 유실·장애 시 feed_votes COUNT를 원본으로 재동기화
              </div>
              <div style={{ borderRadius: 9, border: '1px solid #fed7aa', background: '#fff7ed', padding: '7px 10px', color: '#9a3412', fontSize: 13.1, lineHeight: 1.3, fontWeight: 820 }}>
                한계: 장애 구간의 실시간 강한 정합성·리워드 재처리는 보장 범위 밖
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP2ResultSlide() {
  const resultImages = [
    ['정합성 검증', 'phase2b-redis-count-verify.png', 'DB count 3 = Redis count 3 · 투표 수 정합성 확인'],
    ['nGrinder · 동시 500명', 'vuser500_result.png', 'TPS 588.1 · 평균 응답 833ms · 성공 68,548건 · 오류 0건'],
    ['nGrinder · 동시 1,000명', 'vuser1000_result.png', 'TPS 437.0 · 평균 응답 2.19초 · 성공 48,231건 · 오류 0건'],
    ['nGrinder · 동시 3,000명', 'vuser3000_result.png', 'TPS 551.1 · 평균 응답 5.00초 · 성공 63,026건 · 오류 0건 · 다음 응답속도 최적화 기준 확인'],
  ]
  const kpis = [
    ['오류율', '0%'],
    ['중복 투표', '0건'],
    ['count 정합성', 'DB = Redis'],
    ['검증 구간', '500→3,000명'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — Result" subtitle="정합성 검증 · nGrinder 부하 테스트" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 8, height: '100%' }}>
        <Panel pad={10} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.55fr repeat(4, 0.82fr)', gap: 8, alignItems: 'center' }}>
            <div style={{ color: slate, fontSize: 14.2, lineHeight: 1.38, fontWeight: 830, wordBreak: 'keep-all' }}>
              동시 500→3,000명 부하 테스트에서 <strong style={{ color: green }}>오류·중복 투표 0건</strong>을 확인하고,
              <strong style={{ color: blue }}> DB count와 Redis count 일치</strong>로 투표 수 정합성을 검증했습니다.
            </div>
            {kpis.map(([label, value]) => (
              <div key={label} style={{ textAlign: 'center', borderLeft: `1px solid #bbf7d0`, minHeight: 54, display: 'grid', alignContent: 'center' }}>
                <div style={{ color: green, fontSize: 17.8, fontWeight: 950, lineHeight: 1.08, whiteSpace: 'nowrap' }}>{value}</div>
                <div style={{ color: '#065f46', fontSize: 12.8, fontWeight: 850, marginTop: 5 }}>{label}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={8} background={white} accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, height: '100%' }}>
            {resultImages.map(([label, src, caption]) => (
              <div key={src} style={{ minHeight: 0, display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 5 }}>
                <div style={{ display: 'grid', alignContent: 'start', gap: 2, height: 52, fontSize: 13.2, lineHeight: 1.22 }}>
                  <div style={{ color: navy, fontWeight: 950 }}>{label}</div>
                  <div style={{ color: slate, fontWeight: 760 }}>{caption}</div>
                </div>
                <img
                  src={asset(src)}
                  alt={label}
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: 0,
                    objectFit: 'contain',
                    objectPosition: 'center',
                    borderRadius: 8,
                    border: `1px solid ${line}`,
                    display: 'block',
                    background: white,
                  }}
                />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function ProjectReflectionSlide({
  eyebrow,
  subtitle,
  reflection,
  evidence,
  highlights,
  panelMinHeight,
}: {
  eyebrow: string
  subtitle: string
  reflection: NonNullable<typeof feedshop.projectReflection>
  evidence: string
  highlights: ReflectionHighlight[]
  panelMinHeight?: number
}) {
  return (
    <Slide eyebrow={eyebrow} title="프로젝트 회고" subtitle={subtitle} dense>
      <div style={{ display: 'grid', alignContent: 'center', height: '100%' }}>
        <div style={{ display: 'grid', minHeight: panelMinHeight }}>
          <Panel pad={22} background={white} borderColor="#bfdbfe" accent={blue}>
          <div style={{ display: 'grid', alignContent: panelMinHeight ? 'space-between' : undefined, gap: 14, height: panelMinHeight ? '100%' : undefined }}>
            <div>
              <SectionLabel>Retrospective</SectionLabel>
              <div style={{ color: navy, fontSize: 24.2, lineHeight: 1.16, fontWeight: 950, marginBottom: 13 }}>{reflection.title}</div>
              <Rich html={reflection.body} size={17.2} lineHeight={1.56} />
              <div style={{ marginTop: 13, color: muted, fontSize: 12.2, fontWeight: 760 }}>
                근거:{' '}
                <a href={reflection.sourceUrl} style={{ color: blue, fontWeight: 900, textDecoration: 'none' }}>
                  {evidence}
                </a>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {highlights.map((item) => (
              <div
                key={item.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: 10,
                  alignItems: 'center',
                  minHeight: 78,
                  padding: '12px 13px',
                  borderRadius: 12,
                  background: item.background,
                  border: `1px solid ${item.borderColor}`,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    display: 'grid',
                    placeItems: 'center',
                    background: white,
                    color: item.color,
                    fontSize: 14.8,
                    fontWeight: 950,
                  }}
                >
                  {item.no}
                </div>
                <div>
                  <div style={{ color: item.color, fontSize: 13.5, lineHeight: 1.18, fontWeight: 950 }}>{item.title}</div>
                  <div style={{ marginTop: 4, color: slate, fontSize: 12.8, lineHeight: 1.35, fontWeight: 760 }}>{item.desc}</div>
                </div>
              </div>
            ))}
            </div>
          </div>
          </Panel>
        </div>
      </div>
    </Slide>
  )
}

function FeedShopReflectionSlide() {
  const reflection = feedshop.projectReflection
  if (!reflection) return null
  return (
    <ProjectReflectionSlide
      eyebrow="FeedShop"
      subtitle="두 핵심 흐름을 개선하며 얻은 판단 기준"
      reflection={reflection}
      evidence="FeedShop Wiki 성능 개선 작업 · 이벤트 조회 성능 및 피드 투표 동시성"
      panelMinHeight={426}
      highlights={[
        {
          no: '01',
          title: '조회 원칙',
          desc: '쿼리 구조 개선 후 캐시 적용',
          color: blue,
          background: '#eff6ff',
          borderColor: '#bfdbfe',
        },
        {
          no: '02',
          title: '정합성 경계',
          desc: 'DB 유니크 제약으로 중복 차단',
          color: amber,
          background: '#fff7ed',
          borderColor: '#fed7aa',
        },
        {
          no: '03',
          title: '복구 기준',
          desc: 'DB 이력을 원본으로 Redis 보정',
          color: red,
          background: '#fef2f2',
          borderColor: '#fecaca',
        },
      ]}
    />
  )
}

function M3ReflectionSlide() {
  const reflection = m3.projectReflection
  if (!reflection) return null
  return (
    <ProjectReflectionSlide
      eyebrow="3M"
      subtitle="허브 관리자 권한 흐름을 끝까지 검증한 과정"
      reflection={reflection}
      evidence="3M Wiki · Auth/User/Gateway 통합 테스트 결과 보고서"
      panelMinHeight={426}
      highlights={[
        {
          no: '01',
          title: '책임 경계',
          desc: 'Auth·User 변경 이유 분리',
          color: blue,
          background: '#eff6ff',
          borderColor: '#bfdbfe',
        },
        {
          no: '02',
          title: '인증 경로',
          desc: 'Gateway 중심 권한 판단',
          color: violet,
          background: '#f5f3ff',
          borderColor: '#ddd6fe',
        },
        {
          no: '03',
          title: '검증 기준',
          desc: '권한 응답 일관성 확인',
          color: green,
          background: '#ecfdf5',
          borderColor: '#bbf7d0',
        },
      ]}
    />
  )
}

function M3DeveloperPerspectiveSlide() {
  const focusItems = [
    ['Auth·User 책임 분리', '인증 정책 변경이 User 모듈 배포까지 확산되는 높은 결합도를 낮추는 과제입니다.'],
    ['Gateway 중심 인증 흐름', '매 요청 User 조회의 호출 증가와 장애 전파 위험을 줄이는 과제입니다.'],
  ]
  const riskItems = [
    ['01', '권한 판단 오류', '역할별 권한 차이로 물류 전체에 영향', red, '#fef2f2', '#fecaca'],
    ['02', '높은 결합도', '인증 정책 변경이 User 배포까지 확산', amber, '#fff7ed', '#fed7aa'],
    ['03', '장애 전파', '매 요청 User 조회로 호출 증가·장애 확산', blue, '#eff6ff', '#bfdbfe'],
  ] as const

  return (
    <Slide eyebrow="3M" title={m3.developerPerspectiveTitle ?? '서비스 흐름에서 발견한 핵심 문제'} subtitle="역할별 권한과 서비스 경계에서 발견한 결합도·장애 전파 위험" dense>
      <div style={{ display: 'grid', gridTemplateRows: '92mm 38mm', gap: 12, height: '100%', minHeight: 0, alignContent: 'start' }}>
        <Panel pad={17} background={white} accent={blue}>
          <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1.18fr 0.82fr', gap: 20, alignItems: 'center' }}>
            <div>
              <SectionLabel>Developer Perspective</SectionLabel>
              <ParagraphRich html={m3.developerPerspective ?? ''} size={17.8} lineHeight={1.48} />
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {riskItems.map(([no, title, desc, color, background, borderColor]) => (
                <div
                  key={title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '44px 1fr',
                    gap: 11,
                    alignItems: 'center',
                    padding: '11px 13px',
                    borderRadius: 12,
                    background,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      display: 'grid',
                      placeItems: 'center',
                      background: white,
                      color,
                      fontSize: 16.2,
                      fontWeight: 950,
                    }}
                  >
                    {no}
                  </div>
                  <div>
                    <div style={{ color, fontSize: 14.4, lineHeight: 1.15, fontWeight: 950 }}>{title}</div>
                    <div style={{ marginTop: 4, color: slate, fontSize: 13, lineHeight: 1.34, fontWeight: 800 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {focusItems.map(([title, desc], idx) => (
            <Panel key={title} pad={15} background={idx === 0 ? '#eff6ff' : '#f5f3ff'} borderColor={idx === 0 ? '#bfdbfe' : '#ddd6fe'} accent={idx === 0 ? blue : violet}>
              <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 13, alignItems: 'center', height: '100%' }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: white,
                    color: idx === 0 ? blue : violet,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 20,
                    fontWeight: 950,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px', color: navy, fontSize: 19.6, fontWeight: 950, lineHeight: 1.18 }}>{title}</h3>
                  <p style={{ margin: 0, color: slate, fontSize: 13.6, lineHeight: 1.4, fontWeight: 760 }}>{desc}</p>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function M3ProblemSlide() {
  const causes = [
    {
      no: '01',
      title: 'Auth·User 책임 혼재',
      desc: '인증 정책과 사용자 정보 변경이 같은 모듈에 묶여 있었습니다.',
      flow: '인증 정책 변경 → User 동반 배포',
    },
    {
      no: '02',
      title: '요청마다 User 재조회',
      desc: '최신 권한은 반영할 수 있지만 모든 요청이 User 상태에 의존했습니다.',
      flow: '요청 증가 → 서비스 호출 증가 → 장애 전파 위험',
    },
  ]

  return (
    <Slide eyebrow="3M" title="문제 해결 — 인증 구조와 서비스 경계" subtitle="Problem · 변경 영향과 장애 전파 위험" dense>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 39mm', gap: 12, height: '100%', minHeight: 0 }}>
        <Panel pad={18} background={white} accent={red}>
          <SectionLabel color={red}>Problem Cause</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 15, height: '100%' }}>
            <div style={{ color: slate, fontSize: 17.2, lineHeight: 1.48, fontWeight: 780 }}>
              역할별 권한이 다른 물류 흐름에서 인증 경계가 섞이거나 권한 조회가 한 서비스에 집중되면,
              <strong style={{ color: red }}> 배포 영향과 장애 전파 범위가 함께 커질 수 있었습니다.</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {causes.map((item) => (
                <div key={item.no} style={{ border: '1px solid #fecaca', borderRadius: 12, background: '#fff7f7', padding: '17px 18px', display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 11 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center', color: red, background: white, fontSize: 16.4, fontWeight: 950 }}>{item.no}</div>
                    <div style={{ color: red, fontSize: 18.2, fontWeight: 950 }}>{item.title}</div>
                  </div>
                  <div style={{ color: slate, fontSize: 15.1, lineHeight: 1.45, fontWeight: 780 }}>{item.desc}</div>
                  <div style={{ alignSelf: 'end', border: '1px solid #fecaca', borderRadius: 10, background: white, padding: '12px 13px', color: navy, fontSize: 14.1, lineHeight: 1.35, fontWeight: 900 }}>
                    {item.flow}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                ['배포 영향', '인증 변경이 User 배포까지 확산'],
                ['호출 의존', '일반 요청도 User 상태에 의존'],
                ['권한 위험', '판단 오류가 주문·배송 흐름에 영향'],
              ].map(([title, desc]) => (
                <div key={title} style={{ border: `1px solid ${line}`, borderRadius: 11, background: soft, padding: '12px 13px' }}>
                  <div style={{ color: red, fontSize: 13.3, fontWeight: 950, marginBottom: 5 }}>{title}</div>
                  <div style={{ color: slate, fontSize: 13.5, lineHeight: 1.35, fontWeight: 800 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            ['01', '서비스 경계', 'Auth·User의 변경 이유와 배포 범위를 분리', blue, '#eff6ff', '#bfdbfe'],
            ['02', '인증 컨텍스트', 'Gateway에서 일반 권한 판단 후 필요한 정보만 전달', violet, '#f5f3ff', '#ddd6fe'],
          ].map(([no, title, desc, color, background, borderColor]) => (
            <Panel key={title} pad={15} background={background} borderColor={borderColor} accent={color}>
              <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 13, alignItems: 'center', height: '100%' }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: white, color, display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 950 }}>{no}</div>
                <div>
                  <div style={{ color: navy, fontSize: 18.2, lineHeight: 1.18, fontWeight: 950 }}>{title}</div>
                  <div style={{ marginTop: 5, color: slate, fontSize: 13.7, lineHeight: 1.38, fontWeight: 780 }}>{desc}</div>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </Slide>
  )
}

function M3ThinkingSlide() {
  const groups = [
    {
      label: 'Thinking 1 · 서비스 경계',
      intro: '인증 정책과 사용자 정보의 변경 이유를 기준으로 서비스 경계를 비교했습니다.',
      rows: [
        ['책임 혼재', '구현·공유가 단순함', '정책 변경이 User 배포까지 확산', '제외'],
        ['Auth/User 분리', '변경·배포 경계 분리', '서비스 간 계약 관리 필요', '최종 선택'],
      ],
      conclusion: 'Auth는 로그인·토큰 발급, User는 사용자 정보·권한 관리로 변경 이유를 분리했습니다.',
    },
    {
      label: 'Thinking 2 · 인증 컨텍스트 전달',
      intro: '최신 권한 반영과 호출·장애 전파 범위를 함께 비교했습니다.',
      rows: [
        ['요청별 User 재조회', '최신 role 즉시 반영', '호출 증가·User 장애 전파', '제외'],
        ['Gateway 로컬 캐시', 'User 호출 감소', '캐시 불일치·무효화 관리', '제외'],
        ['JWT userId·role', 'Gateway에서 일반 권한 판단', '클레임·헤더 계약 관리 필요', '최종 선택'],
      ],
      conclusion: '일반 권한은 Gateway의 JWT 컨텍스트로 판단하고, 상세 정보가 필요한 경우에만 User를 조회했습니다.',
    },
  ]

  return (
    <Slide eyebrow="3M" title="문제 해결 — Thinking" subtitle="서비스 경계와 인증 컨텍스트 전달 방식을 분리해 판단" dense>
      <div style={{ display: 'grid', gridTemplateRows: '0.9fr 1.1fr', gap: 12, height: '100%', minHeight: 0 }}>
        {groups.map((group) => (
          <Panel key={group.label} pad={14} background={white} accent={amber}>
            <SectionLabel color={amber}>{group.label}</SectionLabel>
            <div style={{ color: slate, fontSize: 14.6, lineHeight: 1.38, fontWeight: 800, marginBottom: 9 }}>{group.intro}</div>
            <div style={{ overflow: 'hidden', borderRadius: 11, border: `1px solid ${line}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.15fr 1.5fr 0.72fr', background: '#f1f5f9', color: slate, fontSize: 12.8, fontWeight: 950 }}>
                {['검토안', '장점', '검토 사항', '판단'].map((label) => <div key={label} style={{ padding: '8px 10px' }}>{label}</div>)}
              </div>
              {group.rows.map(([option, strength, consideration, decision]) => {
                const selected = decision === '최종 선택'
                return (
                  <div key={option} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.15fr 1.5fr 0.72fr', borderTop: `1px solid ${selected ? '#bfdbfe' : line}`, background: selected ? '#eff6ff' : white, color: navy, fontSize: 13.2, lineHeight: 1.35, fontWeight: 780 }}>
                    <div style={{ padding: '9px 10px', fontWeight: 930, color: selected ? blue : navy }}>{option}</div>
                    <div style={{ padding: '9px 10px' }}>{strength}</div>
                    <div style={{ padding: '9px 10px' }}>{consideration}</div>
                    <div style={{ padding: '9px 10px', fontWeight: 950, color: selected ? blue : red }}>{decision}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: 9, border: '1px solid #fed7aa', borderRadius: 10, background: '#fff7ed', padding: '10px 12px', color: '#9a3412', fontSize: 13.5, lineHeight: 1.38, fontWeight: 880 }}>
              {group.conclusion}
            </div>
          </Panel>
        ))}
      </div>
    </Slide>
  )
}

function M3SolutionSlide() {
  const boundaryPrinciples = [
    ['책임 분리', 'Auth는 인증, User는 사용자 정보·권한 관리'],
    ['정보 최소화', 'AuthUser에는 JWT 발급에 필요한 정보만 보관'],
    ['단방향 통신', 'Auth → User Feign DTO 계약으로 역방향 참조 차단'],
  ]
  const authFlows = [
    {
      label: '개선 전',
      title: '요청마다 User 조회',
      tone: red,
      border: '#fecaca',
      background: '#fff7f7',
      steps: [
        ['Client', 'JWT 포함 요청'],
        ['Service', '사용자 정보 요청'],
        ['User', 'role·정보 반환'],
        ['Service', '권한 판단'],
      ],
      note: '매 요청마다 서비스 간 호출이 발생해 호출량이 늘고, User 장애가 권한 흐름으로 전파될 수 있었습니다.',
    },
    {
      label: '개선 후',
      title: 'Gateway 중심 인증 흐름',
      tone: blue,
      border: '#bfdbfe',
      background: '#eff6ff',
      steps: [
        ['Client', 'JWT 포함 요청'],
        ['Gateway', 'JWT 검증'],
        ['X-User-*', 'userId·role 전달'],
        ['Service', 'AOP 권한 처리'],
      ],
      note: '일반 요청은 전달된 컨텍스트로 처리하고, 상세 사용자 정보가 필요할 때만 User 서비스를 호출하도록 분리했습니다.',
    },
  ]
  const authPrinciples = [
    ['검증 책임', 'Gateway 인증 필터에서 JWT 검증'],
    ['컨텍스트 계약', 'X-User-* 헤더로 userId·role 전달'],
    ['권한·예외 처리', 'AOP로 역할을 확인하고 상세 정보만 User 조회'],
  ]

  return (
    <>
    <Slide eyebrow="3M" title="문제 해결 — Solution 1단계" subtitle="Auth/User 서비스 경계 분리" dense>
      <div style={{ height: '100%', minHeight: 0, display: 'grid' }}>
        <Panel pad={13} background={white} accent={blue}>
          <SectionLabel>Solution 1</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 12, height: 'calc(100% - 26px)', minHeight: 0 }}>
            <div>
              <div style={{ color: navy, fontSize: 22, fontWeight: 950, lineHeight: 1.15, marginBottom: 7 }}>
                1단계 — Auth/User 서비스 경계 분리
              </div>
              <div style={{ color: slate, fontSize: 15.8, lineHeight: 1.42, fontWeight: 780, wordBreak: 'keep-all' }}>
                인증 정책과 사용자 정보가 같은 책임에 섞인 구조를 분리해, 서로 다른 변경 이유가 배포와 장애 영향으로 이어지는 범위를 줄였습니다.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 12, minHeight: 0 }}>
              {[
                {
                  label: '개선 전',
                  title: 'Auth/User 책임 혼재',
                  src: '3m-auth-user-before-class-diagram.png',
                  caption: '인증 처리와 사용자 정보 조회가 같은 서비스 책임에 섞여 변경 영향이 커질 수 있음',
                  tone: red,
                  bg: '#fff7f7',
                  border: '#fecaca',
                },
                {
                  label: '개선 후',
                  title: 'Auth/User 서비스 경계 분리',
                  src: '3m-auth-user-after-class-diagram-final.png',
                  caption: 'Auth는 인증 최소 정보만 보관하고, User와는 Feign 기반 단방향 통신으로 분리',
                  tone: blue,
                  bg: '#eff6ff',
                  border: '#bfdbfe',
                },
              ].map((item) => (
                <div key={item.label} style={{ minHeight: 0, overflow: 'hidden', border: `1px solid ${item.border}`, borderRadius: 12, background: item.bg, padding: '10px 11px', display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ color: item.tone, fontSize: 13.8, fontWeight: 950, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</div>
                    <div style={{ color: navy, fontSize: 14.2, fontWeight: 950, lineHeight: 1.15 }}>{item.title}</div>
                  </div>
                  <div style={{ minHeight: 0, border: `1px solid ${line}`, borderRadius: 9, background: white, padding: 6, display: 'grid', placeItems: 'center' }}>
                    <img
                      src={asset(item.src)}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', maxHeight: '118mm', objectFit: 'contain', display: 'block' }}
                    />
                  </div>
                  <div style={{ color: slate, fontSize: 12.6, lineHeight: 1.32, fontWeight: 760, wordBreak: 'keep-all' }}>{item.caption}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
              {boundaryPrinciples.map(([label, text]) => (
                <div key={label} style={{ borderRadius: 10, border: '1px solid #bfdbfe', background: '#f8fbff', padding: '10px 12px' }}>
                  <div style={{ color: blue, fontSize: 12.7, fontWeight: 950, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: navy, fontSize: 13.2, lineHeight: 1.34, fontWeight: 820, wordBreak: 'keep-all' }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
    <Slide eyebrow="3M" title="문제 해결 — Solution 2단계" subtitle="Gateway JWT 검증 → 사용자 컨텍스트 전달 → 서비스 권한 처리" dense>
      <div style={{ height: '100%', minHeight: 0, display: 'grid' }}>
        <Panel pad={13} background={white} accent={blue}>
          <SectionLabel>Solution 2</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 12, height: 'calc(100% - 26px)', minHeight: 0 }}>
            <div>
              <div style={{ color: navy, fontSize: 22, fontWeight: 950, lineHeight: 1.15, marginBottom: 7 }}>
                2단계 — 인증 흐름 단순화
              </div>
              <div style={{ color: slate, fontSize: 15.8, lineHeight: 1.42, fontWeight: 780, wordBreak: 'keep-all' }}>
                요청마다 User를 조회하던 흐름을 Gateway의 JWT 검증과 <strong>X-User-*</strong> 컨텍스트 전달로 바꿔, 일반 권한 처리와 상세 정보 조회를 분리했습니다.
              </div>
            </div>
            <div style={{ minHeight: 0, display: 'grid', gridTemplateRows: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
              {authFlows.map((flow) => (
                <div key={flow.label} style={{ minHeight: 0, border: `1px solid ${flow.border}`, borderRadius: 12, background: flow.background, padding: '11px 13px', display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 9 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ color: flow.tone, fontSize: 13.8, fontWeight: 950, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{flow.label}</div>
                    <div style={{ color: navy, fontSize: 14.2, fontWeight: 950 }}>{flow.title}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', alignItems: 'center', gap: 8, minHeight: 0 }}>
                    {flow.steps.map(([title, desc], idx) => (
                      <React.Fragment key={`${flow.label}-${title}`}>
                        <div style={{ height: '100%', minHeight: 76, border: `1px solid ${idx === 1 && flow.label === '개선 후' ? blue : line}`, background: idx === 1 && flow.label === '개선 후' ? '#dbeafe' : white, borderRadius: 11, padding: '10px 9px', display: 'grid', alignContent: 'center', textAlign: 'center' }}>
                          <div style={{ color: idx === 1 && flow.label === '개선 후' ? blue : navy, fontSize: 15.2, fontWeight: 950, lineHeight: 1.12, marginBottom: 6 }}>{title}</div>
                          <div style={{ color: slate, fontSize: 12.9, lineHeight: 1.3, fontWeight: 780, wordBreak: 'keep-all' }}>{desc}</div>
                        </div>
                        {idx < flow.steps.length - 1 ? (
                          <div style={{ color: flow.tone, fontSize: 23, fontWeight: 950 }}>→</div>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                  <div style={{ color: flow.label === '개선 전' ? '#991b1b' : '#1e3a8a', fontSize: 12.8, lineHeight: 1.34, fontWeight: 800, wordBreak: 'keep-all' }}>{flow.note}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
              {authPrinciples.map(([label, text]) => (
                <div key={label} style={{ borderRadius: 10, border: '1px solid #bfdbfe', background: '#f8fbff', padding: '10px 12px' }}>
                  <div style={{ color: blue, fontSize: 12.7, fontWeight: 950, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: navy, fontSize: 13.2, lineHeight: 1.34, fontWeight: 820, wordBreak: 'keep-all' }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
    </>
  )
}
function M3ResultSlide() {
  const verificationRows = [
    ['01', '서비스 경계', 'UserService → Auth CBO 0', '소스 코드 import 정적 분석', '인증 정책 변경 시 User 배포 영향 제거', green],
    ['02', '의존성 방향', 'Auth → User 단방향 · 순환 의존 없음', 'Feign DTO 참조 구조 확인', '역방향 참조로 변경 영향이 되돌아오는 구조 방지', blue],
    ['03', '권한 흐름', 'MASTER · HUB_MANAGER · 미인증 응답', 'Gateway · AOP 통합 테스트', '서비스별 권한 판단 일관성 확인', violet],
  ]

  return (
    <Slide eyebrow="3M" title="문제 해결 — 검증 결과" subtitle="정적 분석 · 의존성 확인 · 권한 통합 테스트" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 12, height: '100%', minHeight: 0 }}>
        <Panel pad={14} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr repeat(3, 0.72fr)', gap: 10, alignItems: 'center' }}>
            <div>
              <SectionLabel color={green}>Result Summary</SectionLabel>
              <div style={{ color: navy, fontSize: 15.4, lineHeight: 1.42, fontWeight: 850 }}>
                책임 경계는 코드 구조로, 권한 흐름은 통합 테스트로 나누어 검증했습니다.
              </div>
            </div>
            {[
              ['CBO 0', 'UserService → Auth', green],
              ['순환 의존 없음', 'Auth → User 단방향', blue],
              ['일관성 검증', '권한 응답 통합 테스트', violet],
            ].map(([value, label, color]) => (
              <div key={label} style={{ borderLeft: '1px solid #bbf7d0', minHeight: 68, display: 'grid', alignContent: 'center', textAlign: 'center', padding: '0 8px' }}>
                <div style={{ color, fontSize: 20.5, fontWeight: 950, lineHeight: 1.08 }}>{value}</div>
                <div style={{ marginTop: 6, color: slate, fontSize: 12.6, lineHeight: 1.3, fontWeight: 800 }}>{label}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={16} background={white} accent={blue}>
          <SectionLabel>검증 기준과 결과</SectionLabel>
          <div style={{ overflow: 'hidden', border: `1px solid ${line}`, borderRadius: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '48px 0.82fr 1.2fr 1.05fr 1.45fr', background: '#f1f5f9', color: slate, fontSize: 12.6, fontWeight: 950 }}>
              {['', '검증 대상', '확인 결과', '검증 방법', '효과'].map((label, idx) => (
                <div key={`${label}-${idx}`} style={{ padding: '9px 10px' }}>{label}</div>
              ))}
            </div>
            {verificationRows.map(([no, target, result, method, effect, color]) => (
              <div key={no} style={{ display: 'grid', gridTemplateColumns: '48px 0.82fr 1.2fr 1.05fr 1.45fr', alignItems: 'center', borderTop: `1px solid ${line}`, minHeight: 78, color: navy, fontSize: 13.4, lineHeight: 1.38, fontWeight: 780 }}>
                <div style={{ width: 31, height: 31, borderRadius: 9, display: 'grid', placeItems: 'center', justifySelf: 'center', color: white, background: color, fontSize: 13.2, fontWeight: 950 }}>{no}</div>
                <div style={{ padding: '12px 10px', color, fontWeight: 950 }}>{target}</div>
                <div style={{ padding: '12px 10px', fontWeight: 900 }}>{result}</div>
                <div style={{ padding: '12px 10px', color: slate }}>{method}</div>
                <div style={{ padding: '12px 10px' }}>{effect}</div>
              </div>
            ))}
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: 12 }}>
          <div style={{ border: '1px solid #bbf7d0', background: '#ecfdf5', borderRadius: 12, padding: '13px 15px', color: '#065f46', fontSize: 13.8, lineHeight: 1.42, fontWeight: 850 }}>
            인증 변경이 User 배포로 확산될 위험과 서비스마다 권한 판단이 달라질 위험을 줄였습니다.
          </div>
          <div style={{ border: `1px solid ${line}`, background: soft, borderRadius: 12, padding: '10px 13px', color: slate, fontSize: 11.9, lineHeight: 1.35, fontWeight: 720 }}>
            <a href={m3.projectReflection?.sourceUrl} style={{ color: blue, fontWeight: 900, textDecoration: 'none' }}>통합 테스트 결과 보고서</a><br />
            CBO는 소스 코드 import 정적 분석 기준입니다.
          </div>
        </div>
      </div>
    </Slide>
  )
}

function ExperienceSlide() {
  return (
    <Slide eyebrow="Experience" title="걸어온 여정" subtitle="직무 관련성이 높은 경험부터 최신순으로 정리했습니다.">
      <div style={{ display: 'grid', gap: 8, height: '100%' }}>
        {EXPERIENCE_ITEMS.map((item) => (
          <Panel key={`${item.period}-${item.title}`} pad={10} background={white} accent={blue}>
            <div style={{ display: 'grid', gridTemplateColumns: '112px 1fr', gap: 14, alignItems: 'center' }}>
              <div>
                <div style={{ color: muted, fontSize: 12, fontWeight: 800 }}>{item.period}</div>
                <div style={{ display: 'inline-block', marginTop: 5, background: blue, color: white, borderRadius: 999, padding: '3px 9px', fontSize: 12.2, fontWeight: 900 }}>{item.category}</div>
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 900, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: slate, fontSize: 13, lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Slide>
  )
}

function ClosingSlide() {
  return (
    <Slide eyebrow={CLOSING_SECTION.kicker} title={CLOSING_SECTION.title} subtitle={CLOSING_SECTION.subtitle} dense>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, height: '100%' }}>
        {CLOSING_BLOCKS.map((block, idx) => {
          const color = idx === 0 ? blue : violet
          const items = parseClosingItems(block.body)

          return (
          <Panel key={block.titleEn} pad={0} background={white} accent={color}>
            <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
              <div
                style={{
                  padding: '15px 17px 13px',
                  background: idx === 0 ? '#eff6ff' : '#f5f3ff',
                  borderBottom: `1px solid ${idx === 0 ? '#bfdbfe' : '#ddd6fe'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
                  <div
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 12,
                      display: 'grid',
                      placeItems: 'center',
                      background: white,
                      color,
                      fontWeight: 950,
                      fontSize: 17,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <div style={{ color, fontSize: 12.2, fontWeight: 950, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>{block.titleEn}</div>
                    <div style={{ fontSize: 20.5, fontWeight: 950, color: navy, lineHeight: 1.18 }}>{block.titleKo}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: white, color, fontSize: 12, fontWeight: 950 }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <div style={{ padding: '18px 18px 16px', display: 'grid', alignContent: 'start', gap: 11 }}>
                {items.length > 0 ? items.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      borderRadius: 13,
                      background: idx === 0 ? '#f8fbff' : '#fbf9ff',
                      border: `1px solid ${color}28`,
                      padding: '13px 16px',
                      display: 'grid',
                      alignContent: 'center',
                      gap: 7,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: color, flexShrink: 0 }} />
                      <h3 style={{ margin: 0, color: navy, fontSize: 15.8, fontWeight: 950, lineHeight: 1.15 }}>{item.title}</h3>
                    </div>
                    <p style={{ margin: 0, color: slate, fontSize: 13.2, lineHeight: 1.48, fontWeight: 740, whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                )) : (
                  <Rich html={block.body} size={12.5} lineHeight={1.5} />
                )}
                <div style={{ borderRadius: 12, background: idx === 0 ? '#eff6ff' : '#f5f3ff', border: `1px solid ${color}2a`, padding: '11px 13px', color, fontSize: 13.2, fontWeight: 950, lineHeight: 1.25, marginTop: 2 }}>
                  {idx === 0 ? '흐름 설계 → 적용 사례 → 개선 습관' : '도구 활용 → 자동화 확장 → 판단 책임'}
                </div>
              </div>
            </div>
          </Panel>
          )
        })}
      </div>
    </Slide>
  )
}

const BANKCOW_DIRECTION = {
  brand: 'bankcow',
  label: '한우 조각투자 플랫폼',
  summary: '뱅카우는 투자자의 자산 흐름과 한우의 생애주기가 함께 움직이는 서비스라고 이해했습니다. 투자 신청부터 정산까지 상태와 데이터가 같은 기준으로 이어져야 사용자의 신뢰를 지킬 수 있습니다.',
  noteTitle: '인상 깊었던 글',
  noteBody: '일을 벌이는 사람은 많아도, 끝까지 마무리하는 사람은 많지 않다는 말이 기억에 남습니다.',
  flow: ['투자 신청', '사육 상태', '출하/판정/경매', '정산 반영'],
  keywords: ['데이터는 고객의 자산', '깊은 도메인 이해', '프로세스와 개발 로직', '끝까지 마무리하는 태도'],
} as const

const BANKCOW_BACKEND_POINTS = [
  ['정합성', '예치금·수익률·정산 금액이 같은 기준으로 맞아야 합니다.'],
  ['상태 전이', '투자 신청부터 경매 이후까지 흐름이 추적 가능해야 합니다.'],
  ['복구 기준', '오류 발생 시 원본 데이터와 보정 경로가 남아야 합니다.'],
] as const

const BANKCOW_NOTES = [
  {
    title: '개발 판단',
    body: '도메인을 이해해야 프로세스와 개발 로직을 정확히 결정할 수 있다고 보았습니다.',
    bullets: ['상태 전이 기준 선행', '정산 데이터 기준 확인'],
  },
  {
    title: '검증 경험',
    body: 'FeedShop에서 조회 지연과 투표 동시성 문제를 지표와 테스트로 검증했습니다.',
    bullets: ['응답 지연 검증', '동시 요청 정합성'],
  },
] as const

function BankcowDirectionSlide() {
  return (
    <Slide eyebrow="Direction" title="자산과 상태의 흐름을 신뢰로 연결하는 백엔드" subtitle="금융·농가·투자자·실물자산이 이어지는 도메인에서 백엔드는 신뢰 가능한 흐름을 만드는 역할이라고 정리했습니다." dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 12, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 14 }}>
          <Panel pad={16} background={white} accent={blue}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 13, alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 58, height: 58, borderRadius: 15, background: blue, display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
                <img src={asset('bankcow-logo.png')} alt="bankcow logo" style={{ width: 42, height: 42, objectFit: 'contain', display: 'block' }} />
              </div>
              <div>
                <div style={{ color: navy, fontSize: 25, lineHeight: 1.05, fontWeight: 950 }}>{BANKCOW_DIRECTION.brand}</div>
                <div style={{ marginTop: 6, color: blue, fontSize: 13.4, lineHeight: 1.2, fontWeight: 950 }}>{BANKCOW_DIRECTION.label}</div>
              </div>
            </div>
            <p style={{ margin: 0, color: slate, fontSize: 15, lineHeight: 1.55, fontWeight: 820 }}>
              {BANKCOW_DIRECTION.summary}
            </p>
          </Panel>

          <Panel pad={15} background="#ecfdf5" borderColor="#86efac">
            <SectionLabel color={green}>{BANKCOW_DIRECTION.noteTitle}</SectionLabel>
            <p style={{ margin: '8px 0 0', color: '#064e3b', fontSize: 15.2, lineHeight: 1.52, fontWeight: 900 }}>
              {BANKCOW_DIRECTION.noteBody}
            </p>
          </Panel>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: 0 }}>
          {BANKCOW_NOTES.map((note, idx) => (
            <Panel key={note.title} pad={15} background={idx === 0 ? '#eff6ff' : '#f8fafc'} borderColor={idx === 0 ? '#bfdbfe' : '#cbd5e1'}>
              <div style={{ color: idx === 0 ? blue : navy, fontSize: 12, fontWeight: 950, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7 }}>
                {note.title}
              </div>
              <p style={{ margin: 0, color: slate, fontSize: 13.4, lineHeight: 1.48, fontWeight: 800 }}>{note.body}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 12 }}>
                {note.bullets.map((bullet) => (
                  <span key={bullet} style={{ borderRadius: 999, background: white, border: `1px solid ${idx === 0 ? '#bfdbfe' : line}`, color: idx === 0 ? blue : slate, padding: '5px 10px', fontSize: 12.5, fontWeight: 900 }}>
                    {bullet}
                  </span>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
          <Panel pad={12} background={white} borderColor="#dbe3ef">
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${BANKCOW_DIRECTION.flow.length}, 1fr)`, gap: 8 }}>
              {BANKCOW_DIRECTION.flow.map((item, idx) => (
                <div key={item} style={{ borderRadius: 12, background: idx === 0 ? '#eff6ff' : '#f8fafc', border: `1px solid ${idx === 0 ? '#bfdbfe' : line}`, padding: '10px 9px', textAlign: 'center' }}>
                  <div style={{ color: blue, fontSize: 12.2, fontWeight: 950, marginBottom: 4 }}>{String(idx + 1).padStart(2, '0')}</div>
                  <div style={{ color: navy, fontSize: 13.2, fontWeight: 950, lineHeight: 1.2 }}>{item}</div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel pad={12} background="#f8fafc" borderColor="#cbd5e1">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7 }}>
              {BANKCOW_BACKEND_POINTS.map(([title, body]) => (
                <div key={title}>
                  <div style={{ color: blue, fontSize: 12.3, fontWeight: 950, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: slate, fontSize: 12.2, lineHeight: 1.35, fontWeight: 760 }}>{body}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </Slide>
  )
}

function ResourcesContactSlide() {
  return (
    <Slide eyebrow={RESOURCES_SECTION.kicker} title="자료 모음 · 연락하기" subtitle="프로젝트 문서와 연락 채널을 마지막에 정리했습니다." dense>
      <div style={{ display: 'grid', gridTemplateColumns: '1.32fr 0.82fr', gap: 14, height: '100%' }}>
        <Panel pad={16} background="#f8fbff" accent={green}>
          <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#ecfdf5', color: green, fontSize: 12.2, fontWeight: 950 }}>
                URL
              </div>
              <div>
                <SectionLabel color={green}>{RESOURCES_SECTION.title}</SectionLabel>
                <div style={{ color: slate, fontSize: 14.6, fontWeight: 760 }}>프로젝트 기획, 협업 가이드, 실습 기록을 확인할 수 있는 자료입니다.</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {pdfResourceLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: '1px solid #bbf7d0',
                    background: white,
                    borderRadius: 12,
                    padding: '10px 11px',
                    minHeight: 62,
                    display: 'grid',
                    gridTemplateRows: 'auto auto',
                    gap: 5,
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, display: 'grid', placeItems: 'center', background: '#ecfdf5', color: green, fontSize: 12.1, fontWeight: 950 }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div style={{ color: green, fontSize: 12.3, fontWeight: 950, letterSpacing: '0.09em' }}>RESOURCE {String(idx + 1).padStart(2, '0')}</div>
                    <span style={{ marginLeft: 'auto', color: green, fontSize: 12.2, fontWeight: 950 }}>OPEN</span>
                  </div>
                  <div style={{ color: navy, fontSize: 13.8, fontWeight: 950, lineHeight: 1.18 }}>{link.label}</div>
                </a>
              ))}
            </div>
          </div>
        </Panel>
        <Panel pad={0} background={navy} borderColor={navy}>
          <div style={{ height: '100%', padding: '24px 24px', display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 16 }}>
            <div>
              <div style={{ color: '#93c5fd', fontSize: 13, fontWeight: 950, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>Contact</div>
              <div style={{ color: white, fontSize: 32, fontWeight: 950, lineHeight: 1.05, marginBottom: 8 }}>{HERO_NAME}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13.2, lineHeight: 1.4, fontWeight: 760 }}>백엔드 개발자로서 수치 검증과 구조 설계를 바탕으로 문제를 끝까지 해결합니다.</div>
            </div>
            <div style={{ display: 'grid', alignContent: 'center', gap: 12 }}>
              {CONTACT_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href?.startsWith('http') ? '_blank' : undefined}
                  rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 11, alignItems: 'center', textDecoration: 'none' }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#1e293b', color: '#93c5fd', fontSize: 12.2, fontWeight: 950 }}>
                    {(['GH', 'EM', 'IN'] as const)[idx] ?? 'CT'}
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: 14.2, fontWeight: 850, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.label}</div>
                </a>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #334155', paddingTop: 13, color: '#94a3b8', fontSize: 12.5, lineHeight: 1.4, fontWeight: 720 }}>
              Portfolio · Backend Software Engineer
            </div>
          </div>
          </Panel>
      </div>
    </Slide>
  )
}

export default function PdfPortfolio() {
  return (
    <>
      <style>{`
        @page { size: A4 landscape; margin: 0; }
        .pdf-slide {
          print-color-adjust: exact;
          -webkit-print-color-adjust: exact;
        }
        .pdf-rich * { max-width: 100%; box-sizing: border-box; }
        .pdf-rich p { margin: 0; }
        .pdf-rich ul { margin: 0; padding-left: 16px; }
        .pdf-rich li { margin-bottom: 2px; }
        .pdf-rich .reflection-list { padding-left: 21px; }
        .pdf-rich .reflection-list li { margin-bottom: 7px; }
        .pdf-rich .reflection-list li:last-child { margin-bottom: 0; }
        .pdf-rich .reflection-list li::marker { color: #2563eb; }
        .pdf-rich .font-bold,
        .pdf-rich .font-semibold,
        .pdf-rich strong,
        .pdf-rich b { font-weight: 800 !important; }
        .pdf-rich .text-\\[\\#2563EB\\],
        .pdf-rich .text-blue-700,
        .pdf-rich .text-blue-600,
        .pdf-rich .text-\\[\\#8aa8e8\\] { color: ${blue} !important; }
        .pdf-rich .text-red-600,
        .pdf-rich .text-red-500,
        .pdf-rich .text-red-400,
        .pdf-rich .text-red-300 { color: ${red} !important; }
        .pdf-rich .text-emerald-600,
        .pdf-rich .text-emerald-400 { color: ${green} !important; }
        .pdf-rich .text-amber-600,
        .pdf-rich .text-amber-300 { color: ${amber} !important; }
        .pdf-rich .text-slate-900,
        .pdf-rich [class~="dark:text-slate-100"] { color: ${navy} !important; }
        .pdf-rich .text-slate-600,
        .pdf-rich .text-slate-700,
        .pdf-rich .text-slate-800,
        .pdf-rich [class~="dark:text-slate-200"],
        .pdf-rich [class~="dark:text-slate-300"],
        .pdf-rich [class~="dark:text-slate-400"] { color: ${slate} !important; }
        .pdf-rich img {
          display: block;
          width: 100%;
          max-height: 56mm;
          object-fit: contain;
          border-radius: 8px;
        }
        .pdf-rich .grid,
        .pdf-rich [class*="grid"] { display: grid; }
        .pdf-rich .grid-cols-2,
        .pdf-rich [class*="grid-cols-2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .pdf-rich .gap-3,
        .pdf-rich [class*="gap-3"] { gap: 8px; }
        .pdf-result-grid img { max-height: 56mm; }
        .pdf-p2-result img { max-height: 50mm; }
        .pdf-compact-images img { max-height: 60mm; }
        .pdf-rich table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10.8px;
        }
        .pdf-rich th,
        .pdf-rich td {
          padding: 4.5px 6.5px !important;
          border-top: 1px solid #e2e8f0;
        }
        .pdf-table-compact table {
          font-size: 10.4px !important;
        }
        .pdf-table-compact th,
        .pdf-table-compact td {
          padding: 3.5px 5.5px !important;
        }
        .pdf-rich.pdf-table-fit > div {
          background: #ffffff !important;
          border-color: #cbd5e1 !important;
          box-shadow: none !important;
        }
        .pdf-table-fit table {
          background: #ffffff !important;
          color: #334155 !important;
          font-size: 14.2px !important;
        }
        .pdf-table-fit th,
        .pdf-table-fit td {
          background: #ffffff !important;
          border-color: #e2e8f0 !important;
          color: #334155 !important;
          font-size: 14.2px !important;
          line-height: 1.3 !important;
          padding: 7px 9px !important;
        }
        .pdf-rich.pdf-table-fit thead th {
          background: #e2e8f0 !important;
          color: #334155 !important;
        }
        .pdf-table-fit tbody td:first-child {
          color: #0f172a !important;
          font-weight: 850 !important;
        }
        .pdf-table-fit tbody td:nth-child(2) {
          color: #475569 !important;
        }
        .pdf-table-fit tbody td:nth-child(3) {
          color: #2563eb !important;
          font-weight: 850 !important;
        }
        .pdf-table-fit tbody td:nth-child(4) {
          color: #059669 !important;
          font-weight: 850 !important;
        }
        .pdf-rich [class*="bg-\\[\\#1a1a1a\\]"] {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 10.1px !important;
          line-height: 1.34 !important;
          padding: 7px 9px !important;
          overflow: hidden !important;
          max-height: 39mm !important;
        }
        .pdf-rich span[class*="font-mono"] {
          font-family: inherit !important;
          font-size: inherit !important;
          line-height: inherit !important;
          color: inherit !important;
          background: transparent !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }
        .pdf-rich [class*="bg-\\[\\#1a1a1a\\]"] span[class*="font-mono"],
        .pdf-rich [class*="bg-\\[\\#1a1a1a\\]"] [class*="font-mono"] {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          font-size: inherit !important;
          color: inherit !important;
          background: transparent !important;
        }
        .pdf-code-fit img { max-height: 36mm; }
        .pdf-code-fit [class*="bg-\\[\\#1a1a1a\\]"],
        .pdf-code-fit [class*="font-mono"] { max-height: 34mm !important; }
        .pdf-rich .rounded-xl,
        .pdf-rich [class*="rounded-xl"] { border-radius: 10px; }
        .pdf-rich .rounded-lg,
        .pdf-rich [class*="rounded-lg"] { border-radius: 8px; }
      `}</style>

      <HeroSlide />
      <AboutSlide />
      <ProjectsOverviewSlide />

      <ProjectCaseCover
        eyebrow="Backend Case Study 01"
        projectName="FeedShop"
        statement="이벤트 조회 병목과 투표 동시성을 수치로 검증하며 해결했습니다."
        description="커뮤니티 재방문 구조의 핵심인 이벤트 참여 흐름을 지키기 위해, 조회 성능과 투표 정합성을 각각 다른 부하 축으로 분리해 접근했습니다."
        metrics={[
          { label: '응답시간 단축', value: '91%', caption: '동시 1,000명 기준 6,818ms → 638ms', color: green },
          { label: 'SQL Count', value: '42회 → 2회', caption: 'Cache Hit 0회는 반복 요청 분리', color: blue },
          { label: '오류·중복', value: '0건', caption: '동시 3,000명 투표 테스트 구간', color: violet },
        ]}
      />
      <ProjectIntroSlide project={feedshop} title="FeedShop" showRoleLabels={false} />
      <FeedShopDeveloperPerspectiveSlide />
      <ArchitectureSlide project={feedshop} title="FeedShop" showOwnershipLabel={false} showDetailMarkers />
      <FeedShopP1ProblemSlide />
      <FeedShopP1ThinkingSolutionSlide />
      <FeedShopP1SolutionResultSlide />
      <FeedShopP1ResultTableSlide />
      <FeedShopP1ResultImagesSlide />
      <FeedShopP2ProblemThinkingSlide />
      <FeedShopP2SolutionSlide />
      <FeedShopP2ResultSlide />
      <FeedShopReflectionSlide />

      <ProjectCaseCover
        eyebrow="Backend Case Study 02"
        projectName="3M"
        statement="Auth·User 책임을 분리하고 Gateway 권한 흐름을 통합 테스트로 검증했습니다."
        description="업체·허브·배송 담당자가 연결되는 B2B 물류 시스템에서, 인증 정책 변경의 배포 영향과 User 장애 전파 위험을 줄이기 위해 서비스 경계와 권한 전달 방식을 분리했습니다."
        metrics={[
          { label: 'UserService → Auth', value: 'CBO 0', caption: '인증 정책 변경 시 User 배포 영향 제거', color: green },
          { label: '서비스 의존성', value: '순환 의존 없음', caption: 'Auth → User Feign DTO 단방향 참조', color: blue },
          { label: '권한 응답', value: '일관성 검증', caption: 'MASTER · HUB_MANAGER · 미인증 통합 테스트', color: violet },
        ]}
      />
      <ProjectIntroSlide project={m3} title="3M" showRoleLabels={false} />
      <M3DeveloperPerspectiveSlide />
      <ArchitectureSlide project={m3} title="3M" />
      <M3ProblemSlide />
      <M3ThinkingSlide />
      <M3SolutionSlide />
      <M3ResultSlide />
      <M3ReflectionSlide />

      <CollaborationSlide />
      <AiWorkflowSlide />

      <ClosingSlide />
      <BankcowDirectionSlide />
      <ExperienceSlide />
      <ResourcesContactSlide />
    </>
  )
}
