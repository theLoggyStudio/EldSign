import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/** Conteneur avec apparition échelonnée des enfants (pièces de contenu). */
export const pieceStaggerParent: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
}

/** Une « pièce » : translation légère, fondu et léger dé-floutage à l’apparition. */
export const pieceChild: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

type PieceRevealProps = {
  children: ReactNode
  className?: string
  /** Délai avant le début de l’animation (secondes). */
  delay?: number
}

/** Enveloppe simple pour une pièce isolée (hors stagger). */
export const PieceReveal = ({ children, className, delay = 0 }: PieceRevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28, filter: 'blur(5px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{
      delay,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {children}
  </motion.div>
)

type PieceStaggerProps = {
  children: ReactNode
  className?: string
  /** Remonte une clé quand la vue change pour relancer le stagger. */
  motionKey: string
}

export const PieceStagger = ({ children, className, motionKey }: PieceStaggerProps) => (
  <motion.div
    key={motionKey}
    className={className}
    variants={pieceStaggerParent}
    initial="hidden"
    animate="visible"
  >
    {children}
  </motion.div>
)

type PieceItemProps = {
  children: ReactNode
  className?: string
}

/** Enfant à placer sous `PieceStagger` pour l’animation échelonnée. */
export const PieceItem = ({ children, className }: PieceItemProps) => (
  <motion.div className={className} variants={pieceChild}>
    {children}
  </motion.div>
)
