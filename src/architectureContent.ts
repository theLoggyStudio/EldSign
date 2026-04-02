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

/**
 * Images : Assets/Architecture (ordre alphabétique). Chaque [[IMAGE]] = photo suivante.
 * Ajoutez des .jpeg / .png dans ce dossier et, si besoin, plus de marqueurs dans un .md local.
 */
export const ARCHITECTURE_FALLBACK_TEXT = `::architecture:: Architecture — concevoir des lieux adaptés au contexte

Le service d’architecture d’ELDSIGN Architectes couvre l’ensemble du cycle de conception : de la première esquisse à la livraison d’un dossier cohérent pour les entreprises et les administrations. Nous travaillons à Dakar et en Afrique de l’Ouest avec une exigence double : répondre aux besoins du client et respecter le climat, les usages et les contraintes du territoire sénégalais.

Notre approche ne se limite pas au dessin : nous structurons le projet pour qu’il soit lisible par tous les intervenants — maître d’ouvrage, bureaux d’études, entreprises — et pour que les choix formels (volumes, matériaux, ouvertures) soient toujours reliés à des objectifs de confort, de coût et de durabilité.

[[IMAGE]]

::mission:: Ce que nous mettons au centre du métier d’architecte

Nous considérons l’architecture comme un outil au service du quotidien : circulation claire, lumière naturelle maîtrisée, espaces dimensionnés pour les usages réels (habitat, bureaux, équipements, commerce). Chaque mission commence par une phase d’écoute et de cadrage : programme, budget indicatif, calendrier, site et environnement proche.

Ensuite s’enchaînent les étapes classiques du projet : esquisses, avant-projet, projet pour permis ou dossier de consultation, puis assistance à la passation des marchés et suivi de travaux lorsque le contrat le prévoit. Nous adaptons le niveau de détail et le nombre de variantes à l’ampleur de l’opération et au niveau de maturité du porteur de projet.

[[IMAGE]]

::vision:: Une architecture lisible, ancrée à Dakar

Nous défendons une architecture moderne sans être déconnectée du lieu : toitures, protections solaires, patios, ventilation traversante et choix de matériaux sont discutés en fonction des contraintes thermiques et pluviométriques. L’objectif est de limiter la dépendance à la climatisation là où c’est possible, tout en restant réalistes sur les usages contemporains.

Nous intégrons volontiers la visualisation 3D et les images de synthèse pour faciliter la décision : un volume ou une façade se comprennent souvent mieux lorsqu’on peut les « parcourir » avant la construction. Ces outils complètent les plans et coupes traditionnels sans les remplacer.

[[IMAGE]]

::briefcase:: Prestations architecturales que nous pouvons prendre en charge

Selon vos besoins, ELDSIGN peut intervenir sur tout ou partie des missions suivantes :

Conception et rédaction des pièces graphiques : plans, coupes, façades, détails constructifs.

Études de faisabilité architecturale et volumétrie sur site ou à partir de données cadastrales.

Accompagnement pour le permis de construire ou les dossiers administratifs liés à l’urbanisme (dans le cadre des compétences de l’architecte et en lien avec les autres spécialistes).

Coordination avec le génie civil et les lots techniques (structure, fluides, électricité) pour éviter les incohérences entre disciplines.

Conseil sur les matériaux, les finitions et les priorités d’investissement lorsque le budget est serré.

Préparation de dossiers de consultation ou d’appel d’offres pour la sélection des entreprises.

Cette liste est indicative : nous affinons le périmètre contractuel au démarrage de chaque mission.

[[IMAGE]]

::brain:: Méthode de travail et livrables

Nous privilégions des jalons clairs : validation des orientations volumétriques avant d’approfondir les détails, validation des principes de façade avant de figer les gros œuvre, etc. Les livrables sont fournis dans des formats exploitables par les autres acteurs (PDF, DWG selon accord, maquettes numériques selon les moyens du projet).

Lorsque le projet le permet, nous proposons des variantes ciblées (par exemple deux scénarios de cour ou de toiture-terrasse) pour comparer coût, entretien et confort. Nous documentons les choix retenus pour constituer une base solide pour la phase chantier.

[[IMAGE]]

::build:: Habitat, tertiaire et petits équipements

Nous intervenons sur des logements individuels ou collectifs, des extensions, des réhabilitations, ainsi que sur des bâtiments à usage professionnel ou mixte lorsque le programme est compatible avec nos moyens. Pour les projets complexes ou très réglementés, nous pouvons nous appuyer sur un réseau de partenaires spécialisés tout en conservant la cohérence d’ensemble.

La rénovation et l’extension demandent souvent une analyse fine de l’existant : structure, humidité, fondations, conformité partielle. Nous intégrons ces contraintes dès les premières propositions pour éviter les promesses irréalistes.

[[IMAGE]]

::globe:: Contexte local et responsabilité environnementale

À Dakar comme ailleurs en Afrique de l’Ouest, le bâtiment doit composer avec la chaleur, les saisons des pluies, la qualité des réseaux et la disponibilité des matériaux. Nous discutons avec le client des compromis entre importation et matériaux locaux, entre techniques « éprouvées sur place » et solutions plus innovantes nécessitant un suivi renforcé.

Nous encourageons les démarches de sobriété énergétique et de réduction des pertes (étanchéité à l’air, ombrage, inertie là où elle est pertinente), sans dogmatisme : chaque site mérite une analyse spécifique.

[[IMAGE]]

::worker:: Suivi et relation de confiance

Lorsque nous assurons le suivi de travaux ou une mission de assistance à maître d’ouvrage, nous veillons à ce que la réalisation reste alignée avec les documents validés et avec l’esprit du projet. Les réunions de chantier, les comptes rendus et les réserves font partie d’un dialogue continu avec l’entreprise et le maître d’ouvrage.

Notre souci est de réduire les surprises : anticiper les interfaces entre corps d’état, signaler tôt les écarts, proposer des ajustements raisonnables lorsque le terrain impose des adaptations.

[[IMAGE]]

::chart:: Outils numériques et formation

ELDSIGN maîtrise les environnements de conception assistée par ordinateur et la modélisation 3D ; ces compétences nourrissent à la fois nos missions d’architecture et nos offres de formation (voir la page Formations). Cette continuité entre pratique projet et transmission pédagogique renforce la qualité des livrables et la compréhension mutuelle avec les clients qui souhaitent monter en compétence sur les outils.

[[IMAGE]]

::calendar:: Délais, budget et faisabilité

Nous sommes transparents sur les délais indicatifs de conception et sur le fait qu’un bon dossier prend le temps nécessaire à la maturation des choix. Nous aidons à hiérarchiser les postes de dépense lorsque le budget est limité : prioriser structure et enveloppe avant certains raffinements est souvent la clé d’un projet viable.

Pour les opérations urgentes, nous définissons un planning réaliste avec des livrables partiels pour ne pas bloquer les autres étapes (études techniques, financement, appels d’offres).

[[IMAGE]]

::handshake:: Pourquoi confier votre projet architectural à ELDSIGN

Vous bénéficiez d’une équipe habituée au contexte local, capable de relier conception architecturale, contraintes techniques et dialogue avec les entreprises. Nous privilégions la clarté des documents, l’écoute et la pédagogie — du premier croquis à la réception des travaux.

[[IMAGE]]

::conclusion:: Prochaine étape

Expliquez-nous votre terrain, votre programme et vos priorités : nous vous proposerons une feuille de route adaptée (études préalables, esquisses, permis, suivi). Les visuels insérés sur cette page proviennent de votre dossier « Architecture » : enrichissez-le pour illustrer vos futurs projets ou nos réalisations.

::arrow:: Page Contact pour prendre rendez-vous ou demander un devis indicatif.

::phone:: +221 77 462 17 25 · +221 70 898 44 43 — ELDSIGN, Dakar.`

export type ArchitectureBlock = FolderContentBlock

export function getArchitectureBlocks(): ArchitectureBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, ARCHITECTURE_FALLBACK_TEXT)
}
