import { useEffect, useState } from 'react'

export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null)
  const [alt, setAlt] = useState<string>('')

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName !== 'IMG') return

      const img = target as HTMLImageElement
      // 프로필 사진 제외
      if (img.src.includes('profile-photo')) return
      // 아이콘·로고 등 작은 이미지 제외 (32px 이하)
      if (img.naturalWidth > 0 && img.naturalWidth <= 32) return

      setSrc(img.src)
      setAlt(img.alt)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSrc(null)
    }
    if (src) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [src])

  if (!src) return null

  const isArchitectureImage = /(?:image-1780417036070|m3_infra)/.test(src)

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-4"
      onClick={() => setSrc(null)}
    >
      <button
        onClick={() => setSrc(null)}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 sm:right-4 sm:top-4"
        aria-label="닫기"
      >
        ✕
      </button>
      <div
        className={`relative max-h-[90vh] max-w-[94vw] rounded-xl ${
          isArchitectureImage ? 'overflow-auto' : 'overflow-visible'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className={`rounded-xl object-contain shadow-2xl ${
            isArchitectureImage
              ? 'block max-h-none w-[56rem] max-w-none sm:max-h-[90vh] sm:w-auto sm:max-w-[90vw]'
              : 'max-h-[90vh] max-w-[90vw]'
          }`}
        />
      </div>
      <p className="pointer-events-none absolute bottom-4 text-xs text-white/60">ESC 또는 배경 클릭으로 닫기</p>
    </div>
  )
}
