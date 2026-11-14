import { Link, useParams } from 'react-router'
import { ChevronRight, MapPin, PackageCheck, PackageSearch, Truck, Wrench } from 'lucide-react'
import type { Order } from '@/types'
import { PageHeader } from '@/components/layout'
import { ButtonLink, Card, EmptyState } from '@/components/ui'
import { getCategory, getProduct } from '@/data/catalog'
import { getZone } from '@/data/zones'
import { cn } from '@/lib/cn'
import { formatCOP } from '@/lib/format'
import { paymentLabel } from '@/lib/payments'
import { useCart } from '@/store'
import { ProductThumb } from './parts'

const ORDER_STEPS = ['Confirmado', 'En preparación', 'En camino', 'Entregado']
const STATUS_INDEX: Record<Order['status'], number> = {
  confirmado: 0,
  en_preparacion: 1,
  en_camino: 2,
  entregado: 3,
}

/** Pedido confirmado — Tarea A6 (Rol A). */
export default function OrderConfirmedPage() {
  const { orderId } = useParams()
  const order = useCart((s) => s.orders.find((o) => o.id === orderId))

  if (!order) {
    return (
      <>
        <PageHeader title="Pedido" backTo="/tienda" />
        <EmptyState
          icon={<PackageSearch className="size-7" />}
          title="No encontramos este pedido"
          description="Vuelve a la tienda para seguir comprando."
          action={<ButtonLink to="/tienda">Ir a la tienda</ButtonLink>}
        />
      </>
    )
  }

  const firstProduct = getProduct(order.items[0]?.productId ?? '')
  const service = firstProduct ? getCategory(firstProduct.relatedCategories[0]) : undefined
  const current = STATUS_INDEX[order.status]

  return (
    <div className="animate-fade-in px-5 pt-[max(2rem,env(safe-area-inset-top))] pb-10">
      <div className="flex flex-col items-center text-center">
        <span className="animate-slide-up bg-success-bg flex size-20 items-center justify-center rounded-full">
          <PackageCheck className="text-success size-10" aria-hidden />
        </span>
        <h1 className="font-display-tight text-navy-900 mt-4 text-[2.2rem]">
          ¡Pedido <span className="text-coral-500">confirmado!</span>
        </h1>
        <p className="text-muted mt-2 max-w-sm text-[15px]">
          La ferretería aliada ya está preparando tu pedido. Llega hoy o mañana.
        </p>
        <span className="bg-surface text-ink mt-3 rounded-full px-3 py-1 text-sm font-bold">
          Pedido {order.code}
        </span>
      </div>

      {/* Estado */}
      <ol className="mt-6 grid grid-cols-4 gap-1.5" aria-label="Estado del pedido">
        {ORDER_STEPS.map((s, i) => (
          <li key={s} className="text-center">
            <span
              className={cn('block h-1.5 rounded-full', i <= current ? 'bg-coral-500' : 'bg-line')}
            />
            <span
              className={cn(
                'mt-1.5 block text-xs',
                i <= current ? 'text-ink font-bold' : 'text-muted',
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      {/* Detalle */}
      <Card className="mt-6 rounded-3xl p-5">
        <ul className="space-y-3">
          {order.items.map((item) => {
            const p = getProduct(item.productId)
            if (!p) return null
            return (
              <li key={item.productId} className="flex items-center gap-3">
                <ProductThumb product={p} size={28} className="size-12 rounded-xl" />
                <span className="min-w-0 flex-1">
                  <span className="text-ink line-clamp-2 text-sm leading-tight font-bold">
                    {p.name}
                  </span>
                  <span className="text-muted text-xs">
                    {item.qty} × {formatCOP(item.unitPrice)}
                  </span>
                </span>
                <span className="text-ink shrink-0 font-semibold">
                  {formatCOP(item.qty * item.unitPrice)}
                </span>
              </li>
            )
          })}
        </ul>
        <dl className="border-line mt-4 space-y-2 border-t pt-3 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-muted">Domicilio</dt>
            <dd
              className={
                order.deliveryFee === 0 ? 'text-success font-semibold' : 'text-ink font-semibold'
              }
            >
              {order.deliveryFee === 0 ? 'Gratis' : formatCOP(order.deliveryFee)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink font-extrabold">Total · {paymentLabel(order.paymentMethod)}</dt>
            <dd className="text-coral-500 text-xl font-extrabold">{formatCOP(order.total)}</dd>
          </div>
        </dl>
      </Card>

      <div className="bg-tile-mint text-ink mt-4 space-y-3 rounded-2xl p-4 text-sm">
        <p className="flex gap-3">
          <MapPin className="text-accent-mint size-5 shrink-0" aria-hidden />
          <span>
            <span className="font-bold">{order.address.line}</span> ·{' '}
            {getZone(order.address.zone).name}
            {order.address.details ? ` · ${order.address.details}` : ''}
          </span>
        </p>
        <p className="flex gap-3">
          <Truck className="text-accent-mint size-5 shrink-0" aria-hidden />
          Entrega hoy o mañana, entre 8:00 a. m. y 6:00 p. m.
        </p>
      </div>

      {service && (
        <Link
          to={`/servicios/${service.id}`}
          className="border-line/70 shadow-card mt-4 flex items-center gap-3 rounded-2xl border bg-white p-4 transition active:scale-[0.99]"
        >
          <span className="bg-coral-50 text-coral-600 flex size-11 shrink-0 items-center justify-center rounded-full">
            <Wrench className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-ink block font-bold">¿Necesitas quién lo instale?</span>
            <span className="text-muted block text-sm">
              Reserva un técnico verificado a la hora exacta.
            </span>
          </span>
          <ChevronRight className="text-muted size-5 shrink-0" aria-hidden />
        </Link>
      )}

      <div className="mt-6 space-y-3">
        <ButtonLink to="/tienda" size="lg" fullWidth>
          Seguir comprando
        </ButtonLink>
        <ButtonLink to="/" variant="ghost" fullWidth>
          Ir al inicio
        </ButtonLink>
      </div>
    </div>
  )
}
