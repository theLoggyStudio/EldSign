import { useEffect, useRef } from 'react'

export type BackgroundClickPlaneProps = {
  onBackgroundClick: () => void
}

/**
 * Calque fixe sous l’UI (#glob z-index supérieur) pour capter clic et molette sur la zone « fond ».
 * #glob a pointer-events: none sauf ses enfants interactifs ; ce plan assure le mode immersif + scroll du footer.
 */
export const BackgroundClickPlane = ({ onBackgroundClick }: BackgroundClickPlaneProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      const glob = document.getElementById('glob')
      if (!glob) return
      e.preventDefault()
      glob.scrollBy({ top: e.deltaY, left: 0, behavior: 'auto' })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={ref}
      className="eld-bg-click-plane"
      role="presentation"
      aria-hidden
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onBackgroundClick()
      }}
    />
  )
}
