import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import { CONTACT_LINKS, CONTACT_SECTION } from '@/content/portfolio'

export default function ContactSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()
  return (
    <section
      id="contact"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`py-16 md:py-20 transition-colors duration-300 ${dark ? 'bg-[#242424]' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center md:mb-12">
          <span
            className={`mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8a8a8a]' : 'text-[#2563EB]'}`}
          >
            {CONTACT_SECTION.kicker}
          </span>
          <h2 className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}>
            {CONTACT_SECTION.title}
          </h2>
          <p className={`mt-3 text-sm ${dark ? 'text-[#909090]' : 'text-gray-500'}`}>
            {CONTACT_SECTION.subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10">
          {CONTACT_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              /* `mailto:` links stay in-tab; only treat real `mailto:` scheme (not bare "mailto"). */
              target={item.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group flex cursor-pointer items-center gap-3"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
                  dark ? 'bg-[#333333] group-hover:bg-[#404040]' : 'bg-gray-100 group-hover:bg-[#EFF6FF]'
                }`}
              >
                <i
                  className={`${item.icon} text-lg transition-colors duration-200 ${dark ? 'text-[#909090] group-hover:text-[#c0c0c0]' : 'text-gray-500 group-hover:text-[#1E3A5F]'}`}
                />
              </div>
              <span
                className={`text-sm font-medium underline-offset-2 transition-colors duration-200 group-hover:underline ${
                  dark ? 'text-[#909090] group-hover:text-[#d0d0d0]' : 'text-gray-600 group-hover:text-[#1E3A5F]'
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
