import { Link } from 'react-router'
import { ChevronRight, MapPin } from 'lucide-react'
import type { Technician } from '@/types'
import { getZone } from '@/data/zones'
import { cn } from '@/lib/cn'
import { Avatar, RatingInline } from '@/components/ui'

/**
 * Tarjeta de técnico. Por defecto es un enlace a su perfil.
 * Con `onSelect` se vuelve seleccionable (paso "Elige tu técnico").
 */
export function TechnicianCard({
  technician,
  onSelect,
  selected,
  className,
}: {
  technician: Technician
  onSelect?: () => void
  selected?: boolean
  className?: string
}) {
  const content = (
    <>
      <Avatar
        name={technician.name}
        tone={technician.tone}
        size={56}
        verified={technician.verification.identity}
      />
      <span className="min-w-0 flex-1 text-left">
        <span className="text-ink block truncate font-extrabold">{technician.name}</span>
        <span className="text-muted block truncate text-sm">{technician.title}</span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5">
          <RatingInline rating={technician.rating} count={technician.reviewsCount} />
          <span className="text-muted inline-flex items-center gap-0.5 text-sm">
            <MapPin className="size-3.5" aria-hidden />
            {getZone(technician.zone).name} · {technician.distanceKm.toFixed(1)} km
          </span>
        </span>
      </span>
      {!onSelect && <ChevronRight className="text-muted size-5 shrink-0" aria-hidden />}
    </>
  )
  const classes = cn(
    'flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-3 shadow-card transition active:scale-[0.99]',
    selected ? 'border-navy-700' : 'border-transparent ring-1 ring-line/70',
    className,
  )
  return onSelect ? (
    <button type="button" onClick={onSelect} aria-pressed={selected} className={classes}>
      {content}
    </button>
  ) : (
    <Link to={`/tecnicos/${technician.id}`} className={classes}>
      {content}
    </Link>
  )
}
