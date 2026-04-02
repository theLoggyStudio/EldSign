import { buildFolderContentBlocks, type FolderContentBlock } from './folderContentBlocks'

const textModules = import.meta.glob('../Assets/Seminaire/**/*.{txt,md}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const imageModules = import.meta.glob('../Assets/Seminaire/**/*.{jpeg,jpg,png,gif,JPEG,JPG,PNG,GIF,webp,WEBP,svg,SVG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/**
 * Images : dossier Assets/Seminaire (ordre alphabétique des fichiers).
 * Chaque [[IMAGE]] affiche la photo suivante dans cet ordre — ajoutez des marqueurs dans un .md local si vous voulez en montrer davantage.
 */
export const SEMINAIRE_FALLBACK_TEXT = `::book:: Séminaires & rencontres : former, informer, accompagner

Chez ELDSIGN Architectes, nous croyons que la formation ne doit pas être réservée à un cercle fermé d’experts. Nos séminaires et nos temps d’échange ont un objectif clair : aider la population à mieux comprendre le monde de la construction, des projets bâtis et des outils numériques qui façonnent aujourd’hui les villes et les quartiers. Il s’agit de rendre accessibles des savoirs souvent perçus comme techniques ou éloignés du quotidien, pour que chacun — particulier, jeune en recherche d’orientation, entrepreneur, représentant d’association ou habitant engagé — puisse gagner en autonomie face à un projet, un devis ou une démarche administrative.

Nous intervenons à Dakar et pouvons adapter nos contenus au contexte local : contraintes climatiques, matériaux, démarches et enjeux spécifiques à la région. Un séminaire, pour nous, est un pont entre le cabinet et la société civile.

[[IMAGE]]

Ces rencontres permettent aussi de montrer, de façon concrète, ce qui se passe sur le terrain : ambiance d’atelier, échanges en groupe, supports projetés ou visites commentées lorsque le contexte s’y prête. Les photographies ci-dessous illustrent quelques moments de nos animations et de nos actions de proximité.

[[IMAGE]]

::globe:: Une offre tournée vers le public et les territoires

Les séminaires que nous organisons ou co-animent ne visent pas seulement à « présenter un logiciel » ou à recycler des clichés sur l’architecture. Ils répondent à des besoins concrets : savoir de quoi parle un plan, comprendre ce qu’implique une extension, identifier les bonnes questions à poser à un maître d’œuvre, ou encore découvrir comment la maquette numérique et le BIM peuvent clarifier un projet avant le premier coup de pelle.

Nous travaillons avec des formats variés : demi-journées d’introduction, modules sur plusieurs jours, ateliers participatifs, sessions en présentiel ou formats hybrides selon les publics. L’important est de laisser la place aux questions, aux échanges et aux cas réels que les participants ramènent avec eux.

[[IMAGE]]

Nous documentons régulièrement ces temps forts : affiches, supports pédagogiques, moments de travail en communauté. Cela nous aide à améliorer chaque édition et à montrer, en toute transparence, l’esprit dans lequel ELDSIGN accueille ses publics.

[[IMAGE]]

::handshake:: Pourquoi « aider la population » est au cœur de notre démarche

Dans beaucoup de situations, le manque d’information coûte cher : retard, surcoût, malentendus entre parties prenantes ou sentiment d’impuissance face à un dossier complexe. En ouvrant des espaces de formation et de dialogue, nous contribuons à réduire cet écart. Ce n’est pas seulement une question de générosité institutionnelle : c’est une manière de professionnaliser les débats autour du bâti et de renforcer la confiance entre citoyens, entreprises et acteurs du territoire.

Nos séminaires peuvent s’adresser à des groupes de quartier souhaitant mieux comprendre un projet d’aménagement, à des lycéens et étudiants curieux des métiers du BTP, à des porteurs de petits projets qui veulent structurer leur demande, ou encore à des structures associatives qui accompagnent des publics fragilisés. Chaque session peut être ajustée en amont : niveau de langage, durée, objectifs pédagogiques et supports visuels.

[[IMAGE]]

La diversité des visuels disponibles dans notre photothèque séminaire reflète cette diversité de publics et de formats : du grand groupe en salle aux ateliers plus restreints, chaque configuration mérite une pédagogie adaptée.

[[IMAGE]]

::mission:: Objectifs pédagogiques que nous nous fixons

Lorsque nous concevons un séminaire, nous visons en général plusieurs résultats simultanés :

Donner des repères clairs sur le vocabulaire du bâtiment, de l’architecture et du génie civil, sans noyer le public sous le jargon.

Expliquer le rôle des différents intervenants — architecte, bureau d’études, entreprises, administration — et la chronologie réaliste d’un projet.

Présenter, lorsque c’est pertinent, des outils numériques (CAO, maquette 3D, environnements BIM) comme des aides à la décision et à la communication, pas comme des gadgets.

Encourager une attitude critique et posée : savoir lire une pièce graphique, comparer des propositions, formuler une attente de façon constructive.

Créer un espace où les questions « simples » sont les bienvenues : il n’y a pas de question ridicule lorsqu’il s’agit d’investir du temps et de l’argent dans un ouvrage.

[[IMAGE]]

Nous conservons une trace visuelle de ces échanges pour nos bilans internes et, lorsque les participants y consentent, pour inspirer de futurs appels à participation. La visibilité du réel travail pédagogique renforce la confiance.

[[IMAGE]]

::briefcase:: Thématiques que nous pouvons aborder

Selon les besoins du public et la durée prévue, nous pouvons construire des modules sur des thèmes tels que :

Les grandes étapes d’un projet de construction, de l’esquisse au chantier.

La lecture de plans et coupes : repères, échelles, légendes, cohérence entre les documents.

Les enjeux de la performance thermique, de la lumière naturelle et de la durabilité dans un contexte africain de climat chaud.

Introduction aux logiciels de dessin et de modélisation pour ceux qui souhaitent aller plus loin dans une formation certifiante ou professionnelle par la suite.

Sensibilisation à la coordination entre corps de métier et à l’importance d’une documentation claire pour éviter les erreurs sur chantier.

Ces listes ne sont pas figées : nous préférons co-construire le programme avec les organisateurs ou les institutions partenaires.

[[IMAGE]]

::brain:: Méthode : clarté, exemples concrets, respect du rythme du groupe

Nous évitons les exposés monologues interminables. Une journée type peut combiner une présentation structurée, l’analyse d’exemples tirés de projets réels (anonymisés si nécessaire), des exercices guidés et des pauses pour les questions. Nous veillons à ce que les supports visuels — schémas, photos, extraits de maquettes — restent lisibles pour un public hétérogène.

Pour les modules plus techniques, nous proposons souvent un « fil conducteur » : un cas fictif mais réaliste (extension d’une maison, petit bâtiment collectif, aménagement d’espace) que le groupe suit de bout en bout. Cela aide à relier les notions entre elles et à ancrer la théorie dans une narration compréhensible.

[[IMAGE]]

::worker:: Intervenants et qualité d’écoute

Les sessions sont animées par des professionnels habitués à la fois au terrain et à la transmission : architectes, ingénieurs et formateurs du cabinet ELDSIGN, parfois complétés par des invités selon le sujet (sécurité, environnement, droit de l’urbanisme, etc.). Nous accordons une attention particulière à la qualité d’écoute : un séminaire réussi, pour nous, est celu où les participants repartent avec moins d’appréhension et avec des outils pour avancer, même modestement, dans leur démarche.

[[IMAGE]]

::calendar:: Organisation, dates et modalités

Les dates et lieux des prochains séminaires ouverts au public sont communiqués au fil de l’année : suivez nos annonces ou contactez-nous pour être tenu informé. Pour les structures — écoles, associations, collectivités, entreprises — nous pouvons monter une session sur mesure, en définissant ensemble le public, les objectifs, la durée et le budget.

Les modalités (présentiel à Dakar, déplacement possible selon projet, supports fournis, taille du groupe) font toujours l’objet d’un échange préalable. Notre souci est que l’événement soit utile, sécurisé sur le plan organisationnel et aligné avec vos attentes.

[[IMAGE]]

::chart:: Bilan et perspectives

Au-delà des compétences immédiatement acquises, nos séminaires cherchent à produire un effet durable : des participants qui osent poser les bonnes questions, qui comprennent mieux les documents qu’on leur présente et qui peuvent partager ce qu’ils ont appris dans leur entourage. C’est une forme de diffusion des savoirs au service de la cohésion et de la qualité des constructions sur le long terme.

ELDSIGN continuera d’investir ces formats d’animation publique, en les reliant à nos autres activités — architecture, génie civil, formations logicielles plus poussées — pour offrir un continuum du sensibilisation à l’expertise.

[[IMAGE]]

::conclusion:: Vous souhaitez participer ou co-organiser un séminaire ?

Si vous représentez un groupe de citoyens, une association, un établissement scolaire ou une structure professionnelle, écrivez-nous ou appelez-nous : nous étudierons la faisabilité d’un module adapté à votre public. Les séminaires sont pour nous un engagement concret aux côtés de la population — un moyen de rendre le monde du bâtiment plus lisible, plus dialogue et plus juste pour celles et ceux qui le font vivre au quotidien.

::arrow:: Contact : via la page Contact du site — nous revenons vers vous avec des propositions de contenu et de calendrier.

::phone:: Infolines : +221 77 462 17 25 / +221 70 898 44 43 — ELDSIGN, Dakar.`

export type SeminaireBlock = FolderContentBlock

export function getSeminaireBlocks(): SeminaireBlock[] {
  return buildFolderContentBlocks(textModules, imageModules, SEMINAIRE_FALLBACK_TEXT)
}
