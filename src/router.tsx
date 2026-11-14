/**
 * ─────────────────────────────────────────────────────────────
 *  Rutas de la app. TODAS las pantallas ya están registradas:
 *  para implementar una tarea solo reemplazas el archivo de la
 *  pantalla en src/features/... (no necesitas tocar este archivo).
 *
 *  TabsLayout  → pantallas con barra inferior (pestañas).
 *  FlowLayout  → detalle y flujos: sin barra inferior.
 * ─────────────────────────────────────────────────────────────
 */
import { createBrowserRouter } from 'react-router'
import { FlowLayout, RootLayout, TabsLayout } from '@/components/layout'

import HomePage from '@/features/home/HomePage'
// Rol A — Descubrir, reservar y comprar
import ServicesPage from '@/features/services/ServicesPage'
import CategoryPage from '@/features/services/CategoryPage'
import ServiceDetailPage from '@/features/services/ServiceDetailPage'
import TechnicianPage from '@/features/technicians/TechnicianPage'
import BookingFlowPage from '@/features/booking/BookingFlowPage'
import BookingConfirmedPage from '@/features/booking/BookingConfirmedPage'
import ShopPage from '@/features/shop/ShopPage'
import ProductPage from '@/features/shop/ProductPage'
import CartPage from '@/features/shop/CartPage'
import CheckoutPage from '@/features/shop/CheckoutPage'
import OrderConfirmedPage from '@/features/shop/OrderConfirmedPage'
// Rol B — Acompañar: reservas, mensajes y cuenta
import BookingsPage from '@/features/bookings/BookingsPage'
import BookingDetailPage from '@/features/bookings/BookingDetailPage'
import RateBookingPage from '@/features/bookings/RateBookingPage'
import WarrantyPage from '@/features/bookings/WarrantyPage'
import MessagesPage from '@/features/messages/MessagesPage'
import ChatPage from '@/features/messages/ChatPage'
import NotificationsPage from '@/features/notifications/NotificationsPage'
import ProfilePage from '@/features/account/ProfilePage'
import LoginPage from '@/features/account/LoginPage'
import RegisterPage from '@/features/account/RegisterPage'
import HelpPage from '@/features/account/HelpPage'
import OnboardingPage from '@/features/onboarding/OnboardingPage'
import JoinAsProPage from '@/features/onboarding/JoinAsProPage'
import NotFoundPage from '@/features/misc/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <TabsLayout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/servicios', element: <ServicesPage /> }, // A1
          { path: '/servicios/:categoryId', element: <CategoryPage /> }, // A1
          { path: '/tienda', element: <ShopPage /> }, // A5
          { path: '/mensajes', element: <MessagesPage /> }, // B3
          { path: '/reservas', element: <BookingsPage /> }, // B1
          { path: '/perfil', element: <ProfilePage /> }, // B6
        ],
      },
      {
        element: <FlowLayout />,
        children: [
          // Rol A
          { path: '/servicio/:serviceId', element: <ServiceDetailPage /> }, // A1
          { path: '/tecnicos/:technicianId', element: <TechnicianPage /> }, // A2
          { path: '/reservar/:serviceId', element: <BookingFlowPage /> }, // A3 + A4
          { path: '/reserva-confirmada/:bookingId', element: <BookingConfirmedPage /> }, // A4
          { path: '/tienda/:productId', element: <ProductPage /> }, // A5
          { path: '/carrito', element: <CartPage /> }, // A6
          { path: '/checkout', element: <CheckoutPage /> }, // A6
          { path: '/pedido-confirmado/:orderId', element: <OrderConfirmedPage /> }, // A6
          // Rol B
          { path: '/reservas/:bookingId', element: <BookingDetailPage /> }, // B2
          { path: '/reservas/:bookingId/calificar', element: <RateBookingPage /> }, // B4
          { path: '/reservas/:bookingId/garantia', element: <WarrantyPage /> }, // B4
          { path: '/mensajes/:conversationId', element: <ChatPage /> }, // B3
          { path: '/notificaciones', element: <NotificationsPage /> }, // B5
          { path: '/ingresar', element: <LoginPage /> }, // B6
          { path: '/registro', element: <RegisterPage /> }, // B6
          { path: '/ayuda', element: <HelpPage /> }, // B6
          { path: '/bienvenida', element: <OnboardingPage /> }, // B7
          { path: '/unete', element: <JoinAsProPage /> }, // B7
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
