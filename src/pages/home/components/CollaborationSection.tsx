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

        {/* 팀 협업 근거 */}
        <div className="border-b pb-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
            {COLLABORATION_SECTION.evidence.map((item, index) => (
              <figure
                key={item.title}
                className={`h-full overflow-hidden rounded-lg border md:col-span-6 lg:col-span-4 ${
                  dark ? 'border-[#3d3d3d] bg-[#2a2a2a]' : 'border-slate-200 bg-slate-50'
                } ${index === 2 ? 'md:col-start-4 lg:col-start-auto' : ''}`}
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

          <a
            href={COLLABORATION_SECTION.guideUrl}
            target="_blank"
            rel="noreferrer"
            className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}
          >
            <i className="ri-external-link-line" aria-hidden="true" />
            JIRA 가이드라인 보기
          </a>
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

          <div className="mt-4">
            <div
              className={`grid overflow-hidden rounded-lg border md:grid-cols-4 ${
                dark ? 'border-[#3d3d3d] bg-[#262626]' : 'border-slate-200 bg-white'
              }`}
            >
              {PROJECT_WORKFLOW.steps.map((step, index) => (
                <article
                  key={step.label}
                  className={`relative px-4 py-3.5 ${
                    index < PROJECT_WORKFLOW.steps.length - 1
                      ? dark
                        ? 'border-b border-[#3d3d3d] md:border-b-0 md:border-r'
                        : 'border-b border-slate-200 md:border-b-0 md:border-r'
                      : ''
                  }`}
                >
                  <div className="grid grid-cols-[5.75rem_minmax(0,1fr)] gap-3 md:block">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm font-black ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <i className={`${step.icon} text-base ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`} aria-hidden="true" />
                      </div>
                      <p className={`mt-2 text-sm font-extrabold ${dark ? 'text-[#b9c8e6]' : 'text-slate-600'}`}>
                        {step.label}
                      </p>
                    </div>
                    <div>
                      <h6 className={`text-base font-extrabold md:mt-0.5 ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}>
                        {step.tool}
                      </h6>
                      <p className={`mt-1.5 whitespace-pre-line text-sm leading-5 ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p
            className={`mt-2.5 flex items-start gap-2 text-sm leading-6 ${
              dark ? 'text-[#d1d5db]' : 'text-slate-700'
            }`}
          >
            <i className="ri-shield-check-line mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{PROJECT_WORKFLOW.verificationNote}</span>
          </p>

          <div
            className={`mt-4 border border-l-4 px-4 py-4 md:px-5 ${
              dark
                ? 'border-[#3d4d68] border-l-[#8fb5ff] bg-[#202b3d]'
                : 'border-blue-200 border-l-[#2563EB] bg-blue-50'
            }`}
          >
            <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4 md:grid-cols-[9rem_minmax(0,1fr)]">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#2563EB] text-sm font-black text-white"
                  aria-hidden="true"
                >
                  01
                </span>
                <p className={`text-base font-black ${dark ? 'text-[#b9d0ff]' : 'text-[#1d4ed8]'}`}>
                  {PROJECT_WORKFLOW.currentStage.label}
                </p>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <h5 className={`text-lg font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}>
                    {PROJECT_WORKFLOW.currentStage.title}
                  </h5>
                  <a
                    href={PROJECT_WORKFLOW.currentStage.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 text-sm font-bold ${
                      dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'
                    }`}
                  >
                    <i className="ri-linkedin-box-fill text-base" aria-hidden="true" />
                    {PROJECT_WORKFLOW.currentStage.linkLabel}
                    <i className="ri-external-link-line" aria-hidden="true" />
                  </a>
                </div>
                <p className={`mt-1.5 text-[15px] leading-6 ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                  {PROJECT_WORKFLOW.currentStage.description}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`mt-3 border border-l-4 px-4 py-4 md:px-5 ${
              dark
                ? 'border-[#315c50] border-l-[#34d399] bg-[#1d302c]'
                : 'border-emerald-200 border-l-emerald-600 bg-emerald-50'
            }`}
          >
            <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4 md:grid-cols-[9rem_minmax(0,1fr)]">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-emerald-600 text-sm font-black text-white"
                  aria-hidden="true"
                >
                  02
                </span>
                <p className={`text-base font-black ${dark ? 'text-[#6ee7b7]' : 'text-emerald-700'}`}>
                  {PROJECT_WORKFLOW.nextStage.label}
                </p>
              </div>
              <div className="min-w-0">
                <h5 className={`text-lg font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}>
                  {PROJECT_WORKFLOW.nextStage.title}
                </h5>
                <p className={`mt-1.5 text-[15px] leading-6 ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}>
                  {PROJECT_WORKFLOW.nextStage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
