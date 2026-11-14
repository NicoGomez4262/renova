import { Outlet, ScrollRestoration } from 'react-router'
import { BottomNav } from './BottomNav'
import { Toaster } from '@/components/ui/Toaster'

/**
 * Raíz: centra la app en una columna tipo celular (en computador se ve
 * como una app móvil centrada). Monta los toasts y el scroll.
 */
export function RootLayout() {
  return (
    <div className="bg-surface min-h-dvh md:py-0">
      <div className="md:border-line md:shadow-float relative mx-auto min-h-dvh max-w-lg bg-white md:border-x">
        <Outlet />
      </div>
      <Toaster />
      <ScrollRestoration />
    </div>
  )
}

/** Pantallas con barra de navegación inferior (pestañas). */
export function TabsLayout() {
  return (
    <>
      <main className="pb-[calc(5rem+env(safe-area-inset-bottom))]">
        <Outlet />
      </main>
      <BottomNav />
    </>
  )
}

/** Pantallas de flujo/detalle: sin barra inferior (tienen su propio encabezado). */
export function FlowLayout() {
  return (
    <main className="min-h-dvh">
      <Outlet />
    </main>
  )
}
