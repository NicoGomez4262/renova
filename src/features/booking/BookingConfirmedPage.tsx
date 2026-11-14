import { ComingSoon } from '@/components/common'

/**
 * Reserva confirmada — TAREA A4 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a4
 */
export default function BookingConfirmedPage() {
  return (
    <ComingSoon
      title="Reserva confirmada"
      task="A4"
      role="A"
      todo={[
        'Mensaje de éxito con el código RN-XXXX',
        'Resumen: servicio, técnico, fecha y hora exacta, dirección',
        'PIN de seguridad y explicación',
        'Botones: "Ver mi reserva" (/reservas/:id) y "Volver al inicio"',
      ]}
    />
  )
}
