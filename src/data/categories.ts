import type { Category } from '@/types'

/** Orden = orden en que aparecen en la app. Los 4 primeros salen en Inicio. */
export const categories: Category[] = [
  {
    id: 'plomeria',
    name: 'Plomería',
    tagline: 'Fugas, destapes y grifería',
    tone: 'sky',
    fromPrice: 150000,
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    tagline: 'Limpieza profunda y por horas',
    tone: 'mint',
    fromPrice: 100000,
  },
  {
    id: 'pintura',
    name: 'Pintura',
    tagline: 'Paredes, techos y espacios completos',
    tone: 'peach',
    fromPrice: 180000,
  },
  {
    id: 'electricidad',
    name: 'Electricidad',
    tagline: 'Tomas, lámparas y revisiones',
    tone: 'butter',
    fromPrice: 120000,
  },
  {
    id: 'electrodomesticos',
    name: 'Electrodomésticos',
    tagline: 'Lavadoras, neveras y estufas',
    tone: 'teal',
    fromPrice: 130000,
  },
  {
    id: 'instalaciones',
    name: 'Instalaciones',
    tagline: 'TV, cortinas, repisas y más',
    tone: 'lilac',
    fromPrice: 90000,
  },
]
