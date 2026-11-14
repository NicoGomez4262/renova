import type { ReactNode } from 'react'
import type { Tone } from '@/types'
import { cn } from '@/lib/cn'
import { toneClasses } from '@/lib/tones'

interface OptionTileProps {
  label: string
  description?: string
  icon?: ReactNode
  tone?: Tone
  selected?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Mosaico seleccionable grande (ej. "¿Qué deseas pintar?", método de pago).
 * Con `tone` toma el fondo pastel de la categoría.
 */
export function OptionTile({
  label,
  description,
  icon,
  tone,
  selected,
  onClick,
  className,
}: OptionTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-2xl border-2 p-3 text-center transition active:scale-[0.98]',
        tone ? toneClasses[tone].tile : 'bg-white',
        selected ? 'border-navy-700 shadow-card' : 'border-transparent',
        !tone && !selected && 'border-line',
        className,
      )}
    >
      {icon}
      <span className="text-ink text-[15px] leading-tight font-bold">{label}</span>
      {description && <span className="text-muted text-xs">{description}</span>}
    </button>
  )
}
