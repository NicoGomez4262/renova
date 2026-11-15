import { Link } from 'react-router'
import { Bell } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { useUnreadNotifications } from '@/store'

/** Barra superior de Inicio: logo + campana de notificaciones. */
export function TopBar() {
  const unread = useUnreadNotifications()
  return (
    <header className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-2">
      <Link to="/" aria-label="Renova, inicio">
        <Logo size={26} />
      </Link>
      <Link
        to="/notificaciones"
        aria-label={unread > 0 ? `Notificaciones, ${unread} sin leer` : 'Notificaciones'}
        className="border-line shadow-card relative flex size-12 items-center justify-center rounded-full border bg-white"
      >
        <Bell className="text-navy-900 size-5.5" aria-hidden />
        {unread > 0 && (
          <span className="bg-coral-500 absolute top-1.5 right-1.5 size-3 rounded-full border-2 border-white" />
        )}
      </Link>
    </header>
  )
}
