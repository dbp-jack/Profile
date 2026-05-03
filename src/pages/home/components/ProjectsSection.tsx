import { PROJECTS_SECTION } from '@/content/portfolio'
import { PROJECTS } from '@/mocks/projects'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()
  return (
    <section
      id="projects"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`py-20 md:py-28 transition-colors duration-300 ${dark ? 'bg-[#2a2a2a]' : 'bg-[#F8F9FA]'}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-16">
          <span
            className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
          >
            {PROJECTS_SECTION.kicker}
          </span>
          <h2
            className={`text-2xl font-bold md:text-3xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
          >
            {PROJECTS_SECTION.title}
          </h2>
          <p
            className={`mx-auto mt-3 max-w-2xl text-xs leading-relaxed md:text-sm ${dark ? 'text-[#909090]' : 'text-gray-500'}`}
          >
            {PROJECTS_SECTION.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
