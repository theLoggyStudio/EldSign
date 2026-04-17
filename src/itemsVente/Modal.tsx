import { useEffect, useMemo, useState, type CSSProperties } from 'react'
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
  background: 'rgba(0, 0, 0, 0.58)',
  display: 'grid',
  placeItems: 'center',
  zIndex: 1400,
  padding: 24,
}

const dialogStyle: CSSProperties = {
  width: 'min(1020px, 96vw)',
  borderRadius: 28,
  border: '1px solid #000',
  background: '#f4ae3c',
  overflow: 'hidden',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
}

const baseButtonStyle: CSSProperties = {
  border: '1px solid #2ed54f',
  borderRadius: 999,
  padding: '10px 24px',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 600,
  lineHeight: 1.1,
  transition: 'transform 0.12s ease',
}

export const Modal = ({ open, item, onClose }: VenteModalProps) => {
  const [withAssistance, setWithAssistance] = useState(false)

  useEffect(() => {
    if (!open) return
    setWithAssistance(false)
  }, [open, item?.id])

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

  const displayedPrice = useMemo(() => {
    if (!withAssistance) return item.price
    const digits = item.price.replace(/[^\d]/g, '')
    if (!digits) return `${item.price} + assistance`
    const base = Number(digits)
    const assisted = Math.round(base * 1.2)
    return `${new Intl.NumberFormat('fr-FR').format(assisted)} FCFA`
  }, [item.price, withAssistance])

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
              background: '#24d6dc',
              borderRight: '1px solid #000',
            }}
          />
          <div
            style={{
              padding: '22px 18px 20px',
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
                  color: '#f7f1da',
                  fontSize: 58,
                  lineHeight: 0.92,
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  fontWeight: 800,
                  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
                }}
              >
                {item.title}
              </h2>
              {item.subtitle ? (
                <p style={{ margin: 0, color: '#141414', fontSize: 34, lineHeight: 1.05 }}>{item.subtitle}</p>
              ) : null}
              <div
                style={{
                  display: 'inline-flex',
                  width: 'fit-content',
                  border: '2px solid #2ed54f',
                  borderRadius: 999,
                  padding: 2,
                  background: 'rgba(255, 255, 255, 0.28)',
                  gap: 2,
                }}
              >
                <button
                  type="button"
                  onClick={() => setWithAssistance(false)}
                  style={{
                    ...baseButtonStyle,
                    padding: '8px 16px',
                    background: withAssistance ? 'transparent' : '#2aff3e',
                    border: 'none',
                    fontSize: 14,
                  }}
                >
                  sans assistance
                </button>
                <button
                  type="button"
                  onClick={() => setWithAssistance(true)}
                  style={{
                    ...baseButtonStyle,
                    padding: '8px 16px',
                    background: withAssistance ? '#2aff3e' : 'transparent',
                    border: 'none',
                    fontSize: 14,
                  }}
                >
                  avec assistance
                </button>
              </div>
              <p style={{ margin: 0, color: '#111', fontSize: 47, fontWeight: 800, lineHeight: 1.03 }}>{displayedPrice}</p>
              <p style={{ margin: 0, color: '#111', fontSize: 34, lineHeight: 1.2 }}>{item.description}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button type="button" style={{ ...baseButtonStyle, background: '#2aff3e', color: '#121212' }}>
                Acheter
              </button>
              <button
                type="button"
                style={{ ...baseButtonStyle, background: '#f4f4f4', color: '#111' }}
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
