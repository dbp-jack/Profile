import { PROJECTS_SECTION } from '@/content/portfolio'
import { PROJECTS } from '@/content/projects'
import { useDarkMode } from '@/hooks/useDarkMode'
import ProjectCard from './ProjectCard'
import ProjectsOverview from './ProjectsOverview'
import { usePortfolioComposition } from '@/portfolio-builder/composition-state'

export default function ProjectsSection() {
  const { dark } = useDarkMode()
  const { projectIds, copyProfile } = usePortfolioComposition()
  const selectedProjects = projectIds
    .map((projectId) => PROJECTS.find((project) => project.id === projectId))
    .filter((project): project is (typeof PROJECTS)[number] => Boolean(project))
  return (
    <section
      id="projects"
      className={`transition-colors duration-300 ${dark ? 'bg-[#2a2a2a]' : 'bg-[#F8F9FA]'}`}
    >
      {/* 기존 헤더 — 건들지 않음 */}
      <div className="mx-auto max-w-5xl px-6 pt-20 pb-8 md:pt-28 md:pb-10">
        <div className="text-center">
          <span
            className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
          >
            {PROJECTS_SECTION.kicker}
          </span>
          <h2
            className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
          >
            {PROJECTS_SECTION.title}
          </h2>
          <p
            className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${dark ? 'text-[#909090]' : 'text-gray-500'}`}
          >
            {copyProfile.projectsSubtitle}
          </p>
        </div>
      </div>

      {/* 프로젝트 개요 */}
      <ProjectsOverview projectIds={projectIds} />

      {/* 개별 프로젝트 카드 */}
      <div className={`project-detail-list py-12 md:py-16 ${dark ? 'bg-[#2a2a2a]' : 'bg-[#F8F9FA]'}`}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col gap-6 md:gap-8">
            {selectedProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
