import { useEffect, useState, type CSSProperties } from 'react'
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
  width: 'min(1000px, 100%)',
  borderRadius: 30,
  border: '1px solid #000',
  background: 'transparent',
  overflow: 'hidden',
}

const buyButtonStyle: CSSProperties = {
  border: '1px solid #22d83f',
  background: '#2aff3e',
  borderRadius: 999,
  padding: '14px 18px',
  cursor: 'pointer',
  fontSize: 24,
  fontWeight: 500,
}

const segmentButtonBaseStyle: CSSProperties = {
  border: 'none',
  padding: '10px 20px',
  fontSize: 18,
  cursor: 'pointer',
  borderRadius: 999,
  fontWeight: 500,
}

export const Modal = ({ open, item, onClose }: VenteModalProps) => {
  const [withAssistance, setWithAssistance] = useState(false)

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
        <div style={{ display: 'grid', gridTemplateColumns: '62% 38%', minHeight: 540 }}>
          <img
            src={item.imageUrl}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              minHeight: 540,
              objectFit: 'cover',
              background: '#00FFFF',
              borderRight: '1px solid #000',
            }}
          />
          <div
            style={{
              background: '#f7b13f',
              padding: 26,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 18,
            }}
          >
            <div style={{ display: 'grid', gap: 16 }}>
              <h2 style={{ margin: 0, fontSize: 56, lineHeight: 1 }}>{item.title}</h2>
              <div
                style={{
                  display: 'inline-flex',
                  border: '2px solid #32dc45',
                  borderRadius: 999,
                  width: 'fit-content',
                  background: '#f2c066',
                  padding: 2,
                }}
              >
                <button
                  type="button"
                  onClick={() => setWithAssistance(false)}
                  style={{
                    ...segmentButtonBaseStyle,
                    background: withAssistance ? 'transparent' : '#25ff2f',
                  }}
                >
                  sans assistance
                </button>
                <button
                  type="button"
                  onClick={() => setWithAssistance(true)}
                  style={{
                    ...segmentButtonBaseStyle,
                    background: withAssistance ? '#25ff2f' : 'transparent',
                  }}
                >
                  avec assistance
                </button>
              </div>
              <p style={{ margin: 0, fontSize: 38, lineHeight: 1.15 }}>
                {withAssistance
                  ? `${item.description} Version avec assistance et accompagnement technique.`
                  : `${item.description} Version autonome sans assistance.`}
              </p>
            </div>
            <div>
              <button type="button" style={{ ...buyButtonStyle, width: '100%' }} onClick={onClose}>
                {item.price} {withAssistance ? 'avec assistance' : 'sans assistance'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  )
}
