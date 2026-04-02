/**
 * Transforme le résultat de import.meta.glob(..., { query: '?url' }) en entrées { src, alt }.
 * Tri par chemin d’import ; le texte alternatif est dérivé du nom de fichier (sans extension).
 */
export function galleryImagesFromUrlGlob(modules: Record<string, string>): { src: string; alt: string }[] {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([importKey, url]) => ({
      src: url,
      alt: altFromImportKey(importKey),
    }))
}

function altFromImportKey(importKey: string): string {
  const base = importKey.replace(/^.*[/\\]/, '').replace(/\.[^.]+$/i, '')
  const cleaned = base.replace(/\s+/g, ' ').trim()
  return cleaned || 'Illustration'
}
