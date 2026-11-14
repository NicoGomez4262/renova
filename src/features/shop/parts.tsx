/**
 * Piezas reutilizables de la tienda (Rol A · A5/A6).
 */
import { Link } from 'react-router'
import { Minus, Plus, ShoppingCart, Store, Trash2 } from 'lucide-react'
import type { CategoryId, Product, ProductCategory } from '@/types'
import { CategoryIcon } from '@/components/brand/CategoryIcon'
import { getStore } from '@/data/catalog'
import { cn } from '@/lib/cn'
import { formatCOP } from '@/lib/format'
import { toneClasses } from '@/lib/tones'
import { toast, useCart, useCartCount } from '@/store'

/** Ilustración usada para cada categoría de producto */
const ILLUSTRATION: Record<ProductCategory, CategoryId> = {
  pintura: 'pintura',
  plomeria: 'plomeria',
  electricidad: 'electricidad',
  limpieza: 'limpieza',
  herramientas: 'instalaciones',
}

/** % de descuento (0 si no hay precio anterior) */
export function discountPercent(p: Product): number {
  return p.oldPrice && p.oldPrice > p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0
}

/** Mosaico de color con la ilustración del producto (no usamos fotos en el piloto) */
export function ProductThumb({
  product,
  size = 64,
  className,
}: {
  product: Product
  size?: number
  className?: string
}) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-2xl',
        toneClasses[product.tone].tile,
        className,
      )}
    >
      <CategoryIcon id={ILLUSTRATION[product.category]} size={size} />
    </span>
  )
}

/** Tarjeta de producto para la cuadrícula de 2 columnas */
export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add)
  const discount = discountPercent(product)
  const store = getStore(product.storeId)

  return (
    <div className="border-line/70 shadow-card relative flex flex-col rounded-2xl border bg-white p-2.5">
      <Link to={`/tienda/${product.id}`} className="flex flex-1 flex-col">
        <span className="relative">
          <ProductThumb product={product} size={56} className="aspect-[1.25] w-full" />
          {discount > 0 && (
            <span className="bg-coral-500 absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-extrabold text-white">
              -{discount}%
            </span>
          )}
        </span>
        <span className="text-ink mt-2.5 line-clamp-2 h-[2.5em] text-sm leading-tight font-bold">
          {product.name}
        </span>
        {store && (
          <span className="text-muted mt-1 flex items-center gap-1 truncate text-xs">
            <Store className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{store.name}</span>
          </span>
        )}
        <span className="mt-1.5 min-h-10 pr-11">
          <span className="text-coral-500 block text-base leading-tight font-extrabold">
            {formatCOP(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-muted block text-xs line-through">
              {formatCOP(product.oldPrice)}
            </span>
          )}
        </span>
      </Link>
      <button
        type="button"
        onClick={() => {
          add(product.id)
          toast(`Agregado al carrito`, 'success')
        }}
        aria-label={`Agregar ${product.name} al carrito`}
        className="bg-coral-500 shadow-card absolute right-2.5 bottom-2.5 flex size-10 items-center justify-center rounded-full text-white transition active:scale-90"
      >
        <Plus className="size-5" />
      </button>
    </div>
  )
}

/** Botón del carrito con contador (para encabezados) */
export function CartButton() {
  const count = useCartCount()
  return (
    <Link
      to="/carrito"
      aria-label={count > 0 ? `Carrito, ${count} productos` : 'Carrito'}
      className="hover:bg-surface relative flex size-11 items-center justify-center rounded-full"
    >
      <ShoppingCart className="text-navy-900 size-6" aria-hidden />
      {count > 0 && (
        <span className="bg-coral-500 absolute top-0.5 right-0 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-extrabold text-white">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}

/** Selector − n + . Con `onRemove`, el "−" se vuelve papelera cuando el valor es 1. */
export function QtyStepper({
  value,
  max,
  onChange,
  onRemove,
  label,
}: {
  value: number
  max: number
  onChange: (value: number) => void
  onRemove?: () => void
  label: string
}) {
  const showTrash = onRemove && value <= 1
  return (
    <div
      className="border-line inline-flex h-11 items-center rounded-full border bg-white"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => (showTrash ? onRemove() : onChange(Math.max(1, value - 1)))}
        disabled={!showTrash && value <= 1}
        aria-label={showTrash ? 'Quitar del carrito' : 'Restar uno'}
        className="text-navy-900 flex size-11 items-center justify-center rounded-full disabled:opacity-30"
      >
        {showTrash ? <Trash2 className="size-4.5" /> : <Minus className="size-4.5" />}
      </button>
      <span className="text-ink min-w-6 text-center font-extrabold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => {
          if (value >= max) toast(`Solo quedan ${max} unidades`)
          else onChange(value + 1)
        }}
        aria-label="Sumar uno"
        className="text-navy-900 flex size-11 items-center justify-center rounded-full"
      >
        <Plus className="size-4.5" />
      </button>
    </div>
  )
}
