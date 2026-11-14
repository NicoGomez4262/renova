import { ShieldCheck, Sparkles } from 'lucide-react'
import type { Technician } from '@/types'
import { Badge } from '@/components/ui'
import { TechnicianCard } from '@/components/common'
import { cn } from '@/lib/cn'
import { formatShortDate, formatTime } from '@/lib/format'
import { availableAt } from '../availability'
import type { StepProps } from '../draft'
import { StepIntro } from './StepIntro'

/** Paso 4 · Técnico — Tarea A4 */
export function TechnicianStep({
  draft,
  technicians,
  onSelect,
}: StepProps & { technicians: Technician[]; onSelect: (id: string | null) => void }) {
  const available = availableAt(technicians, draft.scheduledAt)
  const busy = technicians.length - available.length
  const when = draft.scheduledAt
    ? `Disponibles el ${formatShortDate(draft.scheduledAt).toLowerCase()} a las ${formatTime(draft.scheduledAt)}`
    : undefined

  return (
    <div className="space-y-5">
      <StepIntro title="Elige a tu técnico" text={when} />

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={draft.technicianId === null}
          className={cn(
            'shadow-card flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-3 text-left transition active:scale-[0.99]',
            draft.technicianId === null
              ? 'border-navy-700'
              : 'ring-line/70 border-transparent ring-1',
          )}
        >
          <span className="bg-coral-50 text-coral-500 flex size-14 shrink-0 items-center justify-center rounded-full">
            <Sparkles className="size-6" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-ink font-extrabold">El mejor disponible</span>
              <Badge tone="coral">Recomendado</Badge>
            </span>
            <span className="text-muted mt-0.5 block text-sm">
              Asignamos al técnico mejor calificado y más cercano libre a esa hora.
            </span>
          </span>
        </button>

        {available.map((t) => (
          <TechnicianCard
            key={t.id}
            technician={t}
            selected={draft.technicianId === t.id}
            onSelect={() => onSelect(t.id)}
          />
        ))}
      </div>

      {busy > 0 && (
        <p className="text-muted text-center text-sm">
          {busy === 1 ? '1 técnico más está ocupado' : `${busy} técnicos más están ocupados`} a esa
          hora.
        </p>
      )}

      <div className="bg-navy-50/70 flex gap-3 rounded-2xl p-4">
        <ShieldCheck className="text-navy-700 mt-0.5 size-5 shrink-0" aria-hidden />
        <p className="text-ink text-sm">
          Todos están verificados por Renova: identidad, antecedentes, afiliación a salud y
          capacitación.
        </p>
      </div>
    </div>
  )
}
