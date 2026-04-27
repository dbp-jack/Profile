import { CLOSING_BLOCKS, CLOSING_SECTION } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'

export default function PhilosophyClosingSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()

  return (
    <section
      id="closing"
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
              className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed ${dark ? 'text-[#a8a8a8]' : 'text-gray-600'}`}
            >
              {CLOSING_SECTION.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-stretch md:gap-16 lg:gap-20 xl:gap-24">
            {CLOSING_BLOCKS.map((block) => {
              const paragraphs = block.body.split(/\n\n+/).map((p) => p.trim())
              return (
              <article
                key={block.titleKo}
                className={`flex h-full flex-col overflow-hidden rounded-2xl border shadow-md ${
                  dark
                    ? 'border-[#424242] bg-[#333333] shadow-black/25'
                    : 'border-indigo-100/90 bg-white shadow-slate-200/90'
                }`}
              >
                <header
                  className={`shrink-0 border-b px-6 pb-5 pt-6 sm:px-7 sm:pt-7 md:px-8 md:pb-6 md:pt-8 ${
                    dark ? 'border-[#3d3d3d] bg-[#363636]/50' : 'border-slate-100 bg-gradient-to-br from-[#fafbff] to-white'
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
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-[#8aa8e8]' : 'text-[#3730a3]'}`}
                      >
                        {block.titleEn}
                      </p>
                      <h3
                        className={`mt-1.5 break-keep text-xl font-extrabold leading-snug tracking-tight text-pretty md:text-2xl ${dark ? 'text-[#f4f4f4]' : 'text-gray-900'}`}
                      >
                        {block.titleKo}
                      </h3>
                    </div>
                  </div>
                </header>
                <div
                  className={`flex flex-1 flex-col gap-3 px-6 py-5 sm:px-7 md:gap-3.5 md:px-8 md:py-6 ${dark ? 'bg-[#2f2f2f]/40' : 'bg-slate-50/40'}`}
                >
                  <div className="w-full space-y-3 md:space-y-3.5">
                    {paragraphs.map((para, idx) => {
                      const isFirst = idx === 0
                      const isLast = idx === paragraphs.length - 1
                      const blockShell =
                        dark
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
                          key={`${block.titleKo}-${idx}`}
                          className={`rounded-xl border px-4 py-3 md:px-5 md:py-3.5 ${blockShell}`}
                        >
                          <p
                            className={`whitespace-pre-line text-pretty text-[0.9375rem] leading-[1.72] md:text-[1rem] md:leading-[1.75] ${
                              dark ? 'text-[#d8d8d8]' : 'text-slate-700'
                            } ${isFirst && !dark ? 'text-slate-800' : ''} ${isLast ? 'font-medium' : ''}`}
                          >
                            {para}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
