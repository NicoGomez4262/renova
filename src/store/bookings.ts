/**
 * ─────────────────────────────────────────────────────────────
 *  Reservas (backend simulado, guardado en el navegador)
 *
 *  Rol A crea reservas con `createBooking` (flujo de reserva).
 *  Rol B las muestra y las hace avanzar (detalle, calificar, garantía).
 *  Ver docs/04-arquitectura.md → "Ciclo de vida de una reserva"
 * ─────────────────────────────────────────────────────────────
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Booking, BookingDraft, BookingStatus, Rating, WarrantyClaim } from '@/types'
import { getService, getTechnician, getTechniciansForService } from '@/data/catalog'
import { calculatePrice } from '@/lib/pricing'
import { humanCode, pin, uid } from '@/lib/id'
import { firstName, formatCOP, formatDateTime } from '@/lib/format'
import { useMessages } from './messages'
import { useNotifications } from './notifications'
import { seedBookings } from './seed'

export const WARRANTY_DAYS = 30

/** Siguiente estado en la demo ("Simular avance") */
const NEXT_STATUS: Partial<Record<BookingStatus, BookingStatus>> = {
  cotizacion_pendiente: 'cotizada',
  cotizada: 'confirmada',
  confirmada: 'en_camino',
  en_camino: 'en_progreso',
  en_progreso: 'finalizada',
}

/** Estados en los que el cliente todavía puede cancelar o reprogramar */
export const CANCELLABLE: BookingStatus[] = [
  'cotizacion_pendiente',
  'cotizada',
  'confirmada',
  'en_camino',
]

interface BookingsState {
  bookings: Booking[]
  /** Crea la reserva a partir del borrador del flujo. Devuelve la reserva creada. */
  createBooking: (draft: BookingDraft) => Booking
  /** DEMO: avanza la reserva al siguiente estado (simula al técnico) */
  advanceStatus: (id: string) => void
  /** El cliente acepta la cotización → confirmada */
  acceptQuote: (id: string) => void
  cancelBooking: (id: string) => void
  rescheduleBooking: (id: string, scheduledAt: string) => void
  rateBooking: (id: string, rating: Omit<Rating, 'at'>) => void
  claimWarranty: (
    id: string,
    claim: Pick<WarrantyClaim, 'reason' | 'description' | 'photos'>,
  ) => WarrantyClaim | undefined
}

export const useBookings = create<BookingsState>()(
  persist(
    (set, get) => {
      /** Actualiza una reserva y registra el cambio de estado */
      const update = (id: string, patch: Partial<Booking>, status?: BookingStatus) =>
        set((s) => ({
          bookings: s.bookings.map((b) =>
            b.id === id
              ? {
                  ...b,
                  ...patch,
                  ...(status
                    ? {
                        status,
                        statusHistory: [
                          ...b.statusHistory,
                          { status, at: new Date().toISOString() },
                        ],
                      }
                    : {}),
                }
              : b,
          ),
        }))

      const notify = useNotifications.getState().push
      const say = (b: Booking, text: string, from: 'tecnico' | 'renova' = 'tecnico') =>
        useMessages.getState().addMessage(b.conversationId, from, text)

      return {
        bookings: seedBookings(),

        createBooking: (draft) => {
          const service = getService(draft.serviceId)
          if (!service) throw new Error(`Servicio no encontrado: ${draft.serviceId}`)

          const technicianId =
            draft.technicianId ?? getTechniciansForService(service.id)[0]?.id ?? 'carlos-gomez'
          const technician = getTechnician(technicianId)
          const id = uid('b_')
          const conversationId = useMessages.getState().ensureConversation(technicianId, id)
          const status: BookingStatus =
            service.priceType === 'cotizacion' ? 'cotizacion_pendiente' : 'confirmada'
          const now = new Date().toISOString()

          const booking: Booking = {
            ...draft,
            id,
            code: humanCode('RN'),
            categoryId: service.categoryId,
            technicianId,
            status,
            statusHistory: [{ status, at: now }],
            price: calculatePrice(service, draft.answers),
            securityPin: pin(),
            warrantyClaims: [],
            conversationId,
            createdAt: now,
          }
          set((s) => ({ bookings: [booking, ...s.bookings] }))

          const who = technician ? firstName(technician.name) : 'Tu técnico'
          if (status === 'cotizacion_pendiente') {
            say(
              booking,
              `Recibimos tu solicitud ${booking.code}. ${who} la está revisando y te enviará una cotización pronto.`,
              'renova',
            )
            notify({
              kind: 'reserva',
              title: 'Solicitud enviada',
              body: `${service.name}: te enviaremos una cotización antes de confirmar.`,
              link: `/reservas/${id}`,
            })
          } else {
            say(
              booking,
              `¡Reserva ${booking.code} confirmada! ${who} llegará el ${formatDateTime(booking.scheduledAt)}.`,
              'renova',
            )
            notify({
              kind: 'reserva',
              title: 'Reserva confirmada',
              body: `${service.name} · ${formatDateTime(booking.scheduledAt)}`,
              link: `/reservas/${id}`,
            })
          }
          return booking
        },

        advanceStatus: (id) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b) return
          const next = NEXT_STATUS[b.status]
          if (!next) return
          if (b.status === 'cotizada') return get().acceptQuote(id)

          const service = getService(b.serviceId)
          const tech = getTechnician(b.technicianId)
          const name = tech ? firstName(tech.name) : 'Tu técnico'

          switch (next) {
            case 'cotizada':
              update(id, { price: { ...b.price, isEstimate: true } }, next)
              say(
                b,
                `Hola, ya revisé tu solicitud. La cotización es de ${formatCOP(b.price.total)} con materiales de primera. ¿Te parece bien?`,
              )
              notify({
                kind: 'reserva',
                title: 'Tienes una cotización',
                body: `${name} cotizó ${service?.name ?? 'tu servicio'} en ${formatCOP(b.price.total)}.`,
                link: `/reservas/${id}`,
              })
              break
            case 'en_camino':
              update(id, {}, next)
              say(
                b,
                `Voy en camino 🚗. Llego a la hora acordada. Recuerda: tu PIN de seguridad es el que ves en la reserva.`,
              )
              notify({
                kind: 'reserva',
                title: `${name} va en camino`,
                body: 'Llegará a la hora exacta acordada.',
                link: `/reservas/${id}`,
              })
              break
            case 'en_progreso':
              update(id, {}, next)
              notify({
                kind: 'reserva',
                title: 'Servicio en progreso',
                body: `${name} comenzó a trabajar.`,
                link: `/reservas/${id}`,
              })
              break
            case 'finalizada': {
              const until = new Date()
              until.setDate(until.getDate() + WARRANTY_DAYS)
              update(id, { warrantyUntil: until.toISOString() }, next)
              say(b, '¡Listo! Terminé el trabajo. Gracias por confiar en Renova 🙌')
              notify({
                kind: 'reserva',
                title: '¿Cómo te fue?',
                body: `Califica a ${name}. Tu garantía de ${WARRANTY_DAYS} días ya está activa.`,
                link: `/reservas/${id}/calificar`,
              })
              break
            }
          }
        },

        acceptQuote: (id) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b || b.status !== 'cotizada') return
          update(id, { price: { ...b.price, isEstimate: false } }, 'confirmada')
          say(
            b,
            `Aceptaste la cotización. Reserva ${b.code} confirmada para el ${formatDateTime(b.scheduledAt)}.`,
            'renova',
          )
          notify({
            kind: 'reserva',
            title: 'Reserva confirmada',
            body: formatDateTime(b.scheduledAt),
            link: `/reservas/${id}`,
          })
        },

        cancelBooking: (id) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b || !CANCELLABLE.includes(b.status)) return
          update(id, {}, 'cancelada')
          say(b, `La reserva ${b.code} fue cancelada.`, 'renova')
        },

        rescheduleBooking: (id, scheduledAt) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b || !CANCELLABLE.includes(b.status)) return
          update(id, { scheduledAt })
          say(b, `Reprogramaste la reserva para el ${formatDateTime(scheduledAt)}.`, 'renova')
        },

        rateBooking: (id, rating) =>
          update(id, { rating: { ...rating, at: new Date().toISOString() } }),

        claimWarranty: (id, claim) => {
          const b = get().bookings.find((x) => x.id === id)
          if (!b) return undefined
          const created: WarrantyClaim = {
            ...claim,
            id: uid('w_'),
            createdAt: new Date().toISOString(),
            status: 'recibida',
          }
          update(id, { warrantyClaims: [...b.warrantyClaims, created] })
          say(
            b,
            'Recibimos tu solicitud de garantía. Te contactaremos en menos de 24 horas para agendar la revisión sin costo.',
            'renova',
          )
          notify({
            kind: 'garantia',
            title: 'Garantía recibida',
            body: `Reserva ${b.code}: revisaremos tu caso en menos de 24 h.`,
            link: `/reservas/${id}`,
          })
          return created
        },
      }
    },
    { name: 'renova-bookings', version: 1 },
  ),
)

/** Una reserva por id (o undefined) */
export const useBooking = (id: string | undefined) =>
  useBookings((s) => s.bookings.find((b) => b.id === id))

/** Estados "activos" (para la pestaña Próximas) */
export const ACTIVE_STATUSES: BookingStatus[] = [
  'cotizacion_pendiente',
  'cotizada',
  'confirmada',
  'en_camino',
  'en_progreso',
]

/** Etiquetas y tono visual de cada estado (úsalas en badges y timelines) */
export const STATUS_META: Record<
  BookingStatus,
  { label: string; tone: 'info' | 'warning' | 'success' | 'neutral' | 'danger' | 'coral' }
> = {
  cotizacion_pendiente: { label: 'Esperando cotización', tone: 'warning' },
  cotizada: { label: 'Cotización lista', tone: 'coral' },
  confirmada: { label: 'Confirmada', tone: 'info' },
  en_camino: { label: 'Técnico en camino', tone: 'coral' },
  en_progreso: { label: 'En progreso', tone: 'info' },
  finalizada: { label: 'Finalizada', tone: 'success' },
  cancelada: { label: 'Cancelada', tone: 'danger' },
}
