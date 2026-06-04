import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(
    () => window.matchMedia('print').matches,
  )

  useEffect(() => {
    const onBeforePrint = () => setIsVisible(true)
    window.addEventListener('beforeprint', onBeforePrint)

    const el = ref.current
    if (!el || isVisible) return () => window.removeEventListener('beforeprint', onBeforePrint)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px', threshold: 0, ...options },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      window.removeEventListener('beforeprint', onBeforePrint)
    }
  }, [])

  return { ref, isVisible }
}
