import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppNotification } from '@/types'
import { uid } from '@/lib/id'
import { seedNotifications } from './seed'

interface NotificationsState {
  items: AppNotification[]
  push: (n: Omit<AppNotification, 'id' | 'at' | 'read'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
}

export const useNotifications = create<NotificationsState>()(
  persist(
    (set) => ({
      items: seedNotifications(),
      push: (n) =>
        set((s) => ({
          items: [{ ...n, id: uid('n_'), at: new Date().toISOString(), read: false }, ...s.items],
        })),
      markRead: (id) =>
        set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
      markAllRead: () => set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
    }),
    { name: 'renova-notifications', version: 1 },
  ),
)

/** Número de notificaciones sin leer (para el punto rojo de la campana) */
export const useUnreadNotifications = () =>
  useNotifications((s) => s.items.filter((n) => !n.read).length)
