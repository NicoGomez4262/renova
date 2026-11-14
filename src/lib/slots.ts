/**
 * Horarios disponibles simulados para la "hora exacta".
 * Determinístico: el mismo día + técnico siempre da los mismos huecos,
 * para que la demo sea consistente.
 */

export interface TimeSlot {
  /** Fecha y hora ISO del inicio */
  iso: string
  /** "08:00" */
  label: string
  available: boolean
}

const FIRST_HOUR = 7
const LAST_HOUR = 18 // último inicio posible

/** Próximos `count` días a partir de hoy (incluye hoy) */
export function getNextDays(count = 14): Date[] {
  const today = startOfDay(new Date())
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  })
}

/** Horarios de un día. `seed` (ej. id del técnico) cambia qué horas están ocupadas. */
export function getSlotsForDay(day: Date, seed = 'renova'): TimeSlot[] {
  const now = new Date()
  const slots: TimeSlot[] = []
  for (let hour = FIRST_HOUR; hour <= LAST_HOUR; hour++) {
    for (const minute of [0, 30]) {
      if (hour === LAST_HOUR && minute > 0) continue
      const d = new Date(day)
      d.setHours(hour, minute, 0, 0)
      const isPast = d.getTime() < now.getTime() + 2 * 60 * 60 * 1000 // mínimo 2 h de anticipación
      const busy = hash(`${seed}-${d.toDateString()}-${hour}:${minute}`) % 10 < 3 // ~30% ocupado
      slots.push({
        iso: d.toISOString(),
        label: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
        available: !isPast && !busy,
      })
    }
  }
  return slots
}

export function startOfDay(d: Date): Date {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString()
}

function hash(text: string): number {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) >>> 0
  return h
}
