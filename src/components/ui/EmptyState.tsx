import type { ReactNode } from 'react'

/** Estado vacío: ícono + título + texto + acción opcional. */
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      {icon && (
        <div className="bg-navy-50 text-navy-600 mb-4 flex size-16 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
      <h3 className="text-ink text-lg font-extrabold">{title}</h3>
      {description && <p className="text-muted mt-1 max-w-xs text-[15px]">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
