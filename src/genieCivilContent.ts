import { buildFolderContentBlocks, type FolderContentBlock } from './folderContentBlocks'

const textModules = import.meta.glob('../Assets/Genie_civil/**/*.{txt,md}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const imageModules = import.meta.glob('../Assets/Genie_civil/**/*.{jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF,webp,WEBP,svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const GENIE_CIVIL_FALLBACK_TEXT = `::genie:: Génie civil

Études techniques, solidité et durabilité des ouvrages, stabilité et conformité aux contraintes locales.

[[IMAGE]]

ELDSIGN vous accompagne pour des constructions fiables et adaptées au contexte sénégalais.`

export type GenieCivilBlock = FolderContentBlock

export function getGenieCivilBlocks(): GenieCivilBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, GENIE_CIVIL_FALLBACK_TEXT)
}
