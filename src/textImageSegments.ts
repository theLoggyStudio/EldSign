/** Marqueur dans les fichiers .txt / .md : une image du dossier (ordre alphabétique) par occurrence. */
export const IMAGE_PLACEHOLDER = '[[IMAGE]]'

export type TextImageSegment =
  | { kind: 'text'; body: string }
  | { kind: 'image'; index: number }

/**
 * Découpe le texte sur [[IMAGE]] : alternance texte / slot image (indices 0, 1, 2…).
 */
export function parseTextImageSegments(raw: string): TextImageSegment[] {
  const parts = raw.split(/\[\[IMAGE\]\]/gi)
  const out: TextImageSegment[] = []
  if (parts[0] != null && parts[0].trim() !== '') {
    out.push({ kind: 'text', body: parts[0].trimEnd() })
  }
  for (let i = 1; i < parts.length; i++) {
    out.push({ kind: 'image', index: i - 1 })
    const t = parts[i]
    if (t != null && t.trim() !== '') {
      out.push({ kind: 'text', body: t.trimEnd() })
    }
  }
  return out
}

export function altFromImportKey(importKey: string): string {
  const base = importKey.replace(/^.*[/\\]/, '').replace(/\.[^.]+$/i, '')
  const cleaned = base.replace(/\s+/g, ' ').trim()
  return cleaned ? `ELDSIGN — ${cleaned}` : 'ELDSIGN'
}
