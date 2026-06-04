import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  // 인쇄 모드에서는 즉시 visible로 처리
  const [isVisible, setIsVisible] = useState(
    () => window.matchMedia('print').matches,
  )

  useEffect(() => {
    // beforeprint 이벤트로 인쇄 직전 모두 렌더링
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
