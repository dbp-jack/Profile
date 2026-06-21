import { COLLABORATION_SECTION } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'

export default function CollaborationSection() {
  const { dark } = useDarkMode()

  return (
    <section
      className={`collaboration-section border-y py-12 md:py-16 ${
        dark ? 'border-[#3d3d3d] bg-[#242424]' : 'border-blue-100 bg-white'
      }`}
      aria-labelledby="collaboration-title"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-5 border-b pb-6 md:grid-cols-[1fr_1.35fr] md:items-end md:gap-10">
          <div>
            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}>
              {COLLABORATION_SECTION.kicker}
            </p>
            <h3
              id="collaboration-title"
              className={`mt-2 text-2xl font-extrabold leading-snug md:text-3xl ${dark ? 'text-[#e8e8e8]' : 'text-slate-900'}`}
            >
              {COLLABORATION_SECTION.title}
            </h3>
          </div>
          <div>
            <p className={`text-sm leading-7 md:text-base ${dark ? 'text-[#b0b0b0]' : 'text-slate-600'}`}>
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
          </div>
        </div>

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
                  src={item.image}
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
                <p className={`mt-1.5 text-sm leading-relaxed ${dark ? 'text-[#a8a8a8]' : 'text-slate-600'}`}>
                  {item.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
