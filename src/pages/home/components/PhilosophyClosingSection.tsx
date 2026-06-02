import { CLOSING_BLOCKS, CLOSING_SECTION } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'

export default function PhilosophyClosingSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()

  const allParagraphs = CLOSING_BLOCKS.map((block) =>
    block.body.split(/\n\n+/).map((p) => p.trim()),
  )
  const maxRows = Math.max(...allParagraphs.map((p) => p.length))

  return (
    <section
      id="closing"
      lang="ko"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`border-t py-20 md:py-24 transition-colors duration-300 ${
        dark ? 'border-[#3d3d3d] bg-[#262626]' : 'border-gray-200 bg-[#f8fafc]'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:max-w-7xl lg:px-10">
        <div className="pdf-closing-bunch">
          <div className="mb-10 text-center md:mb-20">
            <span
              className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
            >
              {CLOSING_SECTION.kicker}
            </span>
            <h2
              className={`break-keep text-2xl font-bold tracking-tight text-balance sm:text-3xl md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
            >
              {CLOSING_SECTION.title}
            </h2>
            <p
              className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed break-keep ${dark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}
            >
              {CLOSING_SECTION.subtitle}
            </p>
          </div>

          {/* 헤더 행 */}
          <div className="grid grid-cols-1 gap-x-16 gap-y-3 md:grid-cols-2 lg:gap-x-20 xl:gap-x-24">
            {CLOSING_BLOCKS.map((block) => (
              <div
                key={block.titleKo}
                className={`overflow-hidden rounded-2xl border shadow-md ${
                  dark
                    ? 'border-[#424242] bg-[#333333] shadow-black/25'
                    : 'border-indigo-100/90 bg-white shadow-slate-200/90'
                }`}
              >
                <div
                  className={`px-8 pb-3 pt-4 sm:px-10 md:px-12 ${
                    dark ? 'bg-[#363636]/50' : 'bg-gradient-to-br from-[#fafbff] to-white'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                        dark ? 'bg-[#2a3148] text-[#b4c2f0]' : 'bg-[#EEF2FF] text-[#1e3a8a]'
                      }`}
                    >
                      <i className={`${block.icon} text-2xl`} aria-hidden />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p
                        className={`text-[0.6875rem] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-[#8aa8e8]' : 'text-[#3730a3]'}`}
                      >
                        {block.titleEn}
                      </p>
                      <h3
                        className={`mt-1.5 text-xl font-extrabold leading-snug tracking-tight break-keep ${dark ? 'text-[#f4f4f4]' : 'text-gray-900'}`}
                      >
                        {block.titleKo}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 서브카드 행 — 열별로 높이 자동 정렬 */}
            {Array.from({ length: maxRows }).map((_, rowIdx) =>
              CLOSING_BLOCKS.map((block, colIdx) => {
                const para = allParagraphs[colIdx][rowIdx]
                if (!para) return <div key={`empty-${colIdx}-${rowIdx}`} />
                const isFirst = rowIdx === 0
                const isLast = rowIdx === allParagraphs[colIdx].length - 1
                const blockShell = dark
                  ? isFirst
                    ? 'border-[#3d4460] bg-[#323848]/90'
                    : isLast
                      ? 'border-[#4a4a55] bg-[#383838]/80'
                      : 'border-[#40404a] bg-[#363636]/70'
                  : isFirst
                    ? 'border-indigo-200/70 bg-white shadow-sm ring-1 ring-indigo-100/40'
                    : isLast
                      ? 'border-slate-200/90 bg-white shadow-sm'
                      : 'border-slate-200/70 bg-white/90 shadow-sm'
                return (
                  <div
                    key={`${block.titleKo}-${rowIdx}`}
                    className={`flex flex-col justify-center rounded-xl border px-6 py-3 md:px-8 md:py-3.5 ${blockShell}`}
                  >
                    {para.includes('<') ? (
                      <div
                        className={`closing-card-body-html text-sm leading-[1.72] break-keep ${
                          dark ? 'text-[#d8d8d8]' : 'text-slate-700'
                        } ${isFirst && !dark ? 'text-slate-800' : ''} ${isLast ? 'font-medium' : ''}`}
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ) : (
                      <p
                        className={`whitespace-pre-line text-sm leading-[1.72] break-keep ${
                          dark ? 'text-[#d8d8d8]' : 'text-slate-700'
                        } ${isFirst && !dark ? 'text-slate-800' : ''} ${isLast ? 'font-medium' : ''}`}
                      >
                        {para}
                      </p>
                    )}
                  </div>
                )
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
