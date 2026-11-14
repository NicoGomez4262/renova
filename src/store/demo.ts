import { useBookings } from './bookings'
import { useCart } from './cart'
import { useMessages } from './messages'
import { useNotifications } from './notifications'
import { useSession } from './session'
import { seedBookings, seedConversations, seedNotifications } from './seed'

/** Vuelve la app al estado inicial de la demo (útil antes de presentar). */
export function resetDemo() {
  useBookings.setState({ bookings: seedBookings() })
  useMessages.setState({ conversations: seedConversations() })
  useNotifications.setState({ items: seedNotifications() })
  useCart.setState({ items: [], orders: [] })
  useSession.setState({ hasSeenOnboarding: false, favorites: [] })
}
