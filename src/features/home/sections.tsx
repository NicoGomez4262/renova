/**
 * Secciones extra de Inicio — Tarea A7 (Rol A).
 */
import { useMemo } from 'react'
import { Link } from 'react-router'
import { ChevronRight, FileText, ShieldCheck } from 'lucide-react'
import { Avatar, Badge, RatingInline, SectionTitle } from '@/components/ui'
import { CategoryIcon } from '@/components/brand/CategoryIcon'
import { getProducts, getService, getTechnician, getTopTechnicians } from '@/data/catalog'
import { ProductCard, discountPercent } from '@/features/shop/parts'
import { firstName, formatShortDate, formatTime } from '@/lib/format'
import { startOfDay } from '@/lib/slots'
import { ACTIVE_STATUSES, STATUS_META, useBookings } from '@/store'

/** "Hoy", "Mañana" o "Vie, 21 nov" */
function relativeDay(iso: string): string {
  const days = Math.round(
    (startOfDay(new Date(iso)).getTime() - startOfDay(new Date()).getTime()) / 86_400_000,
  )
  if (days === 0) return 'Hoy'
  if (days === 1) return 'Mañana'
  return formatShortDate(iso)
}

/** Tarjeta con la reserva activa más cercana (si hay) */
export function NextBookingCard() {
  const bookings = useBookings((s) => s.bookings)
  const next = useMemo(
    () =>
      bookings
        .filter((b) => ACTIVE_STATUSES.includes(b.status))
        .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))[0],
    [bookings],
  )
  if (!next) return null
  const service = getService(next.serviceId)
  const tech = getTechnician(next.technicianId)
  const meta = STATUS_META[next.status]
  if (!service) return null

  return (
    <section className="mt-6 px-5" aria-label="Tu próxima reserva">
      <Link
        to={`/reservas/${next.id}`}
        className="bg-navy-900 shadow-card block rounded-3xl p-4 text-white transition active:scale-[0.99]"
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-navy-100 text-sm font-bold">Tu próxima reserva</p>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white">
            <CategoryIcon id={service.categoryId} size={30} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-extrabold">{service.name}</p>
            <p className="text-navy-100 truncate text-sm">
              {relativeDay(next.scheduledAt)} · {formatTime(next.scheduledAt)}
              {tech ? ` · ${firstName(tech.name)}` : ''}
            </p>
          </div>
          <ChevronRight className="size-5 shrink-0" aria-hidden />
        </div>
        {next.status === 'cotizada' ? (
          <p className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm">
            <FileText className="size-4 shrink-0" aria-hidden />
            Tienes una cotización por revisar
          </p>
        ) : (
          <p className="text-navy-100 mt-3 flex items-center gap-2 text-sm">
            <ShieldCheck className="size-4 shrink-0" aria-hidden />
            PIN de seguridad:
            <span className="font-extrabold tracking-[0.25em] text-white">{next.securityPin}</span>
          </p>
        )}
      </Link>
    </section>
  )
}

/** Carrusel de técnicos mejor calificados */
export function TopTechnicians() {
  const technicians = getTopTechnicians(6)
  return (
    <section className="mt-8" aria-label="Técnicos mejor calificados">
      <div className="px-5">
        <SectionTitle title="Técnicos mejor calificados" />
      </div>
      <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 pb-2">
        {technicians.map((t) => (
          <Link
            key={t.id}
            to={`/tecnicos/${t.id}`}
            className="border-line/70 shadow-card w-40 shrink-0 snap-start rounded-2xl border bg-white p-3 text-center transition active:scale-[0.98]"
          >
            <span className="flex justify-center">
              <Avatar name={t.name} tone={t.tone} size={60} verified={t.verification.identity} />
            </span>
            <span className="text-ink mt-2 block truncate font-bold">{t.name}</span>
            <span className="text-muted block truncate text-xs">{t.title}</span>
            <span className="mt-1.5 flex justify-center">
              <RatingInline rating={t.rating} count={t.reviewsCount} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/** Carrusel de productos de la tienda (los de mayor descuento primero) */
export function FeaturedProducts() {
  const products = [...getProducts()]
    .sort((a, b) => discountPercent(b) - discountPercent(a))
    .slice(0, 6)
  return (
    <section className="mt-8" aria-label="Materiales para tu proyecto">
      <div className="px-5">
        <SectionTitle title="Materiales para tu proyecto" to="/tienda" linkLabel="Tienda" />
      </div>
      <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 pb-2">
        {products.map((p) => (
          <div key={p.id} className="w-[10.5rem] shrink-0 snap-start">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
