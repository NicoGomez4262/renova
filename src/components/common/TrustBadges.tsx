import { Award, CircleDollarSign, Clock, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Los 4 pilares de Renova (propuesta de valor). */
export const TRUST_PILLARS = [
  { icon: ShieldCheck, title: 'Verificados', text: 'Identidad, antecedentes y salud al día' },
  { icon: CircleDollarSign, title: 'Precio claro', text: 'Sabes cuánto pagas antes de confirmar' },
  { icon: Clock, title: 'Hora exacta', text: 'Eliges la hora, no una franja de 4 horas' },
  { icon: Award, title: 'Garantía 30 días', text: 'Si algo falla, volvemos sin costo' },
] as const

/** Cuadrícula 2×2 con los pilares de confianza. */
export function TrustBadges({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {TRUST_PILLARS.map(({ icon: Icon, title, text }) => (
        <div key={title} className="bg-navy-50/70 rounded-2xl p-3.5">
          <Icon className="text-navy-700 mb-2 size-6" aria-hidden />
          <p className="text-ink text-[15px] font-extrabold">{title}</p>
          <p className="text-muted mt-0.5 text-[13px] leading-snug">{text}</p>
        </div>
      ))}
    </div>
  )
}
