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
const teal = '#0f766e'

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
    {
      title: '핵심 성과',
      items: [
        ['비동기 경계', '주문 요청이 결제 완료를 직접 기다리지 않음'],
        ['이벤트 타입 분리', '성공·실패·취소 상태 전이를 코드로 분리'],
        ['보상 흐름 구현', '결제 실패·취소 시 주문 취소 이벤트 연계'],
      ],
      color: teal,
    },
  ]
  const accentColors = [blue, violet, teal]

  return (
    <Slide eyebrow={PROJECTS_SECTION.kicker} title={PROJECTS_SECTION.title} subtitle="핵심 프로젝트를 목적·역할·문제 해결 중심으로 요약했습니다.">
      <div style={{ display: 'grid', gridTemplateRows: '1fr auto auto', gap: 9, height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PROJECT_OVERVIEWS.length}, 1fr)`, gap: 13, minHeight: 0 }}>
          {PROJECT_OVERVIEWS.map((project, idx) => (
            <Panel key={project.name} pad={14} background={white} accent={accentColors[idx]}>
              <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto auto auto auto auto auto', alignContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: blue, fontWeight: 900, fontSize: 12 }}>프로젝트 {idx + 1}</span>
                  <span style={{ background: accentColors[idx], color: white, borderRadius: 999, padding: '5px 10px', fontSize: 10.5, fontWeight: 900 }}>{project.badge}</span>
                </div>
                <h2 style={{ margin: 0, fontSize: 28, fontWeight: 950, letterSpacing: '-0.03em' }}>{project.name}</h2>
                <p style={{ margin: 0, color: slate, fontSize: 13.4, lineHeight: 1.52, fontWeight: 750 }}>{project.description}</p>
                <div
                  style={{
                    borderRadius: 14,
                    border: `1px solid ${highlights[idx].color}24`,
                    background: '#f8fafc',
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
                <Panel pad={9} background="#f8fafc" borderColor={`${accentColors[idx]}40`}>
                  <SectionLabel color={accentColors[idx]}>핵심 과제</SectionLabel>
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

function CollaborationEvidence({
  item,
  imageHeight,
}: {
  item: (typeof COLLABORATION_SECTION.evidence)[number]
  imageHeight: string
}) {
  return (
    <Panel pad={9} background={white} borderColor="#cbd5e1">
      <div style={{ display: 'grid', gridTemplateRows: `${imageHeight} auto`, gap: 7, height: '100%' }}>
        <div style={{ minHeight: 0, borderRadius: 8, overflow: 'hidden', border: `1px solid ${line}`, background: soft }}>
          <img src={asset(item.image)} alt={item.alt} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
        <div>
          <div style={{ color: blue, fontSize: 8.5, fontWeight: 950, letterSpacing: '0.13em', textTransform: 'uppercase' }}>{item.label}</div>
          <div style={{ marginTop: 2, color: navy, fontSize: 13.2, fontWeight: 950 }}>{item.title}</div>
          <div style={{ marginTop: 2, color: slate, fontSize: 9.6, lineHeight: 1.35, fontWeight: 700 }}>{item.description}</div>
        </div>
      </div>
    </Panel>
  )
}

function CollaborationSlide() {
  const [sprint, slack, guide] = COLLABORATION_SECTION.evidence

  return (
    <Slide eyebrow={WORK_STYLE_SECTION.kicker} title={WORK_STYLE_SECTION.title} dense>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 0.82fr auto auto', gap: 9, height: '100%', minHeight: 0 }}>
        <div>
          <SectionLabel>{COLLABORATION_SECTION.kicker}</SectionLabel>
          <div style={{ color: navy, fontSize: 13.2, fontWeight: 950, lineHeight: 1.2, marginBottom: 6 }}>{COLLABORATION_SECTION.title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, minHeight: 0 }}>
            <CollaborationEvidence item={sprint} imageHeight="36mm" />
            <CollaborationEvidence item={slack} imageHeight="36mm" />
          </div>
        </div>
        <CollaborationEvidence item={guide} imageHeight="26mm" />
        <a
          href={COLLABORATION_SECTION.guideUrl}
          style={{ color: blue, fontSize: 9.5, fontWeight: 900, textDecoration: 'none' }}
        >
          JIRA 가이드라인 보기 · {COLLABORATION_SECTION.guideUrl}
        </a>

        <div style={{ borderTop: `1px solid ${line}`, paddingTop: 8 }}>
          <SectionLabel>{PROJECT_WORKFLOW.label}</SectionLabel>
          <div style={{ color: navy, fontSize: 12.5, fontWeight: 950, lineHeight: 1.2 }}>{PROJECT_WORKFLOW.title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 5 }}>
            {PROJECT_WORKFLOW.phases.map((phase, index) => (
              <div key={phase.owner} style={{ paddingLeft: index === 0 ? 0 : 8, paddingRight: 8, borderLeft: index === 0 ? 'none' : `1px solid ${line}` }}>
                <div style={{ color: phase.tone === 'ai' ? violet : blue, fontSize: 8.2, fontWeight: 950 }}>{phase.owner}</div>
                <div style={{ color: slate, fontSize: 7.7, lineHeight: 1.3, fontWeight: 720, marginTop: 1 }}>{phase.detail}</div>
              </div>
            ))}
          </div>
        </div>
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
  const ownershipLabel = project.architectureOwnershipLabel ?? '맡은 작업'

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
              {ownershipLabel}
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
  const alternatives = [
    ['findAll() + 메모리 필터링', '구현 단순', '데이터 증가 시 조회량·N+1 확대', '제외'],
    ['Redis 캐시만 적용', '반복 조회 감소', 'Cache Miss 시 N+1 유지', '제외'],
    ['QueryDSL fetchJoin', 'SQL 42회 → 2회', '반복 조회마다 DB 접근', '부분 적용'],
    ['fetchJoin + Redis', '쿼리 개선 후 반복 조회 제거', '캐시 정합성 관리 필요', '최종 선택'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 1 — Thinking · Solution 1단계" subtitle="쿼리 최적화" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 11, height: '100%' }}>
        <Panel pad={12} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <div style={{ color: slate, fontSize: 12.5, fontWeight: 760, lineHeight: 1.34, marginBottom: 7 }}>
            쿼리 비효율과 반복 조회 비용을 분리한 뒤 해결방안을 비교했습니다.
          </div>
          <div style={{ overflow: 'hidden', borderRadius: 10, border: `1px solid ${line}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.22fr 1.12fr 1.52fr 0.72fr', background: '#f1f5f9', color: slate, fontSize: 9.7, fontWeight: 950 }}>
              {['검토안', '장점', '한계', '판단'].map((label) => <div key={label} style={{ padding: '5px 7px' }}>{label}</div>)}
            </div>
            {alternatives.map(([option, strength, limit, decision], idx) => (
              <div
                key={option}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.22fr 1.12fr 1.52fr 0.72fr',
                  borderTop: `1px solid ${idx === 3 ? '#bfdbfe' : line}`,
                  background: idx === 3 ? '#eff6ff' : white,
                  color: navy,
                  fontSize: 9.5,
                  lineHeight: 1.28,
                  fontWeight: 760,
                }}
              >
                <div style={{ padding: '5px 7px', fontWeight: 920, color: idx === 3 ? blue : navy }}>{option}</div>
                <div style={{ padding: '5px 7px' }}>{strength}</div>
                <div style={{ padding: '5px 7px' }}>{limit}</div>
                <div style={{ padding: '5px 7px', fontWeight: 950, color: idx === 3 ? blue : idx === 2 ? amber : red }}>{decision}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 7, borderRadius: 9, border: '1px solid #fed7aa', background: '#fff7ed', color: '#9a3412', padding: '7px 9px', fontSize: 10.6, lineHeight: 1.32, fontWeight: 850 }}>
            캐시로 문제를 가리기보다 쿼리 구조를 먼저 개선하고, 반복 조회 비용만 Redis로 분리했습니다.
          </div>
        </Panel>
        <Panel pad={12} background={white} accent={blue}>
          <SectionLabel>Solution 1</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto 1fr', gap: 9, height: '100%' }}>
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
            <div style={{ borderRadius: 12, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '10px 12px', color: navy, fontSize: 12.4, lineHeight: 1.4, fontWeight: 820 }}>
              <strong style={{ color: blue }}>fetchJoin</strong>으로 eventDetail·rewards를 한 번에 조회하고, 페이징 count는 <strong style={{ color: blue }}>countDistinct</strong>로 분리
            </div>
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
                <div style={{ color: navy, fontSize: 13, fontWeight: 950 }}>Scouter 측정</div>
              <div style={{ color: blue, fontSize: 16.2, fontWeight: 950 }}>SQL Count 42회 → 2회</div>
            </div>
            <div style={{ minHeight: 0 }}>
              <img
                src={asset('phase1-scouter-sql2.png')}
                alt="fetchJoin SQL 2회"
                style={{ width: '100%', height: '100%', maxHeight: '45mm', objectFit: 'contain', objectPosition: 'center', borderRadius: 10, border: `1px solid ${line}`, display: 'block' }}
              />
            </div>
            <a href="https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%AA%A9%EB%A1%9D-%EC%A1%B0%ED%9A%8C-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0" style={{ color: blue, fontSize: 10.5, fontWeight: 900, textDecoration: 'none' }}>
              구현 코드·실패 과정·커밋 근거 → Wiki
            </a>
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
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto auto 1fr auto', gap: 9, height: '100%' }}>
            <div>
              <h3 style={{ margin: '0 0 5px', color: navy, fontSize: 19, fontWeight: 950, lineHeight: 1.18 }}>2단계 — 캐시 전략 적용</h3>
              <div style={{ color: slate, fontSize: 13.4, lineHeight: 1.4, fontWeight: 760 }}>
                반복 조회 비용을 줄이기 위해 이벤트 목록 특성에 맞춰 Redis 캐시를 적용했습니다.
              </div>
            </div>
            <div style={{ borderRadius: 10, border: '1px solid #fde68a', background: '#fffbeb', padding: '8px 11px' }}>
              <div style={{ color: '#92400e', fontSize: 10, fontWeight: 950, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>분산 캐시로 Redis를 선택한 이유</div>
              <div style={{ color: '#78350f', fontSize: 11.2, lineHeight: 1.42, fontWeight: 760 }}>
                인메모리 캐시(ConcurrentMapCacheManager) 먼저 검토 → GCP Cloud Run 수평 확장 시 인스턴스마다 캐시가 달라 <strong style={{ fontWeight: 950 }}>캐시 불일치</strong> 발생 가능
                → Redis(외부 공유 캐시)로 전환해 모든 인스턴스가 동일한 캐시 참조
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
            <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 8, minHeight: 0 }}>
              <div style={{ borderRadius: 12, border: '1px solid #bfdbfe', background: '#eff6ff', color: blue, fontSize: 16.2, fontWeight: 950, padding: '9px 12px' }}>
                Cache Hit 시 SQL Count 0회
              </div>
              <img
                src={asset('phase2a-scouter-cache-hit2.png')}
                alt="Cache Hit SQL 0회"
                style={{ width: '100%', height: '100%', maxHeight: '56mm', objectFit: 'contain', objectPosition: 'center', borderRadius: 10, border: `1px solid ${line}`, display: 'block' }}
              />
            </div>
            <a href="https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%AA%A9%EB%A1%9D-%EC%A1%B0%ED%9A%8C-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0" style={{ color: blue, fontSize: 10.5, fontWeight: 900, textDecoration: 'none' }}>
              @Cacheable·TTL·무효화 구현 상세 → Wiki
            </a>
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
        <Panel pad={12} background={white} borderColor="#bbf7d0" accent={green}>
          <SectionLabel color={green}>단계별 개선 흐름 (동시 1,000명 기준)</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 8, alignItems: 'center', marginTop: 6 }}>
            <div style={{ textAlign: 'center', border: '1px solid #fecaca', borderRadius: 10, background: '#fff7f7', padding: '8px 10px' }}>
              <div style={{ color: muted, fontSize: 10.4, fontWeight: 900, marginBottom: 3 }}>Before</div>
              <div style={{ color: red, fontSize: 20, fontWeight: 950, lineHeight: 1.08 }}>6,818ms</div>
            </div>
            <div style={{ color: slate, fontSize: 18, fontWeight: 950, textAlign: 'center' }}>→</div>
            <div style={{ textAlign: 'center', border: '1px solid #fed7aa', borderRadius: 10, background: '#fff7ed', padding: '8px 10px' }}>
              <div style={{ color: muted, fontSize: 10.4, fontWeight: 900, marginBottom: 3 }}>fetchJoin 적용 후</div>
              <div style={{ color: amber, fontSize: 20, fontWeight: 950, lineHeight: 1.08 }}>4,191ms</div>
              <div style={{ color: amber, fontSize: 11, fontWeight: 900 }}>-39%</div>
            </div>
            <div style={{ color: slate, fontSize: 18, fontWeight: 950, textAlign: 'center' }}>→</div>
            <div style={{ textAlign: 'center', border: '1px solid #bbf7d0', borderRadius: 10, background: '#ecfdf5', padding: '8px 10px' }}>
              <div style={{ color: muted, fontSize: 10.4, fontWeight: 900, marginBottom: 3 }}>Redis 캐시 후</div>
              <div style={{ color: green, fontSize: 20, fontWeight: 950, lineHeight: 1.08 }}>638ms</div>
              <div style={{ color: green, fontSize: 11, fontWeight: 900 }}>-91%</div>
            </div>
          </div>
          <div style={{ marginTop: 7, color: slate, fontSize: 11, lineHeight: 1.38, fontWeight: 760 }}>
            fetchJoin 단독 적용 시 39% 개선 · Redis 캐시 추가 후 최종 91% 개선 — 두 단계 각각의 기여를 수치로 확인
          </div>
        </Panel>
        <Panel pad={13} background="#f0fdf4" borderColor="#bbf7d0" accent={green}>
          <SectionLabel color={green}>Result Table</SectionLabel>
          <Rich html={extractTable(sec.result)} size={12.2} lineHeight={1.36} className="pdf-table-fit" />
        </Panel>
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
              같은 부하 조건에서 Before / After를 나란히 비교해<br />
              응답시간, TPS, 고부하 안정성 변화를 확인했습니다.
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
      <div style={{ display: 'grid', gridTemplateRows: '1.18fr 0.82fr', gap: 10, height: '100%' }}>
        <Panel pad={11} background={white} accent={red}>
          <SectionLabel color={red}>Problem</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 10, height: '100%' }}>
            <div style={{ color: slate, fontSize: 14.2, lineHeight: 1.45, fontWeight: 780 }}>
                중복 투표 방지 로직이 코드 레벨에만 존재하고, DB 유니크 제약이 없어 동시 요청 시
                <strong style={{ color: red, fontWeight: 950 }}> TOCTOU 취약점</strong>이 발생했습니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
                {[
                  ['원인', 'DB 제약 없음'],
                ['취약점', '중복 체크와 저장 사이 틈'],
                  ['결과', '중복 투표 삽입'],
                ].map(([label, value]) => (
                <div key={label} style={{ border: `1px solid #fecaca`, borderRadius: 11, background: '#fff7f7', padding: '12px 12px', display: 'grid', alignContent: 'center' }}>
                  <div style={{ color: red, fontSize: 11.2, fontWeight: 950, marginBottom: 5 }}>{label}</div>
                  <div style={{ color: navy, fontSize: 15, fontWeight: 950, lineHeight: 1.2 }}>{value}</div>
                  </div>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 8, alignItems: 'start' }}>
              <div style={{ color: red, fontSize: 12.5, fontWeight: 950 }}>수정 전 경쟁 구간</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignContent: 'start' }}>
                <div style={{ border: `1px solid #fecaca`, borderRadius: 12, background: '#fff7f7', padding: '11px 12px' }}>
                  <div style={{ color: red, fontSize: 12, fontWeight: 950, marginBottom: 5 }}>① 중복 체크</div>
                  <div style={{ color: slate, fontSize: 12.2, lineHeight: 1.36, fontWeight: 760 }}>
                    <strong style={{ color: red }}>existsByEventIdAndUserId</strong> 통과 후 저장 전까지 경쟁 구간이 생김
                  </div>
                </div>
                <div style={{ border: `1px solid #fecaca`, borderRadius: 12, background: '#fff7f7', padding: '11px 12px' }}>
                  <div style={{ color: red, fontSize: 12, fontWeight: 950, marginBottom: 5 }}>② 투표 저장</div>
                  <div style={{ color: slate, fontSize: 12.2, lineHeight: 1.36, fontWeight: 760 }}>
                    두 요청이 동시에 통과하면 <strong style={{ color: red }}>save</strong>가 중복 실행될 수 있음
                  </div>
                </div>
              </div>
              <a href="https://github.com/dbp-jack/FeedShop_Backend_Refactoring/wiki/%ED%94%BC%EB%93%9C-%ED%88%AC%ED%91%9C-%EB%8F%99%EC%8B%9C%EC%84%B1-%EA%B0%9C%EC%84%A0" style={{ color: blue, fontSize: 10.5, fontWeight: 900, textDecoration: 'none' }}>
                수정 전 코드·재현 근거 → Wiki
              </a>
            </div>
          </div>
        </Panel>
        <Panel pad={11} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 7 }}>
            <div style={{ overflow: 'hidden', borderRadius: 10, border: `1px solid ${line}` }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.15fr 1.55fr 0.72fr', background: '#f1f5f9', color: slate, fontSize: 9.6, fontWeight: 950 }}>
                {['검토안', '장점', '한계', '판단'].map((label) => <div key={label} style={{ padding: '5px 7px' }}>{label}</div>)}
              </div>
              {[
                ['코드 중복 검사', '구현 단순', '동시 요청이 검사를 함께 통과', '제외'],
                ['DB 내 저장·카운터 갱신', '트랜잭션 단일 처리', '락 교차로 데드락·처리량 저하', '제외'],
                ['DB 유니크 제약', '중복 물리 차단', '예외·카운터 락 별도 처리', '부분 적용'],
                ['제약 + NOT_SUPPORTED + INCR', '중복·예외·카운터 분리', 'DB·Redis 정합성 검증 필요', '최종 선택'],
              ].map(([option, strength, limit, decision], idx) => (
                <div key={option} style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.15fr 1.55fr 0.72fr', borderTop: `1px solid ${idx === 3 ? '#bfdbfe' : line}`, background: idx === 3 ? '#eff6ff' : white, color: navy, fontSize: 9.3, lineHeight: 1.25, fontWeight: 760 }}>
                  <div style={{ padding: '5px 7px', fontWeight: 920, color: idx === 3 ? blue : navy }}>{option}</div>
                  <div style={{ padding: '5px 7px' }}>{strength}</div>
                  <div style={{ padding: '5px 7px' }}>{limit}</div>
                  <div style={{ padding: '5px 7px', fontWeight: 950, color: idx === 3 ? blue : idx === 2 ? amber : red }}>{decision}</div>
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid #fdba74`, background: '#fffbeb', borderRadius: 10, padding: '8px 11px', color: '#9a3412', fontSize: 11.4, lineHeight: 1.34, fontWeight: 900 }}>
              중복 차단은 DB 제약으로 보장하고, 빈번한 카운터 갱신은 Redis 원자 연산으로 분리해 락 경합을 제거했습니다.
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
      <div style={{ display: 'grid', gridTemplateRows: '0.62fr 1.48fr 1.05fr', gap: 9, height: '100%' }}>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 8, height: '100%' }}>
            <div>
              <SectionLabel>Solution 1</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 17, lineHeight: 1.2, fontWeight: 950 }}>1단계 — DB 유니크 제약 추가</h2>
              <p style={{ margin: '6px 0 0', color: slate, fontSize: 12, lineHeight: 1.38, fontWeight: 780 }}>
                <strong>(event_id, voter_id)</strong> 조합에 유니크 제약을 걸어 DB 레벨에서 중복 투표를 차단
              </p>
            </div>
            <div style={{ borderRadius: 11, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '10px 12px', color: navy, fontSize: 12.2, lineHeight: 1.38, fontWeight: 820 }}>
              DB 제약은 중복 INSERT를 막는 <strong style={{ color: blue }}>최종 방어선</strong>
            </div>
          </div>
        </Panel>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 7, height: '100%' }}>
            <div>
              <SectionLabel>Solution 2</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 17, lineHeight: 1.2, fontWeight: 950 }}>2단계 — 저장 로직 분리 + 예외 처리</h2>
              <p style={{ margin: '6px 0 0', color: slate, fontSize: 12, lineHeight: 1.38, fontWeight: 780 }}>
                중복 삽입 시도는 <strong>DataIntegrityViolationException</strong>으로 감지하고, 예외 처리로 200 반환
              </p>
            </div>
            <div style={{ borderRadius: 9, border: '1px solid #fde68a', background: '#fffbeb', padding: '7px 10px' }}>
              <div style={{ color: '#92400e', fontSize: 9.6, fontWeight: 950, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 5 }}>NOT_SUPPORTED 선택 과정</div>
              <div style={{ display: 'grid', gap: 4 }}>
                {([
                  ['❌ 시도 1', 'REQUIRES_NEW → 내부 rollback이 외부 Hibernate Session 오염, 정상 작업(포인트 지급 등)까지 전부 실패'],
                  ['❌ 시도 2', 'noRollbackFor → JPA flush() 이전에 세션 오염 먼저 발생, 효과 없음'],
                  ['✅ 최종', 'NOT_SUPPORTED → saveVote·earnPoints·recordActivity 각각이 독립 트랜잭션, 예외가 다른 작업으로 전파되지 않음'],
                ] as const).map(([label, text]) => (
                  <div key={label} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 6, alignItems: 'start' }}>
                    <div style={{ color: '#92400e', fontSize: 10, fontWeight: 950, paddingTop: 1 }}>{label}</div>
                    <div style={{ color: '#78350f', fontSize: 10.6, lineHeight: 1.38, fontWeight: 760 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 10, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '9px 11px', color: navy, fontSize: 11.2, lineHeight: 1.4, fontWeight: 800 }}>
              저장·flush는 REQUIRED에서 끝내고, 트랜잭션 밖에서 지정된 유니크 제약 위반만 중복 응답으로 변환
            </div>
          </div>
        </Panel>
        <Panel pad={10} background={white} accent={blue}>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 7, height: '100%' }}>
            <div>
              <SectionLabel>Solution 3</SectionLabel>
              <h2 style={{ margin: 0, color: navy, fontSize: 17, lineHeight: 1.2, fontWeight: 950 }}>3단계 — Redis INCR 원자적 연산</h2>
              <p style={{ margin: '6px 0 0', color: slate, fontSize: 12, lineHeight: 1.38, fontWeight: 780 }}>
                카운터를 Redis로 분리해 DB 락 경합 자체를 제거
              </p>
            </div>
            <div style={{ borderRadius: 9, border: '1px solid #fde68a', background: '#fffbeb', padding: '7px 10px' }}>
              <div style={{ color: '#92400e', fontSize: 9.6, fontWeight: 950, letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: 4 }}>데드락 원인 · Redis INCR 선택</div>
              <div style={{ display: 'grid', gap: 3 }}>
                <div style={{ color: '#78350f', fontSize: 10.6, lineHeight: 1.38, fontWeight: 760 }}>
                  <strong>기존:</strong> feed_votes INSERT(event_id FK → S-lock) + feeds UPDATE(X-lock) 교차 → 두 잠금이 서로를 기다리는 <strong>데드락</strong> 발생
                </div>
                <div style={{ color: '#78350f', fontSize: 10.6, lineHeight: 1.38, fontWeight: 760 }}>
                  <strong>Redis INCR:</strong> DB 잠금 체계 바깥에서 단일 명령어로 카운터 처리 → lock 없이 데드락 구조적 제거
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 6, alignContent: 'center' }}>
              <div style={{ borderRadius: 10, border: '1px solid #bfdbfe', background: '#eff6ff', padding: '9px 11px', color: navy, fontSize: 11.2, lineHeight: 1.4, fontWeight: 800 }}>
                Redis 키 유실·장애 시 feed_votes COUNT를 원본으로 복구하고 정기 보정
              </div>
              <div style={{ color: '#92400e', fontSize: 10.4, lineHeight: 1.35, fontWeight: 800 }}>
                한계: DB·Redis 간 장애 구간의 실시간 강한 정합성과 투표 리워드 재처리는 보장 범위 밖
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
    ['정합성 검증 — DB count와 Redis count 일치', 'phase2b-redis-count-verify.png', 'Redis INCR 결과와 API 조회 count가 동일해 투표 수 정합성을 확인'],
    ['nGrinder — 동시 500명 요청 성공', 'vuser500_result.png', '평균 TPS 588.1 · 평균 응답 833ms · 68,548건 성공 / 오류 0건 — TPS가 대체로 550~650 구간을 유지'],
    ['nGrinder — 동시 1,000명 요청 성공', 'vuser1000_result.png', '평균 TPS 437.0 · 평균 응답 2.19초 · 48,231건 성공 / 오류 0건 — 부하 증가에 따른 응답 지연 확인'],
    ['nGrinder — 동시 3,000명 요청 성공', 'vuser3000_result.png', '평균 TPS 551.1 · 평균 응답 5.00초 · 63,026건 성공 / 오류 0건 — 정합성은 유지했지만 고부하 처리 지연 한계 확인'],
  ]
  const kpis = [
    ['에러율', '0%'],
    ['중복 투표', '0건'],
    ['정합성', '부하 테스트 구간에서 DB = Redis'],
    ['검증 구간', '500→3,000명'],
  ]

  return (
    <Slide eyebrow="FeedShop" title="문제 해결 2 — Result" subtitle="정합성 검증 · nGrinder 부하 테스트" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr)', gap: 10, height: '100%' }}>
        <Panel pad={12} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.16fr repeat(4, 0.72fr)', gap: 8, alignItems: 'center' }}>
            <div style={{ color: slate, fontSize: 13.1, lineHeight: 1.42, fontWeight: 830 }}>
              동시 500→3,000명 전 구간 <strong style={{ color: green }}>에러율 0%</strong>,
              <strong style={{ color: green }}> 중복 투표 0건</strong> 확인,
              <strong style={{ color: blue }}> DB count = Redis count</strong> 투표 수 정합성 검증
            </div>
            {kpis.map(([label, value]) => (
              <div key={label} style={{ textAlign: 'center', borderLeft: `1px solid #bbf7d0`, minHeight: 48, display: 'grid', alignContent: 'center' }}>
                <div style={{ color: green, fontSize: 19.5, fontWeight: 950, lineHeight: 1.08 }}>{value}</div>
                <div style={{ color: '#065f46', fontSize: 10.7, fontWeight: 850, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={10} background={white} accent={green}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, height: '100%' }}>
            {resultImages.map(([label, src, caption]) => (
              <div key={src} style={{ minHeight: 0, display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: 4 }}>
                <div style={{ color: navy, fontSize: 11.1, fontWeight: 950, lineHeight: 1.15 }}>{label}</div>
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
                <div style={{ color: slate, fontSize: 9.7, lineHeight: 1.25, fontWeight: 720 }}>{caption}</div>
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
}: {
  eyebrow: string
  subtitle: string
  reflection: NonNullable<typeof feedshop.projectReflection>
  evidence: string
}) {
  return (
    <Slide eyebrow={eyebrow} title="프로젝트 회고" subtitle={subtitle} dense>
      <div style={{ display: 'grid', alignContent: 'center', height: '100%' }}>
        <Panel pad={24} background={white} borderColor="#bfdbfe" accent={blue}>
          <SectionLabel>Retrospective</SectionLabel>
          <div style={{ color: navy, fontSize: 26, lineHeight: 1.18, fontWeight: 950, marginBottom: 18 }}>{reflection.title}</div>
          <Rich html={reflection.body} size={18} lineHeight={1.7} />
          <div style={{ marginTop: 18, color: muted, fontSize: 11.4, fontWeight: 760 }}>
            근거: {evidence}
          </div>
        </Panel>
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
      subtitle="두 핵심 흐름을 개선하며 느낀 점"
      reflection={reflection}
      evidence="FeedShop Wiki 성능 개선 작업 · 이벤트 조회 성능 및 피드 투표 동시성"
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
    />
  )
}

function M3ProblemThinkingSlide() {
  return (
    <Slide eyebrow="3M" title={m3.problemHeadline ?? '인증 구조 설계 및 서비스 경계 문제'} subtitle="Problem · Thinking" dense>
      <div style={{ display: 'grid', gridTemplateRows: '0.72fr 1.35fr', gap: 11, height: '100%' }}>
        <Panel pad={13} background={white} accent={red}>
          <SectionLabel color={red}>Problem</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 10, height: '100%' }}>
            <div style={{ color: slate, fontSize: 14.6, lineHeight: 1.45, fontWeight: 800 }}>
              Auth·User를 하나로 두는 안과 요청마다 User를 조회하는 안을 비교해,
              책임 경계와 인증 컨텍스트 전달 방식을 결정했습니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
              {[
                ['책임 혼재', '인증 정책 변경 시 User 도메인까지 배포 영향 확산'],
                ['요청별 재조회 대안', '최신 role은 반영하지만 호출 증가·User 장애 전파 위험'],
                ['JWT 컨텍스트 대안', '일반 권한 판단을 Gateway로 집중해 인증 경로 단순화'],
              ].map(([title, desc]) => (
                <div key={title} style={{ border: `1px solid #fecaca`, borderRadius: 12, background: '#fff7f7', padding: '12px 14px', display: 'grid', alignContent: 'center', gap: 7, minHeight: 70 }}>
                  <div style={{ color: red, fontSize: 13, fontWeight: 950 }}>{title}</div>
                  <div style={{ color: slate, fontSize: 13.3, lineHeight: 1.4, fontWeight: 780 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Panel pad={14} background={white} accent={amber}>
          <SectionLabel color={amber}>Thinking</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 9, height: '100%' }}>
            <div style={{ color: slate, fontSize: 13, fontWeight: 780, lineHeight: 1.38 }}>
              문제를 서비스 경계와 인증 컨텍스트 전달 두 레이어로 분리해 비교했습니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 9, minHeight: 0 }}>
              {[
                {
                  title: '서비스 경계',
                  rows: [
                    ['책임 혼재', '구현·공유 간단', '정책 변경이 User 배포까지 확산', '제외'],
                    ['Auth/User 분리', '변경·배포 경계 분리', '서비스 간 계약 관리 필요', '선택'],
                  ],
                },
                {
                  title: '인증 컨텍스트 전달',
                  rows: [
                    ['요청별 User 재조회', '최신 role 즉시 반영', '호출 증가·User 장애 전파', '제외'],
                    ['Gateway 로컬 캐시', 'User 호출 감소', '캐시 불일치·무효화', '제외'],
                    ['JWT userId·role', '일반 경로에서 Gateway 권한 판단', '클레임·헤더 계약 관리', '선택'],
                  ],
                },
              ].map((group) => (
                <div key={group.title} style={{ overflow: 'hidden', borderRadius: 11, border: `1px solid ${line}`, alignSelf: 'stretch' }}>
                  <div style={{ background: '#f1f5f9', color: navy, fontSize: 11.5, fontWeight: 950, padding: '7px 8px' }}>{group.title}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.05fr 1.35fr 0.65fr', background: '#f8fafc', color: slate, fontSize: 8.6, fontWeight: 950 }}>
                    {['검토안', '장점', '한계', '판단'].map((label) => <div key={label} style={{ padding: '5px 6px' }}>{label}</div>)}
                  </div>
                  {group.rows.map(([option, strength, limit, decision]) => {
                    const selected = decision === '선택'
                    return (
                      <div key={option} style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.05fr 1.35fr 0.65fr', borderTop: `1px solid ${selected ? '#bfdbfe' : line}`, background: selected ? '#eff6ff' : white, color: navy, fontSize: 8.8, lineHeight: 1.28, fontWeight: 760 }}>
                        <div style={{ padding: '6px', fontWeight: 920, color: selected ? blue : navy }}>{option}</div>
                        <div style={{ padding: '6px' }}>{strength}</div>
                        <div style={{ padding: '6px' }}>{limit}</div>
                        <div style={{ padding: '6px', fontWeight: 950, color: selected ? blue : red }}>{decision}</div>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid #fdba74`, background: '#fffbeb', borderRadius: 11, padding: '11px 13px', color: '#9a3412', fontSize: 12.6, lineHeight: 1.38, fontWeight: 900 }}>
              Auth와 User는 변경되는 이유(인증 정책 vs 사용자 정보)가 서로 다르므로 분리했고,
              <br />
              일반 권한 판단은 JWT 컨텍스트로 Gateway에서 처리하는 안을 적용했습니다.
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function M3SolutionSlide() {
  return (
    <Slide eyebrow="3M" title="Solution" subtitle="서비스 경계 분리와 인증 흐름 단순화" dense>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, height: '100%' }}>
        <Panel pad={14} background={white} accent={blue}>
          <SectionLabel>Solution 1</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 10, height: '100%' }}>
            <div>
              <div style={{ color: navy, fontSize: 19, fontWeight: 950, lineHeight: 1.15, marginBottom: 7 }}>
                1단계 — 서비스 경계 분리
              </div>
              <div style={{ color: slate, fontSize: 13.4, lineHeight: 1.42, fontWeight: 780 }}>
                인증은 <strong>Auth</strong> 모듈, 사용자 관리는 <strong>User</strong> 모듈로 분리해 서비스 경계를 명확히 했습니다.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                ['Auth', '로그인/회원가입 처리'],
                ['JWT', 'access/refresh 발급 · userId · role 포함'],
              ].map(([label, text]) => (
                <div key={label} style={{ border: '1px solid #bfdbfe', background: '#eff6ff', borderRadius: 11, padding: '11px 12px' }}>
                  <div style={{ color: blue, fontSize: 12, fontWeight: 950, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: navy, fontSize: 12.3, lineHeight: 1.34, fontWeight: 800 }}>{text}</div>
                </div>
              ))}
            </div>
            <div style={{ minHeight: 0, border: `1px solid ${line}`, borderRadius: 12, background: soft, padding: '7px 8px 8px', display: 'grid', gridTemplateRows: '1fr auto', gap: 6 }}>
              <img
                src={asset('3m-auth-user-class-diagram.png')}
                alt="Auth/User 도메인 분리 클래스 구조"
                style={{ width: '100%', height: '100%', maxHeight: '68mm', objectFit: 'contain', display: 'block' }}
              />
              <div style={{ color: muted, fontSize: 10.3, lineHeight: 1.22, fontWeight: 720, textAlign: 'right' }}>
                Auth/User 도메인 분리 클래스 구조 — Auth는 인증에 필요한 최소 정보만 보관, Feign으로 단방향 통신
              </div>
            </div>
          </div>
        </Panel>
        <Panel pad={14} background={white} accent={blue}>
          <SectionLabel>Solution 2</SectionLabel>
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 11, height: '100%' }}>
            <div>
              <div style={{ color: navy, fontSize: 18, fontWeight: 950, lineHeight: 1.15, marginBottom: 6 }}>
                2단계 — 인증 흐름 단순화
              </div>
              <div style={{ color: slate, fontSize: 12.8, lineHeight: 1.38, fontWeight: 780 }}>
                Gateway 인증 필터에서 JWT를 검증하고 <strong>X-User-*</strong> 헤더로 사용자 컨텍스트를 전달했습니다.
              </div>
            </div>
            <div style={{ display: 'grid', gap: 7 }}>
              {[
                ['Gateway', 'JWT 검증 후 사용자 컨텍스트 전달'],
                ['일반 권한 판단', '상세 정보가 필요한 경우에만 User 호출'],
                ['AOP 권한 제어', '@RequiresMasterRole로 역할 체크 로직 통합'],
              ].map(([label, text]) => (
                <div key={label} style={{ border: '1px solid #bfdbfe', background: '#eff6ff', borderRadius: 10, padding: '9px 11px', display: 'grid', gridTemplateColumns: '104px 1fr', gap: 10, alignItems: 'center' }}>
                  <div style={{ color: blue, fontSize: 11.8, fontWeight: 950 }}>{label}</div>
                  <div style={{ color: navy, fontSize: 12.2, lineHeight: 1.34, fontWeight: 800 }}>{text}</div>
                </div>
              ))}
            </div>
            <div style={{ minHeight: 0, border: `1px solid #bfdbfe`, borderRadius: 12, background: '#f8fbff', padding: 12, display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 9 }}>
              <div style={{ color: blue, fontSize: 12.2, fontWeight: 950, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Gateway 중심 인증 흐름
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: 8 }}>
                {[
                  ['Client', 'JWT 포함 요청'],
                  ['Gateway', 'JWT 검증'],
                  ['Service', 'X-User-* 헤더 기반 처리'],
                ].map(([title, desc], idx) => (
                  <React.Fragment key={title}>
                    <div style={{ border: `1px solid ${idx === 1 ? blue : line}`, background: idx === 1 ? '#eff6ff' : white, borderRadius: 13, padding: '11px 9px', minHeight: 72, display: 'grid', alignContent: 'center', textAlign: 'center' }}>
                      <div style={{ color: idx === 1 ? blue : navy, fontSize: 16, fontWeight: 950, lineHeight: 1.1, marginBottom: 7 }}>{title}</div>
                      <div style={{ color: slate, fontSize: 11.7, lineHeight: 1.28, fontWeight: 760 }}>{desc}</div>
                    </div>
                    {idx < 2 ? (
                      <div style={{ color: blue, fontSize: 22, fontWeight: 950 }}>→</div>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div style={{ border: '1px solid #ddd6fe', background: '#f5f3ff', borderRadius: 11, padding: '10px 11px' }}>
                  <div style={{ color: violet, fontSize: 11.5, fontWeight: 950, marginBottom: 4 }}>권한 판단</div>
                  <div style={{ color: navy, fontSize: 12, lineHeight: 1.32, fontWeight: 800 }}>AOP(@RequiresMasterRole)로 역할 체크 통합</div>
                </div>
                <div style={{ border: '1px solid #bbf7d0', background: '#ecfdf5', borderRadius: 11, padding: '10px 11px' }}>
                  <div style={{ color: green, fontSize: 11.5, fontWeight: 950, marginBottom: 4 }}>호출 최소화</div>
                  <div style={{ color: navy, fontSize: 12, lineHeight: 1.32, fontWeight: 800 }}>추가 정보 필요 시에만 User 서비스 선택 호출</div>
                </div>
              </div>
            </div>
            <div>
              <div style={{ border: '1px solid #c4b5fd', background: '#f5f3ff', borderRadius: 10, padding: '9px 12px', color: navy, fontSize: 12.4, lineHeight: 1.35, fontWeight: 880 }}>
                일반 요청의 권한은 Gateway에서 판단하고, 사용자 상세 정보가 필요한 경우에만 User를 호출합니다.
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

function M3ResultSlide() {
  return (
    <Slide eyebrow="3M" title="Result" subtitle="결합도 제거와 인증 흐름 영향 범위 축소" dense>
      <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', gap: 11, height: '100%' }}>
        <Panel pad={14} background="#ecfdf5" borderColor="#a7f3d0" accent={green}>
          <SectionLabel color={green}>Result Summary</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              ['결합도(CBO) 0건', 'UserService → Auth', '인증 정책 변경 시 User 모듈 배포 영향 제거', green],
              ['단방향', 'Auth → User', 'Feign 호출용 DTO 중심 참조 · 순환 의존 없음', blue],
              ['Gateway', '권한 판단', 'JWT payload 기반 일반 인증 경로 처리', violet],
            ].map(([value, label, caption, color]) => (
              <div key={label} style={{ border: `1px solid ${color}33`, borderRadius: 13, background: white, padding: '16px 15px', minHeight: 98, display: 'grid', alignContent: 'center', textAlign: 'center' }}>
                <div style={{ color, fontSize: 21, fontWeight: 950, lineHeight: 1.05, marginBottom: 6 }}>{value}</div>
                <div style={{ color: navy, fontSize: 12.6, fontWeight: 900, marginBottom: 5 }}>{label}</div>
                <div style={{ color: slate, fontSize: 11.3, lineHeight: 1.28, fontWeight: 720 }}>{caption}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel pad={13} background="#f8fbff" borderColor="#bfdbfe" accent={blue}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: 10 }}>
            {[
              ['정책 변경', 'Auth·Gateway 중심으로 반영', blue],
              ['변경 영향 분리', 'User 모듈 배포 영향 제거', green],
              ['인증 처리', 'Gateway에서 권한 판단', violet],
            ].map(([title, desc, color], idx) => (
              <React.Fragment key={title}>
                <div style={{ border: `1px solid ${color}33`, background: white, borderRadius: 12, padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ color, fontSize: 14.8, fontWeight: 950, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: slate, fontSize: 12.1, lineHeight: 1.3, fontWeight: 760 }}>{desc}</div>
                </div>
                {idx < 2 ? <div style={{ color: blue, fontSize: 21, fontWeight: 950 }}>→</div> : null}
              </React.Fragment>
            ))}
          </div>
        </Panel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, minHeight: 0 }}>
          {[
            ['배포 영향 제거', '인증 정책 변경 시 User 모듈 배포 영향 제거', 'Auth·Gateway 중심으로 인증 정책 변경 범위를 제한했습니다.', green],
            ['순환 의존 없음', 'Feign DTO 중심의 단방향 참조로 제한', 'Auth → User 흐름은 유지하되 역방향 참조가 생기지 않도록 경계를 고정했습니다.', blue],
            ['변경 범위 수렴', '한 도메인 수정이 다른 도메인 배포로 이어지지 않는 구조 확보', '인증 정책과 사용자 정책의 변경 이유를 각 모듈 안으로 수렴시켰습니다.', violet],
          ].map(([title, headline, body, color], idx) => (
            <Panel key={title} pad={15} background={white} accent={color}>
              <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 11 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 31, height: 31, borderRadius: 9, display: 'grid', placeItems: 'center', color: white, background: color, fontSize: 13.2, fontWeight: 950 }}>
                    {idx + 1}
                  </div>
                  <div style={{ color, fontSize: 12.2, fontWeight: 950, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{title}</div>
                </div>
                <div style={{ color: navy, fontSize: 18.2, lineHeight: 1.24, fontWeight: 950 }}>{headline}</div>
                <div style={{ border: `1px solid ${color}24`, background: `${color}0d`, borderRadius: 12, padding: '13px 13px', color: slate, fontSize: 13.7, lineHeight: 1.43, fontWeight: 760, alignSelf: 'stretch', display: 'grid', alignContent: 'center' }}>{body}</div>
              </div>
            </Panel>
          ))}
        </div>
        <div style={{ border: `1px solid ${line}`, background: soft, borderRadius: 12, padding: '12px 14px', color: slate, fontSize: 11.7, lineHeight: 1.4, fontWeight: 720 }}>
          ※ CBO: 소스 코드 import 정적 분석으로 측정 — 실제 코드에서 참조된 외부 클래스 수 기준
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
                    <div style={{ color, fontSize: 11.2, fontWeight: 950, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>{block.titleEn}</div>
                    <div style={{ fontSize: 20.5, fontWeight: 950, color: navy, lineHeight: 1.18 }}>{block.titleKo}</div>
                  </div>
                  <i className={block.icon} style={{ marginLeft: 'auto', color, fontSize: 28, opacity: 0.85 }} />
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

function ResourcesContactSlide() {
  return (
    <Slide eyebrow={RESOURCES_SECTION.kicker} title="자료 모음 · 연락하기" subtitle="프로젝트 문서와 연락 채널을 마지막에 정리했습니다." dense>
      <div style={{ display: 'grid', gridTemplateColumns: '1.32fr 0.82fr', gap: 14, height: '100%' }}>
        <Panel pad={16} background="#f8fbff" accent={green}>
          <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', gap: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <i className="ri-links-line" style={{ color: green, fontSize: 23 }} />
              <div>
                <SectionLabel color={green}>{RESOURCES_SECTION.title}</SectionLabel>
                <div style={{ color: slate, fontSize: 12.8, fontWeight: 760 }}>프로젝트 기획, 협업 가이드, 실습 기록을 확인할 수 있는 자료입니다.</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {RESOURCE_LINKS.map((link, idx) => (
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
                    <div style={{ width: 26, height: 26, borderRadius: 8, display: 'grid', placeItems: 'center', background: '#ecfdf5', color: green, fontSize: 15, fontWeight: 950 }}>
                      <i className={link.icon} />
                    </div>
                    <div style={{ color: green, fontSize: 10.4, fontWeight: 950, letterSpacing: '0.09em' }}>RESOURCE {String(idx + 1).padStart(2, '0')}</div>
                    <i className="ri-arrow-right-up-line" style={{ marginLeft: 'auto', color: green, fontSize: 14 }} />
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
              <div style={{ color: '#93c5fd', fontSize: 12, fontWeight: 950, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>Contact</div>
              <div style={{ color: white, fontSize: 32, fontWeight: 950, lineHeight: 1.05, marginBottom: 8 }}>{HERO_NAME}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13.2, lineHeight: 1.4, fontWeight: 760 }}>백엔드 개발자로서 수치 검증과 구조 설계를 바탕으로 문제를 끝까지 해결합니다.</div>
            </div>
            <div style={{ display: 'grid', alignContent: 'center', gap: 12 }}>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href?.startsWith('http') ? '_blank' : undefined}
                  rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 11, alignItems: 'center', textDecoration: 'none' }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center', background: '#1e293b', color: '#93c5fd', fontSize: 18 }}>
                    <i className={link.icon} />
                  </div>
                  <div style={{ color: '#e2e8f0', fontSize: 14.2, fontWeight: 850, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.label}</div>
                </a>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #334155', paddingTop: 13, color: '#94a3b8', fontSize: 10.8, lineHeight: 1.4, fontWeight: 720 }}>
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
      <CollaborationSlide />

      <ProjectCaseCover
        eyebrow="Backend Case Study 01"
        projectName="FeedShop"
        statement="이벤트 조회 병목과 투표 동시성을 수치로 검증하며 해결했습니다."
        description="커뮤니티 재방문 구조의 핵심인 이벤트 참여 흐름을 지키기 위해, 조회 성능과 투표 정합성을 각각 다른 부하 축으로 분리해 접근했습니다."
        metrics={[
          { label: '응답시간 단축', value: '-91%', caption: '동시 1,000명 기준 6,818ms → 638ms', color: green },
          { label: 'SQL Count', value: '42 → 0', caption: 'fetchJoin + Redis Cache Hit', color: blue },
          { label: '중복 투표', value: '0건', caption: '동시 3,000명 부하 테스트 구간', color: violet },
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
      <FeedShopReflectionSlide />

      <ProjectCaseCover
        eyebrow="Backend Case Study 02"
        projectName="3M"
        statement="Auth·User·Gateway 책임을 분리해 인증 흐름의 결합도를 낮췄습니다."
        description="다수 서비스가 연결되는 B2B 물류 시스템에서 인증 정책 변경과 사용자 조회 장애가 전체 인증 흐름으로 번지지 않도록 서비스 경계를 재설계했습니다."
        metrics={[
          { label: 'UserService → Auth', value: 'CBO 0건', caption: '인증 정책 변경 시 User 배포 영향 제거', color: green },
          { label: 'Auth → User', value: '단방향', caption: 'Feign DTO 중심 참조 · 순환 의존 없음', color: blue },
          { label: '인증 판단', value: 'Gateway', caption: 'JWT payload 기반 일반 권한 판단', color: violet },
        ]}
      />
      <ProjectIntroSlide project={m3} title="3M" />
      <ArchitectureSlide project={m3} title="3M" />
      <M3ProblemThinkingSlide />
      <M3SolutionSlide />
      <M3ResultSlide />
      <M3ReflectionSlide />

      <ExperienceSlide />
      <ClosingSlide />
      <ResourcesContactSlide />
    </>
  )
}
