const e = import.meta.env

/**
 * Numéro WhatsApp ELDSIGN pour les demandes de formation : chiffres uniquement, avec indicatif pays (sans +).
 * Ex. 221774621725 — surchargeable via `VITE_WHATSAPP_FORMATION_PHONE` dans `.env`.
 */
export const WHATSAPP_FORMATION_E164 =
  (e.VITE_WHATSAPP_FORMATION_PHONE as string | undefined)?.replace(/\D/g, '') || '221784649530'

/**
 * Texte prérempli dans WhatsApp pour la formation sélectionnée (lisible par l’équipe ELDSIGN).
 */
export function buildWhatsAppFormationMessage(params: {
  formationTitle: string
  priceLabel: string
  sessionDate?: string
  duration?: string
}): string {
  const lines = [
    'Bonjour ELDSIGN,',
    '',
    'Je suis intéressé(e) par la formation suivante :',
    '',
    `• Formation : ${params.formationTitle.trim()}`,
    `• Tarif : ${params.priceLabel.trim()}`,
  ]
  const sd = params.sessionDate?.trim()
  const du = params.duration?.trim()
  if (sd) lines.push(`• Date prévue : ${sd}`)
  if (du) lines.push(`• Horaire : ${du}`)
  lines.push('', 'Merci de me recontacter.', '', 'Cordialement')
  return lines.join('\n')
}

/** URL `wa.me` avec message encodé (à mettre dans un QR ou un lien). */
export function buildWhatsAppFormationUrl(params: {
  formationTitle: string
  priceLabel: string
  sessionDate?: string
  duration?: string
}): string {
  const text = buildWhatsAppFormationMessage(params)
  return `https://wa.me/${WHATSAPP_FORMATION_E164}?text=${encodeURIComponent(text)}`
}
