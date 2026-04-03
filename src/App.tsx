import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import eldNavbarLogo from '../Assets/Logos/GRIFF ELD_Plan de travail 1.png'
import { getAboutAproposBlocks } from './aboutApropos'
import { getArchitectureBlocks } from './architectureContent'
import { getGenieCivilBlocks } from './genieCivilContent'
import { getSeminaireBlocks } from './seminaireContent'
import { BACKGROUND_FALLBACK, BACKGROUND_URLS } from './backgroundUrls'
import { FORMATION_ENTRIES } from './formationUrls'
import { ImmersiveLogoOverlay, IMMERSIVE_UI_OUT_S } from './items/ImmersiveLogoOverlay'
import { ImmersiveWallpaperLayer } from './items/ImmersiveWallpaperLayer'
import { pickRandomLogoUrl } from './logoUrls'
import { BackgroundThumbPager } from './items/BackgroundThumbPager'
import { DynamicBackground } from './items/DynamicBackground'
import { NavItem } from './items/NavItem'
import { Article } from './items/Article'
import { BackgroundClickPlane } from './items/BackgroundClickPlane'
import { FormationPaymentModal } from './items/FormationPaymentModal'
import { NavItemModal } from './items/NavItemModal'
import { PieceItem, PieceStagger } from './items/PieceReveal'
import { TextImagePageContent } from './items/TextImagePageContent'
import { getHomeAcceuilleBlocks } from './homeAcceuille'

type RouteId =
  | 'home'
  | 'about_us'
  | 'architecture'
  | 'genie_civil'
  | 'seminaire'
  | 'formations'
  | 'contacts'
  | 'privacy'
  | 'readmore'

function parseHash(): RouteId {
  let raw = window.location.hash.replace(/^#!?\/?/, '').split('/')[0] || 'home'
  if (raw === 'services') raw = 'formations'
  const allowed: RouteId[] = [
    'home',
    'about_us',
    'architecture',
    'genie_civil',
    'seminaire',
    'formations',
    'contacts',
    'privacy',
    'readmore',
  ]
  return (allowed.includes(raw as RouteId) ? raw : 'home') as RouteId
}

/** Liens du menu latéral — ajoutez des objets `{ to, label }` pour de nouvelles entrées. */
const NAV_LINKS: { to: RouteId; label: string }[] = [
  { to: 'home', label: 'accueil' },
  { to: 'about_us', label: 'à propos' },
  { to: 'architecture', label: 'architecture' },
  { to: 'genie_civil', label: 'génie civil' },
  { to: 'seminaire', label: 'séminaire' },
  { to: 'formations', label: 'Nos formations' },
  { to: 'contacts', label: 'contact' },
]

const e = import.meta.env as Record<string, string | undefined>

/** Réseaux — page contact (remplir les URLs réelles). */
const CONTACT_SOCIAL_YOUTUBE = (e.VITE_CONTACT_YOUTUBE_URL ?? '').trim()
const CONTACT_SOCIAL_FACEBOOK = (e.VITE_CONTACT_FACEBOOK_URL ?? '').trim()
const CONTACT_SOCIAL_TIKTOK = (e.VITE_CONTACT_TIKTOK_URL ?? '').trim()
const CONTACT_SOCIAL_LINKEDIN = (e.VITE_CONTACT_LINKEDIN_URL ?? '').trim()

/** Page « Loggpatient » — pied de page (à définir dans `.env`). */
const LOGGPATIENT_PAGE_HREF = (e.VITE_LOGGPATIENT_PAGE_URL ?? '').trim()

/** Lien partage Google Maps — lieu ELDSIGN (Dakar). */
const CONTACT_MAPS_SHARE_URL = 'https://maps.app.goo.gl/Kn9wNxQYrrkTN9d17'

const panelSlide = {
  initial: { y: '110%' },
  animate: { y: 0 },
  exit: { y: '-110%' },
}

const panelTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
}

/** Texte détaillé des formations : modale = intégral ; liste = extrait (`detailsMaxWords` sur `Article`). */
const FORMATION_CARD_DETAILS =
  'Durée et modalités à préciser selon votre besoin (présentiel, distanciel ou mixte).\n\n' +
  'Public visé : professionnels du secteur — programme et objectifs pédagogiques à personnaliser.'

const FORMATION_DETAILS_PREVIEW_MAX_WORDS = 18

export const App = () => {
  const [route, setRoute] = useState<RouteId>(parseHash)
  const [bgIndex, setBgIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [immersiveOpen, setImmersiveOpen] = useState(false)
  const [immersiveLogoUrl, setImmersiveLogoUrl] = useState<string | null>(null)
  const [payModal, setPayModal] = useState<{
    title: string
    price: string
    imageUrl: string
    description: string
    sessionDate?: string
    duration?: string
  } | null>(null)

  const homeAcceuilleBlocks = useMemo(() => getHomeAcceuilleBlocks(), [])
  const aboutAproposBlocks = useMemo(() => getAboutAproposBlocks(), [])
  const architectureBlocks = useMemo(() => getArchitectureBlocks(), [])
  const genieCivilBlocks = useMemo(() => getGenieCivilBlocks(), [])
  const seminaireBlocks = useMemo(() => getSeminaireBlocks(), [])

  const immersiveWallpaperUrl = useMemo(() => {
    const n = BACKGROUND_URLS.length
    if (n === 0) return null
    return BACKGROUND_URLS[((bgIndex % n) + n) % n]
  }, [bgIndex])

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 650)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (immersiveOpen) {
      setImmersiveLogoUrl(pickRandomLogoUrl())
    } else {
      setImmersiveLogoUrl(null)
    }
  }, [immersiveOpen])

  useEffect(() => {
    if (!immersiveOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setImmersiveOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [immersiveOpen])

  const toggleImmersiveBackground = useCallback(() => {
    setImmersiveOpen((o) => !o)
  }, [])

  const immersiveEase = [0.22, 1, 0.36, 1] as const

  const go = useCallback((r: RouteId) => {
    window.location.hash = r === 'home' ? '#/home' : `#/${r}`
  }, [])

  const onNavItemNavigate = useCallback(
    (to: string) => {
      go(to as RouteId)
    },
    [go],
  )

  return (
    <>
      <div
        id="gspinner"
        style={{
          opacity: loading ? 1 : 0,
          visibility: loading ? 'visible' : 'hidden',
          transition: 'opacity 0.45s ease, visibility 0.45s',
          pointerEvents: loading ? 'auto' : 'none',
        }}
      />

      {BACKGROUND_URLS.length > 0 ? (
        <DynamicBackground
          urls={BACKGROUND_URLS}
          activeIndex={bgIndex}
          onActiveIndexChange={setBgIndex}
          immersiveBlur={immersiveOpen}
        />
      ) : (
        <div
          id="bgStretch"
          className={immersiveOpen ? 'immersive-bg--blur' : undefined}
          aria-hidden
          role="presentation"
        >
          <div className="bg-inner bg-layer-base" style={{ backgroundImage: BACKGROUND_FALLBACK }} />
        </div>
      )}

      <ImmersiveWallpaperLayer open={immersiveOpen} imageUrl={immersiveWallpaperUrl} />

      <BackgroundClickPlane onBackgroundClick={toggleImmersiveBackground} />

      <ImmersiveLogoOverlay open={immersiveOpen} logoSrc={immersiveLogoUrl} />

      <div id="glob">
        <div className="eld-main-sheet">
        <motion.aside
          animate={{
            x: immersiveOpen ? -380 : 0,
            opacity: immersiveOpen ? 0 : 1,
          }}
          transition={{ duration: IMMERSIVE_UI_OUT_S, ease: immersiveEase }}
          style={{ pointerEvents: immersiveOpen ? 'none' : 'auto' }}
        >
          <h1 className="eldsign-logo">
            <a href="#/home" onClick={() => go('home')} className="eldsign-logo__link">
            <center>
              <img src={eldNavbarLogo} alt="EldSign" className="eldsign-logo__img" decoding="async" width={100} />
            </center>
            </a>
          </h1>
          <nav>
            <ul>
              {NAV_LINKS.map(({ to, label }) => (
                <NavItem
                  key={to}
                  to={to}
                  label={label}
                  active={route === to}
                  onNavigate={onNavItemNavigate}
                />
              ))}
            </ul>
          </nav>
          {BACKGROUND_URLS.length > 0 && (
            <>
              <div className="eld-sidebar-spacer" aria-hidden />
              <BackgroundThumbPager urls={BACKGROUND_URLS} activeIndex={bgIndex} onSelectIndex={setBgIndex} />
            </>
          )}
        </motion.aside>

        <motion.article
          id="content"
          className="container_8"
          animate={{
            x: immersiveOpen ? 720 : 0,
            opacity: immersiveOpen ? 0 : 1,
          }}
          transition={{
            duration: IMMERSIVE_UI_OUT_S,
            ease: immersiveEase,
            delay: immersiveOpen ? 0.06 : 0,
          }}
          style={{ pointerEvents: 'none' }}
        >
          <div id="content-panel-wrap">
            <AnimatePresence mode="wait">
              {route === 'home' && (
                <NavItemModal
                  panelKey="home"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega home-placeholder">
                    <PieceStagger motionKey="home-stagger">
                      {TextImagePageContent({ blocks: homeAcceuilleBlocks })}
                      <PieceItem>
                        <p>
                          <a href="#/formations" className="white und" onClick={() => go('formations')}>
                            Découvrez nos formations
                          </a>
                          , ou{' '}
                          <a href="#/contacts" className="white und" onClick={() => go('contacts')}>
                            contactez-nous
                          </a>
                          .
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'about_us' && (
                <NavItemModal
                  panelKey="about_us"
                  id="about_us"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega about-page">
                    <PieceStagger motionKey="about-stagger">
                      <PieceItem>
                        <h2>à propos</h2>
                      </PieceItem>
                      {TextImagePageContent({
                        blocks: aboutAproposBlocks,
                        imageFigureClassName: 'about-prose__figure',
                        imageClassName: 'about-prose__img',
                      })}
                      <PieceItem>
                        <p>
                          <a
                            href="#/readmore"
                            className="bold white und"
                            onClick={(e) => {
                              e.preventDefault()
                              go('readmore')
                            }}
                          >
                            En savoir plus
                          </a>
                          {' · '}
                          <a href="#/formations" className="white und" onClick={() => go('formations')}>
                            Nos formations
                          </a>
                          {' · '}
                          <a href="#/contacts" className="white und" onClick={() => go('contacts')}>
                            Contact
                          </a>
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'architecture' && (
                <NavItemModal
                  panelKey="architecture"
                  id="architecture"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega about-page">
                    <PieceStagger motionKey="architecture-stagger">
                      <PieceItem>
                        <h2>architecture</h2>
                      </PieceItem>
                      {TextImagePageContent({
                        blocks: architectureBlocks,
                        imageFigureClassName: 'about-prose__figure',
                        imageClassName: 'about-prose__img',
                      })}
                      <PieceItem>
                        <p>
                          <a href="#/contacts" className="white und" onClick={() => go('contacts')}>
                            Contact
                          </a>
                          {' · '}
                          <a href="#/formations" className="white und" onClick={() => go('formations')}>
                            Nos formations
                          </a>
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'genie_civil' && (
                <NavItemModal
                  panelKey="genie_civil"
                  id="genie_civil"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega about-page">
                    <PieceStagger motionKey="genie-civil-stagger">
                      <PieceItem>
                        <h2>génie civil</h2>
                      </PieceItem>
                      {TextImagePageContent({
                        blocks: genieCivilBlocks,
                        imageFigureClassName: 'about-prose__figure',
                        imageClassName: 'about-prose__img',
                      })}
                      <PieceItem>
                        <p>
                          <a href="#/contacts" className="white und" onClick={() => go('contacts')}>
                            Contact
                          </a>
                          {' · '}
                          <a href="#/formations" className="white und" onClick={() => go('formations')}>
                            Nos formations
                          </a>
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'seminaire' && (
                <NavItemModal
                  panelKey="seminaire"
                  id="seminaire"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega about-page">
                    <PieceStagger motionKey="seminaire-stagger">
                      <PieceItem>
                        <h2>séminaire</h2>
                      </PieceItem>
                      {TextImagePageContent({
                        blocks: seminaireBlocks,
                        imageFigureClassName: 'about-prose__figure',
                        imageClassName: 'about-prose__img',
                      })}
                      <PieceItem>
                        <p>
                          <a href="#/formations" className="white und" onClick={() => go('formations')}>
                            Nos formations
                          </a>
                          {' · '}
                          <a href="#/contacts" className="white und" onClick={() => go('contacts')}>
                            Contact
                          </a>
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'formations' && (
                <NavItemModal
                  panelKey="formations"
                  id="formations"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega">
                    <PieceStagger motionKey="formations-stagger">
                      <PieceItem>
                        <h2>Nos formations</h2>
                      </PieceItem>
                    </PieceStagger>
                    <ul className=" formation-articles-list nocolor und">
                      {FORMATION_ENTRIES.length === 0 ? (
                        <li>
                          <p className="bold white">
                            Nommez les fichiers :{' '}
                            <code className="white">nom_prix_horaire_description</code> (extensions .jpg, .png, etc.).
                            Le dernier segment est le texte de la carte ; sans description, ne mettez que trois blocs
                            (ex. <code className="white">AutoCAD_290€_9h-17h</code>). Un{' '}
                            <code className="white">__</code> indique un champ vide ; si l’horaire contient des{' '}
                            <code className="white">_</code> sans description, terminez par{' '}
                            <code className="white">_</code> vide (ex.{' '}
                            <code className="white">Nom_Prix_Lun_9h_</code>).
                          </p>
                        </li>
                      ) : (
                        FORMATION_ENTRIES.map((entry, i) => (
                          <Article
                            key={entry.url}
                            imageUrl={entry.url}
                            title={entry.label}
                            price={entry.price}
                            sessionDate={entry.sessionDate}
                            duration={entry.duration}
                            details={entry.description ?? FORMATION_CARD_DETAILS}
                            detailsMaxWords={FORMATION_DETAILS_PREVIEW_MAX_WORDS}
                            revealDelay={0.06 * i}
                            onRowClick={() =>
                              setPayModal({
                                title: entry.label,
                                price: entry.price ?? 'Sur devis',
                                imageUrl: entry.url,
                                description: entry.description ?? FORMATION_CARD_DETAILS,
                                sessionDate: entry.sessionDate,
                                duration: entry.duration,
                              })
                            }
                            readMoreLink={{
                              href: '#/readmore',
                              onClick: (e) => {
                                e.preventDefault()
                                go('readmore')
                              },
                            }}
                          />
                        ))
                      )}
                    </ul>
                  </div>
                </NavItemModal>
              )}

              {route === 'contacts' && (
                <NavItemModal
                  panelKey="contacts"
                  id="contacts"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega">
                    <PieceStagger motionKey="contacts-stagger">
                      <PieceItem>
                        <h2>contact</h2>
                      </PieceItem>
                      <PieceItem>
                        <iframe
                          className="google_map"
                          title="Carte — ELDSIGN, Dakar"
                          width={460}
                          height={238}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          src="https://www.google.com/maps?q=14.708631,-17.4540553&z=16&hl=fr&output=embed"
                        />
                        <p className="google-map-footlink">
                          <a
                            href={CONTACT_MAPS_SHARE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="white und"
                          >
                            Ouvrir dans Google Maps
                          </a>
                        </p>
                      </PieceItem>
                      <PieceItem>
                        <ul className="cols">
                          <li>
                            <dl className="address">
                              <dt className="bold">
                                ELD'SIGN ENTREPRISE
                                <br />
                                Architecture, génie civil, formation, réalisation, suivi construction métallique.
                              </dt>
                              <dd>
                                <span>Infoline :</span>
                                <a href="tel:+221774621725" className="nocolor und">
                                  +221 77 462 17 25
                                </a>
                              </dd>
                              <dd>
                                <span>Infoline :</span>
                                <a href="tel:+221708984443" className="nocolor und">
                                  +221 70 898 44 43
                                </a>
                              </dd>
                              <dd>
                                <span>E-mail :</span>{' '}
                                <a href="mailto:el7dsign@gmail.com" className="nocolor und">
                                  eld'sign@gmail.com
                                </a>
                              </dd>
                            </dl>
                          </li>
                          <li>
                            <dl className="address">
                              <dt className="bold">
                                ELD'SIGN ENTREPRISE
                                <br />
                              </dt>
                              <dd>
                                <span>Infoline :</span>
                                <a href="tel:+221773971838" className="nocolor und">
                                  +221 77 397 18 38
                                </a>
                              </dd>
                              <dd>
                                <span>E-mail :</span>{' '}
                                <a href="mailto:eldsignpro@gmail.com" className="nocolor und">
                                  eldsignpro@gmail.com
                                </a>
                              </dd>
                            </dl>
                          </li>
                        </ul>
                      </PieceItem>
                      {(CONTACT_SOCIAL_YOUTUBE ||
                        CONTACT_SOCIAL_FACEBOOK ||
                        CONTACT_SOCIAL_TIKTOK ||
                        CONTACT_SOCIAL_LINKEDIN) && (
                        <PieceItem>
                          <p className="contact-social-label">Réseaux</p>
                          <ul className="soc-ico soc-ico--contact">
                            {CONTACT_SOCIAL_YOUTUBE ? (
                              <li>
                                <a
                                  href={CONTACT_SOCIAL_YOUTUBE}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="YouTube (nouvel onglet)"
                                >
                                  <svg className="soc-ico__svg" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                      fill="currentColor"
                                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                                    />
                                  </svg>
                                </a>
                              </li>
                            ) : null}
                            {CONTACT_SOCIAL_FACEBOOK ? (
                              <li>
                                <a
                                  href={CONTACT_SOCIAL_FACEBOOK}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="Facebook (nouvel onglet)"
                                >
                                  <svg className="soc-ico__svg" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                      fill="currentColor"
                                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                    />
                                  </svg>
                                </a>
                              </li>
                            ) : null}
                            {CONTACT_SOCIAL_TIKTOK ? (
                              <li>
                                <a
                                  href={CONTACT_SOCIAL_TIKTOK}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="TikTok (nouvel onglet)"
                                >
                                  <svg className="soc-ico__svg" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                      fill="currentColor"
                                      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48.04 2.96.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                                    />
                                  </svg>
                                </a>
                              </li>
                            ) : null}
                            {CONTACT_SOCIAL_LINKEDIN ? (
                              <li>
                                <a
                                  href={CONTACT_SOCIAL_LINKEDIN}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="LinkedIn (nouvel onglet)"
                                >
                                  <svg className="soc-ico__svg" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                      fill="currentColor"
                                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                                    />
                                  </svg>
                                </a>
                              </li>
                            ) : null}
                          </ul>
                        </PieceItem>
                      )}
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'privacy' && (
                <NavItemModal
                  panelKey="privacy"
                  id="privacy"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega">
                    <PieceStagger motionKey="privacy-stagger">
                      <PieceItem>
                        <h2>confidentialité</h2>
                      </PieceItem>
                      <PieceItem>
                        <p>
                          <strong>Politique type template.</strong>
                          <br />
                          Adaptez ce texte à votre activité et au RGPD. Structure reproduite depuis la page privacy du
                          gabarit d’origine.
                        </p>
                      </PieceItem>
                      <PieceItem>
                        <p>
                          <a href="mailto:privacy@eldsign.fr" className="nocolor">
                            privacy@eldsign.fr
                          </a>
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}

              {route === 'readmore' && (
                <NavItemModal
                  panelKey="readmore"
                  id="readmore"
                  initial={panelSlide.initial}
                  animate={panelSlide.animate}
                  exit={panelSlide.exit}
                  transition={panelTransition}
                >
                  <div className="grid_6 prefix_1 alpha omega">
                    <PieceStagger motionKey="readmore-stagger">
                      <PieceItem>
                        <h2>en savoir plus</h2>
                      </PieceItem>
                      <PieceItem>
                        <p>
                          <strong>Bloc texte long</strong>
                          <br />
                          Contenu d’exemple sur plusieurs paragraphes, comme la section « read more » du template HTML.
                        </p>
                      </PieceItem>
                      <PieceItem>
                        <p>
                          Chaque changement de route relance les animations d’apparition des pièces pour garder une
                          sensation fluide et soignée.
                        </p>
                      </PieceItem>
                    </PieceStagger>
                  </div>
                </NavItemModal>
              )}
            </AnimatePresence>
          </div>
        </motion.article>
        </div>

        <motion.footer
          animate={{
            y: immersiveOpen ? 56 : 0,
            opacity: immersiveOpen ? 0 : 1,
          }}
          transition={{ duration: IMMERSIVE_UI_OUT_S * 0.9, ease: immersiveEase }}
          style={{ pointerEvents: immersiveOpen ? 'none' : 'auto' }}
        >
          <pre className="privacy nocolor und">
            {new Date().getFullYear()} © LoggyStudio | Eld Sign ·{` `}
            <a
              href="#/privacy"
              onClick={(e) => {
                e.preventDefault()
                go('privacy')
              }}
            >
              Confidentialité
            </a>
          </pre>
          {LOGGPATIENT_PAGE_HREF ? (
            <a
              className="footer-loggpatient nocolor und"
              href={LOGGPATIENT_PAGE_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Loggpatient
            </a>
          ) : (
            <span className="footer-loggpatient">Loggpatient</span>
          )}
        </motion.footer>
      </div>

      <FormationPaymentModal
        open={payModal != null}
        onClose={() => setPayModal(null)}
        formationTitle={payModal?.title ?? ''}
        priceLabel={payModal?.price ?? ''}
        sessionDate={payModal?.sessionDate ?? ''}
        duration={payModal?.duration ?? ''}
        imageUrl={payModal?.imageUrl ?? ''}
        description={payModal?.description ?? ''}
      />
    </>
  )
}
