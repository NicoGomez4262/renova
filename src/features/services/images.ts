import type { CategoryId } from '@/types'

/**
 * Fotos de encabezado por categoría (en public/img).
 * Las categorías sin foto muestran su ilustración.
 */
export const CATEGORY_IMAGES: Partial<Record<CategoryId, string>> = {
  pintura: '/img/servicio-pintura.webp',
}
