import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Encabezado de pantalla interna: botón atrás + título + acción opcional.
 * `backTo` fuerza una ruta; si no, vuelve a la pantalla anterior.
 */
export function PageHeader({
  title,
  subtitle,
  backTo,
  hideBack,
  right,
  className,
}: {
  title?: string
  subtitle?: string
  backTo?: string
  hideBack?: boolean
  right?: ReactNode
  className?: string
}) {
  const navigate = useNavigate()
  const goBack = () => {
    if (backTo) navigate(backTo)
    else if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }
  return (
    <header
      className={cn(
        'border-line/60 pt-safe sticky top-0 z-30 flex min-h-16 items-center gap-2 border-b bg-white/95 px-3 backdrop-blur',
        className,
      )}
    >
      {!hideBack && (
        <button
          type="button"
          onClick={goBack}
          aria-label="Volver"
          className="hover:bg-surface flex size-11 shrink-0 items-center justify-center rounded-full"
        >
          <ChevronLeft className="text-navy-900 size-6" />
        </button>
      )}
      <div className={cn('min-w-0 flex-1', hideBack && 'pl-2')}>
        {title && <h1 className="text-ink truncate text-lg font-extrabold">{title}</h1>}
        {subtitle && <p className="text-muted truncate text-sm">{subtitle}</p>}
      </div>
      {right && <div className="flex shrink-0 items-center gap-1">{right}</div>}
    </header>
  )
}
