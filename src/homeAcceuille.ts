import { buildFolderContentBlocks, type FolderContentBlock } from './folderContentBlocks'

const textModules = import.meta.glob('../Assets/Acceuille/**/*.{txt,md}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const imageModules = import.meta.glob('../Assets/Acceuille/**/*.{jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF,webp,WEBP,svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** Texte par défaut si aucun .txt / .md dans Acceuille. Titres : `::clef::` (ProseWithIcons). */
export const HOME_ACCEUILLE_FALLBACK_TEXT = `ELDSIGN Architectes — Donner vie à vos projets, de l'idée à la réalisation

Basée à Dakar (Liberté 5, en face de la clinique Raby), ELDSIGN est un cabinet d'architecture, de génie civil et d'accompagnement de projets. Nous sécurisons aussi vos parcours de signature électronique et formons aux logiciels du bâtiment (AutoCAD, Revit, ArchiCAD, SketchUp, etc.).

[[IMAGE]]

::pin:: Localisation
Quartier Liberté 5 — repère : clinique Raby — Dakar. Recherche conseillée sur les cartes : « ELDSIGN Liberté 5 clinique Raby Dakar ».

::build:: Notre métier
Conception architecturale, modélisation et animation 3D, études techniques (structure, stabilité), permis de construire, suivi de chantier, devis et accompagnement projet. Formation professionnelle, conseil technique et projets de construction complets : une offre hybride BTP, formation et consulting.

[[IMAGE]]

::calendar:: Infos pratiques

::phone:: +221 70 898 44 43 / +221 77 462 17 25

::clock:: Lun–Ven 8h–18h · Sam 9h–16h · Dimanche fermé

::chart:: Profil
Entreprise dakaroise, secteur BTP / architecture, active notamment via la formation et les logiciels métiers. Nous travaillons avec particuliers, entreprises et institutions.

[[IMAGE]]

::globe:: Vision
Architecture moderne ancrée dans le contexte local, démarches durables, solutions accessibles et rigoureuses — de la conception à la réception.

::handshake:: Pourquoi nous choisir
Expertise locale, accompagnement de bout en bout, outils numériques (3D, maquette virtuelle), double compétence signature en ligne + montée en compétences logicielles.

[[IMAGE]]

::phone:: Un projet ? Parlons-en
Contactez-nous pour une proposition adaptée à votre structure et à vos objectifs.`

export type HomeAcceuilleBlock = FolderContentBlock

export function getHomeAcceuilleBlocks(): HomeAcceuilleBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, HOME_ACCEUILLE_FALLBACK_TEXT)
}
