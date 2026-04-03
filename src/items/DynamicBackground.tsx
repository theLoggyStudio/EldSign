import { useCallback, useEffect, useRef, useState } from 'react'
import { BACKGROUND_FALLBACK, cssBackgroundUrl } from '../backgroundUrls'

const FADE_MS = 1500
const INTERVAL_MS = 10_000

export type DynamicBackgroundProps = {
  urls: string[]
  activeIndex: number
  onActiveIndexChange: (index: number) => void
  /** Mode immersif : flou sur les calques du fond. */
  immersiveBlur?: boolean
}

export const DynamicBackground = ({
  urls,
  activeIndex,
  onActiveIndexChange,
  immersiveBlur = false,
}: DynamicBackgroundProps) => {
  const [baseIndex, setBaseIndex] = useState(0)
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null)
  const [overlayOpaque, setOverlayOpaque] = useState(false)
  const [overlayTransition, setOverlayTransition] = useState(true)

  const committedRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onChangeRef = useRef(onActiveIndexChange)
  const urlsLenRef = useRef(urls.length)

  onChangeRef.current = onActiveIndexChange
  urlsLenRef.current = urls.length

  const clearSchedule = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const scheduleNext = useCallback(() => {
    clearSchedule()
    if (urlsLenRef.current < 2) return
    timeoutRef.current = setTimeout(() => {
      const i = committedRef.current
      const n = urlsLenRef.current
      onChangeRef.current((i + 1) % n)
    }, INTERVAL_MS)
  }, [])

  const finishFade = useCallback(
    (toIndex: number) => {
      committedRef.current = toIndex
      setBaseIndex(toIndex)
      setOverlayTransition(false)
      setOverlayOpaque(false)
      setOverlayIndex(null)
      requestAnimationFrame(() => {
        setOverlayTransition(true)
        scheduleNext()
      })
    },
    [scheduleNext],
  )

  const startFadeTo = useCallback((toIndex: number) => {
    if (urlsLenRef.current === 0) return
    clearSchedule()
    setOverlayIndex(toIndex)
    setOverlayTransition(true)
    setOverlayOpaque(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayOpaque(true))
    })
  }, [])

  const onOverlayTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'opacity') return
    if (!overlayOpaque || overlayIndex === null) return
    finishFade(overlayIndex)
  }

  /** Quand le parent change l’index (défilement auto ou vignette), lancer le fondu. */
  useEffect(() => {
    if (urls.length === 0) return
    const target = ((activeIndex % urls.length) + urls.length) % urls.length
    if (target === committedRef.current) return
    startFadeTo(target)
  }, [activeIndex, urls.length, startFadeTo])

  /** Premier planification du slide automatique. */
  useEffect(() => {
    if (urls.length < 2) return
    scheduleNext()
    return clearSchedule
  }, [urls.length, scheduleNext])

  if (urls.length === 0) {
    return (
      <div
        id="bgStretch"
        className={immersiveBlur ? 'immersive-bg--blur' : undefined}
        aria-hidden
        role="presentation"
      >
        <div
          className="bg-inner bg-layer-base"
          style={{ backgroundImage: BACKGROUND_FALLBACK }}
        />
      </div>
    )
  }

  const baseUrl = urls[baseIndex]
  const overlayUrl = overlayIndex !== null ? urls[overlayIndex] : null

  return (
    <div
      id="bgStretch"
      className={immersiveBlur ? 'immersive-bg--blur' : undefined}
      aria-hidden
      role="presentation"
    >
      <div
        className="bg-inner bg-layer-base"
        style={{ backgroundImage: cssBackgroundUrl(baseUrl) }}
      />
      {overlayUrl !== null && (
        <div
          className="bg-inner bg-layer-overlay"
          style={{
            backgroundImage: cssBackgroundUrl(overlayUrl),
            opacity: overlayOpaque ? 1 : 0,
            transition: overlayTransition ? `opacity ${FADE_MS}ms ease-in-out` : 'none',
          }}
          onTransitionEnd={onOverlayTransitionEnd}
        />
      )}
    </div>
  )
}
