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

  return (
    <div className="grid_6 prefix_1 alpha omega" style={sectionStyle}>
      <h2>Vente d'articles</h2>
      <p style={{ margin: 0 }}>Cliquez sur un article pour ouvrir sa fiche detaillee.</p>

      <ul style={listStyle}>
        {items.map((item) => (
          <li key={item.id}>
            <Article item={item} onOpen={setSelected} />
          </li>
        ))}
      </ul>

      <Modal open={selected != null} item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
