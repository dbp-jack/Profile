import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ABOUT_CARDS, ABOUT_SECTION } from '@/content/portfolio'

const NUMS = ['01', '02', '03']

const ABOUT_HIGHLIGHTS = [
  '응답시간 <span class="font-black text-[#2563EB]">91% 단축</span> · SQL <span class="font-black text-[#2563EB]">42회 → 2회 축소</span>',
  '팀 스프린트 <span class="font-black text-[#2563EB]">가시성 확보</span>',
  '<span class="font-black text-[#2563EB]">기획·설계·개발 단독 주도</span>',
] as const

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
                className={`flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 sm:min-h-[9.5rem] sm:flex-row ${
                  dark
                    ? 'border-[#3d3d3d] bg-[#2e2e2e] hover:border-[#5a5a5a]'
                    : 'border-gray-200 bg-white hover:border-[#BFDBFE] hover:shadow-md'
                }`}
              >
                {/* 왼쪽: 번호 + 카테고리명 */}
                <div
                  className={`flex w-full shrink-0 flex-row items-center justify-start gap-3 border-b px-5 py-4 sm:w-40 sm:flex-col sm:justify-center sm:gap-2 sm:border-b-0 sm:border-r sm:px-0 sm:py-6 ${
                    dark ? 'border-[#3d3d3d]' : 'border-gray-100'
                  }`}
                >
                  <span className="text-4xl font-black leading-none text-[#2563EB] sm:text-5xl">
                    {NUMS[i]}
                  </span>
                  <span className={`flex items-center gap-2 text-lg font-extrabold sm:flex-col sm:gap-1 sm:text-center ${dark ? 'text-[#d6d6d6]' : 'text-gray-800'}`}>
                    <i className={`${card.icon} text-xl text-[#2563EB] sm:text-2xl`} aria-hidden />
                    <span>{card.title}</span>
                  </span>
                </div>

                {/* 오른쪽: 소제목 + 내용 */}
                <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-4 sm:px-8 sm:py-5">
                  {/* 소제목 */}
                  <h3
                    className={`mb-2.5 text-xl font-extrabold leading-snug md:text-[1.3rem] ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
                    dangerouslySetInnerHTML={{ __html: card.subtitle }}
                  />

                  <div
                    className={`mb-3 inline-flex w-fit max-w-full rounded-lg border px-3 py-1.5 text-sm font-bold leading-snug md:text-[0.95rem] ${
                      dark
                        ? 'border-[#31558e] bg-[#233654] text-[#dbeafe]'
                        : 'border-[#BFDBFE] bg-[#EFF6FF] text-[#172554]'
                    }`}
                    dangerouslySetInnerHTML={{ __html: ABOUT_HIGHLIGHTS[i] }}
                  />

                  {/* 체크 bullet 목록 */}
                  <ul className={i === 0 ? 'space-y-1' : i === 1 ? 'space-y-1.5' : 'space-y-2'}>
                    {bullets.map((line, j) => {
                      const noCheck = j === 0 && i < 2
                      return (
                      <li key={j} className="flex min-w-0 items-start gap-3">
                        {!noCheck && <span className="mt-0.5 shrink-0 text-[#2563EB]">✓</span>}
                        <span
                          className={`min-w-0 break-keep ${noCheck ? 'font-semibold' : ''} text-sm leading-relaxed md:text-[0.95rem] ${dark ? 'text-[#c8c8c8]' : 'text-gray-700'}`}
                          dangerouslySetInnerHTML={{ __html: line }}
                        />
                      </li>
                    )})}

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
