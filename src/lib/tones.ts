import type { Tone } from '@/types'

/**
 * Clases de Tailwind por tono. Usar siempre este mapa en vez de
 * construir clases dinámicas (`bg-tile-${tone}` no funciona con Tailwind).
 */
export const toneClasses: Record<Tone, { tile: string; accent: string; solid: string }> = {
  sky: { tile: 'bg-tile-sky', accent: 'text-accent-sky', solid: 'bg-accent-sky' },
  mint: { tile: 'bg-tile-mint', accent: 'text-accent-mint', solid: 'bg-accent-mint' },
  peach: { tile: 'bg-tile-peach', accent: 'text-accent-peach', solid: 'bg-accent-peach' },
  butter: { tile: 'bg-tile-butter', accent: 'text-accent-butter', solid: 'bg-accent-butter' },
  lilac: { tile: 'bg-tile-lilac', accent: 'text-accent-lilac', solid: 'bg-accent-lilac' },
  teal: { tile: 'bg-tile-teal', accent: 'text-accent-teal', solid: 'bg-accent-teal' },
}
