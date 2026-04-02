import { buildFolderContentBlocks, type FolderContentBlock } from './folderContentBlocks'

const textModules = import.meta.glob('../Assets/Apropos/**/*.{txt,md}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const imageModules = import.meta.glob('../Assets/Apropos/**/*.{jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF,webp,WEBP,svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/**
 * Par défaut si aucun .txt / .md dans Assets/Apropos.
 * [[IMAGE]] = images du dossier (ordre alpha).
 * Lignes de titre : préfixe `::clef::` (voir ProseWithIcons.tsx) pour afficher une icône.
 */
export const ABOUT_APROPOS_FALLBACK_TEXT = `::about:: À PROPOS

::building:: Qui sommes-nous ?

ELDSIGN Architectes est un cabinet d’architecture et d’ingénierie basé à Dakar, spécialisé dans la conception, la planification et la réalisation de projets de construction.

Depuis sa création, l’entreprise s’est donnée pour mission de proposer des solutions innovantes, fiables et adaptées aux besoins du marché local.

[[IMAGE]]

::mission:: Notre mission

Notre mission est de :

Concevoir des espaces fonctionnels et esthétiques
Accompagner chaque client de l’idée à la réalisation
Garantir des constructions sûres et durables
Offrir un service professionnel accessible

::vision:: Notre vision

Devenir une référence en architecture et en ingénierie en Afrique de l’Ouest, en combinant :

Innovation technologique
Expertise technique
Compréhension du contexte local

::briefcase:: Nos activités

1. Architecture & design — création de plans personnalisés adaptés aux besoins du client.

2. Génie civil — études techniques pour assurer la solidité et la durabilité des constructions.

3. Suivi de projet — gestion et supervision complète des chantiers.

4. Visualisation 3D — projection réaliste des projets avant réalisation.

5. Formation professionnelle — transmission de compétences en architecture et logiciels spécialisés.

[[IMAGE]]

::brain:: Notre approche

Chez ELDSIGN, chaque projet suit une méthodologie claire :

Analyse du besoin
Conception personnalisée
Études techniques
Validation client
Suivi de réalisation

::arrow:: Cette approche garantit qualité, transparence et efficacité.

::worker:: Notre engagement

Nous nous engageons à :

Respecter les délais
Optimiser les coûts
Assurer la qualité des travaux
Offrir un accompagnement personnalisé

::globe:: Notre ancrage local

Implanté à Dakar, ELDSIGN comprend parfaitement :

Les réalités du marché sénégalais
Les contraintes climatiques
Les normes locales

::arrow:: Ce qui permet de proposer des solutions réalistes et efficaces.

[[IMAGE]]

::conclusion:: Conclusion

ELDSIGN Architectes, c’est plus qu’un cabinet :

::arrow:: C’est un partenaire de confiance pour tous vos projets de construction.`

export type AboutAproposBlock = FolderContentBlock

export function getAboutAproposBlocks(): AboutAproposBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, ABOUT_APROPOS_FALLBACK_TEXT)
}
