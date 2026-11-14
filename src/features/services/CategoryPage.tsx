import { ComingSoon } from '@/components/common'

/**
 * Categoría — TAREA A1 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a1
 */
export default function CategoryPage() {
  return (
    <ComingSoon
      title="Categoría"
      task="A1"
      role="A"
      todo={[
        'Encabezado con nombre, tagline e ilustración de la categoría',
        'Lista de servicios de la categoría (ServiceRow)',
        'Técnicos destacados de la categoría (TechnicianCard)',
        '404 amable si la categoría no existe',
      ]}
    />
  )
}
