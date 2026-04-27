import { useDarkMode } from '@/hooks/useDarkMode'
import {
  HERO_NAME,
  HERO_PERSONAL_INFO,
  HERO_ROLE_BADGE,
  HERO_ROLE_TITLE,
  HERO_SKILL_TAGS,
  HERO_TECH_STACK_LABEL,
} from '@/content/portfolio'

export default function HeroSection() {
  const { dark } = useDarkMode()

  return (
    <section
      id="hero"
      className={`relative flex min-h-[88svh] md:min-h-screen items-center overflow-hidden transition-colors duration-300 ${dark ? 'bg-[#242424]' : 'bg-white'}`}
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full"
        style={{
          transform: 'translate(30%, -30%)',
          background: dark
            ? 'radial-gradient(circle, rgba(148,163,184,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(30,58,95,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full"
        style={{
          transform: 'translate(-40%, 40%)',
          background: dark
            ? 'radial-gradient(circle, rgba(148,163,184,0.04) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-14 pt-20 sm:px-6 sm:pb-16 sm:pt-24 md:pb-20 md:pt-28">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-14">
          <div className="flex flex-shrink-0 flex-col items-center gap-3">
            <div
              className={`profile-photo-frame h-64 w-48 overflow-hidden rounded-2xl border md:h-80 md:w-60 ${
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

          <div className="min-w-0 flex-1">
            <span
              className={`mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
                dark ? 'border-[#4a4a4a] text-[#a0a0a0]' : 'border-[#1E3A5F] text-[#1E3A5F]'
              }`}
            >
              {HERO_ROLE_BADGE}
            </span>
            <h1
              className={`mb-1 text-4xl font-extrabold leading-tight md:text-6xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
            >
              {HERO_NAME}
            </h1>
            <p
              className={`mb-6 text-xl font-semibold md:text-2xl ${dark ? 'text-[#a0a0a0]' : 'text-[#1E3A5F]'}`}
            >
              {HERO_ROLE_TITLE}
            </p>

            <ul className="mb-8 flex flex-col gap-2.5">
              {HERO_PERSONAL_INFO.map((item) => (
                <li
                  key={item.icon + item.text}
                  className={`flex items-center gap-3 text-sm ${dark ? 'text-[#a0a0a0]' : 'text-gray-600'}`}
                >
                  <span
                    className={`flex h-5 w-5 items-center justify-center ${dark ? 'text-[#7a7a7a]' : 'text-[#1E3A5F]'}`}
                  >
                    <i className={`${item.icon} text-base`} />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`cursor-pointer transition-colors hover:underline ${dark ? 'hover:text-[#d0d0d0]' : 'hover:text-[#1E3A5F]'}`}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-wide ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
            >
              {HERO_TECH_STACK_LABEL}
            </p>
            <div className="flex flex-wrap gap-2">
              {HERO_SKILL_TAGS.map((tag) => (
                <span
                  key={tag}
                  className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${dark ? 'border-[#444444] bg-[#333333] text-[#b0b0b0]' : 'border-[#1E3A5F]/15 bg-[#f0f4fa] text-[#1E3A5F]'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
