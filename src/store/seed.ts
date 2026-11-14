/**
 * Datos iniciales de la demo: lo que ve una persona la primera vez que
 * abre la app (y después de "Reiniciar demo" en Perfil).
 * Ids fijos para que reservas, conversaciones y notificaciones cuadren.
 */
import type { AppNotification, Booking, Conversation } from '@/types'

const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

function at(offsetMs: number, hour?: number): string {
  const d = new Date(Date.now() + offsetMs)
  if (hour !== undefined) d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

export function seedBookings(): Booking[] {
  const upcomingAt = at(DAY, 9) // mañana 9:00 a. m.
  const pastAt = at(-6 * DAY, 8) // hace 6 días, 8:00 a. m.
  const finishedAt = at(-6 * DAY + 5 * HOUR)
  const warrantyUntil = new Date(new Date(finishedAt).getTime() + 30 * DAY).toISOString()

  return [
    {
      id: 'b_seed1',
      code: 'RN-2481',
      serviceId: 'reparar-fuga',
      categoryId: 'plomeria',
      technicianId: 'pedro-ruiz',
      answers: { ubicacion: 'cocina', urgencia: 'semana' },
      notes: 'La fuga está debajo del lavaplatos. Portería avisada.',
      photos: [],
      address: { zone: 'chapinero', line: 'Cra 7 # 72-41', details: 'Apto 502, torre 2' },
      scheduledAt: upcomingAt,
      paymentMethod: 'nequi',
      status: 'confirmada',
      statusHistory: [{ status: 'confirmada', at: at(-2 * HOUR) }],
      price: { service: 150000, visitFee: 0, total: 150000, isEstimate: false },
      securityPin: '4827',
      warrantyClaims: [],
      conversationId: 'c_seed1',
      createdAt: at(-2 * HOUR),
    },
    {
      id: 'b_seed2',
      code: 'RN-1937',
      serviceId: 'limpieza-profunda',
      categoryId: 'limpieza',
      technicianId: 'luz-rojas',
      answers: { tamano: 'pequeno', mascotas: 'si' },
      photos: [],
      address: { zone: 'chapinero', line: 'Cra 7 # 72-41', details: 'Apto 502, torre 2' },
      scheduledAt: pastAt,
      paymentMethod: 'tarjeta',
      status: 'finalizada',
      statusHistory: [
        { status: 'confirmada', at: at(-8 * DAY) },
        { status: 'en_camino', at: at(-6 * DAY - HOUR / 2) },
        { status: 'en_progreso', at: pastAt },
        { status: 'finalizada', at: finishedAt },
      ],
      price: { service: 100000, visitFee: 0, total: 100000, isEstimate: false },
      securityPin: '1590',
      warrantyUntil,
      warrantyClaims: [],
      conversationId: 'c_seed2',
      createdAt: at(-8 * DAY),
    },
  ]
}

export function seedConversations(): Conversation[] {
  return [
    {
      id: 'c_seed1',
      technicianId: 'pedro-ruiz',
      bookingId: 'b_seed1',
      unread: 1,
      messages: [
        {
          id: 'm_s1',
          from: 'renova',
          text: '¡Reserva RN-2481 confirmada! Pedro llegará mañana a las 9:00 a. m.',
          at: at(-2 * HOUR),
        },
        {
          id: 'm_s2',
          from: 'tecnico',
          text: 'Hola, soy Pedro. Mañana llego a las 9:00 en punto. ¿La fuga es debajo del lavaplatos?',
          at: at(-HOUR),
        },
      ],
    },
    {
      id: 'c_seed2',
      technicianId: 'luz-rojas',
      bookingId: 'b_seed2',
      unread: 0,
      messages: [
        {
          id: 'm_s3',
          from: 'tecnico',
          text: '¡Listo! Terminé la limpieza. Gracias por confiar en Renova 🙌',
          at: at(-6 * DAY + 5 * HOUR),
        },
        {
          id: 'm_s4',
          from: 'cliente',
          text: '¡Quedó increíble, gracias Luz Marina!',
          at: at(-6 * DAY + 6 * HOUR),
        },
      ],
    },
  ]
}

export function seedNotifications(): AppNotification[] {
  return [
    {
      id: 'n_s1',
      kind: 'mensaje',
      title: 'Nuevo mensaje de Pedro',
      body: 'Mañana llego a las 9:00 en punto…',
      at: at(-HOUR),
      read: false,
      link: '/mensajes/c_seed1',
    },
    {
      id: 'n_s2',
      kind: 'reserva',
      title: '¿Cómo te fue con Luz Marina?',
      body: 'Califica tu limpieza profunda. Tu garantía de 30 días está activa.',
      at: at(-5 * DAY),
      read: false,
      link: '/reservas/b_seed2/calificar',
    },
    {
      id: 'n_s3',
      kind: 'promo',
      title: 'Bienvenido a Renova',
      body: 'Técnicos verificados, precio claro, hora exacta y garantía de 30 días.',
      at: at(-8 * DAY),
      read: true,
      link: '/ayuda',
    },
  ]
}
