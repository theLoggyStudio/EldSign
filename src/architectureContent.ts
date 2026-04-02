import { buildFolderContentBlocks, type FolderContentBlock } from './folderContentBlocks'

const textModules = import.meta.glob('../Assets/Architecture/**/*.{txt,md}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const imageModules = import.meta.glob('../Assets/Architecture/**/*.{jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF,webp,WEBP,svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const ARCHITECTURE_FALLBACK_TEXT = `::architecture:: Architecture

Conception architecturale, plans personnalisés, permis de construire et accompagnement de l’idée au livrable.

[[IMAGE]]

Contactez ELDSIGN pour un projet sur mesure à Dakar et en Afrique de l’Ouest.`

export type ArchitectureBlock = FolderContentBlock

export function getArchitectureBlocks(): ArchitectureBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, ARCHITECTURE_FALLBACK_TEXT)
}
