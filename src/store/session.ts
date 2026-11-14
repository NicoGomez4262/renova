/**
 * Sesión del usuario.
 *
 * En el piloto NO hay autenticación real: todos navegan como invitado.
 * Las pantallas de Ingresar/Registro existen (para mostrar la función),
 * pero `signIn`/`signUp` responden "próximamente".
 * Fase 5 (opcional): reemplazar estas funciones por Supabase Auth.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Address, User } from '@/types'

export type AuthResult = { ok: true; user: User } | { ok: false; reason: 'coming_soon' | 'invalid' }

/** Cambia a true cuando la autenticación real esté conectada (Fase 5) */
export const AUTH_ENABLED = false

interface SessionState {
  user: User | null
  hasSeenOnboarding: boolean
  /** Última dirección usada: el flujo de reserva/checkout la pre-llena */
  lastAddress: Address | null
  /** Ids de técnicos favoritos */
  favorites: string[]
  completeOnboarding: () => void
  setLastAddress: (address: Address) => void
  toggleFavorite: (technicianId: string) => void
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>
  signOut: () => void
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      hasSeenOnboarding: false,
      lastAddress: { zone: 'chapinero', line: 'Cra 7 # 72-41', details: 'Apto 502, torre 2' },
      favorites: [],
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      setLastAddress: (lastAddress) => set({ lastAddress }),
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      // TODO Fase 5: conectar con Supabase Auth
      signIn: async () => ({ ok: false, reason: 'coming_soon' }),
      signUp: async () => ({ ok: false, reason: 'coming_soon' }),
      signOut: () => set({ user: null }),
    }),
    { name: 'renova-session', version: 1 },
  ),
)
