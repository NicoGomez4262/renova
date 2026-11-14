/**
 * ─────────────────────────────────────────────────────────────
 *  Capa de acceso al catálogo (servicios, técnicos, productos).
 *  Las pantallas leen datos SOLO a través de estas funciones,
 *  no importando los arreglos directamente. Así, si mañana el
 *  catálogo viene de Supabase, solo cambia este archivo.
 * ─────────────────────────────────────────────────────────────
 */
import type {
  Category,
  CategoryId,
  Product,
  ProductCategory,
  Review,
  Service,
  Technician,
} from '@/types'
import { categories } from './categories'
import { services } from './services'
import { reviews, technicians } from './technicians'
import { products, stores } from './products'

/* ───────── Categorías ───────── */

export function getCategories(): Category[] {
  return categories
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

/* ───────── Servicios ───────── */

export function getServices(): Service[] {
  return services
}

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function getServicesByCategory(categoryId: CategoryId): Service[] {
  return services.filter((s) => s.categoryId === categoryId)
}

export function getPopularServices(): Service[] {
  return services.filter((s) => s.popular)
}

/** Palabras que no aportan a la búsqueda */
const STOPWORDS = new Set([
  'de',
  'del',
  'la',
  'las',
  'el',
  'los',
  'mi',
  'un',
  'una',
  'y',
  'en',
  'para',
  'con',
  'que',
  'se',
  'me',
  'al',
])

/**
 * Búsqueda sin tildes ni mayúsculas sobre nombre, descripción, lo que
 * incluye y la categoría. Compara la raíz de cada palabra para que
 * "pintar" encuentre "Pintura" y "destapar" encuentre "Destape".
 * Todas las palabras deben coincidir en algún campo.
 */
export function searchServices(query: string): Service[] {
  const words = normalize(query)
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w))
    .map((w) => (w.length <= 4 ? w : w.slice(0, Math.max(4, w.length - 2))))
  if (words.length === 0) return services
  return services.filter((s) => {
    const category = getCategory(s.categoryId)
    const haystack = normalize(
      [s.name, s.description, ...s.includes, category?.name ?? '', category?.tagline ?? ''].join(
        ' ',
      ),
    )
    return words.every((w) => haystack.includes(w))
  })
}

/* ───────── Técnicos ───────── */

export function getTechnicians(): Technician[] {
  return technicians
}

export function getTechnician(id: string): Technician | undefined {
  return technicians.find((t) => t.id === id)
}

/** Técnicos que prestan un servicio, ordenados por calificación y cercanía */
export function getTechniciansForService(serviceId: string): Technician[] {
  const service = getService(serviceId)
  if (!service) return []
  return technicians
    .filter((t) => t.categories.includes(service.categoryId))
    .sort((a, b) => b.rating - a.rating || a.distanceKm - b.distanceKm)
}

export function getTechniciansByCategory(categoryId: CategoryId): Technician[] {
  return technicians
    .filter((t) => t.categories.includes(categoryId))
    .sort((a, b) => b.rating - a.rating)
}

/** Técnicos mejor calificados (para destacar en Inicio) */
export function getTopTechnicians(limit = 5): Technician[] {
  return [...technicians]
    .sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
    .slice(0, limit)
}

export function getReviewsForTechnician(technicianId: string): Review[] {
  return reviews
    .filter((r) => r.technicianId === technicianId)
    .sort((a, b) => b.date.localeCompare(a.date))
}

/* ───────── Tienda ───────── */

export function getProducts(category?: ProductCategory): Product[] {
  return category ? products.filter((p) => p.category === category) : products
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

/** Productos recomendados para una categoría de servicio ("¿Necesitas materiales?") */
export function getProductsForCategory(categoryId: CategoryId, limit = 4): Product[] {
  return products.filter((p) => p.relatedCategories.includes(categoryId)).slice(0, limit)
}

export function getStore(id: string) {
  return stores.find((s) => s.id === id)
}

/* ───────── Utilidades ───────── */

export function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}
