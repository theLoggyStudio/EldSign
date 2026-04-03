import { useMemo } from 'react'
import QRCode from 'react-qr-code'
import { buildWhatsAppFormationUrl } from '../whatsappFormationLink'
import { Img } from './Img'
import { Modal } from './Modal'

export type FormationPaymentModalProps = {
  open: boolean
  onClose: () => void
  formationTitle: string
  priceLabel: string
  sessionDate?: string
  duration?: string
  imageUrl?: string
  description?: string
}

/** Contact / inscription : QR WhatsApp avec message prérempli selon la formation. */
export const FormationPaymentModal = ({
  open,
  onClose,
  formationTitle,
  priceLabel,
  sessionDate = '',
  duration = '',
  imageUrl = '',
  description = '',
}: FormationPaymentModalProps) => {
  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppFormationUrl({
        formationTitle,
        priceLabel,
        sessionDate,
        duration,
        formationImageUrl: imageUrl || undefined,
      }),
    [formationTitle, priceLabel, sessionDate, duration, imageUrl],
  )

  const descriptionBlocks = description
    .split(/\n\s*\n/)
    .map((b) => b.trim().replace(/\n/g, ' '))
    .filter(Boolean)

  return (
    <Modal open={open} onClose={onClose} title="Contact — WhatsApp ELDSIGN">
      <div className="eld-pay-layout">
        {imageUrl ? (
          <div className="eld-pay-media">
            <Img src={imageUrl} alt={formationTitle} className="eld-pay-formation-img" loading="lazy" decoding="async" />
          </div>
        ) : null}
        <div className="eld-pay-copy eld-pay-copy--whatsapp">
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

          <div className="eld-pay-whatsapp-block">
            <p className="eld-pay-whatsapp-block__label">WhatsApp — ELDSIGN</p>
            <p className="eld-pay-whatsapp-block__sub">
              Scannez pour ouvrir la messagerie avec un texte déjà rédigé sur cette formation.
            </p>
            <div className="eld-pay-whatsapp-qr-wrap">
              <QRCode value={whatsappUrl} size={176} level="M" className="eld-pay-whatsapp-qr-svg" />
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="eld-pay-whatsapp-link white und"
            >
              Ouvrir dans WhatsApp
            </a>
          </div>

          <p className="eld-pay-qr-hint">
            Le QR code ouvre WhatsApp avec un message prérempli : vous n’avez plus qu’à l’envoyer à ELDSIGN.
          </p>

          <div className="eld-pay-actions">
            <button type="button" className="eld-pay-btn eld-pay-btn--primary" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
