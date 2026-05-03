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
      className={`rounded-lg border p-3 ${
        dark ? 'border-[#3a3a3a] bg-[#252525]' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <p
        className={`mb-1 text-xs font-semibold uppercase tracking-wide ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
      >
        {title}
      </p>
      <p className={`whitespace-pre-line text-sm leading-relaxed ${dark ? 'text-[#a0a0a0]' : 'text-gray-700'}`}>{body}</p>
    </div>
  )
}

function ProjectUserJourneySection({
  flowSteps,
  dark,
  stacked,
}: {
  flowSteps: string[]
  dark: boolean
  /** true면 바깥 `mb-6`을 제거하고, 위쪽 카드 블록(`space-y-3`) 안에 넣습니다. */
  stacked?: boolean
}) {
  if (flowSteps.length === 0) return null
  return (
    <div className={stacked ? undefined : 'mb-6'}>
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
                      className={`mt-1 text-[10px] font-medium leading-tight tracking-normal ${
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
  const hasPlanning = (project.planningBackground?.trim() ?? '').length > 0
  const hasGoal = (project.implementationGoal?.trim() ?? '').length > 0
  const hasJourney = !!(flowSteps && flowSteps.length > 0)
  const showContextBlock = hasPlanning || hasGoal || hasJourney

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
        <div className={`mb-6 space-y-3 ${dark ? 'text-[#a0a0a0]' : 'text-gray-700'}`}>
          <ProjectBackgroundCard title="기획 배경" body={project.planningBackground} dark={dark} />
          <ProjectBackgroundCard title="구현 목표" body={project.implementationGoal} dark={dark} />
          {hasJourney ? (
            <ProjectUserJourneySection flowSteps={flowSteps ?? []} dark={dark} stacked />
          ) : null}
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
        <p className={`mb-3 text-xs font-semibold uppercase tracking-wide ${dark ? 'text-[#6a6a6a]' : 'text-gray-400'}`}>
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
