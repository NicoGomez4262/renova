import type { CategoryId } from '@/types'

/**
 * Ilustraciones a color de cada categoría (estilo de los mockups).
 * Uso: <CategoryIcon id="plomeria" size={48} />
 */
export function CategoryIcon({ id, size = 48 }: { id: CategoryId; size?: number }) {
  const Icon = ICONS[id]
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <Icon />
    </svg>
  )
}

const NAVY = 'var(--color-navy-800)'

const ICONS: Record<CategoryId, () => React.JSX.Element> = {
  plomeria: () => (
    <>
      <rect x="9" y="7" width="20" height="5" rx="2.5" fill={NAVY} />
      <rect x="16.5" y="11" width="5" height="8" fill={NAVY} />
      <rect x="4" y="18" width="9" height="11" rx="2" fill={NAVY} />
      <path d="M11 19h19a9 9 0 0 1 9 9v3.5h-7V28a2 2 0 0 0-2-2H11z" fill={NAVY} />
      <path
        d="M35.5 35.5s-3.5 4.4-3.5 6.6a3.5 3.5 0 0 0 7 0c0-2.2-3.5-6.6-3.5-6.6Z"
        fill="#3d8fe6"
      />
    </>
  ),
  limpieza: () => (
    <>
      <path
        d="M15 17h12l3.5 6.5V41a3 3 0 0 1-3 3h-13a3 3 0 0 1-3-3V22.5z"
        fill="var(--color-accent-mint)"
      />
      <rect x="16" y="9" width="10" height="8" rx="2" fill="var(--color-accent-mint)" />
      <path d="M26 10h7.5l-2.5 4.5H26z" fill="var(--color-accent-mint)" />
      <path
        d="M14.5 29h14"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="m39 5 1.6 4.4L45 11l-4.4 1.6L39 17l-1.6-4.4L33 11l4.4-1.6z"
        fill="var(--color-accent-mint)"
      />
      <path
        d="m38.5 22 1 2.6 2.5 1-2.5 1-1 2.6-1-2.6-2.5-1 2.5-1z"
        fill="var(--color-accent-mint)"
      />
    </>
  ),
  pintura: () => (
    <>
      <rect x="5" y="6" width="30" height="12" rx="4" fill="var(--color-coral-500)" />
      <rect x="8" y="8.5" width="24" height="3" rx="1.5" fill="#fff" fillOpacity=".35" />
      <path
        d="M35 12h5v10H24v6"
        stroke="var(--color-coral-700)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <rect x="20.5" y="27" width="7" height="16" rx="3.5" fill="var(--color-coral-500)" />
    </>
  ),
  electricidad: () => (
    <>
      <g stroke="#f5b324" strokeWidth="2.6" strokeLinecap="round">
        <path d="M24 2.5v4M10.5 8l2.8 2.8M37.5 8l-2.8 2.8M5 21h4M39 21h4" />
      </g>
      <path d="M24 10.5a11 11 0 0 0-6.5 19.9V34h13v-3.6A11 11 0 0 0 24 10.5Z" fill="#f5b324" />
      <path
        d="M20 17.5a6 6 0 0 1 4-1.6"
        stroke="#fff"
        strokeOpacity=".55"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="17.5" y="35.5" width="13" height="3.4" rx="1.7" fill="#c7cdd6" />
      <rect x="19.5" y="40.5" width="9" height="3.4" rx="1.7" fill="#c7cdd6" />
    </>
  ),
  electrodomesticos: () => (
    <>
      <rect x="8" y="5" width="32" height="39" rx="5" fill="var(--color-accent-teal)" />
      <rect x="8" y="5" width="32" height="9" rx="5" fill="#0f6a69" />
      <circle cx="14" cy="9.5" r="1.8" fill="#fff" />
      <circle cx="19.5" cy="9.5" r="1.8" fill="#fff" fillOpacity=".6" />
      <circle cx="24" cy="29" r="10" fill="#fff" />
      <circle cx="24" cy="29" r="6.5" fill="#bfe8e7" />
      <path
        d="M19.5 30.5c2-2 4.5 1.5 9 0"
        stroke="var(--color-accent-teal)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  instalaciones: () => (
    <>
      <path
        d="M7 13h21a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5h-8.5l-2.3 17H10.5l2.2-17H8a3 3 0 0 1-3-3v-6a3 3 0 0 1 2-3z"
        fill="var(--color-accent-lilac)"
      />
      <rect x="33" y="15" width="5" height="8" rx="1.2" fill={NAVY} />
      <rect x="38" y="17.8" width="7" height="2.4" rx="1.2" fill="#9aa4b2" />
      <path
        d="M10 18h13"
        stroke="#fff"
        strokeOpacity=".4"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </>
  ),
}
