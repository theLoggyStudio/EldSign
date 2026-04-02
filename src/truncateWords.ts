/** Coupe un texte après `maxWords` mots (espaces), avec « … » si tronqué. */
export const truncateWords = (text: string, maxWords: number): string => {
  if (maxWords <= 0) return ''
  const normalized = text.trim().replace(/\s+/g, ' ')
  if (!normalized) return ''
  const words = normalized.split(' ')
  if (words.length <= maxWords) return normalized
  return `${words.slice(0, maxWords).join(' ')}…`
}
