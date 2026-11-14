import { useMemo, useState } from 'react'
import { CalendarX, Clock, Sun, Sunset } from 'lucide-react'
import { Chip } from '@/components/ui'
import { getNextDays, isSameDay, type TimeSlot } from '@/lib/slots'
import { cn } from '@/lib/cn'
import { formatDate, formatTime } from '@/lib/format'
import { slotsForTechnicians } from '../availability'
import { validateSchedule, type StepProps } from '../draft'
import { StepIntro } from './StepIntro'

const weekday = new Intl.DateTimeFormat('es-CO', { weekday: 'short' })
const month = new Intl.DateTimeFormat('es-CO', { month: 'short' })

function dayLabel(d: Date, i: number) {
  if (i === 0) return 'Hoy'
  if (i === 1) return 'Mañana'
  const w = weekday.format(d).replace('.', '')
  return w.charAt(0).toUpperCase() + w.slice(1)
}

/** "13:30" → "1:30" (las secciones Mañana/Tarde aclaran a. m./p. m.) */
function shortTime(label: string) {
  const [h, m] = label.split(':').map(Number)
  return `${h > 12 ? h - 12 : h}:${String(m).padStart(2, '0')}`
}

/** Paso 3 · Fecha y hora exacta — Tarea A4 */
export function ScheduleStep({
  draft,
  update,
  showErrors,
  techIds,
}: StepProps & { techIds: string[] }) {
  const days = useMemo(
    () => getNextDays(14).map((day) => ({ day, slots: slotsForTechnicians(day, techIds) })),
    [techIds],
  )
  const [dayIndex, setDayIndex] = useState(() => {
    if (draft.scheduledAt) {
      const i = days.findIndex((d) => isSameDay(d.day, new Date(draft.scheduledAt!)))
      if (i >= 0) return i
    }
    return Math.max(
      0,
      days.findIndex((d) => d.slots.some((s) => s.available)),
    )
  })
  const error = showErrors ? validateSchedule(draft, techIds) : null
  const current = days[dayIndex]
  const morning = current.slots.filter((s) => Number(s.label.slice(0, 2)) < 12)
  const afternoon = current.slots.filter((s) => Number(s.label.slice(0, 2)) >= 12)
  const hasSlots = current.slots.some((s) => s.available)

  return (
    <div className="space-y-5">
      <StepIntro
        title="¿Cuándo te queda bien?"
        text="Elige la hora exacta de llegada. Nada de esperar toda la mañana."
      />

      {/* Días */}
      <div
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
        role="listbox"
        aria-label="Día"
      >
        {days.map(({ day, slots }, i) => {
          const disabled = !slots.some((s) => s.available)
          const selected = i === dayIndex
          return (
            <button
              key={day.toISOString()}
              type="button"
              role="option"
              aria-selected={selected}
              disabled={disabled}
              onClick={() => setDayIndex(i)}
              className={cn(
                'flex w-[4.25rem] shrink-0 flex-col items-center rounded-2xl border py-2.5 transition',
                selected
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-line text-ink bg-white',
                disabled && 'opacity-40',
              )}
            >
              <span
                className={cn('text-xs font-semibold', selected ? 'text-navy-100' : 'text-muted')}
              >
                {dayLabel(day, i)}
              </span>
              <span className="text-xl font-extrabold">{day.getDate()}</span>
              <span className={cn('text-xs', selected ? 'text-navy-100' : 'text-muted')}>
                {month.format(day).replace('.', '')}
              </span>
            </button>
          )
        })}
      </div>

      {/* Horas */}
      {hasSlots ? (
        <div className="space-y-5">
          <SlotGroup
            title="Mañana"
            icon={<Sun className="size-4" />}
            slots={morning}
            selected={draft.scheduledAt}
            onPick={(iso) => update({ scheduledAt: iso })}
          />
          <SlotGroup
            title="Tarde"
            icon={<Sunset className="size-4" />}
            slots={afternoon}
            selected={draft.scheduledAt}
            onPick={(iso) => update({ scheduledAt: iso })}
          />
        </div>
      ) : (
        <div className="bg-surface flex flex-col items-center rounded-2xl px-4 py-8 text-center">
          <CalendarX className="text-muted mb-2 size-7" aria-hidden />
          <p className="text-ink font-bold">No quedan horas este día</p>
          <p className="text-muted text-sm">Prueba con otro día.</p>
        </div>
      )}

      {error && <p className="text-danger text-sm">{error}</p>}

      {draft.scheduledAt && !error && (
        <div className="bg-success-bg flex gap-3 rounded-2xl p-4" aria-live="polite">
          <Clock className="text-success mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="text-ink text-sm">
            Tu técnico llegará el{' '}
            <span className="font-bold">{formatDate(draft.scheduledAt).toLowerCase()}</span> a las{' '}
            <span className="font-bold">{formatTime(draft.scheduledAt)}</span> en punto. Si algo
            cambia, te avisamos.
          </p>
        </div>
      )}
    </div>
  )
}

function SlotGroup({
  title,
  icon,
  slots,
  selected,
  onPick,
}: {
  title: string
  icon: React.ReactNode
  slots: TimeSlot[]
  selected: string | null
  onPick: (iso: string) => void
}) {
  if (!slots.some((s) => s.available)) return null
  return (
    <div>
      <p className="text-muted mb-2 flex items-center gap-1.5 text-sm font-bold">
        {icon}
        {title}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((s) => (
          <Chip
            key={s.iso}
            disabled={!s.available}
            selected={selected === s.iso}
            onClick={() => onPick(s.iso)}
            className="px-0"
          >
            {shortTime(s.label)}
          </Chip>
        ))}
      </div>
    </div>
  )
}
