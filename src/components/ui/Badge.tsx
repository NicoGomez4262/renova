import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeTone = 'info' | 'warning' | 'success' | 'neutral' | 'danger' | 'coral'

const TONES: Record<BadgeTone, string> = {
  info: 'bg-info-bg text-info',
  warning: 'bg-warning-bg text-warning',
  success: 'bg-success-bg text-success',
  neutral: 'bg-surface text-muted',
  danger: 'bg-danger-bg text-danger',
  coral: 'bg-coral-50 text-coral-600',
}

/** Etiqueta pequeña de estado. */
export function Badge({
  children,
  tone = 'neutral',
  icon,
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  icon?: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
