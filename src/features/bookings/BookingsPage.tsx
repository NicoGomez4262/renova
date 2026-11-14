import { ComingSoon } from '@/components/common'

/**
 * Mis reservas — TAREA B1 (Rol B).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#b1
 */
export default function BookingsPage() {
  return (
    <ComingSoon
      title="Mis reservas"
      task="B1"
      role="B"
      todo={[
        'Pestañas "Próximas" e "Historial" (ACTIVE_STATUSES)',
        'Tarjeta por reserva: servicio, técnico, fecha y hora exacta, estado (STATUS_META)',
        'Estado vacío con botón "Reservar un servicio"',
      ]}
    />
  )
}
