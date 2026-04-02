import { useEffect, useMemo, useState } from 'react'
import { cssBackgroundUrl } from '../backgroundUrls'

const PAGE_SIZE = 9

export type BackgroundThumbPagerProps = {
  urls: string[]
  activeIndex: number
  onSelectIndex: (index: number) => void
}

export const BackgroundThumbPager = ({ urls, activeIndex, onSelectIndex }: BackgroundThumbPagerProps) => {
  const totalPages = Math.ceil(urls.length / PAGE_SIZE)
  const [pageIndex, setPageIndex] = useState(0)

  /** Garde la page alignée sur l’image active (défilement auto ou clic hors page). */
  useEffect(() => {
    const page = Math.min(Math.floor(activeIndex / PAGE_SIZE), Math.max(0, totalPages - 1))
    setPageIndex(page)
  }, [activeIndex, totalPages])

  const start = pageIndex * PAGE_SIZE
  const visible = useMemo(() => urls.slice(start, start + PAGE_SIZE), [urls, start])

  const canPrev = pageIndex > 0
  const canNext = pageIndex < totalPages - 1

  if (urls.length === 0) return null

  return (
    <center>
    <div className="">
      <div className="bg-thumb-pager">
      {totalPages > 1 && (
        <div className="bg-thumb-pager__controls" role="group" aria-label="Navigation des aperçus de fond">
          <button
            type="button"
            className="bg-thumb-pager__arrow"
            disabled={!canPrev}
            aria-label="Images précédentes"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
          >
            ‹
          </button>
          <div className="bg-thumb-pager__dots" role="tablist" aria-label="Groupes d’aperçus">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === pageIndex}
                aria-current={i === pageIndex ? 'true' : undefined}
                className={`bg-thumb-pager__dot${i === pageIndex ? ' is-active' : ''}`}
                aria-label="Afficher ce groupe d’aperçus"
                onClick={() => setPageIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="bg-thumb-pager__arrow"
            disabled={!canNext}
            aria-label="Images suivantes"
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
          >
            ›
          </button>
        </div>
      )}
      <div className="bg-thumbs">
        <ul>
          {visible.map((url, j) => {
            const globalIndex = start + j
            return (
              <li key={`${url}-${globalIndex}`} className={globalIndex === activeIndex ? 'active' : ''}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onSelectIndex(globalIndex)
                  }}
                  aria-label={`Arrière-plan ${globalIndex + 1}`}
                >
                  <div className="bg-thumb-preview" style={{ backgroundImage: cssBackgroundUrl(url) }} />
                  <span />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      </div>
    </div>
    </center>
  )
}
