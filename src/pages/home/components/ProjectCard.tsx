import { Fragment } from 'react'
import type { ProjectData, ProjectRoleItem } from '@/content/projects/types'
import { useDarkMode } from '@/hooks/useDarkMode'

type Props = { project: ProjectData; index: number }

const IS_DEV = import.meta.env.DEV
const devWarnedKeys = new Set<string>()
const ALLOWED_RICH_TAGS = new Set([
  'a',
  'b',
  'br',
  'caption',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'i',
  'img',
  'li',
  'ol',
  'p',
  'span',
  'strong',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
])

function warnDevOnce(key: string, message: string): void {
  if (!IS_DEV || devWarnedKeys.has(key)) return
  devWarnedKeys.add(key)
  console.warn(`[ProjectCard] ${message}`)
}

/** "한글 (English)" 형태면 괄호를 없애고 두 줄로 나눕니다. */
function splitJourneyStep(step: string): { ko: string; en?: string } {
  const t = step.trim()
  const m = t.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
  if (m) return { ko: m[1].trim(), en: m[2].trim() }
  return { ko: t }
}

/** 제목·내용이 모두 비어 있으면 빈 카드가 생기므로 렌더에서 제외합니다. */
function filterFilledRoles(roles: ProjectRoleItem[]): ProjectRoleItem[] {
  return roles.filter((r) => (r.title?.trim() ?? '').length > 0 || (r.detail?.trim() ?? '').length > 0)
}

function ProjectBackgroundCard({
  title,
  body,
  dark,
  className = '',
}: {
  title: string
  body?: string
  dark: boolean
  className?: string
}) {
  if (!(body?.trim() ?? '').length) return null
  return (
    <div
      className={`${className} rounded-xl border p-3.5 sm:p-4 ${
        dark
          ? 'border-[#3d3d45] bg-[#2e2e2e] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
          : 'border-indigo-100/80 bg-white shadow-sm'
      }`}
    >
      <p
        className={`mb-2.5 text-lg font-semibold uppercase tracking-wide md:text-xl ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
      >
        {title}
      </p>
      <p
        lang="ko"
        className={`whitespace-pre-line break-keep text-[0.95rem] leading-[1.68] md:text-base ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}
        dangerouslySetInnerHTML={{ __html: body ?? '' }}
      />
    </div>
  )
}

type PerspectiveVariant = 'user' | 'design'

type PerspectiveCardNormalized = {
  title: string
  problem: string
  direction: string
  problemBullets?: string[]
  directionBullets?: string[]
}

type PerspectivePlanningNormalized = {
  variant: PerspectiveVariant
  sectionTitle: string
  subtitle: string
  problemLabel: string
  directionLabel: string
  cards: PerspectiveCardNormalized[]
}

function parseBulletLines(text: string): string[] | undefined {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  if (!lines.length) return undefined

  const bullets = lines.map((line) => line.replace(/^·\s*/, '').trim()).filter(Boolean)

  // 줄이 2개 이상이면 bullet 레이아웃으로 통일해 일관성을 유지한다.
  return bullets.length >= 2 ? bullets : undefined
}

function validateBulletLabelFormat(
  bullets: string[] | undefined,
  label: string,
  contextKey: string,
): void {
  if (!bullets?.length) return
  const first = bullets[0]
  // 라벨이 섞여 들어온 경우 포맷(예: "설계 판단 · ...")을 느슨하게 점검한다.
  if (first.startsWith(label) && !first.startsWith(`${label} · `)) {
    warnDevOnce(
      `bullet-label-${contextKey}-${label}`,
      `${contextKey}: 첫 bullet 라벨 형식이 "${label} · ..." 형태가 아닙니다.`,
    )
  }
}

function normalizePerspectivePlanning(project: ProjectData): PerspectivePlanningNormalized | null {
  const u = project.userPerspectivePlanning
  if (u?.cards?.length) {
    return {
      variant: 'user',
      sectionTitle: '사용자 관점에서 바라본 기획',
      subtitle: u.subtitle,
      problemLabel: '사용자 문제',
      directionLabel: '설계 방향',
      cards: u.cards.map((c) => ({
        title: c.title,
        problem: c.userProblem ?? '',
        direction: c.designDirection ?? '',
        problemBullets: c.problemBullets,
        directionBullets: c.directionBullets,
      })),
    }
  }
  const d = project.designPerspectivePlanning
  if (d?.cards?.length) {
    return {
      variant: 'design',
      sectionTitle: '설계 결정의 배경',
      subtitle: d.subtitle,
      problemLabel: '인식한 문제',
      directionLabel: '설계 판단',
      cards: d.cards.map((c) => ({
        title: c.title,
        problem: c.recognizedProblem,
        direction: c.designJudgment,
        problemBullets: parseBulletLines(c.recognizedProblem),
        directionBullets: parseBulletLines(c.designJudgment),
      })),
    }
  }
  return null
}

function getOverviewSection(project: ProjectData): { title: string; body: string } | null {
  const sv = project.serviceOverview?.trim()
  if (sv) return { title: '서비스 소개', body: project.serviceOverview! }
  const po = project.projectOverview?.trim()
  if (po) return { title: '프로젝트 개요', body: project.projectOverview! }
  return null
}

function perspectivePillClass(kind: 'problem' | 'direction', variant: PerspectiveVariant, dark: boolean): string {
  if (variant === 'user') {
    if (kind === 'problem') {
      return dark
        ? 'border border-red-900/45 bg-red-950/35 text-red-200'
        : 'border border-red-200/90 bg-red-50 text-red-800'
    }
    return dark
      ? 'border border-emerald-900/40 bg-emerald-950/30 text-emerald-200'
      : 'border border-emerald-200/90 bg-emerald-50 text-emerald-900'
  }
  if (kind === 'problem') {
    return dark
      ? 'border border-amber-900/45 bg-amber-950/35 text-amber-200'
      : 'border border-amber-200/90 bg-amber-50 text-amber-900'
  }
  return dark
    ? 'border border-[#2a3d66] bg-[#1e2a45]/90 text-[#9eb8f0]'
    : 'border border-indigo-200/90 bg-indigo-50 text-[#1e3a8a]'
}

function perspectiveCellShell(kind: 'problem' | 'direction', variant: PerspectiveVariant, dark: boolean): string {
  if (variant === 'user') {
    if (kind === 'problem') {
      return dark ? 'bg-[#2a2222]/55' : 'bg-red-50/45'
    }
    return dark ? 'bg-[#1f2a24]/50' : 'bg-emerald-50/40'
  }
  if (kind === 'problem') {
    return dark ? 'bg-[#2a2618]/45' : 'bg-amber-50/35'
  }
  return dark ? 'bg-[#1a1f2e]/50' : 'bg-indigo-50/35'
}

function ProjectPerspectivePlanningSection({
  data,
  dark,
  userJourneyFlowSteps,
}: {
  data: PerspectivePlanningNormalized
  dark: boolean
  /** 사용자 관점(variant: user)일 때만: 같은 섹션 안에 사용자 여정을 함께 둡니다. */
  userJourneyFlowSteps?: string[] | null
}) {
  if (!data.cards?.length) return null
  const { variant } = data
  const showUserJourneyInside =
    variant === 'user' && userJourneyFlowSteps && userJourneyFlowSteps.length > 0
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 ${
        dark
          ? 'border-[#3d3d45] bg-[#262626]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
          : 'border-indigo-100/80 bg-[#f8faff] shadow-[0_1px_0_rgba(30,58,95,0.06)]'
      }`}
    >
      <div className="mb-4 sm:mb-5">
        <p
          className={`text-xl font-semibold uppercase tracking-wide ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
        >
          {data.sectionTitle}
        </p>
        {data.subtitle.trim() ? (
          <p
            lang="ko"
            className={`mt-2.5 break-keep text-base leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}
          >
            {data.subtitle}
          </p>
        ) : null}
      </div>
      <div className="space-y-4">
        {data.cards.map((card, idx) => (
          <div
            key={card.title.trim() ? card.title : `perspective-card-${idx}`}
            className={`overflow-hidden rounded-xl border ${
              dark ? 'border-[#3a3a3e] bg-[#2e2e2e]' : 'border-slate-200/90 bg-white shadow-sm'
            }`}
          >
            {card.title.trim() ? (
              <div
                className={`border-b px-4 py-3 sm:px-5 ${
                  dark
                    ? 'border-[#3a3a3a] bg-[#333333]/90'
                    : 'border-slate-100 bg-gradient-to-br from-white to-slate-50/80'
                }`}
              >
                <p className={`text-[0.9375rem] font-bold leading-snug tracking-tight ${dark ? 'text-[#ececec]' : 'text-gray-900'}`}>
                  {card.title}
                </p>
              </div>
            ) : null}
            {card.problemBullets?.length && card.directionBullets?.length ? (
              <div className={`space-y-5 px-4 py-4 sm:px-5 sm:py-5 ${dark ? 'bg-[#2f2f2f]/40' : 'bg-slate-50/40'}`}>
                <div>
                  <ul
                    lang="ko"
                    className={`mt-3 list-none space-y-2 pl-0 text-base leading-[1.72] ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}
                  >
                    {card.problemBullets.map((line, i) => (
                      <li key={`perspective-${idx}-pb-${i}`} className="flex gap-2.5 break-keep [line-break:strict]">
                        <span className={`shrink-0 select-none ${dark ? 'text-slate-700' : 'text-slate-400'}`}>·</span>
                        <span>
                          {i === 0 ? (
                            <>
                              <span className={`font-extrabold ${dark ? 'text-[#f2f2f2]' : 'text-slate-900'}`}>
                                {data.problemLabel} ·{' '}
                              </span>
                              {line.startsWith(`${data.problemLabel} · `)
                                ? line.replace(`${data.problemLabel} · `, '')
                                : line}
                            </>
                          ) : (
                            line
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul
                    lang="ko"
                    className={`mt-3 list-none space-y-2 pl-0 text-base leading-[1.72] ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}
                  >
                    {card.directionBullets.map((line, i) => (
                      <li key={`perspective-${idx}-db-${i}`} className="flex gap-2.5 break-keep [line-break:strict]">
                        <span className={`shrink-0 select-none ${dark ? 'text-slate-700' : 'text-slate-400'}`}>·</span>
                        <span>
                          {i === 0 ? (
                            <>
                              <span className={`font-extrabold ${dark ? 'text-[#f2f2f2]' : 'text-slate-900'}`}>
                                {data.directionLabel} ·{' '}
                              </span>
                              {line.startsWith(`${data.directionLabel} · `)
                                ? line.replace(`${data.directionLabel} · `, '')
                                : line}
                            </>
                          ) : (
                            line
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 divide-y ${
                  dark ? 'divide-[#3a3a3a]' : 'divide-slate-200/80'
                } md:grid-cols-2 md:divide-x md:divide-y-0`}
              >
                <div className={`min-w-0 px-4 py-4 sm:px-5 sm:py-4 ${perspectiveCellShell('problem', variant, dark)}`}>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide ${perspectivePillClass('problem', variant, dark)}`}
                  >
                    {data.problemLabel}
                  </span>
                  <p
                    lang="ko"
                    className={`mt-3 whitespace-pre-line break-keep text-base leading-[1.72] [line-break:strict] ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}
                  >
                    {card.problem}
                  </p>
                </div>
                <div className={`min-w-0 px-4 py-4 sm:px-5 sm:py-4 ${perspectiveCellShell('direction', variant, dark)}`}>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-1 text-[0.6875rem] font-bold tracking-wide ${perspectivePillClass('direction', variant, dark)}`}
                  >
                    {data.directionLabel}
                  </span>
                  <p
                    lang="ko"
                    className={`mt-3 whitespace-pre-line break-keep text-base leading-[1.72] [line-break:strict] ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}
                  >
                    {card.direction}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showUserJourneyInside ? (
        <div
          className={`mt-5 border-t pt-5 ${dark ? 'border-[#3d3d45]' : 'border-slate-200/90'}`}
        >
          <ProjectUserJourneySection
            flowSteps={userJourneyFlowSteps}
            dark={dark}
            stacked
            embeddedInPerspective
          />
        </div>
      ) : null}
    </div>
  )
}

function ProjectUserJourneySection({
  flowSteps,
  dark,
  stacked,
  embeddedInPerspective,
}: {
  flowSteps: string[]
  dark: boolean
  /** true면 바깥 `mb-6`을 제거하고, 위쪽 카드 블록(`space-y-3`) 안에 넣습니다. */
  stacked?: boolean
  /** `사용자 관점에서 바라본 기획` 카드 내부에 넣을 때 상단 구분선은 바깥에서 처리합니다. */
  embeddedInPerspective?: boolean
}) {
  if (flowSteps.length === 0) return null
  return (
    <div className={stacked || embeddedInPerspective ? undefined : 'mb-6'}>
      <p
        className={`mb-3 text-xl font-semibold uppercase tracking-wide ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
      >
        사용자 여정
      </p>
      <div
        className={`mx-auto max-w-3xl rounded-lg border p-4 ${
          dark ? 'border-[#3a3a3a] bg-[#252525]' : 'border-blue-100 bg-[#F8FAFF]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          {flowSteps.map((step, i) => {
            const { ko, en } = splitJourneyStep(step)
            return (
              <Fragment key={step + i}>
                <span
                  className={`inline-flex min-w-[5.5rem] max-w-[11rem] flex-col items-center justify-center rounded-2xl border px-2.5 py-1.5 text-center text-sm font-semibold leading-snug ${
                    dark
                      ? 'border-[#4a4a4a] bg-[#333333] text-[#ececec]'
                      : 'border-[#1E3A5F]/20 bg-white text-[#1E3A5F]'
                  }`}
                >
                  <span className="leading-tight">{ko}</span>
                  {en ? (
                    <span
                      className={`mt-1 text-[0.625rem] font-medium leading-tight tracking-normal ${
                        dark ? 'text-[#d1d5db]' : 'text-slate-700'
                      }`}
                    >
                      {en}
                    </span>
                  ) : null}
                </span>
                {i < flowSteps.length - 1 && (
                  <span className={`text-sm font-semibold ${dark ? 'text-[#6a6a6a]' : 'text-gray-400'}`}>→</span>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const getLabelColors = (dark: boolean): Record<string, string> => ({
  Problem: dark
    ? 'bg-[#3d2e2e] text-[#d08080] border border-[#5a3a3a]'
    : 'bg-red-50 text-red-600 border border-red-200',
  Thinking: dark
    ? 'bg-[#3d3520] text-[#c8a84a] border border-[#5a4a28]'
    : 'bg-amber-50 text-amber-700 border border-amber-200',
  Solution: dark
    ? 'bg-[#1e3328] text-[#6abf8a] border border-[#2a4d38]'
    : 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Result: dark
    ? 'bg-[#2a2a3a] text-[#9090c0] border border-[#3a3a55]'
    : 'bg-[#EFF6FF] text-[#2563EB] border border-blue-200',
})

function ProblemRow({
  label,
  content,
  dark,
}: {
  label: string
  content: string
  dark: boolean
}) {
  const labelColors = getLabelColors(dark)
  const rowKey = label.toLowerCase()
  if (content.includes('<')) {
    const tags = [...content.matchAll(/<\/?([a-zA-Z0-9-]+)\b/g)].map((m) => m[1].toLowerCase())
    const unknown = [...new Set(tags.filter((tag) => !ALLOWED_RICH_TAGS.has(tag)))]
    if (unknown.length > 0) {
      warnDevOnce(
        `rich-tag-${label}-${unknown.join(',')}`,
        `${label}: 허용되지 않은 HTML 태그(${unknown.join(', ')})가 포함되어 있습니다.`,
      )
    }
  }
  return (
    <div className={`pdf-problem-row pdf-problem-row-${rowKey} flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4`}>
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1 text-sm font-semibold ${labelColors[label]}`}
      >
        {label}
      </span>
      {content.includes('<') ? (
        <div
          className={`project-rich-content w-full overflow-x-auto pt-0.5 text-base leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p
          className={`w-full whitespace-pre-line pt-0.5 text-base leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}
        >
          {content}
        </p>
      )}
    </div>
  )
}

export default function ProjectCard({ project, index }: Props) {
  const { dark } = useDarkMode()
  const overviewSection = getOverviewSection(project)
  const perspectiveSection = normalizePerspectivePlanning(project)
  const usePlanningVariantTop = !!(overviewSection || perspectiveSection)
  const hasPlanning = (project.planningBackground?.trim() ?? '').length > 0
  const hasGoal = (project.implementationGoal?.trim() ?? '').length > 0
  const showLegacyContext = !usePlanningVariantTop && (hasPlanning || hasGoal)
  const showContextBlock = usePlanningVariantTop || showLegacyContext
  const isFeedShopProject = project.id === 'feedshop'
  const isWideArchitectureProject = isFeedShopProject || project.id === 'three-m'
  const reflectionParagraphs = project.projectReflection?.body
    .split(/<br\s*\/?>/gi)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean) ?? []
  if (perspectiveSection?.cards?.length) {
    perspectiveSection.cards.forEach((card, cardIdx) => {
      const contextKey = `${project.name}#${card.title || cardIdx}`
      validateBulletLabelFormat(card.problemBullets, perspectiveSection.problemLabel, `${contextKey} problem`)
      validateBulletLabelFormat(card.directionBullets, perspectiveSection.directionLabel, `${contextKey} direction`)
    })
  }

  return (
    <article
      id={`project-${index}`}
      data-sidebar-anchor={`project-${project.id}`}
      className={`pdf-project-card pdf-project-card-${index} rounded-xl border p-4 transition-colors duration-300 sm:p-5 md:p-8 ${
        dark
          ? 'border-[#3a3a3a] bg-[#2e2e2e] shadow-[0_2px_16px_rgba(0,0,0,0.25)]'
          : 'border-gray-100 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.07)]'
      }`}
    >
      <p
        className={`mb-3 text-sm font-semibold tracking-wide ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}
      >
        프로젝트{index + 1}
      </p>
      <h3 className={`mb-2 text-xl font-bold sm:text-2xl md:text-3xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
        {project.name}
      </h3>
      <p className={`mb-4 text-base md:mb-5 ${dark ? 'text-[#cbd5e1]' : 'text-slate-800'}`}>
        {project.period} | {project.teamSize}
        {project.contribution ? ` | ${project.contribution}` : ''}
      </p>

      <div
        className={`pdf-project-tech mb-4 rounded-xl border p-3.5 sm:p-4 md:mb-5 ${
          dark
            ? 'border-[#3d3d45] bg-[#2e2e2e] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
            : 'border-indigo-100/80 bg-white shadow-sm'
        }`}
      >
        <p
          className={`mb-2.5 text-lg font-semibold uppercase tracking-wide md:text-xl ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
        >
          기술 스택
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-2.5 py-0.5 text-sm font-medium ${
                dark
                  ? 'border-[#444444] bg-[#333333] text-[#d1d5db]'
                  : 'border-[#1E3A5F]/15 bg-[#f0f4fa] text-[#1E3A5F]'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {showContextBlock ? (
        <div className={`pdf-project-flow mb-5 space-y-3.5 ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
          {usePlanningVariantTop ? (
            <>
              <div className="pdf-project-summary-grid space-y-4">
                {overviewSection ? (
                  <ProjectBackgroundCard title={overviewSection.title} body={overviewSection.body} dark={dark} />
                ) : null}
                <div
                  className={`rounded-xl border p-3 md:p-3.5 ${dark ? 'border-[#333333] bg-[#252525]' : 'border-gray-200 bg-gray-50/90'}`}
                >
                  <p
                    className={`mb-2.5 text-lg font-semibold uppercase tracking-wide md:text-xl ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
                  >
                    담당 업무
                  </p>
                  <ul className="m-0 list-none space-y-2 p-0">
                    {filterFilledRoles(project.roles).map((role, idx) => (
                      <li
                        key={`${role.title}-${role.detail}-${idx}`}
                        className={`flex gap-3 rounded-lg border p-2.5 transition-colors ${
                          dark
                            ? 'border-[#3a3a3a] bg-[#2e2e2e] hover:border-[#4a4a4a]'
                            : 'border-gray-100 bg-white hover:border-blue-100'
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg ${
                            dark ? 'bg-[#383838]' : 'bg-gray-50'
                          }`}
                          aria-hidden
                        >
                          {role.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className={`text-[0.95rem] font-bold md:text-base ${dark ? 'text-[#e4e4e4]' : 'text-gray-900'}`}>{role.title}</p>
                          <p
                            className={`mt-0.5 whitespace-pre-line text-[0.95rem] leading-relaxed md:text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}
                            dangerouslySetInnerHTML={{ __html: role.detail }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {project.architectureImage ? (
                <div
                  className={`pdf-arch-wrap rounded-2xl border p-4 sm:p-5 ${
                    dark
                      ? 'border-[#3d3d45] bg-[#2e2e2e] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
                      : 'border-indigo-100/80 bg-white shadow-sm'
                  }`}
                >
                  <p className={`mb-2.5 text-lg font-semibold uppercase tracking-wide md:text-xl ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}>
                    아키텍처
                  </p>
                  <div className={`relative mx-auto ${isWideArchitectureProject ? 'max-w-6xl' : 'max-w-5xl'}`}>
                    <div className="architecture-scroll-frame -mx-1 overflow-x-auto rounded-xl px-1 pb-2 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
                      <img
                        src={`${__BASE_PATH__}${project.architectureImage.replace(/^\//, '')}`}
                        alt="아키텍처 다이어그램"
                        loading="lazy"
                        className={`mx-auto w-full rounded-xl object-contain ${
                          isWideArchitectureProject
                            ? 'max-w-none min-w-[42rem] sm:min-w-0 md:w-full'
                            : 'md:w-[80%]'
                        }`}
                      />
                    </div>
                  </div>
                  {project.architectureDetails?.length ? (
                    <div className="pdf-arch-details mt-2.5 grid grid-cols-1 gap-2">
                      {project.architectureDetails.map((section, si) => (
                        <div
                          key={si}
                          className={`rounded-xl border px-3 py-2.5 ${dark ? 'border-[#3a3a3a] bg-[#252525]' : 'border-gray-200 bg-gray-50/90'}`}
                        >
                          <p className={`mb-1 text-base font-semibold uppercase tracking-wide md:text-lg ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}>
                            {section.title}
                          </p>
                          {section.description ? (
                            <p className={`mb-1.5 text-[0.95rem] leading-relaxed md:text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                              {section.description}
                            </p>
                          ) : null}
                          <div className="space-y-1">
                            {section.items.map((item, ii) => (
                              <div key={ii}>
                                {item.label ? (
                                  <p className={`mb-1 text-sm font-semibold ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}>
                                    {item.label}
                                  </p>
                                ) : null}
                                {item.bullets.length ? (
                                <ul className="space-y-0.5">
                                  {item.bullets.map((b, bi) => (
                                    <li key={bi} className={`flex gap-2 text-[0.95rem] leading-relaxed md:text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-50" />
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {project.developerPerspective ? (
                <ProjectBackgroundCard
                  title="개발자 관점에서의 핵심 과제"
                  body={project.developerPerspective}
                  dark={dark}
                  className="pdf-developer-perspective"
                />
              ) : perspectiveSection ? (
                <ProjectPerspectivePlanningSection
                  data={perspectiveSection}
                  dark={dark}
                  userJourneyFlowSteps={undefined}
                />
              ) : null}
            </>
          ) : (
            <>
              <ProjectBackgroundCard title="기획 배경" body={project.planningBackground} dark={dark} />
              <ProjectBackgroundCard title="구현 목표" body={project.implementationGoal} dark={dark} />
            </>
          )}
        </div>
      ) : null}

      {project.problemSections ? (
        <div className="pdf-problem-sections mb-5 space-y-4 md:mb-6">
          {project.problemSections.map((sec, i) => (
            <div
              key={i}
              className={`pdf-problem-section pdf-problem-section-${i} space-y-3 rounded-lg border p-3.5 md:p-4 ${dark ? 'border-[#333333] bg-[#252525]' : 'border-blue-100 bg-[#F8FAFF]'}`}
            >
              <p className={`text-xl font-semibold uppercase tracking-wide ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}>
                {sec.headline}
              </p>
              <ProblemRow label="Problem" content={sec.problem} dark={dark} />
              <ProblemRow label="Thinking" content={sec.thinking} dark={dark} />
              <ProblemRow label="Solution" content={sec.solution} dark={dark} />
              <ProblemRow label="Result" content={sec.result} dark={dark} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`pdf-legacy-problem-section mb-5 space-y-3 rounded-lg border p-3.5 md:mb-6 md:p-4 ${dark ? 'border-[#333333] bg-[#252525]' : 'border-blue-100 bg-[#F8FAFF]'}`}
        >
          {project.problemHeadline ? (
            <p
              className={`text-xl font-semibold uppercase tracking-wide ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
            >
              {project.problemHeadline}
            </p>
          ) : null}
          {project.problem && <ProblemRow label="Problem" content={project.problem} dark={dark} />}
          {project.thinking && <ProblemRow label="Thinking" content={project.thinking} dark={dark} />}
          {project.solution && <ProblemRow label="Solution" content={project.solution} dark={dark} />}
          {project.result && <ProblemRow label="Result" content={project.result} dark={dark} />}
        </div>
      )}

      {project.projectReflection ? (
        <section
          className={`mb-5 rounded-xl border px-4 py-5 sm:px-5 md:mb-6 md:px-6 md:py-6 ${dark ? 'border-[#3a4658] bg-[#252b34]' : 'border-blue-100 bg-slate-50/80'}`}
          aria-labelledby={`${project.id}-reflection-title`}
        >
          <p
            id={`${project.id}-reflection-title`}
            className={`mb-3.5 text-sm font-extrabold uppercase tracking-[0.08em] ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
          >
            프로젝트 회고
          </p>
          <div
            className={`rounded-xl border px-4 py-4 sm:px-5 sm:py-5 ${dark ? 'border-[#3f4650] bg-[#2c3139]' : 'border-slate-200 bg-white'}`}
          >
            <strong
              className={`block break-keep text-lg font-extrabold leading-snug md:text-xl ${dark ? 'text-[#a9c2f4]' : 'text-[#1d4ed8]'}`}
            >
              {project.projectReflection.title}
            </strong>
            <div className="mt-3 space-y-3.5">
              {reflectionParagraphs.map((paragraph, paragraphIndex) => (
                <p
                  key={`${project.id}-reflection-${paragraphIndex}`}
                  lang="ko"
                  className={`break-keep text-[0.95rem] font-medium leading-[1.78] [line-break:strict] md:text-base ${dark ? 'text-slate-200' : 'text-slate-700'}`}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
            {project.projectReflection.sourceUrl ? (
              <div className={`mt-4 border-t pt-3.5 ${dark ? 'border-[#434b56]' : 'border-slate-200'}`}>
                <a
                  href={project.projectReflection.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-sm font-bold underline decoration-1 underline-offset-4 transition-colors ${dark ? 'text-blue-100 hover:text-white' : 'text-[#2563EB] hover:text-[#1d4ed8]'}`}
                >
                  Wiki 트러블슈팅 기록 보기
                  <i className="ri-external-link-line" aria-hidden />
                </a>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-base font-medium transition-colors duration-300 ${
            dark
              ? 'border-[#5a5a5a] text-[#d1d5db] hover:bg-[#3a3a3a] hover:text-[#e0e0e0]'
              : 'border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white'
          }`}
        >
          <i className="ri-github-fill text-lg" aria-hidden />
          GitHub Repo
        </a>
        {project.wikiUrl ? (
          <a
            href={project.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-base font-medium transition-colors duration-300 ${
              dark
                ? 'border-[#3d5f9f] text-[#9eb8f0] hover:bg-[#26344f] hover:text-[#dce7ff]'
                : 'border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white'
            }`}
          >
            <i className="ri-book-open-line text-lg" aria-hidden />
            기술 개선 기록
          </a>
        ) : null}
      </div>
    </article>
  )
}
