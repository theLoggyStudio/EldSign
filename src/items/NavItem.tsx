export type NavItemProps = {
  /** Identifiant de route : `home` → `#/home`, sinon `#/${to}`. */
  to: string
  label: string
  active: boolean
  onNavigate: (to: string) => void
}

export const NavItem = ({ to, label, active, onNavigate }: NavItemProps) => {
  const href = to === 'home' ? '#/home' : `#/${to}`
  return (
    <li className={active ? 'active' : ''}>
      <a href={href} onClick={() => onNavigate(to)}>
        {label}
        <span />
      </a>
    </li>
  )
}
