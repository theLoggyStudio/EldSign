import { Fragment, type ReactNode } from 'react'

const LINE_MARKER = /^::([a-z0-9_-]+)::\s*(.*)$/i

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="prose-icon__svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  )
}

const ICONS: Record<string, ReactNode> = {
  about: (
    <Icon>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  ),
  building: (
    <Icon>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4M9 10h.01M12 10h.01M15 10h.01M9 14h.01M12 14h.01M15 14h.01" />
    </Icon>
  ),
  mission: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </Icon>
  ),
  vision: (
    <Icon>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </Icon>
  ),
  briefcase: (
    <Icon>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </Icon>
  ),
  brain: (
    <Icon>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </Icon>
  ),
  worker: (
    <Icon>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a8 8 0 0 0-8-8h-4a8 8 0 0 0-8 8v2Z" />
      <path d="M12 9V2" />
    </Icon>
  ),
  globe: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Icon>
  ),
  conclusion: (
    <Icon>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </Icon>
  ),
  arrow: (
    <Icon>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </Icon>
  ),
  pin: (
    <Icon>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  ),
  build: (
    <Icon>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Icon>
  ),
  calendar: (
    <Icon>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Icon>
  ),
  phone: (
    <Icon>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  ),
  clock: (
    <Icon>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </Icon>
  ),
  chart: (
    <Icon>
      <path d="M3 3v18h18" />
      <path d="M7 16v-4M12 16V8M17 16v-7" />
    </Icon>
  ),
  handshake: (
    <Icon>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  ),
  architecture: (
    <Icon>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
      <path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
    </Icon>
  ),
  genie: (
    <Icon>
      <path d="M4 22h16" />
      <path d="M6 18V9l6-5 6 5v9" />
      <path d="M10 22V12h4v10" />
    </Icon>
  ),
  book: (
    <Icon>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </Icon>
  ),
}

function parseParagraph(para: string): ReactNode {
  const lines = para.split('\n')
  const first = lines[0] ?? ''
  const m = first.match(LINE_MARKER)
  if (!m) {
    return <p className="prose-block">{para}</p>
  }
  const key = m[1].toLowerCase()
  const firstRest = m[2]
  const restLines = lines.slice(1)
  const rest = restLines.join('\n').trim()
  const icon = ICONS[key]

  if (key === 'arrow') {
    const text = [firstRest, restLines.join('\n')].filter(Boolean).join('\n')
    return (
      <div className="prose-callout" role="note">
        <span className="prose-icon prose-icon--sm" aria-hidden>
          {icon ?? ICONS.arrow}
        </span>
        <span className="prose-callout__text">{text}</span>
      </div>
    )
  }

  return (
    <div className="prose-section">
      <div className="prose-row prose-row--title">
        {icon != null ? (
          <span className="prose-icon" aria-hidden>
            {icon}
          </span>
        ) : null}
        <span className="prose-row__title">{firstRest}</span>
      </div>
      {rest ? (
        <div className="prose-section__body prose-block">{rest}</div>
      ) : null}
    </div>
  )
}

/** Texte avec lignes optionnelles `::clef:: Titre` (icône SVG) ; `::arrow::` = encadré discret. */
export function ProseWithIcons({ body }: { body: string }): ReactNode {
  const paras = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)
  return (
    <>
      {paras.map((para, i) => (
        <Fragment key={i}>{parseParagraph(para)}</Fragment>
      ))}
    </>
  )
}
