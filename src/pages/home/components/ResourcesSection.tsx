import { useDarkMode } from '@/hooks/useDarkMode'
import { useFadeIn } from '@/hooks/useFadeIn'
import { RESOURCE_LINKS, RESOURCES_SECTION } from '@/content/portfolio'

export default function ResourcesSection() {
  const { dark } = useDarkMode()
  const { ref, visible } = useFadeIn()
  return (
    <section
      id="resources"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className={`py-16 md:py-24 transition-colors duration-300 ${dark ? 'bg-[#2a2a2a]' : 'bg-[#F8F9FA]'}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div data-sidebar-anchor="resources" className="mb-10 text-center md:mb-16">
          <span
            className={`mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] ${dark ? 'text-[#8fb5ff]' : 'text-[#2563EB]'}`}
          >
            {RESOURCES_SECTION.kicker}
          </span>
          <h2
            className={`text-3xl font-bold md:text-4xl ${dark ? 'text-[#e8e8e8]' : 'text-gray-900'}`}
          >
            {RESOURCES_SECTION.title}
          </h2>
          <div className={`mx-auto mt-3 h-1 w-12 rounded-full ${dark ? 'bg-[#5a5a5a]' : 'bg-[#1E3A5F]'}`} />
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {RESOURCE_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex cursor-pointer items-start gap-4 rounded-xl border p-4 sm:p-5 transition-all duration-200 ${
                dark
                  ? 'border-[#3d3d3d] bg-[#333333] hover:border-[#5a5a5a]'
                  : 'border-gray-100 bg-white hover:border-[#1E3A5F]/30'
              }`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                  dark
                    ? 'bg-[#3d3d3d] text-[#d1d5db] group-hover:bg-[#505050] group-hover:text-[#d0d0d0]'
                    : 'bg-[#f0f4fa] text-[#1E3A5F] group-hover:bg-[#1E3A5F] group-hover:text-white'
                }`}
              >
                <i className={`${item.icon} text-xl`} />
              </div>

              <div className="min-w-0">
                <p
                  className={`overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold transition-colors duration-200 ${
                    dark ? 'text-[#c8c8c8] group-hover:text-[#e8e8e8]' : 'text-gray-800 group-hover:text-[#1E3A5F]'
                  }`}
                >
                  {item.label}
                </p>
                {item.description && !item.description.startsWith('http') && (
                  <p className={`mt-0.5 text-sm leading-relaxed ${dark ? 'text-[#6a6a6a]' : 'text-gray-400'}`}>
                    {item.description}
                  </p>
                )}
              </div>

              <div
                className={`ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center transition-colors duration-200 ${
                  dark ? 'text-[#cbd5e1] group-hover:text-[#8fb5ff]' : 'text-slate-700 group-hover:text-[#1E3A5F]'
                }`}
              >
                <i className="ri-arrow-right-up-line text-lg" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
