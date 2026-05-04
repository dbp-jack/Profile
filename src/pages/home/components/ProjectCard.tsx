import { Fragment } from 'react'
import { useDarkMode } from '@/hooks/useDarkMode'

export interface ProjectRoleItem {
  icon: string
  title: string
  detail: string
}

interface ProjectData {
  name: string
  period: string
  teamSize: string
  contribution?: string
  /** 마지막 `\n\n` 블록에 `→`가 있으면 사용자 여정으로 파싱합니다. */
  description: string
  /** 기획·배경 카드 본문 (선택). */
  planningBackground?: string
  /** 구현 목표 카드 본문 (선택). */
  implementationGoal?: string
  /** 서비스 개요 — 설정 시 `기획 배경` 대신 상단에 노출 (예: FeedShop). */
  serviceOverview?: string
  /** 사용자 관점 기획 카드 — `serviceOverview`와 함께 사용 */
  userPerspectivePlanning?: {
    subtitle: string
    cards: Array<{
      title: string
      /** 2열 레이아웃용 (bullet 미사용 시) */
      userProblem?: string
      designDirection?: string
      /** 설정 시 제목 아래 중첩 카드 + bullet 리스트로 표시 */
      problemBullets?: string[]
      directionBullets?: string[]
    }>
  }
  /** 프로젝트 개요 — `서비스 개요`가 없을 때만 상단 노출 (제목: 프로젝트 개요) */
  projectOverview?: string
  /** 설계 관점 카드 — `serviceOverview` 또는 `projectOverview`와 함께 사용 (인식한 문제 / 설계 판단) */
  designPerspectivePlanning?: {
    subtitle: string
    cards: Array<{
      title: string
      recognizedProblem: string
      designJudgment: string
    }>
  }
  techStack: string[]
  roles: ProjectRoleItem[]
  problemHeadline?: string
  problem: string
  thinking: string
  solution: string
  result: string
  githubUrl: string
  demoUrl?: string
}

type Props = { project: ProjectData; index: number }

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

function parseProjectDescription(description: string): { flowSteps: string[] | null } {
  const blocks = description.split('\n\n').map((block) => block.trim()).filter(Boolean)
  const flowText = blocks.at(-1) ?? ''
  const hasFlow = flowText.includes('→')
  const flowSteps = hasFlow ? flowText.split('→').map((s) => s.trim()).filter(Boolean) : null
  return { flowSteps }
}

function ProjectBackgroundCard({
  title,
  body,
  dark,
}: {
  title: string
  body?: string
  dark: boolean
}) {
  if (!(body?.trim() ?? '').length) return null
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 ${
        dark
          ? 'border-[#3d3d45] bg-[#2e2e2e] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
          : 'border-indigo-100/80 bg-white shadow-sm'
      }`}
    >
      <p
        className={`mb-3 text-xs font-semibold uppercase tracking-[0.14em] ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
      >
        {title}
      </p>
      <p
        lang="ko"
        className={`whitespace-pre-line break-keep text-sm leading-[1.72] ${dark ? 'text-[#c8c8c8]' : 'text-slate-700'}`}
      >
        {body}
      </p>
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
  if (sv) return { title: '서비스 개요', body: project.serviceOverview! }
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
          className={`text-xs font-semibold uppercase tracking-[0.14em] ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
        >
          {data.sectionTitle}
        </p>
        {data.subtitle.trim() ? (
          <p
            lang="ko"
            className={`mt-2.5 break-keep text-sm leading-relaxed ${dark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}
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
                    className={`mt-3 list-none space-y-2 pl-0 text-sm leading-[1.72] ${dark ? 'text-[#c8c8c8]' : 'text-slate-700'}`}
                  >
                    {card.problemBullets.map((line, i) => (
                      <li key={`perspective-${idx}-pb-${i}`} className="flex gap-2.5 break-keep [line-break:strict]">
                        <span className={`shrink-0 select-none ${dark ? 'text-slate-500' : 'text-slate-400'}`}>·</span>
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
                    className={`mt-3 list-none space-y-2 pl-0 text-sm leading-[1.72] ${dark ? 'text-[#c8c8c8]' : 'text-slate-700'}`}
                  >
                    {card.directionBullets.map((line, i) => (
                      <li key={`perspective-${idx}-db-${i}`} className="flex gap-2.5 break-keep [line-break:strict]">
                        <span className={`shrink-0 select-none ${dark ? 'text-slate-500' : 'text-slate-400'}`}>·</span>
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
                    className={`mt-3 whitespace-pre-line break-keep text-sm leading-[1.72] [line-break:strict] ${dark ? 'text-[#c8c8c8]' : 'text-slate-700'}`}
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
                    className={`mt-3 whitespace-pre-line break-keep text-sm leading-[1.72] [line-break:strict] ${dark ? 'text-[#c8c8c8]' : 'text-slate-700'}`}
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
        className={`mb-3 text-xs font-semibold uppercase tracking-wide ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
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
                  className={`inline-flex min-w-[5.5rem] max-w-[11rem] flex-col items-center justify-center rounded-2xl border px-2.5 py-1.5 text-center text-xs font-semibold leading-snug ${
                    dark
                      ? 'border-[#4a4a4a] bg-[#333333] text-[#ececec]'
                      : 'border-[#1E3A5F]/20 bg-white text-[#1E3A5F]'
                  }`}
                >
                  <span className="leading-tight">{ko}</span>
                  {en ? (
                    <span
                      className={`mt-1 text-[0.625rem] font-medium leading-tight tracking-normal ${
                        dark ? 'text-[#9a9a9a]' : 'text-gray-500'
                      }`}
                    >
                      {en}
                    </span>
                  ) : null}
                </span>
                {i < flowSteps.length - 1 && (
                  <span className={`text-xs font-semibold ${dark ? 'text-[#6a6a6a]' : 'text-gray-400'}`}>→</span>
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
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-4">
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${labelColors[label]}`}
      >
        {label}
      </span>
      {content.includes('<') ? (
        <div
          className={`project-rich-content w-full overflow-x-auto pt-0.5 text-sm leading-relaxed ${dark ? 'text-[#909090]' : 'text-gray-600'}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p
          className={`w-full whitespace-pre-line pt-0.5 text-sm leading-relaxed ${dark ? 'text-[#909090]' : 'text-gray-600'}`}
        >
          {content}
        </p>
      )}
    </div>
  )
}

export default function ProjectCard({ project, index }: Props) {
  const { dark } = useDarkMode()
  const { flowSteps } = parseProjectDescription(project.description)
  const overviewSection = getOverviewSection(project)
  const perspectiveSection = normalizePerspectivePlanning(project)
  const usePlanningVariantTop = !!(overviewSection || perspectiveSection)
  const hasPlanning = (project.planningBackground?.trim() ?? '').length > 0
  const hasGoal = (project.implementationGoal?.trim() ?? '').length > 0
  const hasJourney = !!(flowSteps && flowSteps.length > 0)
  const embedUserJourneyInPerspective =
    perspectiveSection?.variant === 'user' && hasJourney
  const showLegacyContext =
    !usePlanningVariantTop && (hasPlanning || hasGoal || hasJourney)
  const showContextBlock = usePlanningVariantTop || showLegacyContext

  return (
    <article
      id={`project-${index}`}
      className={`rounded-xl border p-4 transition-colors duration-300 sm:p-5 md:p-8 ${
        dark
          ? 'border-[#3a3a3a] bg-[#2e2e2e] shadow-[0_2px_16px_rgba(0,0,0,0.25)]'
          : 'border-gray-100 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.07)]'
      }`}
    >
      <p
        className={`mb-3 text-xs font-semibold tracking-wide ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
      >
        Project {index + 1}
      </p>
      <h3 className={`mb-2 text-lg font-bold sm:text-xl md:text-2xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
        {project.name}
      </h3>
      <p className={`mb-4 text-sm md:mb-5 ${dark ? 'text-[#8a8a8a]' : 'text-gray-500'}`}>
        {project.period} | {project.teamSize}
        {project.contribution ? ` | ${project.contribution}` : ''}
      </p>

      {showContextBlock ? (
        <div className={`mb-6 space-y-4 ${dark ? 'text-[#a0a0a0]' : 'text-gray-700'}`}>
          {usePlanningVariantTop ? (
            <>
              {overviewSection ? (
                <ProjectBackgroundCard title={overviewSection.title} body={overviewSection.body} dark={dark} />
              ) : null}
              {perspectiveSection ? (
                <ProjectPerspectivePlanningSection
                  data={perspectiveSection}
                  dark={dark}
                  userJourneyFlowSteps={embedUserJourneyInPerspective ? (flowSteps ?? []) : undefined}
                />
              ) : null}
              {hasJourney && !embedUserJourneyInPerspective ? (
                <ProjectUserJourneySection flowSteps={flowSteps ?? []} dark={dark} stacked />
              ) : null}
            </>
          ) : (
            <>
              <ProjectBackgroundCard title="기획 배경" body={project.planningBackground} dark={dark} />
              <ProjectBackgroundCard title="구현 목표" body={project.implementationGoal} dark={dark} />
              {hasJourney ? (
                <ProjectUserJourneySection flowSteps={flowSteps ?? []} dark={dark} stacked />
              ) : null}
            </>
          )}
        </div>
      ) : null}

      <div className="mb-5 md:mb-6">
        <p
          className={`mb-2 text-xs font-semibold uppercase tracking-wide ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
        >
          기술 스택
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                dark
                  ? 'border-[#444444] bg-[#333333] text-[#b0b0b0]'
                  : 'border-[#1E3A5F]/15 bg-[#f0f4fa] text-[#1E3A5F]'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`mb-5 rounded-xl border p-3.5 md:mb-6 md:p-4 ${dark ? 'border-[#333333] bg-[#252525]' : 'border-gray-200 bg-gray-50/90'}`}
      >
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-wide ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
        >
          담당 업무
        </p>
        <ul className="m-0 list-none space-y-2.5 p-0">
          {filterFilledRoles(project.roles).map((role, idx) => (
            <li
              key={`${role.title}-${role.detail}-${idx}`}
              className={`flex gap-3 rounded-lg border p-3 transition-colors ${
                dark
                  ? 'border-[#3a3a3a] bg-[#2e2e2e] hover:border-[#4a4a4a]'
                  : 'border-gray-100 bg-white hover:border-blue-100'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg ${
                  dark ? 'bg-[#383838]' : 'bg-gray-50'
                }`}
                aria-hidden
              >
                {role.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold ${dark ? 'text-[#e4e4e4]' : 'text-gray-900'}`}>{role.title}</p>
                <p className={`mt-0.5 text-sm leading-relaxed ${dark ? 'text-[#9a9a9a]' : 'text-gray-600'}`}>
                  {role.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mb-5 space-y-3 rounded-lg border p-3.5 md:mb-6 md:p-4 ${dark ? 'border-[#333333] bg-[#252525]' : 'border-blue-100 bg-[#F8FAFF]'}`}
      >
        {project.problemHeadline ? (
          <p
            className={`text-base font-extrabold tracking-wide ${dark ? 'text-[#8aa8e8]' : 'text-[#2563EB]'}`}
          >
            {project.problemHeadline}
          </p>
        ) : null}
        <ProblemRow label="Problem" content={project.problem} dark={dark} />
        <ProblemRow label="Thinking" content={project.thinking} dark={dark} />
        <ProblemRow label="Solution" content={project.solution} dark={dark} />
        <ProblemRow label="Result" content={project.result} dark={dark} />
      </div>

      <div className="flex gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
            dark
              ? 'border-[#5a5a5a] text-[#b0b0b0] hover:bg-[#3a3a3a] hover:text-[#e0e0e0]'
              : 'border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white'
          }`}
        >
          GitHub
        </a>
      </div>
    </article>
  )
}

export type { ProjectData }
