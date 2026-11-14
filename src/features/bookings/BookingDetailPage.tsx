import { ComingSoon } from '@/components/common'

/**
 * Detalle de la reserva — TAREA B2 (Rol B).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#b2
 */
export default function BookingDetailPage() {
  return (
    <ComingSoon
      title="Detalle de la reserva"
      task="B2"
      role="B"
      todo={[
        'Línea de tiempo del estado (cotización → confirmada → en camino → en progreso → finalizada)',
        'Técnico asignado + botón "Escribir" (chat) ',
        'PIN de seguridad bien visible',
        'Fecha/hora exacta, dirección, precio claro y método de pago',
        'Acciones: aceptar cotización, reprogramar, cancelar (Sheet de confirmación)',
        'Botón "Simular avance (demo)" → useBookings().advanceStatus',
        'Si está finalizada: calificar y garantía vigente hasta…',
      ]}
    />
  )
}
