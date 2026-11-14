import { ComingSoon } from '@/components/common'

/**
 * Reservar servicio — TAREA A3 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a3
 */
export default function BookingFlowPage() {
  return (
    <ComingSoon
      title="Reservar servicio"
      task="A3"
      role="A"
      todo={[
        'Paso 1 · Detalles: preguntas dinámicas del servicio (service.questions), notas y fotos',
        'Paso 2 · Dirección: localidad (solo zonas piloto activas) + dirección',
        'Paso 3 · Fecha y hora exacta (A4)',
        'Paso 4 · Elige tu técnico o "el mejor disponible" (A4)',
        'Paso 5 · Resumen, precio claro y método de pago → createBooking (A4)',
      ]}
    />
  )
}
