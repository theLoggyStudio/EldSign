import type { KeyboardEvent, MouseEvent, ReactNode } from 'react'
import { truncateWords } from '../truncateWords'
import { Img } from './Img'
import { PieceReveal } from './PieceReveal'

export type ArticleReadMoreLink = {
  href: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
}

export type ArticleProps = {
  imageUrl: string
  /** Nom de la formation (à droite de l’image). */
  title: string
  /** Affiché sous le titre (ex. « Sur devis », « 490 € »). */
  price?: string
  /** Date prévue de la session (texte court). */
  sessionDate?: string
  /** Durée prévue (texte court). */
  duration?: string
  /** Détails : durée, public, objectifs… (texte ou JSX). */
  details?: ReactNode
  /** Si `details` est une chaîne, nombre max de mots affichés dans la carte (le reste est masqué). */
  detailsMaxWords?: number
  revealDelay?: number
  readMoreLink?: ArticleReadMoreLink
  className?: string
  /** Clic sur toute la ligne (ex. ouvrir la modale paiement). Le lien « titre » ne propage pas le clic. */
  onRowClick?: () => void
}

/**
 * Article formation en liste : image à gauche, titre, prix et détails à droite (empilés en colonne).
 */
export const Article = ({
  imageUrl,
  title,
  price = 'Sur devis',
  sessionDate,
  duration,
  details,
  detailsMaxWords,
  revealDelay = 0,
  readMoreLink,
  className,
  onRowClick,
}: ArticleProps) => {
  const rowClass = ['article-row', onRowClick ? 'article-row--clickable' : undefined, className]
    .filter(Boolean)
    .join(' ')

  const onRowKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onRowClick) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onRowClick()
    }
  }

  const detailsContent =
    details != null && details !== ''
      ? typeof details === 'string' && detailsMaxWords != null && detailsMaxWords > 0
        ? truncateWords(details.replace(/\s+/g, ' ').trim(), detailsMaxWords)
        : details
      : null

  return (
    <li>
      <PieceReveal delay={revealDelay}>
        <div
          className={rowClass}
          {...(onRowClick
            ? {
                role: 'button' as const,
                tabIndex: 0,
                onClick: onRowClick,
                onKeyDown: onRowKeyDown,
              }
            : {})}
        >
          <div className="article-row__media">
            <Img src={imageUrl} alt={title} loading="lazy" decoding="async" />
          </div>
          <div className="article-row__body">
            {readMoreLink ? (
              <a
                href={readMoreLink.href}
                className="article-row__title-link nocolor und"
                onClick={(e) => {
                  if (onRowClick) e.stopPropagation()
                  readMoreLink.onClick?.(e)
                }}
              >
                <h3 className="article-row__title">{title}</h3>
              </a>
            ) : (
              <h3 className="article-row__title">{title}</h3>
            )}
            <p className="article-row__price">{price}</p>
            {(sessionDate || duration) && (
              <dl className="article-row__meta">
                {sessionDate ? (
                  <>
                    <dt>Date</dt>
                    <dd>{sessionDate}</dd>
                  </>
                ) : null}
                {duration ? (
                  <>
                    <dt>Horaire</dt>
                    <dd>{duration}</dd>
                  </>
                ) : null}
              </dl>
            )}
            {detailsContent != null && detailsContent !== '' && (
              <div className="article-row__details">
                {typeof detailsContent === 'string' ? <p>{detailsContent}</p> : detailsContent}
              </div>
            )}
          </div>
        </div>
      </PieceReveal>
    </li>
  )
}
