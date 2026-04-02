import { AnimatePresence, motion } from 'framer-motion'

/** Durée (s) du retrait nav + panneau — à garder alignée avec les `motion` du parent. */
export const IMMERSIVE_UI_OUT_S = 0.48
/** Délai avant l’apparition douce du logo (après le départ de l’UI). */
export const LOGO_REVEAL_DELAY = IMMERSIVE_UI_OUT_S * 0.65

export type ImmersiveLogoOverlayProps = {
  open: boolean
  logoSrc: string | null
}

export const ImmersiveLogoOverlay = ({ open, logoSrc }: ImmersiveLogoOverlayProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="immersive-logo-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {logoSrc ? (
            <motion.img
              key={logoSrc}
              src={logoSrc}
              alt=""
              className="immersive-logo-layer__img"
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
              transition={{
                duration: 0.9,
                delay: LOGO_REVEAL_DELAY,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ) : (
            <motion.p
              className="immersive-logo-layer__fallback"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              transition={{
                duration: 0.85,
                delay: LOGO_REVEAL_DELAY,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              EldSign
            </motion.p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
