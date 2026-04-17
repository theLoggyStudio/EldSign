import { useEffect, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import type { VenteArticleData } from './Article'

export type VenteModalProps = {
  open: boolean
  item: VenteArticleData | null
  onClose: () => void
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.55)',
  display: 'grid',
  placeItems: 'center',
  zIndex: 1200,
  padding: 20,
}

const dialogStyle: CSSProperties = {
  width: 'min(960px, 100%)',
  borderRadius: 28,
  border: '1px solid #000',
  background: 'rgba(251, 176, 59, 1)',
  overflow: 'hidden',
}

const buyButtonStyle: CSSProperties = {
  border: '1px solid rgba(0, 255, 0, 1)',
  background: 'rgba(42, 255, 62, 1)',
  borderRadius: 999,
  padding: '10px 18px',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 700,
}

export const Modal = ({ open, item, onClose }: VenteModalProps) => {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || !item) return null

  return createPortal(
    <div style={overlayStyle} onClick={onClose} role="presentation">
      <section style={dialogStyle} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 48%) 1fr' }}>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover', background: '#00FFFF' }}
          />
          <div style={{ padding: 18, display: 'grid', gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 36 }}>{item.title}</h2>
            {item.subtitle ? <p style={{ margin: 0 }}>{item.subtitle}</p> : null}
            <p style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>{item.price}</p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{item.description}</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="button" style={buyButtonStyle}>
                Acheter
              </button>
              <button type="button" style={{ ...buyButtonStyle, background: '#fff' }} onClick={onClose}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}
