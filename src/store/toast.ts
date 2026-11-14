import { create } from 'zustand'
import { uid } from '@/lib/id'

export interface Toast {
  id: string
  message: string
  tone: 'default' | 'success' | 'error'
}

interface ToastState {
  toasts: Toast[]
  show: (message: string, tone?: Toast['tone']) => void
  dismiss: (id: string) => void
}

/** Avisos cortos en pantalla. Uso: `toast('Guardado', 'success')` */
export const useToast = create<ToastState>()((set, get) => ({
  toasts: [],
  show: (message, tone = 'default') => {
    const id = uid('t_')
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }))
    window.setTimeout(() => get().dismiss(id), 2800)
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

/** Atajo para usar fuera de componentes o en handlers */
export const toast = (message: string, tone?: Toast['tone']) =>
  useToast.getState().show(message, tone)
