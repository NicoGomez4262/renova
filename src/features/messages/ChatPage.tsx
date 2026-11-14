import { ComingSoon } from '@/components/common'

/**
 * Chat — TAREA B3 (Rol B).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#b3
 */
export default function ChatPage() {
  return (
    <ComingSoon
      title="Chat"
      task="B3"
      role="B"
      todo={[
        'Burbujas cliente / técnico / Renova con hora',
        'Encabezado con técnico y enlace a la reserva',
        'Caja de texto fija abajo → useMessages().sendMessage (el técnico responde solo)',
        'Marcar como leída al abrir (markRead) y auto-scroll al final',
      ]}
    />
  )
}
