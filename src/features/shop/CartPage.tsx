import { useMemo } from 'react'
import { Link } from 'react-router'
import { ChevronRight, ShoppingBag, Truck } from 'lucide-react'
import { PageHeader, StickyFooter } from '@/components/layout'
import { ButtonLink, Card, EmptyState } from '@/components/ui'
import { getProduct, getStore } from '@/data/catalog'
import { formatCOP } from '@/lib/format'
import { FREE_DELIVERY_FROM, getCartTotals, toast, useCart } from '@/store'
import { ProductThumb, QtyStepper } from './parts'

/** Carrito — Tarea A6 (Rol A). */
export default function CartPage() {
  const items = useCart((s) => s.items)
  const setQty = useCart((s) => s.setQty)
  const remove = useCart((s) => s.remove)
  const totals = useMemo(() => getCartTotals(items), [items])

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Tu carrito" />
        <EmptyState
          icon={<ShoppingBag className="size-7" />}
          title="Tu carrito está vacío"
          description="Encuentra pintura, grifería, herramientas y más de ferreterías aliadas."
          action={<ButtonLink to="/tienda">Ir a la tienda</ButtonLink>}
        />
      </>
    )
  }

  const missing = FREE_DELIVERY_FROM - totals.subtotal
  const progress = Math.min(100, Math.round((totals.subtotal / FREE_DELIVERY_FROM) * 100))

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Tu carrito"
        subtitle={`${totals.count} ${totals.count === 1 ? 'producto' : 'productos'}`}
      />

      {/* Domicilio gratis */}
      <div className="px-5 pt-4">
        <div className="bg-tile-mint rounded-2xl p-4">
          <p className="text-ink flex items-center gap-2 text-sm">
            <Truck className="text-accent-mint size-5 shrink-0" aria-hidden />
            {missing > 0 ? (
              <span>
                Te faltan <span className="font-bold">{formatCOP(missing)}</span> para el domicilio
                gratis
              </span>
            ) : (
              <span className="font-bold">¡Tienes domicilio gratis!</span>
            )}
          </p>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white" aria-hidden>
            <div
              className="bg-accent-mint h-full rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Productos */}
      <ul className="space-y-3 px-5 pt-4">
        {items.map((item) => {
          const product = getProduct(item.productId)
          if (!product) return null
          const store = getStore(product.storeId)
          return (
            <li
              key={item.productId}
              className="border-line/70 shadow-card rounded-2xl border bg-white p-3"
            >
              <div className="flex gap-3">
                <Link to={`/tienda/${product.id}`} aria-label={product.name}>
                  <ProductThumb product={product} size={40} className="size-18" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/tienda/${product.id}`}
                    className="text-ink line-clamp-2 text-[15px] leading-tight font-bold"
                  >
                    {product.name}
                  </Link>
                  {store && <p className="text-muted mt-0.5 truncate text-xs">{store.name}</p>}
                  <p className="text-muted mt-1 text-sm">{formatCOP(product.price)} c/u</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <QtyStepper
                  value={item.qty}
                  max={product.stock}
                  onChange={(n) => setQty(product.id, n)}
                  onRemove={() => {
                    remove(product.id)
                    toast('Producto quitado del carrito')
                  }}
                  label={`Cantidad de ${product.name}`}
                />
                <p className="text-ink text-lg font-extrabold">
                  {formatCOP(product.price * item.qty)}
                </p>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Resumen */}
      <div className="px-5 pt-4">
        <Card className="rounded-3xl p-5">
          <dl className="space-y-2 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="text-ink font-semibold">{formatCOP(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Domicilio</dt>
              <dd
                className={
                  totals.deliveryFee === 0 ? 'text-success font-semibold' : 'text-ink font-semibold'
                }
              >
                {totals.deliveryFee === 0 ? 'Gratis' : formatCOP(totals.deliveryFee)}
              </dd>
            </div>
            <div className="border-line flex justify-between border-t pt-2.5">
              <dt className="text-ink font-extrabold">Total</dt>
              <dd className="text-coral-500 text-xl font-extrabold">{formatCOP(totals.total)}</dd>
            </div>
          </dl>
        </Card>
        <Link to="/tienda" className="text-coral-600 mt-4 block text-center text-[15px] font-bold">
          Seguir comprando
        </Link>
      </div>

      <StickyFooter>
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <p className="text-muted text-xs">Total</p>
            <p className="text-ink text-lg leading-tight font-extrabold">
              {formatCOP(totals.total)}
            </p>
          </div>
          <ButtonLink
            to="/checkout"
            size="lg"
            className="flex-1 px-4"
            iconRight={<ChevronRight className="size-5" aria-hidden />}
          >
            Ir a pagar
          </ButtonLink>
        </div>
      </StickyFooter>
    </div>
  )
}
