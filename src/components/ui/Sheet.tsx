import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

/**
 * Hoja inferior (bottom sheet) modal. Útil para confirmar cancelaciones,
 * elegir fecha, filtros, etc.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Cerrar"
        className="animate-fade-in bg-navy-900/40 absolute inset-0"
        onClick={onClose}
      />
      <div className="animate-slide-up pb-safe shadow-float relative max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5">
        <div className="bg-line mx-auto mb-3 h-1.5 w-10 rounded-full" />
        {title && (
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-extrabold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="hover:bg-surface rounded-full p-1.5"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}
