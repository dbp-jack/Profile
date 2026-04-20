import { useEffect, useState } from 'react'

export const useTyping = (phrases: string[], speed = 80, pause = 2000) => {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (phrases.length === 0) return
    const current = phrases[phraseIndex]

    const timeout = window.setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          const next = charIndex + 1
          setDisplayed(current.slice(0, next))
          setCharIndex(next)
        } else {
          window.setTimeout(() => setDeleting(true), pause)
        }
      } else if (charIndex > 0) {
        const next = charIndex - 1
        setDisplayed(current.slice(0, next))
        setCharIndex(next)
      } else {
        setDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }
    }, deleting ? speed / 2 : speed)

    return () => window.clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex, phrases, speed, pause])

  return displayed
}
