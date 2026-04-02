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

/**
 * Images : Assets/Genie_civil (ordre alphabétique). Chaque [[IMAGE]] = photo suivante.
 */
export const GENIE_CIVIL_FALLBACK_TEXT = `::genie:: Génie civil — solidité, durabilité et sécurité des ouvrages

Le génie civil est le socle technique de tout projet de construction : fondations, structure porteuse, stabilité globale, reprise des charges, interfaces avec le sol et parfois avec les réseaux. Chez ELDSIGN Architectes, nous portons une attention constante à la cohérence entre l’intention architecturale et la réalité du calcul et du chantier, pour que le bâtiment reste sûr et durable dans le temps.

Basés à Dakar, nous intervenons dans un contexte où les sols, l’aléa climatique (vents forts, pluies intenses) et les pratiques locales de construction doivent être intégrés dès les premières études. Notre objectif est de proposer des solutions fiables, compréhensibles pour le maître d’ouvrage et exécutables par les entreprises.

[[IMAGE]]

::mission:: Notre mission en génie civil

Nous visons à :

Garantir la stabilité et la sécurité des ouvrages conformément aux règles de l’art et aux données disponibles sur le site.

Optimiser le dimensionnement pour éviter le sur-dimensionnement systématique comme le sous-dimensionnement dangereux.

Faciliter la lecture des entreprises grâce à des plans et notes de calcul structurés, avec un vocabulaire partagé entre architecte, bureau d’études et chantier.

Anticiper les risques liés au terrain (nappe, compressibilité, pentes, voisinage) et proposer des adaptations lorsque les investigations le justifient.

Accompagner le maître d’ouvrage dans la compréhension des enjeux techniques pour qu’il puisse arbitrer en connaissance de cause.

[[IMAGE]]

::vision:: Une approche intégrée avec l’architecture

Un beau projet sur le papier ne tient que si la structure le permet. Nous travaillons en amont avec la conception architecturale pour éviter les impasses : portées excessives sans justification, trémies ouvertes trop tard, reprises de charges mal réparties. L’idée est de co-construire la volumétrie et la structure plutôt que de les opposer.

Lorsque nous ne réalisons pas nous-mêmes toutes les études de structure, nous pouvons piloter l’interface avec un bureau d’études extérieur, vérifier la cohérence des hypothèses et assister le maître d’ouvrage lors des validations techniques.

[[IMAGE]]

::briefcase:: Domaines d’intervention

Selon la taille et la nature du projet, nos prestations en génie civil peuvent inclure :

Études de structure pour bâtiments en béton armé, maçonnerie ou systèmes mixtes, dans les limites des compétences mobilisées sur la mission.

Dimensionnement ou relecture de fondations adaptées au type de sol (après interprétation des données géotechniques fournies par un géotechnicien lorsque c’est nécessaire).

Conseil sur les choix de systèmes porteurs (portiques, voiles, planchers) et sur les impacts sur les coûts et délais.

Vérifications de stabilité provisoire ou de phasage lorsque le chantier impose des étapes critiques.

Appui sur la reprise d’ouvrages existants : renforts, sous-œuvres, ouvertures dans des murs porteurs — toujours dans le respect des investigations et des prescriptions de calcul.

La liste exacte des missions est formalisée au contrat pour correspondre au niveau de risque et à la réglementation applicable.

[[IMAGE]]

::brain:: Méthodologie et données d’entrée

Une étude sérieuse repose sur des informations fiables : plans de repérage, charges d’exploitation, localisation des équipements lourds, nature du sol (rapport géotechnique), aléas environnementaux. Nous signalons clairement lorsqu’une donnée manque ou reste incertaine, et nous proposons des scénarios (études complémentaires, sondages) pour réduire l’incertitude.

Nous documentons les hypothèses de calcul et les critères retenus pour que toute évolution ultérieure du projet puisse être réévaluée proprement.

[[IMAGE]]

::build:: Matériaux, exécution et contrôle sur site

Le béton armé reste largement majoritaire dans nos contextes de travail ; nous restons attentifs à la qualité d’exécution : enrobage des aciers, bétonnage par temps chaud, cure, reprises. Nous pouvons participer aux réunions techniques et aux vérifications ciblées lorsque le contrat inclut une mission de suivi ou d’assistance.

Les détails constructifs (jonctions, appuis, reprises de dalle) font partie intégrante de la chaîne de sécurité : ils sont traités avec le même soin que les calculs globaux.

[[IMAGE]]

::globe:: Contexte sénégalais et bonnes pratiques

Les pratiques de construction à Dakar et en région imposent de composer avec la disponibilité des matériaux, la qualité variable des granulats, les aléas logistiques et parfois l’enrochement ou le compactage sur sites sensibles. Nous restons pragmatiques : privilégier des solutions éprouvées lorsque les moyens de contrôle sont limités, ou renforcer le dispositif de surveillance lorsque le projet emprunte des voies plus exigeantes.

Nous suivons l’évolution des référentiels et des usages professionnels pour rester alignés avec les attentes des assureurs, des financeurs et des maîtres d’ouvrage institutionnels lorsque ceux-ci interviennent.

[[IMAGE]]

::worker:: Sécurité, coordination et responsabilité

La sécurité des personnes en phase travaux et en phase exploitation est non négociable. Nous intégrons les exigences de stabilité des ouvrages en cours de construction (étaiements, phases provisoires) lorsque cela relève de notre mission. Nous coordonnons avec l’architecte et les autres corps d’état les passages de gaines, réservations et appuis pour limiter les affaiblissements non maîtrisés.

[[IMAGE]]

::chart:: Études complémentaires et partenaires

Certaines opérations exigent l’intervention obligatoire ou recommandée de spécialistes (géotechnique, pathologie du béton, expertise après sinistre). Nous orientons le maître d’ouvrage vers ces compétences lorsque la mission le exige et assurons la liaison technique pour que les conclusions des experts soient correctement intégrées au projet.

[[IMAGE]]

::calendar:: Planning et phases de projet

Les études de génie civil sont souvent sur le chemin critique : sans structure validée, difficile de lancer certains marchés ou de fixer les réservations. Nous planifions les livrables en fonction des jalons architecturaux et des exigences de consultation des entreprises, en signalant tôt les risques de retard liés à des études de sol ou à des iterations de modèle.

[[IMAGE]]

::handshake:: Pourquoi nous confier la dimension « technique lourde » de votre projet

ELDSIGN combine culture de chantier, dialogue avec les architectes et souci pédagogique envers les porteurs de projet. Nous cherchons des solutions compréhensibles, réalisables et maintenables — pas seulement des lignes sur un plan.

[[IMAGE]]

::conclusion:: Discutons de votre ouvrage

Que vous projetiez une construction neuve, une extension ou une reprise en sous-œuvre, contactez-nous avec vos documents disponibles (terrain, esquisses, rapports existants). Nous vous indiquerons le niveau d’étude adapté et les investigations éventuelles à prévoir.

::arrow:: Rendez-vous et demandes : page Contact du site.

::phone:: +221 77 462 17 25 · +221 70 898 44 43 — ELDSIGN, Dakar.`

export type GenieCivilBlock = FolderContentBlock

export function getGenieCivilBlocks(): GenieCivilBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, GENIE_CIVIL_FALLBACK_TEXT)
}
