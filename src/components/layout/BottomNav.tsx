import { NavLink } from 'react-router'
import { CalendarDays, House, MessageSquare, ShoppingBag, User } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useCartCount, useUnreadMessages } from '@/store'

const TABS = [
  { to: '/', label: 'Inicio', icon: House, end: true },
  { to: '/tienda', label: 'Tienda', icon: ShoppingBag },
  { to: '/mensajes', label: 'Mensajes', icon: MessageSquare },
  { to: '/reservas', label: 'Reservas', icon: CalendarDays },
  { to: '/perfil', label: 'Perfil', icon: User },
] as const

/** Barra de navegación inferior (5 pestañas). */
export function BottomNav() {
  const unread = useUnreadMessages()
  const cart = useCartCount()
  const badges: Record<string, number> = { '/mensajes': unread, '/tienda': cart }

  return (
    <nav
      aria-label="Navegación principal"
      className="border-line pb-safe fixed inset-x-0 bottom-0 z-40 mx-auto max-w-lg border-t bg-white/95 backdrop-blur"
    >
      <ul className="grid h-16 grid-cols-5">
        {TABS.map(({ to, label, icon: Icon, ...rest }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={'end' in rest}
              className={({ isActive }) =>
                cn(
                  'relative flex h-full flex-col items-center justify-center gap-1 text-xs transition-colors',
                  isActive ? 'text-navy-900 font-extrabold' : 'text-muted font-semibold',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon
                      className={cn('size-6', isActive && 'fill-navy-900/15')}
                      strokeWidth={isActive ? 2.4 : 1.8}
                      aria-hidden
                    />
                    {badges[to] > 0 && (
                      <span className="bg-coral-500 absolute -top-1.5 -right-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10px] font-extrabold text-white">
                        {badges[to] > 9 ? '9+' : badges[to]}
                      </span>
                    )}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
