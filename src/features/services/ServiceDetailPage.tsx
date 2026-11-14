import { useParams } from 'react-router'
import {
  CalendarClock,
  ChevronRight,
  CircleCheck,
  Clock,
  FileText,
  MessageSquareText,
  SearchX,
  UserCheck,
} from 'lucide-react'
import { PageHeader, StickyFooter } from '@/components/layout'
import { Badge, ButtonLink, Card, EmptyState, SectionTitle } from '@/components/ui'
import { TechnicianCard, TrustBadges } from '@/components/common'
import { CategoryIcon } from '@/components/brand/CategoryIcon'
import { getCategory, getService, getTechniciansForService } from '@/data/catalog'
import { cn } from '@/lib/cn'
import { formatCOP, formatDuration } from '@/lib/format'
import { toneClasses } from '@/lib/tones'
import { CATEGORY_IMAGES } from './images'

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Cuéntanos qué necesitas',
    text: 'Responde unas preguntas y, si quieres, sube fotos.',
  },
  {
    icon: CalendarClock,
    title: 'Elige la hora exacta',
    text: 'Tú decides el día y la hora de llegada.',
  },
  {
    icon: UserCheck,
    title: 'Recibe a tu técnico',
    text: 'Verificado, con PIN de seguridad y garantía de 30 días.',
  },
]

/** Detalle del servicio — Tarea A1 (Rol A). */
export default function ServiceDetailPage() {
  const { serviceId = '' } = useParams()
  const service = getService(serviceId)
  const category = service ? getCategory(service.categoryId) : undefined

  if (!service || !category) {
    return (
      <>
        <PageHeader title="Servicio" backTo="/servicios" />
        <EmptyState
          icon={<SearchX className="size-7" />}
          title="No encontramos este servicio"
          description="Puede que ya no esté disponible. Mira los demás servicios de Renova."
          action={<ButtonLink to="/servicios">Ver servicios</ButtonLink>}
        />
      </>
    )
  }

  const isQuote = service.priceType === 'cotizacion'
  const technicians = getTechniciansForService(service.id)
  const image = CATEGORY_IMAGES[category.id]
  const unit = service.priceUnit && service.priceUnit !== 'desde' ? service.priceUnit : undefined

  return (
    <div className="animate-fade-in">
      <PageHeader title={category.name} subtitle={service.name} />

      {/* Imagen o ilustración */}
      <div className="px-5 pt-4">
        {image ? (
          <img
            src={image}
            alt={`Servicio de ${category.name.toLowerCase()} de Renova`}
            className="h-48 w-full rounded-3xl object-cover"
          />
        ) : (
          <div
            className={cn(
              'flex h-40 items-center justify-center rounded-3xl',
              toneClasses[category.tone].tile,
            )}
          >
            <CategoryIcon id={category.id} size={88} />
          </div>
        )}
      </div>

      {/* Título y descripción */}
      <section className="px-5 pt-5">
        <div className="mb-2 flex flex-wrap gap-2">
          <Badge tone={isQuote ? 'coral' : 'info'}>
            {isQuote ? 'Con cotización' : 'Precio fijo'}
          </Badge>
          <Badge icon={<Clock className="size-3.5" aria-hidden />}>
            {formatDuration(service.durationMin)} aprox.
          </Badge>
        </div>
        <h1 className="font-display-tight text-navy-900 text-[2rem]">{service.name}</h1>
        <p className="text-muted mt-2 text-[15px] leading-relaxed">{service.description}</p>
      </section>

      {/* Precio claro */}
      <section className="px-5 pt-5">
        <Card>
          <p className="text-muted text-sm font-bold">
            {isQuote ? 'Precio de referencia' : 'Precio'}
          </p>
          <p className="text-coral-500 mt-0.5 text-[1.75rem] leading-tight font-extrabold">
            {isQuote && <span className="text-lg">Desde </span>}
            {formatCOP(service.price)}
            {unit && <span className="text-muted text-base font-semibold"> {unit}</span>}
          </p>
          {isQuote ? (
            <div className="bg-tile-sky mt-3 flex gap-3 rounded-2xl p-3.5">
              <FileText className="text-accent-sky mt-0.5 size-5 shrink-0" aria-hidden />
              <p className="text-ink text-sm">
                <span className="font-bold">Recibirás una cotización antes de confirmar.</span> Un
                profesional revisará tu solicitud y te enviaremos una propuesta sin compromiso.
              </p>
            </div>
          ) : (
            <p className="text-muted mt-2 text-sm">
              Sin sorpresas: pagas cuando el servicio termine y estés satisfecho.
            </p>
          )}
        </Card>
      </section>

      {/* Qué incluye */}
      <section className="px-5 pt-7">
        <SectionTitle title="Qué incluye" />
        <ul className="space-y-2.5">
          {service.includes.map((item) => (
            <li key={item} className="text-ink flex gap-3 text-[15px]">
              <CircleCheck className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Cómo funciona */}
      <section className="px-5 pt-8">
        <SectionTitle title="Así de fácil" />
        <ol className="space-y-4">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="flex gap-3.5">
              <span className="bg-coral-50 text-coral-600 relative flex size-11 shrink-0 items-center justify-center rounded-full">
                <Icon className="size-5" aria-hidden />
                <span className="bg-navy-900 absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-[11px] font-extrabold text-white">
                  {i + 1}
                </span>
              </span>
              <span>
                <span className="text-ink block font-bold">{title}</span>
                <span className="text-muted block text-sm">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Confianza */}
      <section className="px-5 pt-8">
        <SectionTitle title="Con Renova tienes" />
        <TrustBadges />
      </section>

      {/* Técnicos */}
      {technicians.length > 0 && (
        <section className="px-5 pt-8">
          <SectionTitle title="Técnicos disponibles" />
          <div className="space-y-3">
            {technicians.slice(0, 3).map((t) => (
              <TechnicianCard key={t.id} technician={t} />
            ))}
          </div>
          {technicians.length > 3 && (
            <p className="text-muted mt-3 text-center text-sm">
              y {technicians.length - 3} más. Al reservar puedes elegir o dejar que asignemos al
              mejor disponible.
            </p>
          )}
        </section>
      )}

      {/* Acción principal */}
      <StickyFooter>
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="text-muted text-xs">{isQuote ? 'Desde' : 'Precio'}</p>
            <p className="text-ink text-lg leading-tight font-extrabold">
              {formatCOP(service.price)}
            </p>
            <p className="text-success text-xs font-semibold">Garantía 30 días</p>
          </div>
          <ButtonLink
            to={`/reservar/${service.id}`}
            size="lg"
            className="flex-1 px-4"
            iconRight={<ChevronRight className="size-5" aria-hidden />}
          >
            {isQuote ? 'Solicitar cotización' : 'Reservar'}
          </ButtonLink>
        </div>
      </StickyFooter>
    </div>
  )
}
