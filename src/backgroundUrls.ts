/** Images plein écran et vignettes : dossier `Assets/Background` à la racine du projet. */
const modules = import.meta.glob('../Assets/Background/**/*.{jpeg,jpg,png,JPEG,JPG,PNG,webp,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const BACKGROUND_URLS: string[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)

/** Si aucun fichier dans `Assets/Background`, fond de secours. */
export const BACKGROUND_FALLBACK = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)'

/**
 * Valeur CSS `background-image` sûre : les URL Vite peuvent contenir espaces / parenthèses
 * (ex. `Background (1)-xxx.jpeg`) — sans guillemets, `url(...)` est invalide et le JPEG ne s’affiche pas.
 */
export const cssBackgroundUrl = (href: string): string =>
  `url("${href.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`
