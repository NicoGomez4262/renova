import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Contenedor blanco con borde suave y sombra (tarjetas, formularios). */
export function Card({
  className,
  padded = true,
  ...props
}: HTMLAttributes<HTMLDivElement> & { padded?: boolean }) {
  return (
    <div
      className={cn(
        'border-line/70 shadow-card rounded-2xl border bg-white',
        padded && 'p-4',
        className,
      )}
      {...props}
    />
  )
}
