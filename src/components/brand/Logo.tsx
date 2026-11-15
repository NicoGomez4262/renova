import { cn } from '@/lib/cn'

/*
 * Logo de Renova · propuesta "Techo"
 * "RENOV" en negro + la "A" como un techo naranja con puerta.
 * Solo usa los colores de la presentación: naranja #FF8A00, negro #1F2020 y blanco
 * (tokens brand-orange / brand-black en index.css).
 * El texto está convertido a trazos (Archivo ExtraBold expandida): no depende de fuentes.
 */

const WORDMARK =
  'M11.76 100V-0.2H85.08Q96.12 -0.2 103.38 4.18Q110.65 8.55 114.3 15.82Q117.94 23.09 117.94 31.87Q117.94 41.46 113.45 49.14Q108.96 56.82 100.3 61.21L120.65 100H88.92L72.27 65.89H40.03V100ZM40.03 44.98H77.26Q82.62 44.98 85.83 41.63Q89.04 38.28 89.04 32.65Q89.04 28.95 87.6 26.34Q86.16 23.72 83.54 22.33Q80.91 20.93 77.26 20.93H40.03Z M147.22 100V-0.2H243V21.18H175.54V38.79H234.54V59.53H175.54V78.62H244.08V100Z M273.3 100V-0.2H298.49L344.25 46.47Q345.47 47.62 347.37 49.74Q349.28 51.85 351.28 54.06Q353.28 56.26 354.62 57.87L355.7 57.81Q355.63 55 355.57 51.41Q355.51 47.82 355.51 45.18V-0.2H382.07V100H357.15L311.28 52.97Q308.45 50.17 305.5 46.92Q302.54 43.68 300.71 41.64L299.71 41.7Q299.78 43.84 299.82 47.31Q299.86 50.78 299.86 54.35V100Z M471.6 101.75Q452.95 101.75 439.37 95.76Q425.79 89.76 418.5 78.19Q411.2 66.61 411.2 49.92Q411.2 33.09 418.5 21.54Q425.79 9.99 439.37 4.02Q452.95 -1.95 471.6 -1.95Q490.47 -1.95 503.99 4.02Q517.5 9.99 524.8 21.54Q532.1 33.09 532.1 49.92Q532.1 66.61 524.8 78.19Q517.5 89.76 503.99 95.76Q490.47 101.75 471.6 101.75ZM471.63 80.39Q478.87 80.39 484.67 78.48Q490.48 76.56 494.6 72.91Q498.73 69.27 500.91 64.01Q503.09 58.75 503.09 52.18V47.5Q503.09 40.92 500.91 35.68Q498.73 30.45 494.6 26.82Q490.48 23.2 484.67 21.31Q478.87 19.41 471.63 19.41Q464.4 19.41 458.59 21.31Q452.79 23.2 448.68 26.82Q444.57 30.45 442.42 35.68Q440.27 40.92 440.27 47.5V52.18Q440.27 58.75 442.42 64.01Q444.57 69.27 448.68 72.91Q452.79 76.56 458.59 78.48Q464.4 80.39 471.63 80.39Z M594.79 100 551.38 -0.2H582.42L602.91 51.67Q603.95 54.06 605.28 57.69Q606.62 61.33 608 65.05Q609.39 68.78 610.36 71.71H611.4Q612.33 69.06 613.62 65.46Q614.91 61.87 616.3 58.21Q617.69 54.56 618.83 51.74L639.46 -0.2H669.14L625.77 100Z'

const VIEWBOX = '9.76 -12 801.9 114'
const ASPECT = 7.0342

/**
 * Logo completo. `size` = alto en px.
 * `inverted` = texto blanco, para fondos oscuros.
 */
export function Logo({
  size = 26,
  inverted,
  className,
}: {
  size?: number
  inverted?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox={VIEWBOX}
      height={size}
      width={Math.round(size * ASPECT)}
      role="img"
      aria-label="Renova"
      className={cn('block shrink-0', className)}
    >
      <path d={WORDMARK} fill={inverted ? 'var(--color-white)' : 'var(--color-brand-black)'} />
      <polygon
        points="676.62,100 743.14,-10.11 809.66,100 778.12,100 743.14,42.11 708.16,100"
        fill="var(--color-brand-orange)"
      />
      <rect x="731.14" y="72" width="24" height="28" fill="var(--color-brand-orange)" />
    </svg>
  )
}

/**
 * Isotipo: el techo con puerta. `size` = alto en px.
 * `color` por defecto naranja; usa 'white' sobre fondos naranja o negro.
 */
export function HouseMark({
  size = 32,
  color = 'orange',
  className,
}: {
  size?: number
  color?: 'orange' | 'black' | 'white'
  className?: string
}) {
  const fill =
    color === 'white'
      ? 'var(--color-white)'
      : color === 'black'
        ? 'var(--color-brand-black)'
        : 'var(--color-brand-orange)'
  return (
    <svg
      viewBox="0 0 133.05 110.11"
      height={size}
      width={Math.round(size * 1.2083)}
      aria-hidden
      className={className}
    >
      <polygon
        points="0,110.11 66.52,0 133.05,110.11 101.5,110.11 66.52,52.21 31.55,110.11"
        fill={fill}
      />
      <rect x="54.52" y="82.11" width="24" height="28" fill={fill} />
    </svg>
  )
}
