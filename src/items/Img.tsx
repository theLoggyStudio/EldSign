import { motion } from 'framer-motion'
import { useCallback, useId, useState, type ImgHTMLAttributes, type KeyboardEvent, type MouseEvent } from 'react'
import { Modal } from './Modal'

export type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'role'> & {
  /** Nom de fichier suggéré pour le téléchargement (sinon dérivé de l’URL). */
  downloadFileName?: string
  /** Désactive l’aperçu en modale (clic = comportement natif seulement). */
  disableLightbox?: boolean
}

function suggestedFileName(src: string): string {
  try {
    const u = new URL(src, typeof window !== 'undefined' ? window.location.href : 'https://local.invalid/')
    const seg = decodeURIComponent(u.pathname.split('/').pop() || '')
    if (seg && seg.includes('.')) return seg
    if (seg) return `${seg}.jpg`
  } catch {
    /* ignore */
  }
  const tail = decodeURIComponent(src.split('?')[0].split('/').pop() || 'image')
  return tail.includes('.') ? tail : `${tail}.jpg`
}

/**
 * Image cliquable : ouvre une modale (aperçu agrandi + téléchargement).
 * Le clic est stoppé pour ne pas déclencher un parent (ex. ligne formation).
 */
export const Img = ({
  src,
  alt = '',
  className,
  downloadFileName,
  disableLightbox,
  onClick,
  onKeyDown,
  tabIndex,
  ...rest
}: ImgProps) => {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const expandLabel = alt.trim() ? alt : 'Agrandir l’image'
  const filename = downloadFileName ?? (src ? suggestedFileName(src) : 'image')

  const handleClick = useCallback(
    (e: MouseEvent<HTMLImageElement>) => {
      if (!disableLightbox && src) {
        e.preventDefault()
        e.stopPropagation()
        setOpen(true)
      }
      onClick?.(e)
    },
    [disableLightbox, src, onClick],
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLImageElement>) => {
      if (!disableLightbox && src && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        e.stopPropagation()
        setOpen(true)
      }
      onKeyDown?.(e)
    },
    [disableLightbox, src, onKeyDown],
  )

  const handleDownload = useCallback(async () => {
    if (!src) return
    try {
      const res = await fetch(src, { mode: 'cors' })
      if (!res.ok) throw new Error('fetch failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      const a = document.createElement('a')
      a.href = src
      a.download = filename
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }, [src, filename])

  if (!src) return null

  const thumbClass = [
    className,
    !disableLightbox ? 'eld-nav-img eld-nav-img--clickable' : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  const thumb = (
    <motion.span
      className="eld-img-thumb-wrap"
      style={{ display: 'inline-block', lineHeight: 0, maxWidth: '100%' }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        disableLightbox
          ? undefined
          : { scale: 1.03, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
      }
      whileTap={disableLightbox ? undefined : { scale: 0.98 }}
    >
      <img
        {...rest}
        src={src}
        alt={alt}
        className={thumbClass}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disableLightbox ? tabIndex : tabIndex ?? 0}
        role={disableLightbox ? undefined : 'button'}
        aria-label={disableLightbox ? undefined : expandLabel}
      />
    </motion.span>
  )

  if (disableLightbox) return thumb

  return (
    <>
      {thumb}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={alt.trim() || 'Aperçu'}
        titleId={titleId}
        rootClassName="eld-modal-root--lightbox"
        dialogClassName="eld-modal-dialog--lightbox"
      >
        <div className="eld-img-lightbox">
          <img src={src} alt={alt} className="eld-img-lightbox__img" loading="eager" decoding="async" />
          <div className="eld-img-lightbox__actions">
            <button type="button" className="eld-img-lightbox__btn" onClick={handleDownload}>
              Télécharger
            </button>
            <a className="eld-img-lightbox__link" href={src} download={filename} target="_blank" rel="noopener noreferrer">
              Ouvrir / enregistrer sous…
            </a>
          </div>
        </div>
      </Modal>
    </>
  )
}
