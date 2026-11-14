import type { PaymentMethod } from '@/types'

/** Métodos de pago del piloto (simulados: se paga al terminar el servicio). */
export const PAYMENT_METHODS: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: 'tarjeta', label: 'Tarjeta', hint: 'Crédito o débito' },
  { id: 'nequi', label: 'Nequi', hint: 'Desde tu celular' },
  { id: 'daviplata', label: 'Daviplata', hint: 'Desde tu celular' },
  { id: 'efectivo', label: 'Efectivo', hint: 'Al terminar' },
]

/** "nequi" → "Nequi" */
export function paymentLabel(id: PaymentMethod): string {
  return PAYMENT_METHODS.find((p) => p.id === id)?.label ?? id
}
