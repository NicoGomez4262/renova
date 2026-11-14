import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

/** Título de sección con enlace opcional "Ver todos >" */
export function SectionTitle({
  title,
  to,
  linkLabel = 'Ver todos',
}: {
  title: string
  to?: string
  linkLabel?: string
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="text-ink text-xl font-extrabold">{title}</h2>
      {to && (
        <Link
          to={to}
          className="text-coral-500 inline-flex items-center gap-0.5 text-[15px] font-semibold"
        >
          {linkLabel}
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  )
}
