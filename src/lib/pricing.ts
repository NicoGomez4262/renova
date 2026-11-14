import type { BookingAnswers, PriceBreakdown, Service } from '@/types'

/** Tarifa de visita/plataforma que ve el cliente. 0 = el piloto no la cobra. */
export const VISIT_FEE = 0

/**
 * Calcula el precio claro de una reserva.
 * - Servicios por punto/elemento: multiplica por la respuesta "cantidad" si existe.
 * - Servicios por m² en cotización: estimado simple según el área.
 */
export function calculatePrice(service: Service, answers: BookingAnswers = {}): PriceBreakdown {
  let amount = service.price
  const qty = Number(answers.cantidad)
  if (Number.isFinite(qty) && qty > 1) amount = service.price * qty

  const area = Number(answers.area)
  if (service.priceType === 'cotizacion' && Number.isFinite(area) && area > 0) {
    // Estimado de referencia: $12.000 por m², nunca menos que el "desde"
    amount = Math.max(service.price, Math.round((area * 12000) / 1000) * 1000)
  }

  return {
    service: amount,
    visitFee: VISIT_FEE,
    total: amount + VISIT_FEE,
    isEstimate: service.priceType === 'cotizacion',
  }
}
