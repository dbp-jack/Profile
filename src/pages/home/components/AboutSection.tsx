import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ABOUT_CARDS, ABOUT_SECTION } from '@/content/portfolio'

const NUMS = ['01', '02', '03']

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

      <div className="relative mx-auto max-w-5xl px-6">
        {/* 헤더 — 현재 위치 유지 */}
        <div className="mb-10 text-center md:mb-16">
          <span
            className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
          >
            {ABOUT_SECTION.kicker}
          </span>
          <h2 className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
            {ABOUT_SECTION.title}
          </h2>
          <p className={`mx-auto mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${dark ? 'text-[#909090]' : 'text-gray-500'}`}>
            {ABOUT_SECTION.intro}
          </p>
        </div>

        {/* 카드 3개 — 세로 나열 가로 레이아웃 */}
        <div className="flex flex-col gap-5">
          {ABOUT_CARDS.map((card, i) => {
            const bullets = card.description
              .split('\n')
              .map((l) => l.trim())
              .filter((l) => l.length > 0)

            return (
              <article
                key={card.title}
                className={`flex overflow-hidden rounded-2xl border transition-all duration-300 ${
                  dark
                    ? 'border-[#3d3d3d] bg-[#2e2e2e] hover:border-[#5a5a5a]'
                    : 'border-gray-200 bg-white hover:border-[#BFDBFE] hover:shadow-md'
                }`}
              >
                {/* 왼쪽: 번호 + 카테고리명 */}
                <div
                  className={`flex w-36 shrink-0 flex-col items-center justify-center gap-1 border-r py-8 ${
                    dark ? 'border-[#3d3d3d]' : 'border-gray-100'
                  }`}
                >
                  <span className="text-5xl font-black leading-none text-[#2563EB]">
                    {NUMS[i]}
                  </span>
                  <span className={`mt-1 text-base font-bold ${dark ? 'text-[#a0a0a0]' : 'text-gray-700'}`}>
                    {card.title}
                  </span>
                </div>

                {/* 오른쪽: 소제목 + 내용 */}
                <div className={`flex flex-1 flex-col justify-center px-8 ${i < 2 ? 'py-5' : 'py-7'}`}>
                  {/* 소제목 */}
                  <h3
                    className={`${i < 2 ? 'mb-3 text-lg' : 'mb-4 text-xl'} font-extrabold ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
                    dangerouslySetInnerHTML={{ __html: card.subtitle }}
                  />

                  {/* 체크 bullet 목록 */}
                  <ul className={i < 2 ? 'space-y-1.5' : 'space-y-2'}>
                    {bullets.map((line, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="mt-0.5 shrink-0 text-[#2563EB]">✓</span>
                        <span
                          className={`${i < 2 ? 'text-sm' : 'text-sm md:text-base'} leading-relaxed ${dark ? 'text-[#c8c8c8]' : 'text-gray-700'}`}
                          dangerouslySetInnerHTML={{ __html: line }}
                        />
                      </li>
                    ))}
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
