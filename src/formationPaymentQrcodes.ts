/** Fichiers dans Assets/Qrcodes : le nom doit contenir « orange » ou « wave » (insensible à la casse). */
const imageModules = import.meta.glob('../Assets/Qrcodes/**/*.{png,jpg,jpeg,webp,JPEG,JPG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function firstUrlMatching(test: (basename: string) => boolean): string | null {
  const entries = Object.entries(imageModules).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  for (const [key, url] of entries) {
    const base = key.replace(/^.*[/\\]/, '').toLowerCase()
    if (test(base)) return url
  }
  return null
}

export function getOrangeMoneyQrUrl(): string | null {
  return firstUrlMatching((b) => b.includes('orange'))
}

export function getWaveQrUrl(): string | null {
  return firstUrlMatching((b) => b.includes('wave'))
}
