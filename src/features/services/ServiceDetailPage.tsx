import { ComingSoon } from '@/components/common'

/**
 * Detalle del servicio — TAREA A1 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a1
 */
export default function ServiceDetailPage() {
  return (
    <ComingSoon
      title="Detalle del servicio"
      task="A1"
      role="A"
      todo={[
        'Nombre, descripción, duración y qué incluye',
        'Precio claro: fijo o "Desde $X · recibirás una cotización"',
        'Sellos de confianza (verificados, hora exacta, garantía 30 días)',
        'Técnicos disponibles para este servicio',
        'Botón fijo "Reservar" o "Solicitar cotización" → /reservar/:serviceId',
      ]}
    />
  )
}
