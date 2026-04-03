import { AnimatePresence, motion } from 'framer-motion'
import { IMMERSIVE_UI_OUT_S } from './ImmersiveLogoOverlay'

/** Après le début du flou : l’image nette apparaît avant le logo. */
const WALLPAPER_REVEAL_DELAY = IMMERSIVE_UI_OUT_S * 0.22

export type ImmersiveWallpaperLayerProps = {
  open: boolean
  imageUrl: string | null
}

export const ImmersiveWallpaperLayer = ({ open, imageUrl }: ImmersiveWallpaperLayerProps) => {
  return (
    <AnimatePresence>
      {open && imageUrl ? (
        <motion.div
          className="immersive-wallpaper-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.55,
            delay: WALLPAPER_REVEAL_DELAY,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={imageUrl}
            alt=""
            className="immersive-wallpaper-layer__img"
            decoding="async"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
