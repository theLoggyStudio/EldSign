const modules = import.meta.glob('../Assets/Logos/**/*.{png,svg,jpg,jpeg,JPEG,JPG,PNG,webp,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const LOGO_URLS: string[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url)

export const pickRandomLogoUrl = (): string | null => {
  if (LOGO_URLS.length === 0) return null
  const i = Math.floor(Math.random() * LOGO_URLS.length)
  return LOGO_URLS[i] ?? null
}
