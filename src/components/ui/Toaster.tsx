import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { useToast } from '@/store/toast'
import { cn } from '@/lib/cn'

/** Muestra los toasts. Ya está montado en la raíz de la app. */
export function Toaster() {
  const toasts = useToast((s) => s.toasts)
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center gap-2 p-4 pt-[max(1rem,env(safe-area-inset-top))]">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cn(
            'animate-slide-up shadow-float pointer-events-auto flex w-full max-w-sm items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] font-semibold',
            t.tone === 'error' ? 'bg-danger text-white' : 'bg-navy-900 text-white',
          )}
        >
          {t.tone === 'success' ? (
            <CheckCircle2 className="size-5 shrink-0 text-[#7ee0b0]" />
          ) : t.tone === 'error' ? (
            <AlertCircle className="size-5 shrink-0" />
          ) : (
            <Info className="text-navy-200 size-5 shrink-0" />
          )}
          {t.message}
        </div>
      ))}
    </div>
  )
}
