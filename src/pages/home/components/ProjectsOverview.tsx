import { useDarkMode } from '@/hooks/useDarkMode'
import { PROJECTS, PROJECT_OVERVIEWS } from '@/content/projects'

export default function ProjectsOverview({ projectIds }: { projectIds: readonly string[] }) {
  const { dark } = useDarkMode()
  const selectedOverviews = projectIds
    .map((projectId) => PROJECT_OVERVIEWS.find((project) => project.id === projectId))
    .filter((project): project is (typeof PROJECT_OVERVIEWS)[number] => Boolean(project))
  const testEnvironment = projectIds
    .map((projectId) => PROJECTS.find((project) => project.id === projectId))
    .find((project) => project?.problemEnvironment)?.problemEnvironment

  return (
    <div className={`projects-overview ${dark ? 'bg-[#242424]' : 'bg-white'} pb-10 md:pb-12`}>
      <div className="mx-auto max-w-5xl px-6">
        {/* 헤더 */}
        <div className={`projects-overview-header mb-5 border-b pb-5 text-center ${dark ? 'border-dashed border-[#3a3a3a]' : 'border-dashed border-blue-200'}`}>
          <h2 className={`text-2xl font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-[#0f172a]'}`}>
            프로젝트 <span className="text-[#2563EB]">개요</span>
          </h2>
        </div>

        {/* 프로젝트 카드 2개 */}
        <div className="projects-overview-grid grid grid-cols-1 gap-4 md:grid-cols-2">
          {selectedOverviews.map((project) => (
            <div
              key={project.name}
              className={`projects-overview-card rounded-xl border p-4 ${
                dark
                  ? 'border-[#3d3d3d] bg-[#2a2a2a]'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* 아이콘 + 배지 */}
              <div className="mb-3 flex items-center justify-between">
                <i className={`${project.icon} ${project.iconColor} text-2xl`} />
                <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${project.badgeColor}`}>
                  {project.badge}
                </span>
              </div>

              {/* 프로젝트명 */}
              <h3 className={`mb-2.5 text-2xl font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-[#0f172a]'}`}>
                {project.name}
              </h3>

              {/* 한 줄 정의 */}
              <p className={`mb-3 text-base font-semibold leading-relaxed ${dark ? 'text-[#d0d0d0]' : 'text-gray-700'}`}>
                {project.description}
              </p>

              {/* 기술 스택 칩 */}
              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`rounded border px-2 py-0.5 font-mono text-xs ${
                      dark
                        ? 'border-[#444] bg-[#333] text-[#b0b0b0]'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* 담당 역할 */}
              <div className={`mb-2 rounded-lg border px-3 py-2 ${dark ? 'border-[#3a3a3a] bg-[#242424]' : 'border-blue-100 bg-blue-50/50'}`}>
                <div className="mb-1 flex items-center gap-2">
                  <i className={`ri-user-settings-line text-sm ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`} />
                  <span className={`text-sm font-bold ${dark ? 'text-[#d8d8d8]' : 'text-gray-800'}`}>담당 역할</span>
                </div>
                <p className={`text-sm leading-relaxed ${dark ? 'text-[#b8b8b8]' : 'text-gray-700'}`}>
                  {project.role}
                </p>
              </div>

              {/* 핵심 과제 */}
              <div className={`rounded-lg p-3 ${dark ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
                <div className="mb-1 flex items-center gap-2">
                  <i className={`${project.challengeIcon} text-sm ${dark ? 'text-[#888]' : 'text-gray-500'}`} />
                  <span className={`text-sm font-bold ${dark ? 'text-[#c8c8c8]' : 'text-gray-700'}`}>핵심 과제</span>
                </div>
                <p className={`text-sm leading-relaxed ${dark ? 'text-[#909090]' : 'text-gray-600'}`}>
                  {project.challenge}
                </p>
              </div>
            </div>
          ))}
        </div>

        {testEnvironment ? (
          <div
            className={`projects-overview-environment mt-5 rounded-xl border px-4 py-3 text-sm ${
              dark
                ? 'border-[#333333] bg-[#1e1e1e] text-[#9a9a9a]'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            <span className={`mr-2 font-semibold ${dark ? 'text-[#d0d0d0]' : 'text-slate-700'}`}>
              🖥️ 로컬 테스트 환경
            </span>
            <span className="whitespace-pre-line">{testEnvironment}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
