import { useMemo, useState, type CSSProperties } from 'react'
import { Article, type VenteArticleData } from './Article'
import { Modal } from './Modal'

const sectionStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
}

const listStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
  listStyle: 'none',
  margin: 0,
  padding: 0,
}

const parsePrice = (raw: string): number => {
  const digits = raw.replace(/[^\d]/g, '')
  return digits ? Number(digits) : 0
}

const formatFcfa = (value: number): string => {
  return `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`
}

export const VentePage = () => {
  const items = useMemo<VenteArticleData[]>(
    () => [
      {
        id: 'article-plan',
        title: 'Plan Maison Moderne',
        subtitle: 'Architecture et conception',
        price: '150 000 FCFA',
        description: 'Plan complet avec facade, coupe, implantation et options de personnalisation.',
        imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'article-bim',
        title: 'Pack BIM Chantier',
        subtitle: 'Coordination technique',
        price: '240 000 FCFA',
        description: 'Maquette numerique, nomenclature materiaux et suivi de mise en oeuvre.',
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'article-formation',
        title: 'Formation AutoCAD Pro',
        subtitle: 'Session intensive',
        price: '95 000 FCFA',
        description: 'Module pratique sur plans techniques 2D/3D avec exercices de cas reels.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    [],
  )

  const [selected, setSelected] = useState<VenteArticleData | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const toggleSelected = (itemId: string) => {
    setSelectedIds((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.id)),
    [items, selectedIds],
  )

  const totalPrice = useMemo(
    () => selectedItems.reduce((sum, item) => sum + parsePrice(item.price), 0),
    [selectedItems],
  )

  return (
    <div className="grid_6 prefix_1 alpha omega" style={sectionStyle}>
      <h2>Vente d'articles</h2>
      <p style={{ margin: 0 }}>Coche plusieurs articles, puis ouvre une fiche detaillee si besoin.</p>

      <div
        style={{
          border: '1px solid #000',
          borderRadius: 18,
          padding: 12,
          background: 'rgba(251, 176, 59, 0.9)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <strong>
          {selectedItems.length} article{selectedItems.length > 1 ? 's' : ''} selectionne
          {selectedItems.length > 1 ? 's' : ''}
        </strong>
        <span>Total estime: {formatFcfa(totalPrice)}</span>
        <button
          type="button"
          style={{
            border: '1px solid rgba(0, 255, 0, 1)',
            background: selectedItems.length > 0 ? 'rgba(42, 255, 62, 1)' : '#ddd',
            borderRadius: 999,
            padding: '8px 14px',
            fontWeight: 700,
            cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
          }}
          disabled={selectedItems.length === 0}
          onClick={() => {
            const names = selectedItems.map((item) => item.title).join(', ')
            window.alert(`Demande multiple enregistree pour: ${names}`)
          }}
        >
          Demander ces articles
        </button>
      </div>

      <ul style={listStyle}>
        {items.map((item) => (
          <li key={item.id}>
            <Article
              item={item}
              onOpen={setSelected}
              selected={selectedIds.includes(item.id)}
              onToggleSelect={toggleSelected}
            />
          </li>
        ))}
      </ul>

      <Modal open={selected != null} item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
