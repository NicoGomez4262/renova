import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Calificación compacta: ★ 4.9 (127) */
export function RatingInline({
  rating,
  count,
  className,
}: {
  rating: number
  count?: number
  className?: string
}) {
  return (
    <span className={cn('text-ink inline-flex items-center gap-1 text-sm font-bold', className)}>
      <Star className="fill-accent-butter text-accent-butter size-4" aria-hidden />
      {rating.toFixed(1)}
      {count !== undefined && <span className="text-muted font-normal">({count})</span>}
    </span>
  )
}

/**
 * Estrellas. Si pasas `onChange` se vuelve interactiva (pantalla Calificar).
 */
export function StarRating({
  value,
  onChange,
  size = 28,
}: {
  value: number
  onChange?: (value: number) => void
  size?: number
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      role={onChange ? 'radiogroup' : 'img'}
      aria-label={`${value} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= Math.round(value)
        const star = (
          <Star
            style={{ width: size, height: size }}
            className={filled ? 'fill-accent-butter text-accent-butter' : 'text-line'}
            aria-hidden
          />
        )
        return onChange ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={n === value}
            aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
            onClick={() => onChange(n)}
            className="rounded-full p-0.5 transition active:scale-90"
          >
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        )
      })}
    </div>
  )
}
