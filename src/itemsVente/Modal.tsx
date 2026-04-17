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
  width: 'min(1020px, 100%)',
  borderRadius: 30,
  border: '1px solid #000',
  background: 'transparent',
  overflow: 'hidden',
}

const buyButtonStyle: CSSProperties = {
  border: '1px solid #2ad74f',
  background: '#2aff3e',
  borderRadius: 999,
  padding: '10px 24px',
  cursor: 'pointer',
  fontSize: 34,
  fontWeight: 700,
  lineHeight: 1,
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
        <div style={{ display: 'grid', gridTemplateColumns: '48% 52%', minHeight: 330 }}>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 330,
              objectFit: 'cover',
              background: '#00FFFF',
              borderRight: '1px solid #000',
            }}
          />
          <div
            style={{
              background: '#f7b13f',
              padding: 22,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 14,
            }}
          >
            <div style={{ display: 'grid', gap: 12 }}>
              <h2
                style={{
                  margin: 0,
                  color: '#f4f1db',
                  fontSize: 62,
                  lineHeight: 0.95,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  fontWeight: 900,
                }}
              >
                {item.title}
              </h2>
              {item.subtitle ? (
                <p style={{ margin: 0, color: '#1e1e1e', fontSize: 38, lineHeight: 1.1 }}>{item.subtitle}</p>
              ) : null}
              <p style={{ margin: 0, color: '#111', fontSize: 53, fontWeight: 800, lineHeight: 1.05 }}>{item.price}</p>
              <p style={{ margin: 0, color: '#111', fontSize: 38, lineHeight: 1.2 }}>{item.description}</p>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <button type="button" style={buyButtonStyle}>
                Acheter
              </button>
              <button
                type="button"
                style={{ ...buyButtonStyle, background: '#f4f4f4', color: '#111', borderColor: '#2ad74f' }}
                onClick={onClose}
              >
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
