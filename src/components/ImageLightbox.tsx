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

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={() => setSrc(null)}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        />
        <button
          onClick={() => setSrc(null)}
          className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>
      <p className="absolute bottom-4 text-xs text-white/60">ESC 또는 배경 클릭으로 닫기</p>
    </div>
  )
}
