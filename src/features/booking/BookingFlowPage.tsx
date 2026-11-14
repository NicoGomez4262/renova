import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { ChevronRight, SearchX } from 'lucide-react'
import { PageHeader, StickyFooter } from '@/components/layout'
import { Button, ButtonLink, EmptyState, StepProgress } from '@/components/ui'
import { getService, getTechniciansForService } from '@/data/catalog'
import { toast, useBookings, useSession, useToast } from '@/store'
import { formatCOP, formatShortDate, formatTime } from '@/lib/format'
import { calculatePrice } from '@/lib/pricing'
import { availableAt } from './availability'
import {
  STEPS,
  firstIncompleteStep,
  useFlowDraft,
  validateAddress,
  validateDetails,
  validatePayment,
  validateSchedule,
} from './draft'
import { DetailsStep } from './steps/DetailsStep'
import { AddressStep } from './steps/AddressStep'
import { ScheduleStep } from './steps/ScheduleStep'
import { TechnicianStep } from './steps/TechnicianStep'
import { SummaryStep } from './steps/SummaryStep'

/**
 * Flujo de reserva en 5 pasos — Tareas A3 + A4 (Rol A).
 *
 * - El paso actual vive en la URL (?paso=N): el botón atrás del celular
 *   vuelve al paso anterior.
 * - ?tecnico=:id preselecciona un técnico (viene de su perfil).
 * - Si alguien entra directo a un paso sin completar los anteriores,
 *   se le lleva al primer paso pendiente.
 */
export default function BookingFlowPage() {
  const { serviceId = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const lastAddress = useSession((s) => s.lastAddress)
  const setLastAddress = useSession((s) => s.setLastAddress)
  const createBooking = useBookings((s) => s.createBooking)

  const service = getService(serviceId)
  const technicians = useMemo(
    () => (service ? getTechniciansForService(service.id) : []),
    [service],
  )
  const preselected = params.get('tecnico')
  const preselectedValid =
    preselected && technicians.some((t) => t.id === preselected) ? preselected : null

  const { draft, update, clear } = useFlowDraft(serviceId, () => ({
    answers: {},
    notes: '',
    photos: [],
    zone: lastAddress?.zone ?? null,
    line: lastAddress?.line ?? '',
    details: lastAddress?.details ?? '',
    scheduledAt: null,
    technicianId: preselectedValid,
    paymentMethod: null,
  }))
  const [showErrors, setShowErrors] = useState(false)

  // Horas disponibles: las del técnico elegido o las de cualquiera que preste el servicio
  const techIds = useMemo(
    () => (draft.technicianId ? [draft.technicianId] : technicians.map((t) => t.id)),
    [draft.technicianId, technicians],
  )

  const requested = Math.min(5, Math.max(1, Number(params.get('paso')) || 1))
  const maxStep = service ? Math.min(5, firstIncompleteStep(service, draft, techIds)) : 1
  const step = Math.min(requested, maxStep)
  const fromSummary = params.get('desde') === 'resumen'

  // Corrige la URL si se pidió un paso al que aún no se puede llegar
  useEffect(() => {
    if (step === requested) return
    const next = new URLSearchParams(params)
    next.set('paso', String(step))
    setParams(next, { replace: true })
  }, [step, requested, params, setParams])

  if (!service) {
    return (
      <>
        <PageHeader title="Reservar" backTo="/servicios" />
        <EmptyState
          icon={<SearchX className="size-7" />}
          title="No encontramos este servicio"
          description="Elige un servicio para empezar tu reserva."
          action={<ButtonLink to="/servicios">Ver servicios</ButtonLink>}
        />
      </>
    )
  }

  const isQuote = service.priceType === 'cotizacion'

  const goTo = (n: number, opts: { fromSummary?: boolean } = {}) => {
    setShowErrors(false)
    const next = new URLSearchParams(params)
    next.set('paso', String(n))
    if (opts.fromSummary) next.set('desde', 'resumen')
    else next.delete('desde')
    setParams(next)
  }

  const selectTechnician = (id: string | null) => {
    update({ technicianId: id })
    if (params.has('tecnico')) {
      const next = new URLSearchParams(params)
      next.delete('tecnico')
      setParams(next, { replace: true })
    }
  }

  const isStepInvalid = () => {
    if (step === 1) return Object.keys(validateDetails(service, draft)).length > 0
    if (step === 2) return Object.keys(validateAddress(draft)).length > 0
    if (step === 3) return !!validateSchedule(draft, techIds)
    if (step === 5) return !!validatePayment(draft)
    return false
  }

  const submit = () => {
    const technicianId =
      draft.technicianId ?? availableAt(technicians, draft.scheduledAt)[0]?.id ?? null
    const booking = createBooking({
      serviceId: service.id,
      answers: draft.answers,
      notes: draft.notes.trim() || undefined,
      photos: draft.photos,
      address: {
        zone: draft.zone!,
        line: draft.line.trim(),
        details: draft.details.trim() || undefined,
      },
      scheduledAt: draft.scheduledAt!,
      technicianId,
      paymentMethod: draft.paymentMethod!,
    })
    clear()
    useToast.setState({ toasts: [] })
    navigate(`/reserva-confirmada/${booking.id}`, { replace: true })
  }

  const onContinue = () => {
    if (isStepInvalid()) {
      setShowErrors(true)
      toast('Revisa los datos marcados', 'error')
      requestAnimationFrame(() =>
        document
          .querySelector('.text-danger')
          ?.scrollIntoView({ block: 'center', behavior: 'smooth' }),
      )
      return
    }
    if (step === 2 && draft.zone) {
      setLastAddress({
        zone: draft.zone,
        line: draft.line.trim(),
        details: draft.details.trim() || undefined,
      })
    }
    if (step < 5) goTo(fromSummary ? 5 : step + 1)
    else submit()
  }

  const stepProps = { service, draft, update, showErrors }
  const total = calculatePrice(service, draft.answers).total

  return (
    <>
      <PageHeader title={service.name} />

      <div className="px-5 pt-4">
        <StepProgress current={step} total={STEPS.length} label={STEPS[step - 1]} />
      </div>

      <div key={step} className="animate-fade-in px-5 pt-5 pb-2">
        {step === 1 && <DetailsStep {...stepProps} />}
        {step === 2 && <AddressStep {...stepProps} />}
        {step === 3 && <ScheduleStep {...stepProps} techIds={techIds} />}
        {step === 4 && (
          <TechnicianStep {...stepProps} technicians={technicians} onSelect={selectTechnician} />
        )}
        {step === 5 && <SummaryStep {...stepProps} goTo={(n) => goTo(n, { fromSummary: true })} />}
      </div>

      <StickyFooter>
        {step === 5 ? (
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <p className="text-muted text-xs">{isQuote ? 'Total estimado' : 'Total'}</p>
              <p className="text-ink text-lg leading-tight font-extrabold">{formatCOP(total)}</p>
            </div>
            <Button size="lg" className="flex-1 px-4" onClick={onContinue}>
              {isQuote ? 'Enviar solicitud' : 'Confirmar reserva'}
            </Button>
          </div>
        ) : (
          <>
            {step === 3 && draft.scheduledAt && (
              <p className="text-muted mb-2 text-center text-sm">
                Llegada:{' '}
                <span className="text-ink font-bold">{formatShortDate(draft.scheduledAt)}</span> ·{' '}
                <span className="text-ink font-bold">{formatTime(draft.scheduledAt)}</span>
              </p>
            )}
            <Button
              size="lg"
              fullWidth
              onClick={onContinue}
              iconRight={<ChevronRight className="size-5" aria-hidden />}
            >
              {fromSummary ? 'Guardar y volver al resumen' : 'Continuar'}
            </Button>
          </>
        )}
      </StickyFooter>
    </>
  )
}
