import type { BookingAnswers, Service } from '@/types'

/**
 * Convierte las respuestas del paso "Detalles" en filas legibles para
 * resúmenes (confirmación, detalle de la reserva):
 *   [{ label: '¿Qué deseas pintar?', value: 'Paredes' }, { label: 'Área aproximada', value: '20 m²' }]
 */
export function describeAnswers(
  service: Service,
  answers: BookingAnswers,
  photosCount = 0,
): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  for (const q of service.questions) {
    if (q.type === 'photos') {
      if (photosCount > 0)
        rows.push({ label: 'Fotos', value: `${photosCount} adjunta${photosCount > 1 ? 's' : ''}` })
      continue
    }
    const answer = answers[q.id]
    if (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0))
      continue
    let value: string
    if (q.type === 'options') {
      const values = Array.isArray(answer) ? answer : [String(answer)]
      value = values.map((v) => q.options.find((o) => o.value === v)?.label ?? v).join(', ')
    } else if (q.type === 'number') {
      value = `${answer}${q.unit ? ` ${q.unit}` : ''}`
    } else {
      value = String(answer)
    }
    rows.push({ label: q.label, value })
  }
  return rows
}
