/** Ilustración de casa del encabezado de Inicio */
export function HouseIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 130" fill="none" className={className} aria-hidden>
      <ellipse cx="96" cy="38" rx="56" ry="30" fill="var(--color-tile-sky)" />
      <ellipse cx="62" cy="52" rx="30" ry="20" fill="var(--color-tile-sky)" />
      {/* Arbusto derecho */}
      <circle cx="146" cy="96" r="13" fill="#2f7a55" />
      <circle cx="138" cy="84" r="10" fill="#3b8c63" />
      <circle cx="152" cy="108" r="9" fill="#2f7a55" />
      {/* Casa */}
      <path d="M50 66 92 30l42 36v52H50z" fill="#fdf3e4" />
      <path
        d="M42 72 92 29l50 43"
        stroke="var(--color-navy-900)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M52 64v54h80V64"
        stroke="var(--color-navy-900)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Ventana */}
      <rect
        x="64"
        y="78"
        width="20"
        height="20"
        rx="1.5"
        fill="#fff"
        stroke="var(--color-navy-900)"
        strokeWidth="3"
      />
      <path d="M74 78v20M64 88h20" stroke="var(--color-navy-900)" strokeWidth="2.5" />
      {/* Puerta */}
      <path d="M100 118V90a9 9 0 0 1 18 0v28z" fill="var(--color-coral-500)" />
      <circle cx="113" cy="104" r="1.6" fill="#fff" />
      {/* Arbusto izquierdo */}
      <circle cx="44" cy="112" r="9" fill="#2f7a55" />
      <circle cx="35" cy="116" r="7" fill="#3b8c63" />
      {/* Piso */}
      <path d="M18 120h146" stroke="var(--color-navy-900)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
