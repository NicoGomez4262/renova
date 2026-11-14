import type { ReactNode } from 'react'
import {
  Bath,
  BrickWall,
  CircleHelp,
  CookingPot,
  Droplets,
  FileText,
  Flame,
  House,
  LampCeiling,
  PlugZap,
  PowerOff,
  RotateCw,
  ShowerHead,
  Snowflake,
  Toilet,
  Volume2,
  WashingMachine,
  ZapOff,
} from 'lucide-react'
import type { CategoryId, ServiceQuestion, Tone } from '@/types'
import { Card, OptionTile, TextArea, TextField } from '@/components/ui'
import { getCategory } from '@/data/catalog'
import { cn } from '@/lib/cn'
import { toneClasses } from '@/lib/tones'
import { CATEGORY_IMAGES } from '@/features/services/images'
import { validateDetails, type StepProps } from '../draft'
import { PhotoPicker } from './PhotoPicker'

/** Subtítulo del encabezado según la categoría (como el mockup de Pintura) */
const INTROS: Record<CategoryId, string> = {
  pintura: 'Cuéntanos sobre el espacio que deseas pintar.',
  plomeria: 'Cuéntanos qué está pasando para que el técnico llegue preparado.',
  limpieza: 'Cuéntanos sobre el espacio que vamos a limpiar.',
  electricidad: 'Cuéntanos qué está pasando con la instalación eléctrica.',
  electrodomesticos: 'Cuéntanos qué le pasa a tu electrodoméstico.',
  instalaciones: 'Cuéntanos qué vamos a instalar.',
}

/** Íconos para opciones conocidas. Si todas las opciones tienen ícono, se muestran en mosaicos de color. */
const OPTION_ICONS: Record<string, typeof House> = {
  paredes: BrickWall,
  techo: LampCeiling,
  todo: House,
  cocina: CookingPot,
  bano: Bath,
  lavadero: WashingMachine,
  otro: CircleHelp,
  lavaplatos: CookingPot,
  sanitario: Toilet,
  ducha: ShowerHead,
  lavamanos: Droplets,
  'sin-luz': ZapOff,
  breaker: PlugZap,
  chispa: Flame,
  'no-enciende': PowerOff,
  'no-centrifuga': RotateCw,
  fuga: Droplets,
  agua: Droplets,
  ruido: Volume2,
  'no-enfria': Snowflake,
}

const TILE_TONES: Tone[] = ['sky', 'mint', 'peach', 'butter']

/** Paso 1 · Detalles — Tarea A3 */
export function DetailsStep({ service, draft, update, showErrors }: StepProps) {
  const category = getCategory(service.categoryId)
  const errors = showErrors ? validateDetails(service, draft) : {}
  const image = category ? CATEGORY_IMAGES[category.id] : undefined

  const setAnswer = (id: string, value: string | number | string[] | undefined) => {
    const answers = { ...draft.answers }
    if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0))
      delete answers[id]
    else answers[id] = value
    update({ answers })
  }

  return (
    <div className="space-y-5">
      {/* Encabezado */}
      <div className="relative flex min-h-32 items-center overflow-hidden">
        <div className={cn('relative z-10', image ? 'w-[60%]' : 'w-full')}>
          <h2 className="font-display-tight text-navy-900 text-[clamp(1.7rem,7.6vw,2.2rem)]">
            {category?.name ?? service.name} para <span className="text-coral-500">tu hogar</span>
          </h2>
          {category && (
            <p className="text-muted mt-2 text-[15px] leading-snug">{INTROS[category.id]}</p>
          )}
        </div>
        {image && (
          <img
            src={image}
            alt=""
            className="absolute top-0 right-0 h-full w-[44%] rounded-3xl object-cover"
          />
        )}
      </div>

      <Card className="space-y-6 rounded-3xl p-5">
        {service.questions.map((q) =>
          q.type === 'photos' ? (
            <Field key={q.id} label={q.label} error={errors[q.id]}>
              <PhotoPicker
                photos={draft.photos}
                onChange={(photos) => update({ photos })}
                hint={q.hint}
              />
            </Field>
          ) : (
            <QuestionField
              key={q.id}
              question={q}
              value={draft.answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
              error={errors[q.id]}
            />
          ),
        )}

        <TextArea
          label="Notas para el técnico (opcional)"
          placeholder="Ej. La fuga está debajo del lavaplatos. Hay que avisar en portería."
          rows={3}
          maxLength={400}
          value={draft.notes}
          onChange={(e) => update({ notes: e.target.value })}
        />
      </Card>

      {service.priceType === 'cotizacion' && (
        <div className="bg-tile-sky flex gap-3 rounded-2xl p-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/70">
            <FileText className="text-accent-sky size-5" aria-hidden />
          </span>
          <p className="text-ink text-sm">
            <span className="block font-bold">Recibirás una cotización antes de confirmar</span>
            Un profesional revisará tu solicitud y te enviaremos una propuesta sin compromiso.
          </p>
        </div>
      )}
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="text-ink mb-2 text-[15px] font-bold">{label}</legend>
      {children}
      {error && <p className="text-danger mt-1.5 text-sm">{error}</p>}
    </fieldset>
  )
}

function QuestionField({
  question: q,
  value,
  onChange,
  error,
}: {
  question: Exclude<ServiceQuestion, { type: 'photos' }>
  value: string | number | string[] | undefined
  onChange: (value: string | number | string[] | undefined) => void
  error?: string
}) {
  if (q.type === 'options') {
    const selected = Array.isArray(value) ? value : value !== undefined ? [String(value)] : []
    const withIcons = q.options.every((o) => OPTION_ICONS[o.value])
    const toggle = (v: string) => {
      if (!q.multiple) return onChange(selected[0] === v ? undefined : v)
      onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v])
    }
    return (
      <Field label={q.multiple ? `${q.label} (puedes elegir varias)` : q.label} error={error}>
        <div className={cn('grid gap-2.5', q.options.length === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
          {q.options.map((o, i) => {
            const Icon = OPTION_ICONS[o.value]
            const tone = TILE_TONES[i % TILE_TONES.length]
            return (
              <OptionTile
                key={o.value}
                label={o.label}
                selected={selected.includes(o.value)}
                onClick={() => toggle(o.value)}
                tone={withIcons ? tone : undefined}
                className={withIcons ? 'min-h-24' : 'min-h-13 py-2'}
                icon={
                  withIcons && Icon ? (
                    <Icon className={cn('size-8', toneClasses[tone].accent)} aria-hidden />
                  ) : undefined
                }
              />
            )
          })}
        </div>
      </Field>
    )
  }

  if (q.type === 'number') {
    return (
      <TextField
        label={q.label}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={q.placeholder}
        suffix={q.unit}
        value={value === undefined ? '' : String(value)}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, '').slice(0, 5)
          onChange(digits === '' ? undefined : Number(digits))
        }}
        error={error}
      />
    )
  }

  return (
    <TextField
      label={q.label}
      placeholder={q.placeholder}
      value={value === undefined ? '' : String(value)}
      onChange={(e) => onChange(e.target.value)}
      maxLength={120}
      error={error}
    />
  )
}
