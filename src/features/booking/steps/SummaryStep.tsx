import type { ReactNode } from 'react'
import { Award, CalendarClock, MapPin, Pencil, Sparkles } from 'lucide-react'
import { Avatar, Card, OptionTile, RatingInline } from '@/components/ui'
import { PaymentIcon } from '@/components/common'
import { CategoryIcon } from '@/components/brand/CategoryIcon'
import { getCategory, getTechnician } from '@/data/catalog'
import { getZone } from '@/data/zones'
import { describeAnswers } from '@/lib/answers'
import { cn } from '@/lib/cn'
import { formatCOP, formatDate, formatTime } from '@/lib/format'
import { PAYMENT_METHODS } from '@/lib/payments'
import { calculatePrice } from '@/lib/pricing'
import { toneClasses } from '@/lib/tones'
import { validatePayment, type StepProps } from '../draft'
import { StepIntro } from './StepIntro'

/** Paso 5 · Resumen, precio claro y pago — Tarea A4 */
export function SummaryStep({
  service,
  draft,
  update,
  showErrors,
  goTo,
}: StepProps & { goTo: (step: number) => void }) {
  const category = getCategory(service.categoryId)
  const tech = draft.technicianId ? getTechnician(draft.technicianId) : undefined
  const price = calculatePrice(service, draft.answers)
  const answers = describeAnswers(service, draft.answers, draft.photos.length)
  const isQuote = service.priceType === 'cotizacion'
  const qty = Number(draft.answers.cantidad)
  const paymentError = showErrors ? validatePayment(draft) : null

  return (
    <div className="space-y-4">
      <StepIntro
        title="Revisa y confirma"
        text="Así quedará tu reserva. Puedes editar cualquier dato."
      />

      {/* Servicio */}
      <Section title="Servicio" onEdit={() => goTo(1)}>
        <div className="flex items-center gap-3">
          {category && (
            <span
              className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-xl',
                toneClasses[category.tone].tile,
              )}
            >
              <CategoryIcon id={category.id} size={30} />
            </span>
          )}
          <p className="text-ink font-extrabold">{service.name}</p>
        </div>
        {answers.length > 0 && (
          <dl className="mt-3 space-y-1.5 text-sm">
            {answers.map((a) => (
              <div key={a.label} className="flex justify-between gap-4">
                <dt className="text-muted">{a.label}</dt>
                <dd className="text-ink text-right font-semibold">{a.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {draft.notes.trim() && (
          <p className="bg-surface text-ink mt-3 rounded-xl p-3 text-sm">“{draft.notes.trim()}”</p>
        )}
      </Section>

      {/* Fecha y hora */}
      <Section title="Fecha y hora exacta" onEdit={() => goTo(3)}>
        {draft.scheduledAt && (
          <Row icon={<CalendarClock className="size-5" />}>
            <span className="text-ink block font-bold">{formatDate(draft.scheduledAt)}</span>
            <span className="text-muted block text-sm">
              Llegada a las {formatTime(draft.scheduledAt)} en punto
            </span>
          </Row>
        )}
      </Section>

      {/* Dirección */}
      <Section title="Dirección" onEdit={() => goTo(2)}>
        <Row icon={<MapPin className="size-5" />}>
          <span className="text-ink block font-bold">{draft.line}</span>
          <span className="text-muted block text-sm">
            {draft.zone ? getZone(draft.zone).name : ''}
            {draft.details.trim() ? ` · ${draft.details.trim()}` : ''}
          </span>
        </Row>
      </Section>

      {/* Técnico */}
      <Section title="Técnico" onEdit={() => goTo(4)}>
        {tech ? (
          <div className="flex items-center gap-3">
            <Avatar
              name={tech.name}
              tone={tech.tone}
              size={44}
              verified={tech.verification.identity}
            />
            <span>
              <span className="text-ink block font-bold">{tech.name}</span>
              <RatingInline rating={tech.rating} count={tech.reviewsCount} />
            </span>
          </div>
        ) : (
          <Row icon={<Sparkles className="size-5" />}>
            <span className="text-ink block font-bold">El mejor disponible</span>
            <span className="text-muted block text-sm">
              Te confirmamos quién va apenas envíes la reserva.
            </span>
          </Row>
        )}
      </Section>

      {/* Precio claro */}
      <Card className="rounded-3xl p-5">
        <h3 className="text-ink mb-3 font-extrabold">Precio claro</h3>
        <dl className="space-y-2 text-[15px]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">
              {service.name}
              {Number.isFinite(qty) && qty > 1 ? ` × ${qty}` : ''}
            </dt>
            <dd className="text-ink font-semibold">{formatCOP(price.service)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Tarifa de visita</dt>
            <dd className="text-success font-semibold">
              {price.visitFee === 0 ? 'Gratis' : formatCOP(price.visitFee)}
            </dd>
          </div>
          <div className="border-line flex justify-between gap-4 border-t pt-2.5">
            <dt className="text-ink font-extrabold">{isQuote ? 'Total estimado' : 'Total'}</dt>
            <dd className="text-coral-500 text-xl font-extrabold">{formatCOP(price.total)}</dd>
          </div>
        </dl>
        <p className="text-muted mt-3 text-sm">
          {isQuote
            ? 'El precio final llega con la cotización del técnico. No pagas nada hasta aceptarla.'
            : 'Pagas cuando el servicio termine y estés satisfecho.'}
        </p>
      </Card>

      {/* Pago */}
      <fieldset>
        <legend className="text-ink mb-2 text-[15px] font-bold">¿Cómo vas a pagar?</legend>
        <div className="grid grid-cols-2 gap-2.5">
          {PAYMENT_METHODS.map((m) => {
            return (
              <OptionTile
                key={m.id}
                label={m.label}
                description={m.hint}
                selected={draft.paymentMethod === m.id}
                onClick={() => update({ paymentMethod: m.id })}
                icon={<PaymentIcon method={m.id} className="text-navy-700 size-6" />}
                className="min-h-24"
              />
            )
          })}
        </div>
        {paymentError && <p className="text-danger mt-1.5 text-sm">{paymentError}</p>}
      </fieldset>

      <div className="bg-success-bg flex gap-3 rounded-2xl p-4">
        <Award className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
        <p className="text-ink text-sm">
          <span className="font-bold">Garantía Renova de 30 días incluida.</span> Si algo falla,
          volvemos sin costo.
        </p>
      </div>
    </div>
  )
}

function Section({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: ReactNode
}) {
  return (
    <Card className="rounded-3xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-muted text-sm font-bold tracking-wide uppercase">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-coral-600 hover:bg-coral-50 -mr-2 inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-bold"
        >
          <Pencil className="size-3.5" aria-hidden />
          Editar
        </button>
      </div>
      {children}
    </Card>
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
