import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Conversation, Message, MessageAuthor } from '@/types'
import { uid } from '@/lib/id'
import { seedConversations } from './seed'

/** Respuestas automáticas simuladas del técnico (demo) */
const CANNED_REPLIES = [
  '¡Perfecto! Quedo atento a cualquier cosa.',
  'Entendido. Llevo todo lo necesario para resolverlo.',
  'Claro que sí, te confirmo apenas vaya en camino.',
  'Gracias por el dato, así llego preparado.',
  'Listo, cualquier cambio me escribes por aquí.',
]

interface MessagesState {
  conversations: Conversation[]
  /** Crea (o devuelve) la conversación de una reserva. Devuelve el id. */
  ensureConversation: (technicianId: string, bookingId?: string) => string
  /** Mensaje del cliente. Dispara una respuesta simulada del técnico. */
  sendMessage: (conversationId: string, text: string) => void
  /** Mensaje del sistema o del técnico (lo usan las reservas para avisos) */
  addMessage: (conversationId: string, from: MessageAuthor, text: string) => void
  markRead: (conversationId: string) => void
}

export const useMessages = create<MessagesState>()(
  persist(
    (set, get) => ({
      conversations: seedConversations(),

      ensureConversation: (technicianId, bookingId) => {
        const existing = get().conversations.find(
          (c) => c.technicianId === technicianId && c.bookingId === bookingId,
        )
        if (existing) return existing.id
        const conversation: Conversation = {
          id: uid('c_'),
          technicianId,
          bookingId,
          messages: [],
          unread: 0,
        }
        set((s) => ({ conversations: [conversation, ...s.conversations] }))
        return conversation.id
      },

      sendMessage: (conversationId, text) => {
        const trimmed = text.trim()
        if (!trimmed) return
        get().addMessage(conversationId, 'cliente', trimmed)
        // Respuesta simulada del técnico
        window.setTimeout(() => {
          const reply = CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)]
          get().addMessage(conversationId, 'tecnico', reply)
        }, 1400)
      },

      addMessage: (conversationId, from, text) => {
        const message: Message = { id: uid('m_'), from, text, at: new Date().toISOString() }
        set((s) => ({
          conversations: s.conversations
            .map((c) =>
              c.id === conversationId
                ? {
                    ...c,
                    messages: [...c.messages, message],
                    unread: from === 'cliente' ? c.unread : c.unread + 1,
                  }
                : c,
            )
            // la conversación con actividad más reciente va primero
            .sort((a, b) => lastAt(b).localeCompare(lastAt(a))),
        }))
      },

      markRead: (conversationId) =>
        set((s) => ({
          conversations: s.conversations.map((c) =>
            c.id === conversationId ? { ...c, unread: 0 } : c,
          ),
        })),
    }),
    { name: 'renova-messages', version: 1 },
  ),
)

function lastAt(c: Conversation): string {
  return c.messages[c.messages.length - 1]?.at ?? ''
}

export const useConversation = (id: string | undefined) =>
  useMessages((s) => s.conversations.find((c) => c.id === id))

/** Total de mensajes sin leer (para el badge de la pestaña Mensajes) */
export const useUnreadMessages = () =>
  useMessages((s) => s.conversations.reduce((sum, c) => sum + c.unread, 0))
