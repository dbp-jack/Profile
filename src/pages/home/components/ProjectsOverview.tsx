import { useDarkMode } from '@/hooks/useDarkMode'
import { PROJECTS, PROJECT_OVERVIEWS } from '@/content/projects'

type SelectedProjectOverview = {
  overview: (typeof PROJECT_OVERVIEWS)[number]
  detail?: (typeof PROJECTS)[number]
}

const SUMMARY_HIGHLIGHT_TERMS = [
  '최대 3,000명',
  '3,000명',
  '0건',
  '6,818ms',
  '638ms',
  '91% 단축',
  'TPS 216% 향상',
  '216%',
  '투표 수 정합성 유지',
  '사용자 이탈 방지',
  'UserService→Auth',
  '결합도 0건',
  '순환 의존 없음',
  '장애 전파 위험 방지',
]

const SUMMARY_HIGHLIGHT_PATTERN = new RegExp(
  `(${SUMMARY_HIGHLIGHT_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g',
)

function renderAchievementText(text: string, dark: boolean) {
  return text.split(SUMMARY_HIGHLIGHT_PATTERN).map((part, index) =>
    SUMMARY_HIGHLIGHT_TERMS.includes(part) ? (
      <strong
        key={`${part}-${index}`}
        className={dark ? 'font-extrabold text-[#8fb5ff]' : 'font-extrabold text-[#2563EB]'}
      >
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

export default function ProjectsOverview({ projectIds }: { projectIds: readonly string[] }) {
  const { dark } = useDarkMode()
  const selectedProjects = projectIds
    .map((projectId): SelectedProjectOverview | null => {
      const overview = PROJECT_OVERVIEWS.find((project) => project.id === projectId)
      if (!overview) return null
      return {
        overview,
        detail: PROJECTS.find((project) => project.id === projectId),
      }
    })
    .filter((project): project is SelectedProjectOverview => Boolean(project))
  const testEnvironment = selectedProjects.find(({ detail }) => detail?.problemEnvironment)?.detail?.problemEnvironment

  return (
    <div id="projects-overview" className={`projects-overview ${dark ? 'bg-[#242424]' : 'bg-white'} pb-10 md:pb-12`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="projects-overview-grid grid grid-cols-1 gap-4 lg:grid-cols-2">
          {selectedProjects.map(({ overview: project, detail }) => {
            const overviewSummary = detail?.overviewSummary
            const projectType = project.badge.split(/\s+/)[0] ?? project.badge
            const summaryRows = overviewSummary
              ? [
                  ['소개', overviewSummary.intro, 'lg:min-h-[3rem]'],
                  ['성과', overviewSummary.achievement, 'lg:min-h-[4.5rem]'],
                ] as const
              : []
            const hasMetadata = Boolean(detail?.period || detail?.contribution)

            return (
              <div
                key={project.name}
                className={`projects-overview-card flex h-full flex-col rounded-xl border p-4 ${
                  dark ? 'border-[#3d3d3d] bg-[#2a2a2a]' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="mb-2.5 flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        dark ? 'bg-[#1f2a3d]' : 'bg-blue-50'
                      }`}
                      aria-hidden="true"
                    >
                      <i className={`${project.icon} ${project.iconColor} text-xl`} />
                    </span>
                    <h3
                      className={`text-2xl font-extrabold leading-tight ${dark ? 'text-[#e8e8e8]' : 'text-[#0f172a]'}`}
                    >
                      {project.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-extrabold leading-none text-white ${project.badgeColor}`}
                    >
                      {projectType}
                    </span>
                  </div>

                  {hasMetadata ? (
                    <div
                      className={`shrink-0 text-right text-[11px] font-semibold leading-relaxed sm:text-xs ${
                        dark ? 'text-[#b6c3d8]' : 'text-slate-600'
                      }`}
                    >
                      {detail?.period ? <p className="whitespace-nowrap">{detail.period}</p> : null}
                      {detail?.contribution ? <p className="whitespace-nowrap">{detail.contribution}</p> : null}
                    </div>
                  ) : null}
                </div>

                <p className={`mb-3 text-base font-semibold leading-relaxed ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>
                  {project.description}
                </p>

                <div
                  className={`mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed ${
                    dark ? 'text-[#b6c3d8]' : 'text-slate-700'
                  }`}
                >
                  <span
                    className={`font-extrabold uppercase tracking-[0.14em] ${
                      dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'
                    }`}
                  >
                    Stack
                  </span>
                  {project.tech.map((tech, index) => (
                    <span
                      key={tech}
                      className={`font-mono font-semibold ${dark ? 'text-[#d5dce8]' : 'text-slate-700'}`}
                    >
                      {tech}
                      {index < project.tech.length - 1 ? (
                        <span className={dark ? 'ml-2 text-[#64748b]' : 'ml-2 text-slate-300'}>/</span>
                      ) : null}
                    </span>
                  ))}
                </div>

                {overviewSummary ? (
                  <div className={`mb-3 border-t pt-3 ${dark ? 'border-[#3a3a3a]' : 'border-slate-200'}`}>
                    <div className="mb-2 flex items-center gap-2">
                      <i className={`ri-file-text-line text-sm ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`} />
                      <span className={`text-sm font-bold ${dark ? 'text-[#d8d8d8]' : 'text-gray-800'}`}>요약</span>
                    </div>
                    <div className="grid content-start gap-3 lg:min-h-[8.75rem]">
                      {summaryRows.map(([label, text, minHeightClass]) => (
                        <div
                          key={label}
                          lang="ko"
                          className={`break-keep text-sm leading-relaxed ${minHeightClass} ${
                            dark ? 'text-[#dbe4f0]' : 'text-slate-800'
                          }`}
                        >
                          <div className={`mb-1 font-extrabold ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
                            {label}
                          </div>
                          {Array.isArray(text) ? (
                            <ul className="space-y-1">
                              {text.map((item) => (
                                <li key={item} className="flex gap-1.5">
                                  <span className={dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}>-</span>
                                  <span>{label === '성과' ? renderAchievementText(item, dark) : item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="m-0">{label === '성과' ? renderAchievementText(text, dark) : text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-auto space-y-2">
                  <div
                    className={`rounded-lg border px-3 py-2 ${
                      dark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-blue-100 bg-blue-50/50'
                    }`}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <i className={`ri-user-settings-line text-sm ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`} />
                      <span className={`text-sm font-bold ${dark ? 'text-[#d8d8d8]' : 'text-gray-800'}`}>담당 역할</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${dark ? 'text-[#dbe4f0]' : 'text-slate-800'}`}>
                      {project.role}
                    </p>
                  </div>

                  <div className={`rounded-lg p-3 ${dark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                    <div className="mb-1 flex items-center gap-2">
                      <i className={`${project.challengeIcon} text-sm ${dark ? 'text-[#94a3b8]' : 'text-slate-700'}`} />
                      <span className={`text-sm font-bold ${dark ? 'text-[#e2e8f0]' : 'text-slate-800'}`}>핵심 과제</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${dark ? 'text-[#cbd5e1]' : 'text-slate-700'}`}>
                      {project.challenge}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {testEnvironment ? (
          <div
            className={`projects-overview-environment mt-5 rounded-xl border px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
              dark
                ? 'border-[#3d5f9f] bg-[#1e2a3a] text-[#dbeafe]'
                : 'border-blue-200 bg-blue-50/70 text-slate-700'
            }`}
          >
            <span className={`mr-2 font-extrabold ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
              🖥️ 로컬 테스트 환경
            </span>
            <span className="whitespace-pre-line">{testEnvironment}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
