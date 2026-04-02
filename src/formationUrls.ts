const modules = import.meta.glob('../Assets/Formations/**/*.{jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF,webp,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/**
 * Dérive nom, prix, horaire et description depuis le nom de fichier (sans extension).
 *
 * Format : `<nom>_<prix>_<horaire>_<description>`
 * Séparateur : `_`. Un `__` crée un segment vide.
 *
 * - 1 à 3 segments (après split) : pas de description ; tout après le prix = horaire
 *   (ex. `Nom_Prix_Lun_9h` → horaire `Lun_9h`).
 * - 4 segments ou plus : **dernier** segment = description ; entre prix et dernier = horaire
 *   (ex. `Nom_Prix_Lun_9h_Initiation CAO` → horaire `Lun_9h`, description `Initiation CAO`).
 * - Horaire avec `_` mais **sans** description : terminer par `_` vide
 *   (ex. `Nom_Prix_Lun_9h_` → horaire `Lun_9h`, description vide).
 */
export function parseFormationFilenameBase(base: string): {
  title: string
  price: string
  schedule: string
  description: string
} {
  const trimmed = base.replace(/\s+/g, ' ').trim()
  if (!trimmed) {
    return { title: 'Formation', price: '', schedule: '', description: '' }
  }

  const segments = trimmed.split('_')

  if (segments.length === 1) {
    return { title: segments[0], price: '', schedule: '', description: '' }
  }

  if (segments.length === 2) {
    return {
      title: segments[0].trim() || 'Formation',
      price: segments[1].trim(),
      schedule: '',
      description: '',
    }
  }

  const title = segments[0].trim() || 'Formation'
  const price = segments[1].trim()

  if (segments.length === 3) {
    return {
      title,
      price,
      schedule: segments[2].trim(),
      description: '',
    }
  }

  const description = segments[segments.length - 1].trim()
  const schedule = segments.slice(2, -1).join('_').trim()

  return { title, price, schedule, description }
}

function baseNameFromImportKey(importKey: string): string {
  return importKey.replace(/^.*[/\\]/, '').replace(/\.[^.]+$/i, '')
}

/**
 * Surcharges par clé d’import Vite (ex. `'../Assets/Formations/Mon fichier.jpg'`).
 * Les champs renseignés remplacent les valeurs déduites du nom de fichier.
 */
export const FORMATION_META_OVERRIDES: Record<
  string,
  Partial<{ label: string; price: string; sessionDate: string; duration: string; description: string }>
> = {
  // Exemple :
  // '../Assets/Formations/AUTOCAD_…jpg': { sessionDate: '10 mai 2026' },
}

export type FormationEntry = {
  /** Clé du module Vite (chemin logique du fichier). */
  importKey: string
  url: string
  /** Titre (segment « nom » du fichier). */
  label: string
  /** Prix affiché ; vide → la carte utilise « Sur devis ». */
  price?: string
  /** Date affichée si renseignée (surcharge ou futur extension du format). */
  sessionDate?: string
  /** Horaire (segment(s) entre prix et description). */
  duration?: string
  /** Texte détail carte / modale (dernier segment du nom de fichier, ou surcharge). */
  description?: string
}

export const FORMATION_ENTRIES: FormationEntry[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([importKey, url]) => {
    const base = baseNameFromImportKey(importKey)
    const parsed = parseFormationFilenameBase(base)
    const o = FORMATION_META_OVERRIDES[importKey]

    const label = (o?.label ?? parsed.title).trim() || 'Formation'
    const priceRaw = o?.price ?? parsed.price
    const price = priceRaw.trim() !== '' ? priceRaw.trim() : undefined
    const sessionDate = o?.sessionDate?.trim() || undefined
    const durationRaw = o?.duration ?? parsed.schedule
    const duration = durationRaw.trim() !== '' ? durationRaw.trim() : undefined
    const descRaw = o?.description ?? parsed.description
    const description = descRaw.trim() !== '' ? descRaw.trim() : undefined

    return {
      importKey,
      url,
      label,
      price,
      sessionDate,
      duration,
      description,
    }
  })
