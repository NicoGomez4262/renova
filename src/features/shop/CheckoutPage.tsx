import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Clock, LoaderCircle, Lock, MapPin, ShoppingBag } from 'lucide-react'
import type { PaymentMethod, ZoneId } from '@/types'
import { PageHeader, StickyFooter } from '@/components/layout'
import { Button, ButtonLink, Card, Chip, EmptyState, OptionTile, TextField } from '@/components/ui'
import { PaymentIcon } from '@/components/common'
import { getProduct } from '@/data/catalog'
import { PILOT_ZONES } from '@/data/zones'
import { formatCOP } from '@/lib/format'
import { PAYMENT_METHODS } from '@/lib/payments'
import { getCartTotals, toast, useCart, useSession, useToast } from '@/store'

/** En la tienda el efectivo es contra entrega */
const HINTS: Partial<Record<PaymentMethod, string>> = { efectivo: 'Contra entrega' }

/** Finalizar compra — Tarea A6 (Rol A). Pago simulado. */
export default function CheckoutPage() {
  const navigate = useNavigate()
  const items = useCart((s) => s.items)
  const placeOrder = useCart((s) => s.placeOrder)
  const lastAddress = useSession((s) => s.lastAddress)
  const setLastAddress = useSession((s) => s.setLastAddress)
  const totals = useMemo(() => getCartTotals(items), [items])

  const [zone, setZone] = useState<ZoneId | null>(lastAddress?.zone ?? null)
  const [line, setLine] = useState(lastAddress?.line ?? '')
  const [details, setDetails] = useState(lastAddress?.details ?? '')
  const [payment, setPayment] = useState<PaymentMethod | null>(null)
  const [showErrors, setShowErrors] = useState(false)
  const [processing, setProcessing] = useState(false)

  if (items.length === 0) {
    if (processing) return null // el pedido se está creando: evita parpadeo
    return (
      <>
        <PageHeader title="Finalizar compra" backTo="/tienda" />
        <EmptyState
          icon={<ShoppingBag className="size-7" />}
          title="No hay productos para pagar"
          description="Agrega productos a tu carrito desde la tienda."
          action={<ButtonLink to="/tienda">Ir a la tienda</ButtonLink>}
        />
      </>
    )
  }

  const errors = {
    zone: !zone ? 'Elige tu localidad' : undefined,
    line: line.trim().length < 5 ? 'Escribe la dirección completa, ej. Cra 7 # 72-41' : undefined,
    payment: !payment ? 'Elige cómo vas a pagar' : undefined,
  }
  const invalid = Object.values(errors).some(Boolean)

  const onConfirm = () => {
    if (invalid) {
      setShowErrors(true)
      toast('Revisa los datos marcados', 'error')
      requestAnimationFrame(() =>
        document
          .querySelector('.text-danger')
          ?.scrollIntoView({ block: 'center', behavior: 'smooth' }),
      )
      return
    }
    const address = { zone: zone!, line: line.trim(), details: details.trim() || undefined }
    setProcessing(true)
    // Pago simulado: una pequeña espera para que se sienta real en la demo
    window.setTimeout(() => {
      setLastAddress(address)
      const order = placeOrder({ address, paymentMethod: payment! })
      if (order) {
        useToast.setState({ toasts: [] })
        navigate(`/pedido-confirmado/${order.id}`, { replace: true })
      } else setProcessing(false)
    }, 900)
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Finalizar compra" />

      <div className="space-y-5 px-5 pt-5">
        {/* Entrega */}
        <Card className="space-y-5 rounded-3xl p-5">
          <h2 className="text-ink flex items-center gap-2 font-extrabold">
            <MapPin className="text-navy-700 size-5" aria-hidden />
            ¿Dónde lo entregamos?
          </h2>
          <fieldset>
            <legend className="text-ink mb-2 text-[15px] font-bold">Localidad</legend>
            <div className="flex flex-wrap gap-2">
              {PILOT_ZONES.map((z) => (
                <Chip key={z.id} selected={zone === z.id} onClick={() => setZone(z.id)}>
                  {z.name}
                </Chip>
              ))}
            </div>
            {showErrors && errors.zone && (
              <p className="text-danger mt-1.5 text-sm">{errors.zone}</p>
            )}
          </fieldset>
          <TextField
            label="Dirección"
            placeholder="Ej. Cra 7 # 72-41"
            autoComplete="street-address"
            maxLength={80}
            value={line}
            onChange={(e) => setLine(e.target.value)}
            error={showErrors ? errors.line : undefined}
          />
          <TextField
            label="Apto, torre o indicaciones (opcional)"
            placeholder="Ej. Apto 502, torre 2"
            maxLength={80}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <p className="text-muted flex items-center gap-2 text-sm">
            <Clock className="size-4 shrink-0" aria-hidden />
            Entrega hoy o mañana, entre 8:00 a. m. y 6:00 p. m.
          </p>
        </Card>

        {/* Pago */}
        <fieldset>
          <legend className="text-ink mb-2 text-[15px] font-bold">¿Cómo vas a pagar?</legend>
          <div className="grid grid-cols-2 gap-2.5">
            {PAYMENT_METHODS.map((m) => (
              <OptionTile
                key={m.id}
                label={m.label}
                description={HINTS[m.id] ?? m.hint}
                selected={payment === m.id}
                onClick={() => setPayment(m.id)}
                icon={<PaymentIcon method={m.id} className="text-navy-700 size-6" />}
                className="min-h-24"
              />
            ))}
          </div>
          {showErrors && errors.payment && (
            <p className="text-danger mt-1.5 text-sm">{errors.payment}</p>
          )}
        </fieldset>

        {/* Resumen */}
        <Card className="rounded-3xl p-5">
          <h2 className="text-ink mb-3 font-extrabold">Tu pedido</h2>
          <ul className="space-y-2 text-[15px]">
            {items.map((i) => {
              const p = getProduct(i.productId)
              if (!p) return null
              return (
                <li key={i.productId} className="flex justify-between gap-4">
                  <span className="text-ink min-w-0">
                    <span className="font-bold">{i.qty} ×</span> {p.name}
                  </span>
                  <span className="text-ink shrink-0 font-semibold">
                    {formatCOP(p.price * i.qty)}
                  </span>
                </li>
              )
            })}
          </ul>
          <dl className="border-line mt-3 space-y-2 border-t pt-3 text-[15px]">
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
            <div className="flex justify-between">
              <dt className="text-ink font-extrabold">Total</dt>
              <dd className="text-coral-500 text-xl font-extrabold">{formatCOP(totals.total)}</dd>
            </div>
          </dl>
        </Card>

        <p className="text-muted flex items-center justify-center gap-2 pb-2 text-center text-sm">
          <Lock className="size-4 shrink-0" aria-hidden />
          Pago simulado: en el piloto no se cobra nada.
        </p>
      </div>

      <StickyFooter>
        <Button size="lg" fullWidth onClick={onConfirm} disabled={processing}>
          {processing ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden />
              Procesando pago…
            </>
          ) : (
            `Pagar ${formatCOP(totals.total)}`
          )}
        </Button>
      </StickyFooter>
    </div>
  )
}
