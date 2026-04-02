import { altFromImportKey, parseTextImageSegments } from './textImageSegments'

export type FolderContentBlock =
  | { kind: 'text'; body: string }
  | { kind: 'image'; src: string; alt: string }

export function mergeTextModules(textModules: Record<string, string>, fallbackText: string): string {
  const keys = Object.keys(textModules).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  if (keys.length === 0) return fallbackText
  return keys.map((k) => textModules[k]).join('\n\n')
}

export function sortedImageUrls(imageModules: Record<string, string>): { key: string; url: string }[] {
  return Object.entries(imageModules)
    .filter(([k]) => /\.(jpe?g|png|gif|webp|svg)$/i.test(k))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([key, url]) => ({ key, url }))
}

export function buildFolderContentBlocks(
  textModules: Record<string, string>,
  imageModules: Record<string, string>,
  fallbackText: string,
): FolderContentBlock[] {
  const raw = mergeTextModules(textModules, fallbackText)
  const imgs = sortedImageUrls(imageModules)
  const segments = parseTextImageSegments(raw)
  const out: FolderContentBlock[] = []
  for (const seg of segments) {
    if (seg.kind === 'text') {
      out.push({ kind: 'text', body: seg.body })
    } else {
      const slot = imgs[seg.index]
      if (slot) {
        out.push({ kind: 'image', src: slot.url, alt: altFromImportKey(slot.key) })
      }
    }
  }
  return out
}
