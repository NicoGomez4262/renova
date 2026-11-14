import { ComingSoon } from '@/components/common'

/**
 * Finalizar compra — TAREA A6 (Rol A).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#a6
 */
export default function CheckoutPage() {
  return (
    <ComingSoon
      title="Finalizar compra"
      task="A6"
      role="A"
      todo={[
        'Dirección de entrega (pre-llenada con useSession().lastAddress)',
        'Método de pago (simulado)',
        'Resumen y total → useCart().placeOrder → /pedido-confirmado/:orderId',
      ]}
    />
  )
}
