import { ComingSoon } from '@/components/common'

/**
 * Carrito — TAREA A6 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a6
 */
export default function CartPage() {
  return (
    <ComingSoon
      title="Carrito"
      task="A6"
      role="A"
      todo={[
        'Lista de productos con +/− cantidad y eliminar',
        'Subtotal, domicilio (gratis desde $150.000) y total (getCartTotals)',
        'Estado vacío con enlace a la tienda',
        'Botón "Ir a pagar" → /checkout',
      ]}
    />
  )
}
