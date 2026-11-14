/**
 * Punto de entrada de los stores. Importa desde '@/store'.
 *
 * ⚠️ Zustand v5: un selector NO debe crear arreglos/objetos nuevos
 * (ej. `useBookings(s => s.bookings.filter(...))` → loop infinito).
 * Selecciona el dato crudo y filtra con useMemo, o usa `useShallow`.
 */
export * from './bookings'
export * from './messages'
export * from './notifications'
export * from './cart'
export * from './session'
export * from './toast'
export * from './demo'
