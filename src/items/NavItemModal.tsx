import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

export type NavItemModalProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  /** Clé stable pour AnimatePresence (souvent identique à la route). */
  panelKey: string
  children: ReactNode
}

/**
 * Panneau de contenu des routes (accueil, formations, etc.) : animations de glissement
 * et zone interne défilante. Positionné à droite de la colonne principale via `#content-panel-wrap` dans `eldsign.css`.
 */
export const NavItemModal = ({
  panelKey,
  id,
  className,
  children,
  ...motionProps
}: NavItemModalProps) => (
  <motion.div
    key={panelKey}
    id={id}
    className={['content-panel', 'nav-item-modal', 'eld-nav-panel--right', className].filter(Boolean).join(' ')}
    {...motionProps}
  >
    <div className="nav-item-modal__scroll">{children}</div>
  </motion.div>
)
