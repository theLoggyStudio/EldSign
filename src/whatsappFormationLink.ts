const e = import.meta.env

/**
 * Numéro WhatsApp ELDSIGN pour les demandes de formation : chiffres uniquement, avec indicatif pays (sans +).
 * Ex. 221774621725 — surchargeable via `VITE_WHATSAPP_FORMATION_PHONE` dans `.env`.
 */
export const WHATSAPP_FORMATION_E164 =
  (e.VITE_WHATSAPP_FORMATION_PHONE as string | undefined)?.replace(/\D/g, '') || '221784649530'

/**
 * URL absolue de l’affiche formation (chemins relatifs → origine du site au moment du clic).
 */
export function absoluteFormationImageUrl(href: string): string | null {
  const t = href.trim()
  if (!t) return null
  if (/^https?:\/\//i.test(t)) return t
  if (typeof window === 'undefined') return t
  try {
    return new URL(t, window.location.origin).href
  } catch {
    return t
  }
}

/**
 * Texte prérempli dans WhatsApp pour la formation sélectionnée (lisible par l’équipe ELDSIGN).
 * Si une image est fournie : URL seule en première ligne, ligne vide, puis le message.
 */
export function buildWhatsAppFormationMessage(params: {
  formationTitle: string
  priceLabel: string
  sessionDate?: string
  duration?: string
  /** URL de l’image formation (relative ou absolue). */
  formationImageUrl?: string
}): string {
  const lines = [
    'Bonjour ELDSIGN,',
    '',
    'Je suis intéressé(e) par la formation suivante :',
    '',
    `* Formation : ${params.formationTitle.trim()}`,
    `* Tarif : ${params.priceLabel.trim()}`,
  ]
  const sd = params.sessionDate?.trim()
  const du = params.duration?.trim()
  if (sd) lines.push(`* Date prévue : ${sd}`)
  if (du) lines.push(`* Horaire : ${du}`)
  lines.push('', 'Merci de me recontacter.', '', 'Cordialement')
  const body = lines.join('\n')

  const imgAbs = params.formationImageUrl ? absoluteFormationImageUrl(params.formationImageUrl) : null
  if (imgAbs) return `${imgAbs}\n\n${body}`
  return body
}

/** URL `wa.me` avec message encodé (à mettre dans un QR ou un lien). */
export function buildWhatsAppFormationUrl(params: {
  formationTitle: string
  priceLabel: string
  sessionDate?: string
  duration?: string
  formationImageUrl?: string
}): string {
  const text = buildWhatsAppFormationMessage(params)
  return `https://wa.me/${WHATSAPP_FORMATION_E164}?text=${encodeURIComponent(text)}`
}
