import { Img } from './Img'
import { Modal } from './Modal'

export type PaydunyaPayModalProps = {
  open: boolean
  onClose: () => void
  formationTitle: string
  priceLabel: string
  sessionDate?: string
  duration?: string
  /** URL de l’image formation : affichée à gauche, dimensionnée pour tenir sans défilement. */
  imageUrl?: string
  /** Description complète (paragraphes séparés par une ligne vide `\n\n`). */
  description?: string
}

/**
 * Paiement PayDunya : aperçu formation + actions. L’intégration API se fait côté backend.
 */
export const PaydunyaPayModal = ({
  open,
  onClose,
  formationTitle,
  priceLabel,
  sessionDate = '',
  duration = '',
  imageUrl = '',
  description = '',
}: PaydunyaPayModalProps) => {
  const descriptionBlocks = description
    .split(/\n\s*\n/)
    .map((b) => b.trim().replace(/\n/g, ' '))
    .filter(Boolean)

  return (
    <Modal open={open} onClose={onClose} title="Paiement — PayDunya">
      <div className="eld-pay-layout">
        {imageUrl ? (
          <div className="eld-pay-media">
            <Img src={imageUrl} alt={formationTitle} className="eld-pay-formation-img" loading="lazy" decoding="async" />
          </div>
        ) : null}
        <div className="eld-pay-copy">
          <div className="eld-pay-intro">
            <p className="eld-pay-intro__title">
              <strong>{formationTitle}</strong>
            </p>
            <p className="eld-pay-intro__price">
              <span className="eld-pay-price">{priceLabel}</span>
            </p>
            {(sessionDate || duration) && (
              <dl className="eld-pay-meta">
                {sessionDate ? (
                  <>
                    <dt>Date prévue</dt>
                    <dd>{sessionDate}</dd>
                  </>
                ) : null}
                {duration ? (
                  <>
                    <dt>Horaire prévu</dt>
                    <dd>{duration}</dd>
                  </>
                ) : null}
              </dl>
            )}
          </div>
          {descriptionBlocks.length > 0 ? (
            <div className="eld-pay-description">
              {descriptionBlocks.map((block, i) => (
                <p key={i}>{block}</p>
              ))}
            </div>
          ) : null}
          <div className="eld-pay-actions">
            <button type="button" className="eld-pay-btn eld-pay-btn--ghost" onClick={onClose}>
              Annuler
            </button>
            <button
              type="button"
              className="eld-pay-btn eld-pay-btn--primary"
              onClick={() => {
                window.open('https://paydunya.com', '_blank', 'noopener,noreferrer')
              }}
            >
              Continuer vers PayDunya
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
