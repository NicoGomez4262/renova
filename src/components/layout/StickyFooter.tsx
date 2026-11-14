import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Barra fija inferior para el botón principal de un flujo
 * (ej. "Continuar", "Confirmar reserva"). Deja un espacio para que el
 * contenido no quede tapado.
 * `aboveNav` = la pantalla tiene barra de navegación (se ubica encima).
 */
export function StickyFooter({
  children,
  aboveNav,
  className,
}: {
  children: ReactNode
  aboveNav?: boolean
  className?: string
}) {
  return (
    <>
      <div className="h-28" aria-hidden />
      <div
        className={cn(
          'border-line/60 fixed inset-x-0 z-30 mx-auto max-w-lg border-t bg-white/95 px-5 pt-3 backdrop-blur',
          aboveNav
            ? 'bottom-[calc(4rem+env(safe-area-inset-bottom))] pb-3'
            : 'bottom-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
