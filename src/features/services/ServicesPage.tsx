import { ComingSoon } from '@/components/common'

/**
 * Todos los servicios — TAREA A1 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a1
 */
export default function ServicesPage() {
  return (
    <ComingSoon
      title="Todos los servicios"
      task="A1"
      role="A"
      todo={[
        'Buscador que lee y escribe ?q= en la URL (searchServices)',
        'Todas las categorías como mosaicos (CategoryTile)',
        'Resultados de búsqueda con ServiceRow y estado vacío amable',
      ]}
    />
  )
}
