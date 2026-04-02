import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import eldNavbarLogo from '../Assets/Logos/eld logo.png'
import { getAboutAproposBlocks } from './aboutApropos'
import { getArchitectureBlocks } from './architectureContent'
import { getGenieCivilBlocks } from './genieCivilContent'
import { getSeminaireBlocks } from './seminaireContent'
import { BACKGROUND_FALLBACK, BACKGROUND_URLS } from './backgroundUrls'
import { FORMATION_ENTRIES } from './formationUrls'
import { ImmersiveLogoOverlay, IMMERSIVE_UI_OUT_S } from './items/ImmersiveLogoOverlay'
import { pickRandomLogoUrl } from './logoUrls'
import { BackgroundThumbPager } from './items/BackgroundThumbPager'
import { DynamicBackground } from './items/DynamicBackground'
import { NavItem } from './items/NavItem'
import { Article } from './items/Article'
import { BackgroundClickPlane } from './items/BackgroundClickPlane'
import { PaydunyaPayModal } from './items/PaydunyaPayModal'
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

/** Pied de page : personnalisez l’URL Instagram (profil / entreprise). */
const FOOTER_INSTAGRAM_HREF = 'https://www.instagram.com/loggystudio/#'
/** Aligné sur l’infoline principale (page contact). */
const FOOTER_WHATSAPP_HREF = 'https://wa.me/221784649530'

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
        />
      ) : (
        <div id="bgStretch" aria-hidden role="presentation">
          <div className="bg-inner bg-layer-base" style={{ backgroundImage: BACKGROUND_FALLBACK }} />
        </div>
      )}

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
              <img src={eldNavbarLogo} alt="EldSign" className="eldsign-logo__img" decoding="async" />
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
                                Aucune adresse postale n’est indiquée sur nos supports (indicatif +221).
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
          <ul className="soc-ico">
            <li>
              <a
                href={FOOTER_INSTAGRAM_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram (nouvel onglet)"
              >
                <svg className="soc-ico__svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={FOOTER_WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (nouvel onglet)"
              >
                <svg className="soc-ico__svg" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </motion.footer>
      </div>

      <PaydunyaPayModal
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
