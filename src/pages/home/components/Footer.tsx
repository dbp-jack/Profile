import { HERO_NAME } from '@/content/portfolio'
import { useDarkMode } from '@/hooks/useDarkMode'

export default function Footer() {
  const { dark } = useDarkMode()
  const year = new Date().getFullYear()
  return (
    <footer
      className={`py-8 md:py-10 md:pl-14 transition-colors duration-300 ${
        /* Dark: footer bar + top divider. Light: navy bar only (no `border-t`). */
        dark ? 'border-t border-[#333333] bg-[#1e1e1e]' : 'bg-[#1E3A5F]'
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <p className={`text-sm font-medium ${dark ? 'text-[#909090]' : 'text-blue-200'}`}>{HERO_NAME}</p>
        <p className={`text-xs ${dark ? 'text-[#5a5a5a]' : 'text-blue-300'}`}>
          &copy; {year} {HERO_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
