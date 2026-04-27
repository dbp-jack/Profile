import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ABOUT_CARDS, ABOUT_SECTION } from '@/content/portfolio'

export default function AboutSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()

  return (
    <section
      id="about"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`relative overflow-hidden py-20 md:py-28 transition-colors duration-300 ${
        dark ? 'bg-[#2a2a2a]' : 'bg-[#F8F9FA]'
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-40 ${
          dark
            ? 'bg-[radial-gradient(ellipse_at_top,_rgba(30,58,95,0.35),_transparent_55%)]'
            : 'bg-[radial-gradient(ellipse_at_top,_rgba(37,99,235,0.12),_transparent_55%)]'
        }`}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center md:mb-16">
          <span
            className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
          >
            {ABOUT_SECTION.kicker}
          </span>
          <h2 className={`text-2xl font-bold md:text-3xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
            {ABOUT_SECTION.title}
          </h2>
          <p className={`mx-auto mt-3 max-w-2xl text-xs leading-relaxed md:text-sm ${dark ? 'text-[#909090]' : 'text-gray-500'}`}>
            {ABOUT_SECTION.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ABOUT_CARDS.map((card) => (
            <article
              key={card.title}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-7 md:p-8 shadow-sm transition-all duration-300 ${
                dark
                  ? 'border-[#3d3d3d] bg-[#333333] hover:border-[#5a5a5a] hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.65)]'
                  : 'border-gray-100 bg-white hover:border-[#BFDBFE] hover:shadow-[0_20px_50px_-24px_rgba(30,58,95,0.18)]'
              }`}
            >
              <div
                className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${
                  dark
                    ? 'bg-[#1E3A5F]/35 opacity-60 group-hover:opacity-90'
                    : 'bg-[#2563EB]/20 opacity-70 group-hover:opacity-100'
                }`}
              />

              <div className="relative flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    dark ? 'bg-[#3d3d3d] text-[#a0a0a0]' : 'bg-[#EFF6FF] text-[#1E3A5F]'
                  }`}
                >
                  <i className={`${card.icon} text-xl`} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`text-xl font-extrabold tracking-tight ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
                    {card.title}
                  </h3>
                  {'subtitle' in card && card.subtitle ? (
                    <p
                      className={`mt-1 text-xs font-semibold uppercase tracking-[0.14em] ${dark ? 'text-[#7a9fd4]' : 'text-[#2563EB]'}`}
                    >
                      {card.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>

              <div
                className={`relative mt-6 space-y-4 text-sm leading-relaxed ${dark ? 'text-[#b8b8b8]' : 'text-gray-600'}`}
              >
                {card.description.split(/\n\n+/).map((block) => (
                  <p key={block}>{block.trim()}</p>
                ))}
              </div>

              <div
                className={`relative mt-8 h-px w-full bg-gradient-to-r from-transparent ${
                  dark ? 'via-[#4a4a4a]' : 'via-gray-200'
                } to-transparent`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
