import type { CSSProperties } from 'react'

export type VenteArticleData = {
  id: string
  title: string
  price: string
  subtitle?: string
  description: string
  imageUrl: string
}

export type VenteArticleProps = {
  item: VenteArticleData
  onOpen: (item: VenteArticleData) => void
  selected?: boolean
  onToggleSelect?: (itemId: string) => void
}

const rowStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(200px, 40%) 1fr',
  gap: 16,
  background: 'rgba(251, 176, 59, 1)',
  border: '1px solid #000',
  borderRadius: 26,
  padding: 14,
  width: '100%',
  boxSizing: 'border-box',
  alignItems: 'stretch',
}

const imageStyle: CSSProperties = {
  width: '100%',
  height: 220,
  borderRadius: '22px 0 0 22px',
  objectFit: 'cover',
  border: '1px solid #000',
  background: 'rgba(0, 255, 255, 1)',
}

const openButtonStyle: CSSProperties = {
  border: '1px solid rgba(0, 255, 0, 1)',
  background: 'rgba(42, 255, 62, 1)',
  borderRadius: 999,
  padding: '10px 18px',
  cursor: 'pointer',
  fontSize: 16,
  fontWeight: 700,
}

export const Article = ({ item, onOpen, selected = false, onToggleSelect }: VenteArticleProps) => {
  return (
    <article style={rowStyle}>
      <img src={item.imageUrl} alt={item.title} style={imageStyle} loading="lazy" decoding="async" />
      <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
        <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', fontWeight: 600 }}>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onToggleSelect?.(item.id)}
            aria-label={`Selectionner ${item.title}`}
          />
          Selection multiple
        </label>
        <h3 style={{ margin: 0, fontSize: 28 }}>{item.title}</h3>
        {item.subtitle ? <p style={{ margin: 0, fontSize: 16 }}>{item.subtitle}</p> : null}
        <p style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{item.price}</p>
        <p style={{ margin: 0, lineHeight: 1.4 }}>{item.description}</p>
        <div>
          <button type="button" style={openButtonStyle} onClick={() => onOpen(item)}>
            Voir l'article
          </button>
        </div>
      </div>
    </article>
  )
}
