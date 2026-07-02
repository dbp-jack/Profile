import { useDarkMode } from '@/hooks/useDarkMode'
import {
  HERO_NAME,
  HERO_PERSONAL_INFO,
  HERO_ROLE_BADGE,
  HERO_SKILL_GROUPS,
  HERO_TECH_STACK_LABEL,
} from '@/content/portfolio'
import { usePortfolioComposition } from '@/portfolio-builder/composition-state'

export default function HeroSection() {
  const { dark } = useDarkMode()
  const { copyProfile } = usePortfolioComposition()
  const infoRows = HERO_PERSONAL_INFO.filter((item) => !item.href)
  const externalLinks = HERO_PERSONAL_INFO.filter((item) => item.href).map((item) => ({
    ...item,
    label: item.href?.includes('linkedin.com') ? 'LinkedIn' : 'GitHub',
  }))

  return (
    <section
      id="hero"
      className={`relative flex min-h-[88svh] md:min-h-screen items-center overflow-hidden transition-colors duration-300 ${dark ? 'bg-[#242424]' : 'bg-white'}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full"
        style={{
          transform: 'translate(30%, -30%)',
          background: dark
            ? 'radial-gradient(circle, rgba(148,163,184,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(30,58,95,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full"
        style={{
          transform: 'translate(-40%, 40%)',
          background: dark
            ? 'radial-gradient(circle, rgba(148,163,184,0.04) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 md:pb-20 md:pt-24">
        <div className="flex flex-col gap-8 md:gap-9">
          <div data-sidebar-anchor="hero" className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-14">
            <div className="flex flex-shrink-0 flex-col items-center gap-3">
              <div
                className={`profile-photo-frame h-64 w-48 overflow-hidden rounded-2xl border md:h-[19rem] md:w-[14.25rem] ${
                  dark ? 'border-[#4a4a4a] bg-[#2e2e2e]' : 'border-[#1E3A5F]/20 bg-[#f4f7fb]'
                }`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}profile-photo.png`}
                  alt="정민수 증명사진"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1 md:pt-2">
              <span
                className={`mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-widest md:mb-5 ${
                  dark ? 'border-[#4a4a4a] text-[#d1d5db]' : 'border-[#1E3A5F] text-[#1E3A5F]'
                }`}
              >
                {HERO_ROLE_BADGE}
              </span>
              <h1
                className={`text-5xl font-extrabold leading-tight md:text-6xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
              >
                {HERO_NAME}
              </h1>
              <p
                className={`hero-tagline mb-4 mt-2 max-w-xl text-pretty text-lg font-semibold leading-relaxed text-balance md:mb-5 md:mt-3 md:max-w-2xl md:text-xl ${
                  dark ? 'text-[#d1d5db]' : 'text-slate-700'
                }`}
              >
                {copyProfile.heroRoleTitle}
              </p>

              <ul className="mb-4 flex flex-col gap-2.5">
                {infoRows.map((item) => (
                  <li
                    key={item.icon + item.text}
                    className={`flex min-w-0 items-center gap-3 text-base ${dark ? 'text-[#d1d5db]' : 'text-slate-800'}`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center ${dark ? 'text-[#7a7a7a]' : 'text-[#1E3A5F]'}`}
                    >
                      <i className={`${item.icon} text-lg`} />
                    </span>
                    <span className="min-w-0 break-words">{item.text}</span>
                  </li>
                ))}
              </ul>

              {externalLinks.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {externalLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold transition-colors ${
                        dark
                          ? 'bg-[#303030] text-[#e0e0e0] hover:bg-[#3a3a3a]'
                          : 'bg-[#F1F5F9] text-[#1E3A5F] shadow-sm hover:bg-[#1E3A5F] hover:text-white'
                      }`}
                    >
                      <i className={`${link.icon} text-base`} aria-hidden="true" />
                      {link.label}
                      <i className="ri-external-link-line text-sm" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className={`hero-tech-panel rounded-2xl border px-4 py-4 md:px-6 md:py-5 ${
              dark
                ? 'border-[#3f3f46] bg-[#2b2b2f]/80'
                : 'border-[#1E3A5F]/12 bg-[#F8FAFC]'
            }`}
          >
            <div
              className={`mb-3 flex items-center gap-3 border-b pb-3 ${
                dark ? 'border-[#3d3d44]' : 'border-slate-200'
              }`}
            >
              <span
                className={`text-sm font-extrabold tracking-wide ${dark ? 'text-[#cfd7e6]' : 'text-[#2563EB]'}`}
              >
                {HERO_TECH_STACK_LABEL}
              </span>
              <span className={`h-px flex-1 ${dark ? 'bg-[#3d3d44]' : 'bg-slate-200'}`} />
            </div>

            <div className="space-y-2.5">
              {HERO_SKILL_GROUPS.map((group) => (
                <div key={group.label} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <span
                    className={`w-32 shrink-0 text-xs font-bold uppercase tracking-wider ${
                      dark ? 'text-[#cbd5e1]' : 'text-slate-700'
                    }`}
                  >
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium ${
                          dark
                            ? 'border-[#444444] bg-[#333333] text-[#d1d5db]'
                            : 'border-[#1E3A5F]/15 bg-white text-[#1E3A5F] shadow-[0_1px_0_rgba(15,23,42,0.04)]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
