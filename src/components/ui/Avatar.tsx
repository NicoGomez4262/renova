import type { Tone } from '@/types'
import { cn } from '@/lib/cn'
import { initials } from '@/lib/format'
import { toneClasses } from '@/lib/tones'
import { BadgeCheck } from 'lucide-react'

/** Avatar con iniciales (no usamos fotos reales en el piloto). */
export function Avatar({
  name,
  tone = 'sky',
  size = 48,
  verified,
  className,
}: {
  name: string
  tone?: Tone
  size?: number
  /** Muestra el sello azul de verificado */
  verified?: boolean
  className?: string
}) {
  return (
    <span
      className={cn('relative inline-flex shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <span
        className={cn(
          'flex size-full items-center justify-center rounded-full font-extrabold',
          toneClasses[tone].tile,
          toneClasses[tone].accent,
        )}
        style={{ fontSize: size * 0.36 }}
        aria-hidden
      >
        {initials(name)}
      </span>
      {verified && (
        <BadgeCheck
          className="fill-accent-sky absolute -right-0.5 -bottom-0.5 rounded-full bg-white text-white"
          style={{ width: size * 0.38, height: size * 0.38 }}
          aria-label="Verificado"
        />
      )}
    </span>
  )
}
