import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ChipProps {
  children: ReactNode
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
  className?: string
}

/** Píldora seleccionable: filtros, etiquetas, horarios. */
export function Chip({ children, selected, disabled, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        'inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition',
        selected
          ? 'border-navy-900 bg-navy-900 text-white'
          : 'border-line text-ink hover:border-navy-300 bg-white',
        disabled && 'border-line bg-surface text-muted/60 hover:border-line line-through',
        className,
      )}
    >
      {children}
    </button>
  )
}
