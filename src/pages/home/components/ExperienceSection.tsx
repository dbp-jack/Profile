import { EXPERIENCE_ITEMS, EXPERIENCE_SECTION, type ExperienceCategory } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'

const CATEGORY_STYLES: Record<ExperienceCategory, { light: string; dark: string }> = {
  경력: {
    light: 'bg-blue-100 text-blue-700',
    dark: 'bg-blue-900/40 text-blue-300',
  },
  교육: {
    light: 'bg-emerald-100 text-emerald-700',
    dark: 'bg-emerald-900/40 text-emerald-300',
  },
  대외활동: {
    light: 'bg-amber-100 text-amber-700',
    dark: 'bg-amber-900/40 text-amber-300',
  },
}

export default function ExperienceSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`py-14 md:py-20 transition-colors duration-300 ${dark ? 'bg-[#242424]' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-16">
          <span
            className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
          >
            {EXPERIENCE_SECTION.kicker}
          </span>
          <h2 className={`text-2xl font-bold md:text-3xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
            {EXPERIENCE_SECTION.title}
          </h2>
          <p
            className={`mx-auto mt-3 max-w-2xl text-xs leading-relaxed md:text-sm ${dark ? 'text-[#909090]' : 'text-gray-500'}`}
          >
            {EXPERIENCE_SECTION.subtitle}
          </p>
        </div>

        <ol className="relative ml-2 border-l border-slate-200 pl-5 dark:border-[#43434d]">
          {EXPERIENCE_ITEMS.map((item) => {
            const style = CATEGORY_STYLES[item.category]
            return (
              <li key={`${item.period}-${item.title}`} className="relative pb-5 last:pb-0 md:pb-6">
                <span
                  className={`absolute -left-[1.63rem] top-2 h-2.5 w-2.5 rounded-full border-2 ${
                    dark ? 'border-[#8aa9d2] bg-[#1d2a3d]' : 'border-[#2563EB] bg-white'
                  }`}
                />
                <div
                  className={`rounded-2xl border px-4 py-3.5 md:px-5 md:py-4 ${
                    dark ? 'border-[#3c3c46] bg-[#2d2d35]' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                    <p className={`text-xs font-semibold tracking-wide md:text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{item.period}</p>
                    <span
                      className={`inline-flex w-fit rounded-md px-2 py-0.5 text-[11px] font-bold ${dark ? style.dark : style.light}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h3 className={`mt-1.5 text-sm font-bold md:text-base ${dark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`mt-1.5 text-xs leading-relaxed md:text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{item.detail}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
