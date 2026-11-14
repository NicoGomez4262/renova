import { cn } from '@/lib/cn'

/**
 * Logo de Renova: "RENOV" + casa con herramientas cruzadas como la "A".
 * `size` controla la altura en px.
 */
export function Logo({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn('text-navy-900 inline-flex items-end font-extrabold select-none', className)}
      style={{ fontSize: size * 0.95, lineHeight: 1 }}
      aria-label="Renova"
      role="img"
    >
      <span aria-hidden className="tracking-[0.16em]">
        RENOV
      </span>
      <HouseMark size={size * 1.25} className="-mb-[0.06em] -ml-[0.08em]" />
    </span>
  )
}

/** Isotipo: casa con llave y destornillador (también usado como ícono de la app) */
export function HouseMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* Techo en forma de "A" */}
      <path
        d="M4 22 22 5.5 40 22"
        stroke="var(--color-navy-900)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Chimenea */}
      <path
        d="M31 13.5V7.5h4.5v10"
        stroke="var(--color-navy-900)"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Paredes */}
      <path
        d="M8.5 19.5V38.5h27V19.5"
        stroke="var(--color-navy-900)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Destornillador (azul marino) */}
      <path
        d="m15 18 13.5 13.5"
        stroke="var(--color-navy-900)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="m26.5 29.5 3.4 3.4"
        stroke="var(--color-navy-900)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Llave (azul) */}
      <path d="m15.5 32.5 12-12" stroke="#2f7de0" strokeWidth="3.2" strokeLinecap="round" />
      <path
        d="M26 16.6a4.6 4.6 0 0 1 5.9 5.9l-2.1-.4-1.6 1.6.4 2.1"
        stroke="#2f7de0"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Detalle coral (puerta) */}
      <rect x="19.5" y="36.6" width="5" height="3.8" rx="1" fill="var(--color-coral-500)" />
    </svg>
  )
}
