import { PROJECTS_SECTION } from '@/content/portfolio'
import { PROJECTS } from '@/content/projects'
import { useDarkMode } from '@/hooks/useDarkMode'
import ProjectCard from './ProjectCard'
import ProjectsOverview from './ProjectsOverview'
import CollaborationSection from './CollaborationSection'
import { usePortfolioComposition } from '@/portfolio-builder/composition-state'

export default function ProjectsSection() {
  const { dark } = useDarkMode()
  const { projectIds, copyProfile } = usePortfolioComposition()
  const selectedProjects = projectIds
    .map((projectId) => PROJECTS.find((project) => project.id === projectId))
    .filter((project): project is (typeof PROJECTS)[number] => Boolean(project))
  return (
    <>
      <CollaborationSection />

      <section
        id="projects"
        className={`transition-colors duration-300 ${dark ? 'bg-[#242424]' : 'bg-white'}`}
      >
        {/* 프로젝트 소개 헤더 */}
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-8 md:pt-28 md:pb-10">
          <div data-sidebar-anchor="projects" className="text-center">
            <span
              className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}
            >
              {PROJECTS_SECTION.kicker}
            </span>
            <h2
              className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
            >
              {PROJECTS_SECTION.title}
            </h2>
            <p
              className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}
            >
              {copyProfile.projectsSubtitle}
            </p>
          </div>
        </div>

        {/* 프로젝트 개요 */}
        <ProjectsOverview projectIds={projectIds} />

        {/* 개별 프로젝트 카드 */}
        <div id="project-details" className={`project-detail-list py-12 md:py-16 ${dark ? 'bg-[#242424]' : 'bg-white'}`}>
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col gap-6 md:gap-8">
              {selectedProjects.map((project, i) => (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                >
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
