import { Lock, MapPin } from 'lucide-react'
import { Card, Chip, TextField } from '@/components/ui'
import { PILOT_ZONES, zones } from '@/data/zones'
import { validateAddress, type StepProps } from '../draft'
import { StepIntro } from './StepIntro'

const UPCOMING = zones.filter((z) => !z.active).map((z) => z.name)

/** Paso 2 · Dirección — Tarea A3 */
export function AddressStep({ draft, update, showErrors }: StepProps) {
  const errors = showErrors ? validateAddress(draft) : {}
  return (
    <div className="space-y-5">
      <StepIntro
        title="¿Dónde será el servicio?"
        text="Tu técnico llegará a esta dirección a la hora exacta que elijas."
      />

      <Card className="space-y-6 rounded-3xl p-5">
        <fieldset>
          <legend className="text-ink mb-2 text-[15px] font-bold">Localidad</legend>
          <div className="flex flex-wrap gap-2">
            {PILOT_ZONES.map((z) => (
              <Chip
                key={z.id}
                selected={draft.zone === z.id}
                onClick={() => update({ zone: z.id })}
              >
                {z.name}
              </Chip>
            ))}
          </div>
          {errors.zone && <p className="text-danger mt-1.5 text-sm">{errors.zone}</p>}
          <p className="text-muted mt-3 text-sm">
            Estamos en piloto. Pronto llegaremos a {UPCOMING.slice(0, -1).join(', ')} y{' '}
            {UPCOMING.at(-1)}.
          </p>
        </fieldset>

        <TextField
          label="Dirección"
          icon={<MapPin className="size-5" />}
          placeholder="Ej. Cra 7 # 72-41"
          autoComplete="street-address"
          maxLength={80}
          value={draft.line}
          onChange={(e) => update({ line: e.target.value })}
          error={errors.line}
        />
        <TextField
          label="Apto, torre o indicaciones (opcional)"
          placeholder="Ej. Apto 502, torre 2. Timbre dañado."
          maxLength={80}
          value={draft.details}
          onChange={(e) => update({ details: e.target.value })}
        />
      </Card>

      <div className="bg-navy-50/70 flex gap-3 rounded-2xl p-4">
        <Lock className="text-navy-700 mt-0.5 size-5 shrink-0" aria-hidden />
        <p className="text-ink text-sm">
          Solo compartimos tu dirección con el técnico asignado y únicamente para este servicio.
        </p>
      </div>
    </div>
  )
}
