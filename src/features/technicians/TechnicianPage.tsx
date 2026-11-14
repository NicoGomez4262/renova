import { ComingSoon } from '@/components/common'

/**
 * Perfil del técnico — TAREA A2 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a2
 */
export default function TechnicianPage() {
  return (
    <ComingSoon
      title="Perfil del técnico"
      task="A2"
      role="A"
      todo={[
        'Avatar, nombre, título, calificación, trabajos, años de experiencia',
        'Verificaciones: identidad, antecedentes, salud, capacitación',
        'Badges, biografía, zona y distancia',
        'Reseñas (getReviewsForTechnician)',
        'Favorito (corazón) con useSession().toggleFavorite',
        'Botón "Reservar con <nombre>" → elegir servicio y entrar al flujo con este técnico',
      ]}
    />
  )
}
