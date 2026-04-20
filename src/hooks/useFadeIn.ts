import { useEffect, useRef, useState } from 'react'

/**
 * Fade-in for sections: IntersectionObserver (threshold 0.08) + initial viewport check.
 * Use with inline `style` from `visible` (same pattern as About / Projects / Contact / Resources / Skills).
 */
export const useFadeIn = () => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return

    if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return { ref, visible }
}
