import { Link } from 'react-router'
import type { Category } from '@/types'
import { cn } from '@/lib/cn'
import { toneClasses } from '@/lib/tones'
import { CategoryIcon } from '@/components/brand/CategoryIcon'

/** Mosaico pastel de categoría (Inicio, Todos los servicios). */
export function CategoryTile({ category, className }: { category: Category; className?: string }) {
  return (
    <Link
      to={`/servicios/${category.id}`}
      className={cn(
        'flex aspect-[0.92] flex-col items-center justify-center gap-2 rounded-2xl px-1 text-center transition active:scale-[0.97]',
        toneClasses[category.tone].tile,
        className,
      )}
    >
      <CategoryIcon id={category.id} size={44} />
      <span className="text-ink text-[13px] leading-tight font-bold sm:text-sm">
        {category.name}
      </span>
    </Link>
  )
}
