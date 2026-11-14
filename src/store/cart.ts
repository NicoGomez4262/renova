import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Address, CartItem, Order, PaymentMethod } from '@/types'
import { getProduct } from '@/data/catalog'
import { humanCode, uid } from '@/lib/id'
import { useNotifications } from './notifications'

/** Domicilio gratis desde este subtotal */
export const FREE_DELIVERY_FROM = 150000
export const DELIVERY_FEE = 8000

interface CartState {
  items: CartItem[]
  orders: Order[]
  add: (productId: string, qty?: number) => void
  setQty: (productId: string, qty: number) => void
  remove: (productId: string) => void
  clear: () => void
  /** Crea el pedido con lo que hay en el carrito y lo vacía. Devuelve el pedido. */
  placeOrder: (input: { address: Address; paymentMethod: PaymentMethod }) => Order | undefined
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],
      add: (productId, qty = 1) =>
        set((s) => {
          const found = s.items.find((i) => i.productId === productId)
          return {
            items: found
              ? s.items.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i))
              : [...s.items, { productId, qty }],
          }
        }),
      setQty: (productId, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.productId !== productId)
              : s.items.map((i) => (i.productId === productId ? { ...i, qty } : i)),
        })),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
      placeOrder: ({ address, paymentMethod }) => {
        const { items } = get()
        if (items.length === 0) return undefined
        const lines = items.map((i) => ({
          productId: i.productId,
          qty: i.qty,
          unitPrice: getProduct(i.productId)?.price ?? 0,
        }))
        const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0)
        const deliveryFee = subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE
        const order: Order = {
          id: uid('o_'),
          code: humanCode('PD'),
          items: lines,
          subtotal,
          deliveryFee,
          total: subtotal + deliveryFee,
          address,
          paymentMethod,
          status: 'confirmado',
          createdAt: new Date().toISOString(),
        }
        set((s) => ({ orders: [order, ...s.orders], items: [] }))
        useNotifications.getState().push({
          kind: 'tienda',
          title: 'Pedido confirmado',
          body: `Tu pedido ${order.code} llega hoy o mañana.`,
          link: `/pedido-confirmado/${order.id}`,
        })
        return order
      },
    }),
    { name: 'renova-cart', version: 1 },
  ),
)

/** Totales del carrito calculados (usar en Carrito y Checkout) */
export function getCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, i) => sum + (getProduct(i.productId)?.price ?? 0) * i.qty, 0)
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    count: items.reduce((n, i) => n + i.qty, 0),
  }
}

/** Cantidad de unidades en el carrito (para el badge) */
export const useCartCount = () => useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
