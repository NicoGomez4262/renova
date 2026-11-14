import { useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface FieldShellProps {
  label?: string
  hint?: string
  error?: string
  id: string
  children: ReactNode
}

function FieldShell({ label, hint, error, id, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-ink text-[15px] font-bold">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-danger text-sm">{error}</p>
      ) : hint ? (
        <p className="text-muted text-sm">{hint}</p>
      ) : null}
    </div>
  )
}

const inputBase =
  'w-full rounded-xl border bg-white text-[15px] text-ink placeholder:text-muted/80 outline-none transition focus:border-navy-400 focus:ring-4 focus:ring-navy-50'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  /** Ícono a la izquierda (lucide) */
  icon?: ReactNode
  /** Texto a la derecha, ej. "m²" */
  suffix?: string
}

/** Campo de texto con etiqueta, ayuda, error, ícono y sufijo. */
export function TextField({
  label,
  hint,
  error,
  icon,
  suffix,
  className,
  id,
  ...props
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldShell label={label} hint={hint} error={error} id={inputId}>
      <div className="relative">
        {icon && (
          <span className="text-muted pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            inputBase,
            'h-13 px-4',
            !!icon && 'pl-12',
            suffix && 'pr-12',
            error ? 'border-danger' : 'border-line',
            className,
          )}
          aria-invalid={!!error}
          {...props}
        />
        {suffix && (
          <span className="text-muted pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
            {suffix}
          </span>
        )}
      </div>
    </FieldShell>
  )
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
}

export function TextArea({ label, hint, error, className, id, rows = 4, ...props }: TextAreaProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <FieldShell label={label} hint={hint} error={error} id={inputId}>
      <textarea
        id={inputId}
        rows={rows}
        className={cn(
          inputBase,
          'resize-none px-4 py-3',
          error ? 'border-danger' : 'border-line',
          className,
        )}
        aria-invalid={!!error}
        {...props}
      />
    </FieldShell>
  )
}
