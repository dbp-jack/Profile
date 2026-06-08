import React from 'react'
import {
  ABOUT_CARDS,
  ABOUT_SECTION,
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
  RESOURCE_LINKS,
  RESOURCES_SECTION,
} from '@/content/portfolio'
import { PROJECTS, PROJECT_OVERVIEWS } from '@/content/projects'

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

const feedshop = PROJECTS[0]
const m3 = PROJECTS[1]
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

function extractResultLead(html: string): string {
  const tableStart = html.indexOf('<table')
  if (tableStart < 0) return html
  const beforeTable = html.slice(0, tableStart)
  const leadStart = beforeTable.indexOf('<p')
  const leadEnd = beforeTable.indexOf('</p>')
  if (leadStart >= 0 && leadEnd >= 0) return beforeTable.slice(leadStart, leadEnd + '</p>'.length)
  return beforeTable
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
                fontSize: 11,
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
                fontSize: 13,
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
        fontSize: 10,
        fontWeight: 900,
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
      <div style={{ color, fontSize: 25, lineHeight: 1, fontWeight: 950, letterSpacing: '-0.03em' }}>{value}</div>
      <div style={{ marginTop: 6, color: navy, fontSize: 12, fontWeight: 950 }}>{label}</div>
      {caption && <div style={{ marginTop: 4, color: muted, fontSize: 10.5, lineHeight: 1.35 }}>{caption}</div>}
    </div>
  )
}

const codeTokenColor: Record<string, string> = {
  '@Cacheable': blue,
  '@Transactional': blue,
  '@UniqueConstraint': blue,
  fetchJoin: blue,
  leftJoin: blue,
  selectFrom: blue,
  where: blue,
  offset: blue,
  limit: blue,
  fetch: blue,
  countDistinct: blue,
  NOT_SUPPORTED: amber,
  DataIntegrityViolationException: red,
  increment: green,
  saveVote: green,
  existsByEventIdAndUserId: red,
  save: red,
  return: violet,
  public: violet,
  if: violet,
  try: violet,
  catch: violet,
}

function renderCodeTokens(line: string) {
  const commentIndex = line.indexOf('//')
  const codePart = commentIndex >= 0 ? line.slice(0, commentIndex) : line
  const commentPart = commentIndex >= 0 ? line.slice(commentIndex) : ''
  const tokenPattern = new RegExp(`(${Object.keys(codeTokenColor).map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
  const parts = codePart.split(tokenPattern)

  return (
    <>
      {parts.map((part, idx) => (
        <span key={`${part}-${idx}`} style={codeTokenColor[part] ? { color: codeTokenColor[part], fontWeight: 900 } : undefined}>
          {part}
        </span>
      ))}
      {commentPart && <span style={{ color: muted }}>{commentPart}</span>}
    </>
  )
}

function CodeBox({ lines }: { lines: string[] }) {
  return (
    <pre
      style={{
        margin: '8px 0 0',
        background: '#f1f5f9',
        border: `1px solid ${line}`,
        borderRadius: 9,
        padding: '8px 10px',
        color: '#111827',
        fontSize: 9.5,
        lineHeight: 1.42,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        whiteSpace: 'pre-wrap',
      }}
    >
      {lines.map((line, idx) => (
        <React.Fragment key={`${line}-${idx}`}>
          {renderCodeTokens(line)}
          {idx < lines.length - 1 ? '\n' : null}
        </React.Fragment>
      ))}
    </pre>
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
          <div style={{ color: '#93c5fd', fontSize: 12, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
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
            fontSize: 12,
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
              fontSize: 11,
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
            {HERO_PERSONAL_INFO.map((row) => (
              <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: slate, fontSize: 14 }}>
                <i className={row.icon} style={{ color: navy, fontSize: 15, width: 18 }} />
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
            <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 18, alignItems: 'center', height: '100%' }}>
              <div style={{ borderRight: `1px solid ${line}`, height: '100%', display: 'grid', placeItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: blue, fontSize: 34, fontWeight: 950, lineHeight: 1 }}>{String(idx + 1).padStart(2, '0')}</div>
                  <div style={{ marginTop: 8, fontWeight: 950, fontSize: 14.2, lineHeight: 1.25 }}>{card.title}</div>
                </div>
              </div>
              <div style={{ display: 'grid', alignContent: 'center', gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: 20.2, fontWeight: 950, lineHeight: 1.25 }}>{card.subtitle}</h2>
                <Rich html={card.description.replace(/\n/g, '<br/>')} size={14.1} lineHeight={1.46} />
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
    {
      title: '핵심 성과',
      items: [
        ['91% 단축', '동시 1,000명 기준 응답시간 6,818ms → 638ms'],
        ['SQL Count 42 → 0', 'fetchJoin + Redis Cache Hit 기준'],
        ['중복 투표 0건', '동시 3,000명 부하 테스트 기준'],
      ],
      color: blue,
    },
    {
      title: '핵심 성과',
      items: [
        ['CBO 0건', 'UserService → Auth 도메인 결합도 제거'],
        ['단방향 의존', 'Feign DTO 중심 참조, 순환 의존 없음'],
        ['Gateway\n권한 판단', 'JWT payload 기반 User 재조회 감소'],
      ],
      color: violet,
    },
  ]

  return (
    <Slide eyebrow={PROJECTS_SECTION.kicker} title={PROJECTS_SECTION.title} subtitle="핵심 프로젝트를 목적·역할·문제 해결 중심으로 요약했습니다.">
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 11, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13, minHeight: 0 }}>
          {PROJECT_OVERVIEWS.map((project, idx) => (
            <Panel key={project.name} pad={14} background={white} accent={idx === 0 ? blue : violet}>
              <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto auto auto auto auto auto', alignContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: blue, fontWeight: 900, fontSize: 12 }}>프로젝트 {idx + 1}</span>
                  <span style={{ background: idx === 0 ? blue : violet, color: white, borderRadius: 999, padding: '5px 10px', fontSize: 10.5, fontWeight: 900 }}>{project.badge}</span>
                </div>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950, letterSpacing: '-0.03em' }}>{project.name}</h2>
                <p style={{ margin: 0, color: slate, fontSize: 13.4, lineHeight: 1.52, fontWeight: 750 }}>{project.description}</p>
                <div
                  style={{
                    borderRadius: 14,
                    border: `1px solid ${highlights[idx].color}24`,
                    background: idx === 0 ? '#f8fbff' : '#fbf9ff',
                    padding: '10px 12px',
                  }}
                >
                  <div
                    style={{
                      color: highlights[idx].color,
                      fontSize: 10,
                      fontWeight: 950,
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      marginBottom: 8,
                    }}
                  >
                    {highlights[idx].title}
                  </div>
                  <div style={{ display: 'grid', gap: 6 }}>
                    {highlights[idx].items.map(([value, caption]) => (
                      <div
                        key={value}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '110px 1fr',
                          gap: 10,
                          alignItems: 'center',
                          borderRadius: 12,
                          padding: '8px 10px',
                          background: white,
                          border: `1px solid ${highlights[idx].color}30`,
                        }}
                      >
                        <div
                          style={{
                            color: highlights[idx].color,
                            fontSize: 17.5,
                            fontWeight: 950,
                            lineHeight: 1.12,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {value}
                        </div>
                        <div style={{ color: slate, fontSize: 11.2, lineHeight: 1.38, fontWeight: 800 }}>{caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Tags items={project.tech} />
                <Panel pad={9} background={idx === 0 ? '#eff6ff' : '#f5f3ff'} borderColor={idx === 0 ? '#bfdbfe' : '#ddd6fe'}>
                  <SectionLabel color={idx === 0 ? blue : violet}>핵심 과제</SectionLabel>
                  <p style={{ margin: 0, color: slate, fontSize: 12.5, lineHeight: 1.48, fontWeight: 760 }}>{project.challenge}</p>
                </Panel>
              </div>
            </Panel>
          ))}
        </div>
        {feedshop.problemEnvironment && (
          <Panel pad={10} background="#f1f5f9">
            <div style={{ fontSize: 11, fontWeight: 900, color: navy, marginBottom: 3 }}>로컬 테스트 환경</div>
            <div style={{ fontSize: 11, color: slate, whiteSpace: 'pre-line' }}>{feedshop.problemEnvironment}</div>
          </Panel>
        )}
      </div>
    </Slide>
  )
}

function ProjectIntroSlide({ project, title }: { project: typeof feedshop; title: string }) {
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
              <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
                <div
                  style={{
                    padding: '13px 14px 11px',
                    background: idx === 0 ? '#eff6ff' : idx === 1 ? '#ecfdf5' : '#f5f3ff',
                    borderBottom: `1px solid ${color}33`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ color, fontSize: 9.8, fontWeight: 950, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: 5 }}>
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
                <div
                  style={{
                    margin: '0 16px 15px',
                    borderRadius: 10,
                    border: `1px solid ${color}2f`,
                    background: idx === 0 ? '#f8fbff' : idx === 1 ? '#f7fefb' : '#fbf9ff',
                    color,
                    padding: '8px 10px',
                    fontSize: 10.8,
                    fontWeight: 950,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}
                >
                  {roleLabels[idx] ?? 'Responsibility'}
                </div>
              </div>
            </Panel>
            )
          })}
        </div>
      </div>
    </Slide>
  )
}

function ArchitectureSlide({ project, title }: { project: typeof feedshop; title: string }) {
  return (
    <Slide eyebrow={title} title="아키텍처" dense>
      <div style={{ display: 'grid', gridTemplateRows: '90mm 1fr', gap: 11, height: '100%' }}>
        <Panel pad={8} background={white} accent={blue}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={asset(project.architectureImage)}
            alt={`${title} architecture`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
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
                fontSize: 12.6,
                fontWeight: 950,
              }}
            >
              <span style={{ width: 9, height: 9, border: `2px solid ${blue}`, display: 'inline-block' }} />
              맡은 작업
            </div>
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateRows: `repeat(${project.architectureDetails?.length ?? 1}, 1fr)`, gap: 8, minHeight: 0 }}>
          {project.architectureDetails?.map((section, sectionIdx) => (
            <Panel key={section.title} pad={0} background="#f8fafc" accent={blue}>
              <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '48px 1fr', alignItems: 'center' }}>
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
                <div style={{ padding: '11px 13px' }}>
              <h3 style={{ margin: '0 0 5px', color: blue, fontSize: 17.8, fontWeight: 950, lineHeight: 1.16, textTransform: 'uppercase' }}>{section.title}</h3>
              {section.description && <p style={{ margin: '0 0 5px', color: slate, fontSize: 13.4, lineHeight: 1.38, fontWeight: 760 }}>{section.description}</p>}
              {section.items.map((item, idx) => (
                <ul key={idx} style={{ margin: 0, paddingLeft: 18, color: slate }}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet} style={{ fontSize: 13.6, lineHeight: 1.38, marginBottom: 3, fontWeight: 760 }}>{bullet}</li>
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
    ['이벤트 목록 조회 병목', '재방문 흐름 진입점인 이벤트 목록이 느려지면 탐색 단계에서 이탈 가능성이 커집니다.'],
    ['투표 동시성 보장', '랭킹 상위 피드에 투표가 몰릴 때 데이터 정합성이 흔들리면 서비스 신뢰도가 떨어집니다.'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="개발자 관점에서의 핵심 과제" subtitle="서비스 흐름을 지키기 위해 분리한 두 가지 부하 축" dense>
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 12, height: '100%' }}>
        <Panel pad={17} background={white} accent={blue}>
          <div style={{ height: '100%', display: 'grid', alignContent: 'center', gap: 13 }}>
            <SectionLabel>Developer Perspective</SectionLabel>
            <ParagraphRich html={feedshop.developerPerspective ?? ''} size={16.2} lineHeight={1.5} />
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {focusItems.map(([title, desc], idx) => (
            <Panel key={title} pad={15} background={idx === 0 ? '#eff6ff' : '#fff7ed'} borderColor={idx === 0 ? '#bfdbfe' : '#fed7aa'} accent={idx === 0 ? blue : amber}>
              <div style={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 12, alignItems: 'center' }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: white,
                    color: idx === 0 ? blue : amber,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 18,
                    fontWeight: 950,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px', color: navy, fontSize: 18.2, fontWeight: 950, lineHeight: 1.18 }}>{title}</h3>
                  <p style={{ margin: 0, color: slate, fontSize: 12.8, lineHeight: 1.4, fontWeight: 760 }}>{desc}</p>
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
    { label: 'SQL Count', value: '42회', caption: '요청 1회 기준', tone: red },
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
                        <div style={{ color: slate, fontSize: 12.8, fontWeight: 720, lineHeight: 1.38, marginTop: 2 }}>{desc}</div>
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
                        <div style={{ color: muted, fontSize: 10.8, fontWeight: 900, lineHeight: 1.2 }}>{metric.label}</div>
                        <div style={{ color: metric.tone, fontSize: 22.5, fontWeight: 950, lineHeight: 1.05, marginTop: 6 }}>{metric.value}</div>
                        <div style={{ color: slate, fontSize: 10.8, fontWeight: 800, marginTop: 5 }}>{metric.caption}</div>
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
                  요청 1회당 SQL 42회 반복 실행 확인
                </div>
                <div style={{ color: '#9a3412', fontSize: 12.6, lineHeight: 1.45, fontWeight: 780 }}>
                  `/api/events/all` 요청마다 동일한 연관 데이터 조회가 반복되어 목록 조회 성능 병목으로 이어졌습니다.
                </div>
              </div>
            </div>
            <div style={{ minHeight: 0, display: 'grid' }}>
              <img
                src={asset('before-scouter-sql42.png')}
                alt="Scouter XLog SQL Count 42"
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
  const thinkingCards = [
    ['1. 쿼리 비효율', 'N+1이 발생하는 조회 구조 자체를 먼저 개선해야 했습니다.'],
    ['2. 반복 조회 비용', '이벤트 목록은 조회 빈번 / 변경 적음 특성이라 @Cacheable + Redis 적용이 적합했습니다.'],
    ['접근 순서', '캐시만 적용하면 Cache Miss 시 N+1 문제가 그대로 남기 때문에, 쿼리 최적화로 근본 원인을 먼저 제거한 뒤 캐시를 얹는 순서로 접근했습니다.'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — Thinking · Solution 1단계" subtitle="쿼리 최적화" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 11, height: '100%' }}>
        <Panel pad={12} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <div style={{ color: slate, fontSize: 12.8, fontWeight: 760, lineHeight: 1.36, marginBottom: 8 }}>
            문제를 두 레이어로 분리해 접근했습니다.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.05fr 1.35fr', gap: 9 }}>
            {thinkingCards.map(([label, text], idx) => (
              <div
                key={label}
                style={{
                  borderRadius: 12,
                  border: `1px solid ${idx === 2 ? amber : line}`,
                  background: idx === 2 ? '#fff7ed' : '#f8fafc',
                  padding: '10px 11px',
                  minHeight: 82,
                }}
              >
                <div style={{ color: idx === 2 ? amber : navy, fontSize: 13.1, fontWeight: 950, lineHeight: 1.2 }}>{label}</div>
                <div style={{ color: slate, fontSize: 11.9, lineHeight: 1.36, fontWeight: 760, marginTop: 6 }}>{text}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={12} background={white} accent={blue}>
          <SectionLabel>Solution 1</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 9, height: '100%' }}>
            <div
              style={{
                borderRadius: 13,
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                padding: '11px 13px',
              }}
            >
              <h3 style={{ margin: '0 0 5px', color: navy, fontSize: 19.5, fontWeight: 950, lineHeight: 1.18 }}>1단계 — 쿼리 최적화</h3>
              <div style={{ color: slate, fontSize: 14.1, lineHeight: 1.4, fontWeight: 780 }}>
                QueryDSL leftJoin + fetchJoin으로 연관 데이터를 한 번에 조회해 <span style={{ color: blue, fontWeight: 950 }}>N+1 제거</span>,
                페이징 count 쿼리는 <span style={{ color: blue, fontWeight: 950 }}>countDistinct</span>로 분리 보정
              </div>
            </div>
            <CodeBox lines={[
              '// EventQueryRepositoryImpl.java (109~116번 라인)',
              'queryFactory.selectFrom(event)',
              '    .leftJoin(event.eventDetail, detail).fetchJoin()',
              '    .leftJoin(event.rewards, reward).fetchJoin()',
              '    .where(event.deletedAt.isNull())',
              '    .offset(pageable.getOffset())',
              '    .limit(pageable.getPageSize())',
              '    .fetch();',
              '// count 쿼리: countDistinct로 rewards join 중복 제거',
            ]} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 12,
                background: white,
                border: '1px solid #bfdbfe',
                padding: '8px 12px',
              }}
            >
              <div style={{ color: navy, fontSize: 13, fontWeight: 950 }}>Scouter Evidence</div>
              <div style={{ color: blue, fontSize: 16.2, fontWeight: 950 }}>SQL Count 42회 → 2회</div>
            </div>
            <div style={{ minHeight: 0 }}>
              <img
                src={asset('phase1-scouter-sql2.png')}
                alt="fetchJoin SQL 2회"
                style={{ width: '100%', height: '100%', maxHeight: '38mm', objectFit: 'cover', objectPosition: 'top', borderRadius: 10, border: `1px solid ${line}`, display: 'block' }}
              />
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP1SolutionResultSlide() {
  const cacheStrategies = [
    ['캐시 대상', '이벤트 목록', '조회 빈번 · 변경 적음'],
    ['캐시 방식', '@Cacheable + Redis', '분산 환경 캐시 유지'],
    ['정합성', 'TTL · @CacheEvict', '변경 시 캐시 무효화'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — Solution 2단계" subtitle="Redis 캐시 전략 적용" dense>
      <div style={{ display: 'grid', height: '100%' }}>
        <Panel pad={12} background={white} accent={blue}>
          <SectionLabel>Solution 2</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto 1fr', gap: 9, height: '100%' }}>
            <div>
              <h3 style={{ margin: '0 0 5px', color: navy, fontSize: 19, fontWeight: 950, lineHeight: 1.18 }}>2단계 — 캐시 전략 적용</h3>
              <div style={{ color: slate, fontSize: 13.4, lineHeight: 1.4, fontWeight: 760 }}>
                반복 조회 비용을 줄이기 위해 이벤트 목록 특성에 맞춰 Redis 캐시를 적용했습니다.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {cacheStrategies.map(([label, value, caption]) => (
                <div key={label} style={{ borderRadius: 12, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '9px 10px' }}>
                  <div style={{ color: blue, fontSize: 10.4, fontWeight: 950, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ color: navy, fontSize: 14.4, fontWeight: 950, marginTop: 4, lineHeight: 1.18 }}>{value}</div>
                  <div style={{ color: slate, fontSize: 11.2, fontWeight: 760, marginTop: 3, lineHeight: 1.28 }}>{caption}</div>
                </div>
              ))}
            </div>
            <CodeBox lines={[
              '// EventReadService.java (122~123번 라인)',
              '// [Phase 2-A] 이벤트 목록 Redis 캐시 적용 — Cache Hit 시 DB 조회 0회',
              '@Cacheable(value = "availableEvents", key = "\'feed-available\'", unless = "#result.isEmpty()")',
              'public List<EventSummaryDto> getFeedAvailableEvents() { ... }',
            ]} />
            <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 8, minHeight: 0 }}>
              <div style={{ borderRadius: 12, border: '1px solid #bfdbfe', background: '#eff6ff', color: blue, fontSize: 16.2, fontWeight: 950, padding: '9px 12px' }}>
                Cache Hit 시 SQL Count 0회
              </div>
              <img
                src={asset('phase2a-scouter-cache-hit2.png')}
                alt="Cache Hit SQL 0회"
                style={{ width: '100%', height: '100%', maxHeight: '50mm', objectFit: 'cover', objectPosition: 'top', borderRadius: 10, border: `1px solid ${line}`, display: 'block' }}
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
  const kpis = [
    ['응답시간', '91% 단축'],
    ['TPS', '216% 향상'],
    ['SQL Count', '42회 → 0회'],
    ['전략', 'fetchJoin + Redis'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — 성능 개선 결과" subtitle="QueryDSL fetchJoin + Redis 캐시 적용 결과" dense>
      <div style={{ display: 'grid', alignContent: 'center', gap: 11, height: '100%' }}>
        <Panel pad={13} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr repeat(4, 0.78fr)', gap: 10, alignItems: 'center' }}>
            <div>
              <SectionLabel color={green}>Result Summary</SectionLabel>
              <Rich html={extractResultLead(sec.result)} size={13.2} lineHeight={1.38} />
            </div>
            {kpis.map(([label, value]) => (
              <div key={label} style={{ textAlign: 'center', borderLeft: `1px solid #bbf7d0`, minHeight: 52, display: 'grid', alignContent: 'center' }}>
                <div style={{ color: green, fontSize: 21, fontWeight: 950, lineHeight: 1.08 }}>{value}</div>
                <div style={{ color: '#065f46', fontSize: 11.1, fontWeight: 850, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={13} background="#f0fdf4" borderColor="#bbf7d0" accent={green}>
          <SectionLabel color={green}>Result Table</SectionLabel>
          <Rich html={extractTable(sec.result)} size={12.2} lineHeight={1.36} className="pdf-table-fit" />
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Panel pad={12} background={white} borderColor="#bbf7d0" accent={green}>
            <div style={{ color: green, fontSize: 12.2, fontWeight: 950, marginBottom: 5 }}>Before</div>
            <div style={{ color: slate, fontSize: 12.8, lineHeight: 1.4, fontWeight: 760 }}>
              N+1 쿼리와 반복 조회 비용이 겹쳐 동시 1,000명 기준 응답시간이 6.8초까지 증가했습니다.
            </div>
          </Panel>
          <Panel pad={12} background={white} borderColor="#bbf7d0" accent={green}>
            <div style={{ color: green, fontSize: 12.2, fontWeight: 950, marginBottom: 5 }}>After</div>
            <div style={{ color: slate, fontSize: 12.8, lineHeight: 1.4, fontWeight: 760 }}>
              fetchJoin으로 쿼리 수를 줄이고 Redis Cache Hit로 DB 조회를 제거해 병목을 완화했습니다.
            </div>
          </Panel>
        </div>
      </div>
    </Slide>
  )
}

function FeedShopP1ResultImagesSlide() {
  const resultImages = [
    ['동시 100명 Before', 'before-ngrinder-v100.png', '평균 응답시간 645ms, TPS 154.6 수준에서 처리량 한계 확인'],
    ['동시 100명 After', 'phase2a-ngrinder-v100.png', '응답시간 209ms, TPS 470.1로 개선되어 단기 트래픽 대응 폭 확대'],
    ['동시 1,000명 Before', 'before-ngrinder-v1000.png', '평균 응답시간 6,818ms까지 증가하며 조회 병목이 뚜렷하게 드러남'],
    ['동시 1,000명 After', 'phase2a-ngrinder-v1000.png', '응답시간 638ms, TPS 438.3으로 개선되어 고부하 구간 안정화'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — nGrinder 부하 테스트 결과" subtitle="Before / After 성능 수치 비교" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 9, height: '100%' }}>
        <Panel pad={10} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 12, alignItems: 'center' }}>
            <div>
              <SectionLabel color={green}>Load Test Focus</SectionLabel>
              <div style={{ color: navy, fontSize: 16.4, fontWeight: 950, lineHeight: 1.22 }}>동시 사용자 증가 구간에서 개선 효과를 검증</div>
            </div>
            <div style={{ color: slate, fontSize: 12.6, lineHeight: 1.42, fontWeight: 760 }}>
              같은 부하 조건에서 Before / After를 나란히 비교해 응답시간, TPS, 고부하 안정성 변화를 확인했습니다.
            </div>
          </div>
        </Panel>
        <Panel pad={8} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, height: '100%' }}>
            {resultImages.map(([label, src, caption]) => (
              <div key={src} style={{ minHeight: 0, display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 4 }}>
                <div style={{ color: navy, fontSize: 11.2, fontWeight: 950, lineHeight: 1.15 }}>{label}</div>
                <img
                  src={asset(src)}
                  alt={`nGrinder ${label}`}
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
                <div style={{ color: slate, fontSize: 9.8, lineHeight: 1.25, fontWeight: 720 }}>{caption}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP2ProblemThinkingSlide() {
  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — 피드 투표 동시성 문제" subtitle="Problem · Thinking" dense>
      <div style={{ display: 'grid', gridTemplateRows: '1.05fr 0.95fr', gap: 10, height: '100%' }}>
        <Panel pad={11} background={white} accent={red}>
          <SectionLabel color={red}>Problem</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 12, alignItems: 'stretch' }}>
            <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 9 }}>
              <div style={{ color: slate, fontSize: 13.4, lineHeight: 1.45, fontWeight: 780 }}>
                중복 투표 방지 로직이 코드 레벨에만 존재하고, DB 유니크 제약이 없어 동시 요청 시
                <strong style={{ color: red, fontWeight: 950 }}> TOCTOU 취약점</strong>이 발생했습니다.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {[
                  ['원인', 'DB 제약 없음'],
                  ['취약점', '검사-저장 사이 틈'],
                  ['결과', '중복 투표 삽입'],
                ].map(([label, value]) => (
                  <div key={label} style={{ border: `1px solid #fecaca`, borderRadius: 10, background: '#fff7f7', padding: '10px 9px', display: 'grid', alignContent: 'center' }}>
                    <div style={{ color: red, fontSize: 10.5, fontWeight: 950, marginBottom: 4 }}>{label}</div>
                    <div style={{ color: navy, fontSize: 13, fontWeight: 950, lineHeight: 1.2 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: red, fontSize: 12, fontWeight: 950, marginBottom: 6 }}>수정 전 구조</div>
              <CodeBox
                lines={[
                  '// FeedVoteService.java — 수정 전 구조 (TOCTOU 취약)',
                  'if (feedVoteRepository.existsByEventIdAndUserId(eventId, userId)) {',
                  '    return FeedVoteResponseDto.success(false, ...); // 체크',
                  '}',
                  'feedVoteRepository.save(vote); // 저장',
                  '// 동시 요청 시 두 스레드가 모두 통과 가능',
                ]}
              />
            </div>
          </div>
        </Panel>
        <Panel pad={11} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 9 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
              {[
                ['DB 유니크 제약', '코드 레벨 우회를 막는 물리적 중복 차단'],
                ['NOT_SUPPORTED', '제약 위반 예외 발생 시 정상 응답 처리'],
                ['Redis INCR', 'DB 락과 분리된 원자적 카운터 관리'],
              ].map(([title, text]) => (
                <div key={title} style={{ border: `1px solid #fed7aa`, background: '#fff7ed', borderRadius: 11, padding: '11px 12px', minHeight: 76 }}>
                  <div style={{ color: amber, fontSize: 13.2, fontWeight: 950, marginBottom: 5 }}>{title}</div>
                  <div style={{ color: slate, fontSize: 12, lineHeight: 1.38, fontWeight: 760 }}>{text}</div>
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid #fdba74`, background: '#fffbeb', borderRadius: 11, padding: '11px 13px', color: '#9a3412', fontSize: 13.3, lineHeight: 1.38, fontWeight: 900 }}>
              👉 Redis INCR로 DB 트랜잭션과 분리된 원자적 연산 구성 - 락 경합 구조 자체를 제거
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP2SolutionSlide() {
  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — Solution" subtitle="DB 유니크 제약 · 예외 처리 · Redis INCR" dense>
      <div style={{ display: 'grid', gridTemplateRows: '0.82fr 1.08fr 0.82fr', gap: 9, height: '100%' }}>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.74fr 1.26fr', gap: 12, alignItems: 'start' }}>
            <div>
              <SectionLabel>Solution 1</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 18, lineHeight: 1.2, fontWeight: 950 }}>1단계 — DB 유니크 제약 추가</h2>
              <p style={{ margin: '8px 0 0', color: slate, fontSize: 12.4, lineHeight: 1.42, fontWeight: 780 }}>
                <strong>(event_id, voter_id)</strong> 조합에 유니크 제약을 걸어 DB 레벨에서 중복 투표를 차단
              </p>
            </div>
            <CodeBox
              lines={[
                '// FeedVote.java (24~26번 라인)',
                '@UniqueConstraint(name = "uk_feed_votes_event_voter",',
                '    columnNames = {"event_id", "voter_id"})',
              ]}
            />
          </div>
        </Panel>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.74fr 1.26fr', gap: 12, alignItems: 'start' }}>
            <div>
              <SectionLabel>Solution 2</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 18, lineHeight: 1.2, fontWeight: 950 }}>2단계 — 저장 로직 분리 + 예외 처리</h2>
              <p style={{ margin: '8px 0 0', color: slate, fontSize: 12.4, lineHeight: 1.42, fontWeight: 780 }}>
                중복 삽입 시도는 <strong>DataIntegrityViolationException</strong>으로 감지하고, 예외 처리로 200 반환
              </p>
            </div>
            <CodeBox
              lines={[
                '// FeedVoteService.java (59번 라인)',
                '@Transactional(propagation = Propagation.NOT_SUPPORTED)',
                'public FeedVoteResponseDto voteFeed(...) {',
                '    try {',
                '        savedVote = feedVotePersistenceService.saveVote(vote);',
                '    } catch (DataIntegrityViolationException e) {',
                '        return FeedVoteResponseDto.success(false, ...); // 중복 → 200 반환',
                '    }',
                '}',
              ]}
            />
          </div>
        </Panel>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '0.74fr 1.26fr', gap: 12, alignItems: 'start' }}>
            <div>
              <SectionLabel>Solution 3</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 18, lineHeight: 1.2, fontWeight: 950 }}>3단계 — Redis INCR 원자적 연산</h2>
              <p style={{ margin: '8px 0 0', color: slate, fontSize: 12.4, lineHeight: 1.42, fontWeight: 780 }}>
                카운터를 Redis로 분리해 DB 락 경합 자체를 제거
              </p>
            </div>
            <CodeBox
              lines={[
                '// FeedVoteService.java',
                'redisTemplate.opsForValue().increment("vote:count:" + feedId);',
              ]}
            />
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function FeedShopP2ResultSlide() {
  const resultImages = [
    ['정합성 검증 — DB count와 Redis count 일치', 'phase2b-redis-count-verify.png'],
    ['nGrinder — 동시 500명 요청 성공', 'phase2b-redis-v500.png'],
    ['nGrinder — 동시 1,000명 요청 성공', 'phase2b-redis-v1000.png'],
    ['nGrinder — 동시 3,000명 요청 성공', 'phase2b-redis-v3000.png'],
  ]
  const kpis = [
    ['에러율', '0%'],
    ['중복 투표', '0건'],
    ['정합성', 'DB = Redis'],
    ['검증 구간', '500→3,000명'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — Result" subtitle="정합성 검증 · nGrinder 부하 테스트" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 9, height: '100%' }}>
        <Panel pad={9} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.16fr repeat(4, 0.72fr)', gap: 8, alignItems: 'center' }}>
            <div style={{ color: slate, fontSize: 12.7, lineHeight: 1.38, fontWeight: 830 }}>
              동시 500→3,000명 전 구간 <strong style={{ color: green }}>에러율 0%</strong>,
              <strong style={{ color: green }}> 중복 투표 0건</strong> 확인,
              <strong style={{ color: blue }}> DB count = Redis count</strong> 투표 수 정합성 검증
            </div>
            {kpis.map(([label, value]) => (
              <div key={label} style={{ textAlign: 'center', borderLeft: `1px solid #bbf7d0`, minHeight: 40, display: 'grid', alignContent: 'center' }}>
                <div style={{ color: green, fontSize: 18.5, fontWeight: 950, lineHeight: 1.08 }}>{value}</div>
                <div style={{ color: '#065f46', fontSize: 10.3, fontWeight: 850, marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={8} background={white} accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, height: '100%' }}>
            {resultImages.map(([label, src]) => (
              <div key={src} style={{ minHeight: 0, display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 3 }}>
                <div style={{ color: navy, fontSize: 11, fontWeight: 950, lineHeight: 1.15 }}>{label}</div>
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

function M3ProblemThinkingSlide() {
  return (
    <Slide eyebrow="3M" title={m3.problemHeadline ?? '인증 구조 설계 및 서비스 경계 문제'} subtitle="Problem · Thinking" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 11, height: '100%' }}>
        <Panel pad={11} background={white} accent={red}>
          <SectionLabel color={red}>Problem</SectionLabel>
          <Rich html={m3.problem ?? ''} size={12.2} lineHeight={1.5} />
        </Panel>
        <Panel pad={11} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <Rich html={m3.thinking ?? ''} size={12} lineHeight={1.5} />
        </Panel>
      </div>
    </Slide>
  )
}

function M3SolutionResultSlide() {
  return (
    <Slide eyebrow="3M" title="Solution · Result" subtitle="서비스 경계 분리와 인증 흐름 단순화" dense>
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 11, height: '100%' }}>
        <Panel pad={11} background={white} accent={blue}>
          <SectionLabel>Solution</SectionLabel>
          <Rich html={m3.solution ?? ''} size={11.2} lineHeight={1.42} className="pdf-compact-images" />
        </Panel>
        <Panel pad={11} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <SectionLabel color={green}>Result</SectionLabel>
          <Rich html={m3.result ?? ''} size={12} lineHeight={1.5} />
        </Panel>
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
                <div style={{ color: muted, fontSize: 11, fontWeight: 800 }}>{item.period}</div>
                <div style={{ display: 'inline-block', marginTop: 5, background: blue, color: white, borderRadius: 999, padding: '3px 9px', fontSize: 10, fontWeight: 900 }}>{item.category}</div>
              </div>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 900, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: slate, fontSize: 12, lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Slide>
  )
}

function ClosingResourcesSlide() {
  return (
    <Slide eyebrow={CLOSING_SECTION.kicker} title={CLOSING_SECTION.title} subtitle={CLOSING_SECTION.subtitle} dense>
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto', gap: 12, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, minHeight: 0 }}>
          {CLOSING_BLOCKS.map((block, idx) => {
            const color = idx === 0 ? blue : violet
            const items = parseClosingItems(block.body)

            return (
            <Panel key={block.titleEn} pad={0} background={white} accent={color}>
              <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
                <div
                  style={{
                    padding: '12px 15px 10px',
                    background: idx === 0 ? '#eff6ff' : '#f5f3ff',
                    borderBottom: `1px solid ${idx === 0 ? '#bfdbfe' : '#ddd6fe'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <div
                      style={{
                        width: 39,
                        height: 39,
                        borderRadius: 10,
                        display: 'grid',
                        placeItems: 'center',
                        background: white,
                        color,
                        fontWeight: 950,
                        fontSize: 15,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <div style={{ color, fontSize: 10.4, fontWeight: 950, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>{block.titleEn}</div>
                      <div style={{ fontSize: 18.4, fontWeight: 950, color: navy, lineHeight: 1.2 }}>{block.titleKo}</div>
                    </div>
                    <i className={block.icon} style={{ marginLeft: 'auto', color, fontSize: 24, opacity: 0.85 }} />
                  </div>
                </div>
                <div style={{ padding: '11px 15px 13px', display: 'grid', gridTemplateRows: `repeat(${items.length || 1}, 1fr)`, gap: 8 }}>
                  {items.length > 0 ? items.map((item) => (
                    <div
                      key={item.title}
                      style={{
                        borderRadius: 12,
                        background: idx === 0 ? '#f8fbff' : '#fbf9ff',
                        border: `1px solid ${color}1f`,
                        padding: '10px 12px',
                        display: 'grid',
                        alignContent: 'center',
                        gap: 6,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ width: 7, height: 7, borderRadius: 999, background: color, flexShrink: 0 }} />
                        <h3 style={{ margin: 0, color: navy, fontSize: 15.2, fontWeight: 950, lineHeight: 1.18 }}>{item.title}</h3>
                      </div>
                      <p style={{ margin: 0, color: slate, fontSize: 12.9, lineHeight: 1.43, fontWeight: 720, whiteSpace: 'pre-line' }}>{item.text}</p>
                    </div>
                  )) : (
                    <Rich html={block.body} size={11.4} lineHeight={1.46} />
                  )}
                </div>
              </div>
            </Panel>
            )
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.72fr', gap: 12 }}>
          <Panel pad={12} background="#f8fbff" accent={green}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
              <i className="ri-links-line" style={{ color: green, fontSize: 18 }} />
              <div style={{ color: green, fontSize: 12.2, fontWeight: 950, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{RESOURCES_SECTION.title}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '9px 13px' }}>
              {RESOURCE_LINKS.map((link) => (
                <div key={link.label} style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className={link.icon} style={{ color: green, fontSize: 16, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.4, fontWeight: 950, color: navy, marginBottom: 2 }}>{link.label}</div>
                    <div style={{ fontSize: 8.8, color: muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.url}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel pad={0} background={navy} borderColor={navy}>
            <div style={{ height: '100%', padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: '#93c5fd', fontSize: 10.8, fontWeight: 950, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>Contact</div>
              <div style={{ color: white, fontSize: 25, fontWeight: 950, marginBottom: 9 }}>{HERO_NAME}</div>
              <div style={{ display: 'grid', gap: 6 }}>
                {CONTACT_LINKS.map((link) => (
                  <div key={link.label} style={{ color: '#cbd5e1', fontSize: 12.3, fontWeight: 850, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <i className={link.icon} style={{ color: '#93c5fd', marginRight: 7 }} />
                    {link.label}
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
          font-size: 9.6px;
        }
        .pdf-rich th,
        .pdf-rich td {
          padding: 4px 6px !important;
          border-top: 1px solid #e2e8f0;
        }
        .pdf-table-compact table {
          font-size: 9.1px !important;
        }
        .pdf-table-compact th,
        .pdf-table-compact td {
          padding: 2.5px 5px !important;
        }
        .pdf-rich [class*="bg-\\[\\#1a1a1a\\]"] {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8.8px !important;
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
          { label: '응답시간 단축', value: '-91%', caption: '동시 1,000명 기준 6,818ms → 638ms', color: green },
          { label: 'SQL Count', value: '42 → 0', caption: 'fetchJoin + Redis Cache Hit', color: blue },
          { label: '중복 투표', value: '0건', caption: '동시 3,000명 검증 · DB = Redis', color: violet },
        ]}
      />
      <ProjectIntroSlide project={feedshop} title="FeedShop" />
      <ArchitectureSlide project={feedshop} title="FeedShop" />
      <FeedShopDeveloperPerspectiveSlide />
      <FeedShopP1ProblemSlide />
      <FeedShopP1ThinkingSolutionSlide />
      <FeedShopP1SolutionResultSlide />
      <FeedShopP1ResultTableSlide />
      <FeedShopP1ResultImagesSlide />
      <FeedShopP2ProblemThinkingSlide />
      <FeedShopP2SolutionSlide />
      <FeedShopP2ResultSlide />

      <ProjectCaseCover
        eyebrow="Backend Case Study 02"
        projectName="3M"
        statement="Auth·User·Gateway 책임을 분리해 인증 흐름의 결합도를 낮췄습니다."
        description="다수 서비스가 연결되는 B2B 물류 시스템에서 인증 정책 변경과 사용자 조회 장애가 전체 인증 흐름으로 번지지 않도록 서비스 경계를 재설계했습니다."
        metrics={[
          { label: 'UserService → Auth', value: 'CBO 0건', caption: '인증 정책 변경 시 User 배포 영향 제거', color: green },
          { label: 'Auth → User', value: '단방향', caption: 'Feign DTO 중심 참조 · 순환 의존 없음', color: blue },
          { label: '인증 판단', value: 'Gateway', caption: 'JWT payload 기반 User 재조회 감소', color: violet },
        ]}
      />
      <ProjectIntroSlide project={m3} title="3M" />
      <ArchitectureSlide project={m3} title="3M" />
      <M3ProblemThinkingSlide />
      <M3SolutionResultSlide />

      <ExperienceSlide />
      <ClosingResourcesSlide />
    </>
  )
}
