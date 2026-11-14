/** Barra de progreso por pasos (flujo de reserva / checkout). */
export function StepProgress({
  current,
  total,
  label,
}: {
  current: number
  total: number
  label?: string
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-ink font-bold">{label}</span>
        <span className="text-muted">
          Paso {current} de {total}
        </span>
      </div>
      <div className="flex gap-1.5" aria-hidden>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i < current ? 'bg-coral-500' : 'bg-line'}`}
          />
        ))}
      </div>
    </div>
  )
}
