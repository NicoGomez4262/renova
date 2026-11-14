import { Banknote, CreditCard, Smartphone, Wallet } from 'lucide-react'
import type { PaymentMethod } from '@/types'

/** Ícono de cada método de pago (ver PAYMENT_METHODS en @/lib/payments) */
export const PAYMENT_ICONS: Record<PaymentMethod, typeof CreditCard> = {
  tarjeta: CreditCard,
  nequi: Smartphone,
  daviplata: Wallet,
  efectivo: Banknote,
}

export function PaymentIcon({ method, className }: { method: PaymentMethod; className?: string }) {
  const Icon = PAYMENT_ICONS[method]
  return <Icon className={className} aria-hidden />
}
