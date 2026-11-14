import { Link } from 'react-router'
import { ChevronRight, Clock } from 'lucide-react'
import type { Service } from '@/types'
import { getCategory } from '@/data/catalog'
import { cn } from '@/lib/cn'
import { formatCOP, formatDuration } from '@/lib/format'
import { toneClasses } from '@/lib/tones'
import { CategoryIcon } from '@/components/brand/CategoryIcon'

/**
 * Tarjeta compacta de servicio para cuadrículas de 2 columnas
 * ("Servicios populares"): ícono + nombre + "Desde $X".
 * `showCategory` muestra el nombre de la categoría en vez del servicio.
 */
export function ServiceCard({
  service,
  showCategory,
}: {
  service: Service
  showCategory?: boolean
}) {
  const category = getCategory(service.categoryId)
  if (!category) return null
  return (
    <Link
      to={`/servicio/${service.id}`}
      className="border-line/70 shadow-card flex flex-col gap-2.5 rounded-2xl border bg-white p-3 transition active:scale-[0.98]"
    >
      <span className="flex items-start justify-between">
        <span
          className={cn(
            'flex size-13 items-center justify-center rounded-xl',
            toneClasses[category.tone].tile,
          )}
        >
          <CategoryIcon id={category.id} size={32} />
        </span>
        <ChevronRight className="text-muted size-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="text-ink block truncate text-[15px] font-bold">
          {showCategory ? category.name : service.name}
        </span>
        <span className="text-muted block text-xs">Desde</span>
        <span className="text-coral-500 block text-lg leading-tight font-extrabold">
          {formatCOP(service.price)}
        </span>
      </span>
    </Link>
  )
}

/** Fila de servicio para listados (categoría, búsqueda). */
export function ServiceRow({ service }: { service: Service }) {
  const category = getCategory(service.categoryId)
  if (!category) return null
  return (
    <Link
      to={`/servicio/${service.id}`}
      className="border-line/70 shadow-card flex items-center gap-4 rounded-2xl border bg-white p-4 transition active:scale-[0.99]"
    >
      <span
        className={cn(
          'flex size-14 shrink-0 items-center justify-center rounded-xl',
          toneClasses[category.tone].tile,
        )}
      >
        <CategoryIcon id={category.id} size={34} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-ink block font-bold">{service.name}</span>
        <span className="text-muted mt-0.5 flex items-center gap-1 text-sm">
          <Clock className="size-3.5" aria-hidden />
          {formatDuration(service.durationMin)} aprox.
        </span>
        <span className="text-coral-500 mt-1 block text-[15px] font-extrabold">
          {service.priceType === 'cotizacion' ? 'Desde ' : ''}
          {formatCOP(service.price)}
          {service.priceUnit && service.priceUnit !== 'desde' && (
            <span className="text-muted text-xs font-semibold"> · {service.priceUnit}</span>
          )}
        </span>
      </span>
      <ChevronRight className="text-muted size-5 shrink-0" aria-hidden />
    </Link>
  )
}
