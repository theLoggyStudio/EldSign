import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** id pour aria-labelledby */
  titleId?: string
  /** Classes supplémentaires sur la racine (ex. z-index pour modale empilée). */
  rootClassName?: string
  /** Classes supplémentaires sur la boîte de dialogue. */
  dialogClassName?: string
}

/**
 * Modale avec fond flouté (backdrop-filter). Rendu dans document.body.
 */
export const Modal = ({
  open,
  onClose,
  title,
  children,
  titleId = 'modal-title',
  rootClassName,
  dialogClassName,
}: ModalProps) => {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className={['eld-modal-root', rootClassName].filter(Boolean).join(' ')}
      role="presentation"
      onClick={onClose}
      aria-hidden={!open}
    >
      <div className="eld-modal-backdrop" aria-hidden />
      <div
        className={['eld-modal-dialog', dialogClassName].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="eld-modal-header">
          <h2 id={titleId} className="eld-modal-title">
            {title}
          </h2>
          <button type="button" className="eld-modal-close" onClick={onClose} aria-label="Fermer">
            ×
          </button>
        </header>
        <div className="eld-modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
