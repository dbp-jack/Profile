import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ABOUT_SECTION } from '@/content/portfolio'
import { usePortfolioComposition } from '@/portfolio-builder/composition-state'

const NUMS = ['01', '02', '03']

export default function AboutSection() {
  const { dark } = useDarkMode()
  const { copyProfile, strengthsProfile } = usePortfolioComposition()
  const { ref, visible } = useFadeIn()
  const usesLegacyLayout = strengthsProfile.bulletStyle === 'legacy'

  return (
    <section
      id="about"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`relative overflow-hidden py-16 md:py-24 transition-colors duration-300 ${
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

      <div className="relative mx-auto max-w-5xl px-6">
        {/* 헤더 */}
        <div data-sidebar-anchor="about" className="mb-7 text-center md:mb-8">
          <span
            className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}
          >
            {ABOUT_SECTION.kicker}
          </span>
          <h2 className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
            {strengthsProfile.title}
          </h2>
          <p className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-700'}`}>
            {usesLegacyLayout ? copyProfile.aboutIntro : strengthsProfile.intro}
          </p>
        </div>

        {/* 카드 3개 — 세로 나열 가로 레이아웃 */}
        <div className="flex flex-col gap-5">
          {strengthsProfile.cards.map((card, i) => {
            const bullets = card.description
              .split('\n')
              .map((l) => l.trim())
              .filter((l) => l.length > 0)

            return (
              <article
                key={card.title}
                className={`flex flex-col overflow-hidden rounded-xl border transition-all duration-300 sm:min-h-[9rem] sm:flex-row ${
                  dark
                    ? 'border-[#3d3d3d] bg-[#2e2e2e] hover:border-[#5a5a5a]'
                    : 'border-gray-200 bg-white hover:border-[#BFDBFE] hover:shadow-md'
                }`}
              >
                {/* 왼쪽: 번호 + 카테고리명 */}
                <div
                  className={`flex w-full shrink-0 flex-row items-center justify-start gap-3 border-b px-5 py-3.5 sm:flex-col sm:justify-center sm:gap-1.5 sm:border-b-0 sm:border-r sm:py-5 ${
                    usesLegacyLayout ? 'sm:w-36 sm:px-0' : 'sm:w-44 sm:px-3'
                  } ${
                    dark ? 'border-[#3d3d3d]' : 'border-gray-100'
                  }`}
                >
                  <span className="text-3xl font-black leading-none text-[#2563EB] sm:text-4xl">
                    {NUMS[i]}
                  </span>
                  <span className={`flex items-center gap-2 text-base font-extrabold text-left ${dark ? 'text-[#d6d6d6]' : 'text-gray-800'}`}>
                    <i className={`${card.icon} text-lg text-[#2563EB] sm:text-xl`} aria-hidden />
                    <span>{card.title}</span>
                  </span>
                </div>

                {/* 오른쪽: 소제목 + 내용 */}
                <div className={`flex min-w-0 flex-1 flex-col justify-center px-5 sm:px-7 ${i === 0 ? 'py-3 sm:py-3' : 'py-4 sm:py-4'}`}>
                  {/* 소제목 */}
                  <h3
                    className={`${i === 0 ? 'mb-1.5' : 'mb-2'} text-lg font-extrabold leading-snug md:text-xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
                    dangerouslySetInnerHTML={{ __html: card.subtitle }}
                  />

                  <ul
                    className={
                      usesLegacyLayout
                        ? i === 0
                          ? 'space-y-1'
                          : i === 1
                            ? 'space-y-1.5'
                            : 'space-y-2'
                        : 'space-y-1.5'
                    }
                  >
                    {bullets.map((line, j) => {
                      return (
                        <li key={j} className="flex min-w-0 items-start gap-3">
                          {usesLegacyLayout ? (
                            <span className="mt-0.5 shrink-0 text-[#2563EB]">✓</span>
                          ) : (
                            <span
                              aria-hidden
                              className="mt-2.5 h-px w-3 shrink-0 bg-[#2563EB]"
                            />
                          )}
                          <span
                            className={`min-w-0 break-keep text-sm leading-relaxed ${dark ? 'text-[#c8c8c8]' : 'text-slate-800'}`}
                            dangerouslySetInnerHTML={{ __html: line }}
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
