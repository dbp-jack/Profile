import { COLLABORATION_SECTION, PROJECT_WORKFLOW, WORK_STYLE_SECTION } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'

export default function CollaborationSection() {
  const { dark } = useDarkMode()

  return (
    <section
      id="collaboration"
      className={`collaboration-section border-y py-12 md:py-16 ${
        dark ? 'border-[#3d3d3d] bg-[#242424]' : 'border-blue-100 bg-white'
      }`}
      aria-labelledby="work-style-title"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div data-sidebar-anchor="collaboration" className="mb-8 text-center md:mb-12">
          <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
            {WORK_STYLE_SECTION.kicker}
          </p>
          <h3
            id="work-style-title"
            className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
          >
            {WORK_STYLE_SECTION.title}
          </h3>
          <p className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}>
            {WORK_STYLE_SECTION.subtitle}
          </p>
        </div>

        {/* 팀 협업 프로세스 */}
        <div className="border-b pb-6">
          <p className={`text-base font-extrabold uppercase tracking-wide ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
            {COLLABORATION_SECTION.kicker}
          </p>
          <h4 className={`mt-1.5 text-xl font-extrabold leading-snug ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}>
            {COLLABORATION_SECTION.title}
          </h4>
          <p className={`mt-3 max-w-4xl text-sm leading-7 ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
            {COLLABORATION_SECTION.intro}
          </p>
          <a
            href={COLLABORATION_SECTION.guideUrl}
            target="_blank"
            rel="noreferrer"
            className={`mt-3 inline-flex items-center gap-1.5 text-sm font-bold ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}
          >
            <i className="ri-external-link-line" aria-hidden="true" />
            JIRA 가이드라인 보기
          </a>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {COLLABORATION_SECTION.evidence.map((item, index) => (
              <figure
                key={item.title}
                className={`overflow-hidden rounded-lg border ${
                  dark ? 'border-[#3d3d3d] bg-[#2a2a2a]' : 'border-slate-200 bg-slate-50'
                } ${index === 2 ? 'md:col-span-2 xl:col-span-1' : ''}`}
              >
                <div className={`aspect-[16/10] overflow-hidden ${dark ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                    alt={item.alt}
                    className="h-full w-full cursor-zoom-in object-contain"
                    loading="lazy"
                  />
                </div>
                <figcaption className="border-t px-4 py-4">
                  <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
                    {item.label}
                  </p>
                  <h4 className={`mt-1 text-base font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}>
                    {item.title}
                  </h4>
                  <p className={`mt-1.5 text-sm leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* AI 활용 방식 */}
        <div className="pt-6">
          <p className={`text-base font-extrabold uppercase tracking-wide ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
            {PROJECT_WORKFLOW.label}
          </p>
          <h4 className={`mt-1.5 text-xl font-extrabold leading-snug ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}>
            {PROJECT_WORKFLOW.title}
          </h4>
          <p className={`mt-3 max-w-4xl text-sm leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
            {PROJECT_WORKFLOW.description}
          </p>
          <div className={`mt-3 grid divide-y md:grid-cols-3 md:divide-x md:divide-y-0 ${dark ? 'divide-[#444]' : 'divide-slate-200'}`}>
            {PROJECT_WORKFLOW.phases.map((phase) => {
              const isAi = phase.tone === 'ai'
              return (
                <div key={phase.owner} className="py-2 md:px-4 md:py-0 first:pl-0 last:pr-0">
                  <p className={`text-xs font-extrabold ${isAi ? 'text-[#7C3AED]' : dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
                    {phase.owner}
                  </p>
                  <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                    {phase.detail}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {PROJECT_WORKFLOW.tools.map((tool) => (
              <div
                key={tool.name}
                className={`rounded-lg border px-3 py-2 ${
                  dark ? 'border-[#3d3d3d] bg-[#262626]' : 'border-slate-200 bg-white'
                }`}
              >
                <p className={`flex items-center gap-1.5 text-xs font-extrabold ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
                  <i className={`${tool.icon} text-sm`} aria-hidden="true" />
                  {tool.name}
                </p>
                <p className={`mt-0.5 whitespace-pre-line text-xs leading-relaxed ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                  {tool.purpose}
                </p>
              </div>
            ))}
          </div>
          <p className={`mt-3 whitespace-pre-line text-xs leading-relaxed ${dark ? 'text-[#8fb5ff]' : 'text-slate-700'}`}>
            {PROJECT_WORKFLOW.toolsNote}
          </p>
        </div>
      </div>
    </section>
  )
}
