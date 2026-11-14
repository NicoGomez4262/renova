/**
 * ─────────────────────────────────────────────────────────────
 *  RENOVA · Modelo de datos (contrato compartido entre Rol A y Rol B)
 *
 *  ⚠️ Archivo COMPARTIDO. Si necesitas cambiarlo:
 *   - Agrega campos opcionales (no borres ni renombres los existentes).
 *   - Haz el cambio en un PR pequeño y avisa a tu compañero/a.
 *  Ver docs/04-arquitectura.md
 * ─────────────────────────────────────────────────────────────
 */

/* ───────────── Catálogo ───────────── */

/** Tonos visuales disponibles (ver tokens tile-* / accent-* en index.css) */
export type Tone = 'sky' | 'mint' | 'peach' | 'butter' | 'lilac' | 'teal'

export type CategoryId =
  'plomeria' | 'electricidad' | 'pintura' | 'limpieza' | 'instalaciones' | 'electrodomesticos'

export interface Category {
  id: CategoryId
  name: string
  /** Frase corta para tarjetas y encabezados */
  tagline: string
  tone: Tone
  /** Precio "desde" que se muestra en Inicio (COP) */
  fromPrice: number
}

/**
 * Tipo de precio:
 *  - 'fijo': precio cerrado, se reserva directo (precio claro).
 *  - 'cotizacion': el técnico revisa la solicitud y envía una propuesta
 *    antes de confirmar (ej. pintura). Se muestra "Desde $X".
 */
export type PriceType = 'fijo' | 'cotizacion'

/** Preguntas dinámicas del paso "Detalles" del flujo de reserva */
export type ServiceQuestion =
  | {
      id: string
      type: 'options'
      label: string
      options: { value: string; label: string }[]
      /** true = el cliente puede elegir varias */
      multiple?: boolean
      required?: boolean
    }
  | {
      id: string
      type: 'number'
      label: string
      unit?: string
      placeholder?: string
      min?: number
      max?: number
      required?: boolean
    }
  | {
      id: string
      type: 'text'
      label: string
      placeholder?: string
      required?: boolean
    }
  | {
      id: string
      type: 'photos'
      label: string
      hint?: string
      required?: boolean
    }

export interface Service {
  id: string
  categoryId: CategoryId
  name: string
  description: string
  /** Lista de lo que incluye el servicio */
  includes: string[]
  priceType: PriceType
  /** Precio fijo o precio "desde" (COP) */
  price: number
  /** Unidad del precio, ej. "por visita", "por m²" */
  priceUnit?: string
  /** Duración estimada en minutos */
  durationMin: number
  /** true = aparece en "Servicios populares" */
  popular?: boolean
  questions: ServiceQuestion[]
}

/* ───────────── Técnicos ───────────── */

/** Localidades de Bogotá. Las del piloto son las de `PILOT_ZONES` */
export type ZoneId =
  | 'usaquen'
  | 'chapinero'
  | 'suba'
  | 'teusaquillo'
  | 'barrios-unidos'
  | 'engativa'
  | 'kennedy'
  | 'fontibon'

export interface Zone {
  id: ZoneId
  name: string
  /** true = Renova ya opera en esta localidad (piloto) */
  active: boolean
}

/** Verificaciones que hace Renova a cada técnico (propuesta de valor: confianza) */
export interface TechnicianVerification {
  identity: boolean // Identidad verificada
  background: boolean // Antecedentes revisados
  health: boolean // Afiliado a salud
  training: boolean // Capacitación Renova
}

export interface Technician {
  id: string
  name: string
  /** Título corto, ej. "Plomero" o "Técnico de electrodomésticos" */
  title: string
  categories: CategoryId[]
  rating: number
  reviewsCount: number
  jobsCompleted: number
  yearsExperience: number
  zone: ZoneId
  /** Distancia simulada al cliente (km) */
  distanceKm: number
  verification: TechnicianVerification
  bio: string
  /** Etiquetas destacadas, ej. "Puntual", "Top Renova" */
  badges: string[]
  /** Año desde el que trabaja con Renova */
  memberSince: number
  /** Color del avatar (no usamos fotos reales en el piloto) */
  tone: Tone
}

export interface Review {
  id: string
  technicianId: string
  author: string
  rating: number
  /** Fecha ISO */
  date: string
  serviceName: string
  text: string
}

/* ───────────── Reservas ───────────── */

/**
 * Ciclo de vida de una reserva:
 *
 *  cotizacion_pendiente → cotizada → confirmada → en_camino → en_progreso → finalizada
 *                                   ↑ (servicios de precio fijo arrancan aquí)
 *  Cualquier estado antes de en_progreso puede pasar a → cancelada
 */
export type BookingStatus =
  | 'cotizacion_pendiente'
  | 'cotizada'
  | 'confirmada'
  | 'en_camino'
  | 'en_progreso'
  | 'finalizada'
  | 'cancelada'

export type PaymentMethod = 'tarjeta' | 'efectivo' | 'nequi' | 'daviplata'

/** Respuestas del paso "Detalles": clave = ServiceQuestion.id */
export type BookingAnswers = Record<string, string | number | string[]>

export interface Address {
  zone: ZoneId
  /** Dirección, ej. "Cra 7 # 72-41" */
  line: string
  /** Apto, torre, indicaciones */
  details?: string
}

/** Desglose de precio claro */
export interface PriceBreakdown {
  /** Precio del servicio (fijo) o estimado (cotización) */
  service: number
  /** Tarifa de visita/plataforma que paga el cliente (0 en el piloto si se decide) */
  visitFee: number
  total: number
  /** true mientras la cotización no esté aceptada */
  isEstimate: boolean
}

export interface Rating {
  stars: number
  tags: string[]
  comment?: string
  /** Fecha ISO */
  at: string
}

export interface WarrantyClaim {
  id: string
  reason: string
  description: string
  photos: string[]
  /** Fecha ISO */
  createdAt: string
  status: 'recibida' | 'en_revision' | 'resuelta'
}

/** Lo que el flujo de reserva (Rol A) entrega a `createBooking` */
export interface BookingDraft {
  serviceId: string
  answers: BookingAnswers
  notes?: string
  /** Fotos adjuntas como data URLs (comprimidas) o nombres de archivo */
  photos: string[]
  address: Address
  /** Fecha y hora exacta de llegada (ISO) */
  scheduledAt: string
  /** null = "Asignar al mejor técnico disponible" */
  technicianId: string | null
  paymentMethod: PaymentMethod
}

export interface Booking extends BookingDraft {
  id: string
  /** Código legible para el cliente, ej. "RN-4821" */
  code: string
  categoryId: CategoryId
  /** Siempre asignado una vez creada la reserva */
  technicianId: string
  status: BookingStatus
  statusHistory: { status: BookingStatus; at: string }[]
  price: PriceBreakdown
  /**
   * PIN de seguridad de 4 dígitos. El técnico debe decirlo al llegar
   * para que el cliente confirme su identidad (confianza).
   */
  securityPin: string
  rating?: Rating
  /** Fecha ISO hasta la que aplica la garantía (30 días después de finalizar) */
  warrantyUntil?: string
  warrantyClaims: WarrantyClaim[]
  conversationId: string
  createdAt: string
}

/* ───────────── Mensajes ───────────── */

export type MessageAuthor = 'cliente' | 'tecnico' | 'renova'

export interface Message {
  id: string
  from: MessageAuthor
  text: string
  /** Fecha ISO */
  at: string
}

export interface Conversation {
  id: string
  technicianId: string
  bookingId?: string
  messages: Message[]
  /** Mensajes del técnico/Renova que el cliente no ha visto */
  unread: number
}

/* ───────────── Notificaciones ───────────── */

export interface AppNotification {
  id: string
  title: string
  body: string
  /** Fecha ISO */
  at: string
  read: boolean
  /** Ruta interna a la que lleva al tocarla, ej. "/reservas/abc" */
  link?: string
  kind: 'reserva' | 'mensaje' | 'promo' | 'garantia' | 'tienda'
}

/* ───────────── Tienda (marketplace) ───────────── */

export type ProductCategory = 'pintura' | 'plomeria' | 'electricidad' | 'herramientas' | 'limpieza'

export interface Store {
  id: string
  name: string
  zone: ZoneId
}

export interface Product {
  id: string
  name: string
  category: ProductCategory
  description: string
  price: number
  /** Precio antes del descuento, si aplica */
  oldPrice?: number
  /** Ej. "galón", "unidad", "kit" */
  unit: string
  storeId: string
  rating: number
  stock: number
  /** Servicios en los que se suele necesitar (para recomendaciones) */
  relatedCategories: CategoryId[]
  tone: Tone
}

export interface CartItem {
  productId: string
  qty: number
}

export interface Order {
  id: string
  code: string
  items: { productId: string; qty: number; unitPrice: number }[]
  subtotal: number
  deliveryFee: number
  total: number
  address: Address
  paymentMethod: PaymentMethod
  status: 'confirmado' | 'en_preparacion' | 'en_camino' | 'entregado'
  createdAt: string
}

/* ───────────── Sesión ───────────── */

export interface User {
  id: string
  name: string
  email: string
  phone?: string
}
