import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'soft'
type Size = 'sm' | 'md' | 'lg'

interface StyleProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-coral-500 text-white shadow-sm hover:bg-coral-600',
  secondary: 'bg-navy-900 text-white hover:bg-navy-800',
  outline: 'border border-line bg-white text-ink hover:bg-surface',
  ghost: 'text-navy-700 hover:bg-navy-50',
  soft: 'bg-coral-50 text-coral-600 hover:bg-coral-100',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-14 px-6 text-base',
}

/** Clases de botón (por si necesitas aplicarlas a otro elemento) */
export function buttonStyles({ variant = 'primary', size = 'md', fullWidth }: StyleProps = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-bold transition',
    'active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StyleProps {
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

/** Botón. Variante por defecto: coral (acción principal). */
export function Button({
  variant,
  size,
  fullWidth,
  iconLeft,
  iconRight,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonStyles({ variant, size, fullWidth }), className)}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}

interface ButtonLinkProps extends LinkProps, StyleProps {
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

/** Igual que Button pero navega (react-router Link). */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonStyles({ variant, size, fullWidth }), className)} {...props}>
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  )
}
