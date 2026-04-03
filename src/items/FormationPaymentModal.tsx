import { useMemo } from 'react'
import QRCode from 'react-qr-code'
import { getOrangeMoneyQrUrl, getWaveQrUrl } from '../formationPaymentQrcodes'
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

/**
 * QR WhatsApp dynamique (message prérempli selon la formation) + QR Orange / Wave optionnels (Assets/Qrcodes).
 */
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
  const orangeQrUrl = getOrangeMoneyQrUrl()
  const waveQrUrl = getWaveQrUrl()

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppFormationUrl({
        formationTitle,
        priceLabel,
        sessionDate,
        duration,
      }),
    [formationTitle, priceLabel, sessionDate, duration],
  )

  const descriptionBlocks = description
    .split(/\n\s*\n/)
    .map((b) => b.trim().replace(/\n/g, ' '))
    .filter(Boolean)

  return (
    <Modal open={open} onClose={onClose} title="Paiement — WhatsApp, Orange Money & Wave">
      <div className="eld-pay-layout">
        {imageUrl ? (
          <div className="eld-pay-media">
            <Img src={imageUrl} alt={formationTitle} className="eld-pay-formation-img" loading="lazy" decoding="async" />
          </div>
        ) : null}
        <div className="eld-pay-copy eld-pay-copy--qrcodes">
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
            <div className="eld-pay-qr__frame eld-pay-qr__frame--whatsapp">
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

          {(orangeQrUrl || waveQrUrl) && (
            <p className="eld-pay-qr-section-title">Paiement mobile money</p>
          )}
          <div className="eld-pay-qrcodes">
            <div className="eld-pay-qr">
              <p className="eld-pay-qr__label">Orange Money</p>
              {orangeQrUrl ? (
                <div className="eld-pay-qr__frame">
                  <Img
                    src={orangeQrUrl}
                    alt="QR code Orange Money"
                    className="eld-pay-qr__img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <p className="eld-pay-qr__missing">
                  Optionnel : image dont le nom contient <strong>orange</strong> dans{' '}
                  <code className="eld-pay-qr__code">Assets/Qrcodes</code>
                </p>
              )}
            </div>
            <div className="eld-pay-qr">
              <p className="eld-pay-qr__label">Wave</p>
              {waveQrUrl ? (
                <div className="eld-pay-qr__frame">
                  <Img
                    src={waveQrUrl}
                    alt="QR code Wave"
                    className="eld-pay-qr__img"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <p className="eld-pay-qr__missing">
                  Optionnel : image dont le nom contient <strong>wave</strong> dans{' '}
                  <code className="eld-pay-qr__code">Assets/Qrcodes</code>
                </p>
              )}
            </div>
          </div>

          <p className="eld-pay-qr-hint">
            Le QR WhatsApp envoie votre demande à ELDSIGN avec le détail de la formation. Pour payer, utilisez Orange
            Money ou Wave si des QR sont fournis.
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
