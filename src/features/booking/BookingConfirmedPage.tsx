import { useParams } from 'react-router'
import {
  Award,
  CalendarClock,
  CircleCheck,
  FileText,
  MapPin,
  MessageCircle,
  SearchX,
  ShieldCheck,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { PageHeader } from '@/components/layout'
import { ButtonLink, Card, EmptyState } from '@/components/ui'
import { TechnicianCard } from '@/components/common'
import { getService, getTechnician } from '@/data/catalog'
import { getZone } from '@/data/zones'
import { useBooking } from '@/store'
import { firstName, formatCOP, formatDate, formatTime } from '@/lib/format'
import { paymentLabel } from '@/lib/payments'

/** Reserva confirmada — Tarea A4 (Rol A). */
export default function BookingConfirmedPage() {
  const { bookingId } = useParams()
  const booking = useBooking(bookingId)
  const service = booking ? getService(booking.serviceId) : undefined
  const tech = booking ? getTechnician(booking.technicianId) : undefined

  if (!booking || !service) {
    return (
      <>
        <PageHeader title="Reserva" backTo="/" />
        <EmptyState
          icon={<SearchX className="size-7" />}
          title="No encontramos esta reserva"
          description="Puedes ver todas tus reservas en la pestaña Reservas."
          action={<ButtonLink to="/reservas">Ver mis reservas</ButtonLink>}
        />
      </>
    )
  }

  const isQuote = booking.status === 'cotizacion_pendiente' || booking.status === 'cotizada'
  const name = tech ? firstName(tech.name) : 'Tu técnico'

  return (
    <div className="animate-fade-in px-5 pt-[max(2rem,env(safe-area-inset-top))] pb-10">
      {/* Éxito */}
      <div className="flex flex-col items-center text-center">
        <span className="animate-slide-up bg-success-bg flex size-20 items-center justify-center rounded-full">
          {isQuote ? (
            <FileText className="text-success size-10" aria-hidden />
          ) : (
            <CircleCheck className="text-success size-11" aria-hidden />
          )}
        </span>
        <h1 className="font-display-tight text-navy-900 mt-4 text-[2.2rem]">
          {isQuote ? (
            <>
              ¡Solicitud <span className="text-coral-500">enviada!</span>
            </>
          ) : (
            <>
              ¡Reserva <span className="text-coral-500">confirmada!</span>
            </>
          )}
        </h1>
        <p className="text-muted mt-2 max-w-sm text-[15px]">
          {isQuote
            ? `${name} revisará tu solicitud y te enviará una cotización. Te avisamos por notificación y por chat.`
            : `${name} llegará el ${formatDate(booking.scheduledAt).toLowerCase()} a las ${formatTime(booking.scheduledAt)} en punto.`}
        </p>
        <span className="bg-surface text-ink mt-3 rounded-full px-3 py-1 text-sm font-bold">
          Código {booking.code}
        </span>
      </div>

      {/* PIN de seguridad */}
      <div className="bg-navy-900 mt-6 rounded-3xl p-5 text-white">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5" aria-hidden />
          <p className="font-extrabold">Tu PIN de seguridad</p>
        </div>
        <p
          className="mt-3 text-center text-4xl font-extrabold tracking-[0.4em]"
          aria-label={`PIN ${booking.securityPin.split('').join(' ')}`}
        >
          {booking.securityPin}
        </p>
        <p className="text-navy-100 mt-3 text-sm">
          Pídele este PIN a {name} cuando llegue. Si no lo sabe, no abras la puerta y escríbenos.
        </p>
      </div>

      {/* Resumen */}
      <Card className="mt-4 space-y-4 rounded-3xl p-5">
        <p className="text-ink font-extrabold">{service.name}</p>
        <Row icon={<CalendarClock className="size-5" />}>
          <span className="text-ink block font-bold">{formatDate(booking.scheduledAt)}</span>
          <span className="text-muted block text-sm">
            Hora exacta: {formatTime(booking.scheduledAt)}
          </span>
        </Row>
        <Row icon={<MapPin className="size-5" />}>
          <span className="text-ink block font-bold">{booking.address.line}</span>
          <span className="text-muted block text-sm">
            {getZone(booking.address.zone).name}
            {booking.address.details ? ` · ${booking.address.details}` : ''}
          </span>
        </Row>
        <div className="border-line flex justify-between gap-4 border-t pt-3 text-[15px]">
          <span className="text-muted">
            {booking.price.isEstimate ? 'Total estimado' : 'Total'} ·{' '}
            {paymentLabel(booking.paymentMethod)}
          </span>
          <span className="text-coral-500 font-extrabold">{formatCOP(booking.price.total)}</span>
        </div>
      </Card>

      {tech && (
        <div className="mt-4">
          <p className="text-muted mb-2 text-sm font-bold tracking-wide uppercase">Tu técnico</p>
          <TechnicianCard technician={tech} />
        </div>
      )}

      <div className="bg-success-bg mt-4 flex gap-3 rounded-2xl p-4">
        <Award className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
        <p className="text-ink text-sm">
          <span className="font-bold">Garantía de 30 días incluida.</span> La activamos cuando el
          servicio termine.
        </p>
      </div>

      {/* Acciones */}
      <div className="mt-6 space-y-3">
        <ButtonLink to={`/reservas/${booking.id}`} size="lg" fullWidth>
          Ver mi reserva
        </ButtonLink>
        <ButtonLink
          to={`/mensajes/${booking.conversationId}`}
          variant="outline"
          size="lg"
          fullWidth
          iconLeft={<MessageCircle className="size-5" aria-hidden />}
        >
          Escribir a {name}
        </ButtonLink>
        <ButtonLink to="/" variant="ghost" fullWidth>
          Volver al inicio
        </ButtonLink>
      </div>
    </div>
  )
}

function Row({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-navy-50 text-navy-700 flex size-11 shrink-0 items-center justify-center rounded-full">
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  )
}
