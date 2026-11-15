# Arquitectura

## Stack

| Pieza         | Elección                                        | Por qué                                                        |
| ------------- | ----------------------------------------------- | -------------------------------------------------------------- |
| UI            | **React 19 + TypeScript**                       | Estándar, tipado = menos errores entre dos personas (y con IA) |
| Build         | **Vite 7**                                      | Arranca en milisegundos, despliegue estático                   |
| Estilos       | **Tailwind CSS v4** (tokens en `src/index.css`) | Rápido de iterar, consistente con el sistema de diseño         |
| Rutas         | **React Router 7** (`react-router`)             | Rutas por pantalla, enlaces compartibles                       |
| Estado        | **Zustand 5** + `persist` (localStorage)        | Simple; actúa como "backend simulado"                          |
| Íconos        | **lucide-react**                                | Íconos limpios y livianos                                      |
| PWA           | **vite-plugin-pwa**                             | Instalable en el celular, funciona sin conexión                |
| Hosting       | **Vercel**                                      | Gratis, deploy por push, vista previa por PR                   |
| Auth (Fase 5) | **Supabase** (opcional)                         | Login real en una tarde                                        |

## Estructura de carpetas

```text
src/
├── main.tsx               Punto de entrada (fuentes, estilos, router)
├── router.tsx             TODAS las rutas (ya registradas — no hace falta tocarlo)
├── index.css              Tokens de diseño (@theme) y estilos base
├── types/index.ts         Modelo de datos (contrato compartido)
├── data/                  Datos simulados + funciones de acceso
│   ├── catalog.ts         ← las pantallas leen datos SOLO desde aquí
│   ├── categories.ts  services.ts  technicians.ts  products.ts  zones.ts  faqs.ts
├── store/                 "Backend simulado" (Zustand, guardado en el navegador)
│   ├── bookings.ts        Reservas y su ciclo de vida
│   ├── messages.ts        Chat con respuestas automáticas
│   ├── notifications.ts   Notificaciones
│   ├── cart.ts            Carrito y pedidos de la tienda
│   ├── session.ts         Sesión (invitado; login real en Fase 5)
│   ├── toast.ts           Avisos cortos
│   ├── seed.ts            Datos iniciales de la demo
│   └── demo.ts            resetDemo()
├── lib/                   Utilidades puras
│   ├── format.ts          formatCOP, formatDate, formatTime, formatRelative…
│   ├── slots.ts           Días y horarios disponibles (hora exacta)
│   ├── pricing.ts         calculatePrice (precio claro)
│   ├── answers.ts         describeAnswers (respuestas del formulario → texto)
│   ├── payments.ts        PAYMENT_METHODS, paymentLabel
│   ├── tones.ts           Clases por tono pastel
│   ├── id.ts  cn.ts
├── components/
│   ├── ui/                Base del sistema de diseño (Button, Card, Chip…)
│   ├── layout/            Layouts, TopBar, PageHeader, BottomNav, StickyFooter
│   ├── common/            De dominio (ServiceCard, TechnicianCard, TrustBadges…)
│   └── brand/             Logo, ilustraciones de categorías, casa
└── features/              UNA carpeta por área, con dueño
    ├── home/              Fase 0 (+A7)
    ├── services/          Rol A · A1
    ├── technicians/       Rol A · A2
    ├── booking/           Rol A · A3, A4
    ├── shop/              Rol A · A5, A6
    ├── bookings/          Rol B · B1, B2, B4
    ├── messages/          Rol B · B3
    ├── notifications/     Rol B · B5
    ├── account/           Rol B · B6
    ├── onboarding/        Rol B · B7
    └── misc/              404
```

Cada pantalla es un archivo con `export default`. Si una pantalla crece, crea subcomponentes **dentro de su carpeta de feature** (ej. `src/features/booking/steps/DateStep.tsx`).

## Rutas y layouts

`src/router.tsx` define tres layouts:

- `RootLayout`: centra la app como columna de celular, monta los toasts y restaura el scroll. En pantallas de 1280 px o más muestra `DesktopPanels`: la marca a la izquierda y un QR "Ábrelo en tu celular" a la derecha (para presentar desde un computador).
- `TabsLayout`: pantallas con **barra inferior** (Inicio, Servicios, Tienda, Mensajes, Reservas, Perfil).
- `FlowLayout`: detalle y flujos **sin barra inferior** (tienen `PageHeader` y, si aplica, `StickyFooter`).

Parámetros de URL útiles: `/servicios?q=texto` (búsqueda) y `/reservar/:serviceId?tecnico=:id` (técnico preseleccionado).

## Datos

### Catálogo (solo lectura)

Las pantallas usan las funciones de `@/data/catalog` (`getService`, `getTechniciansForService`, `searchServices`, `getProducts`…), **nunca** los arreglos directamente. Si mañana el catálogo viene de una base de datos, solo cambia `catalog.ts`.

### Estado y "backend simulado" (lectura/escritura)

Los stores de `@/store` guardan todo en `localStorage` (claves `renova-*`), así la demo sobrevive a recargas. La primera vez se cargan los datos de `seed.ts` (2 reservas, 2 conversaciones, 3 notificaciones). **Perfil → Reiniciar demo** llama `resetDemo()`.

```tsx
import { useBookings, useBooking, toast } from '@/store'

const booking = useBooking(id) // una reserva
const advance = useBookings((s) => s.advanceStatus) // una acción
```

> ⚠️ **Regla de Zustand v5:** un selector **no puede** devolver un arreglo u objeto nuevo en cada render (ej. `useBookings(s => s.bookings.filter(...))`) → bucle infinito. Selecciona el dato crudo y deriva con `useMemo`:
>
> ```tsx
> const bookings = useBookings((s) => s.bookings)
> const upcoming = useMemo(
>   () => bookings.filter((b) => ACTIVE_STATUSES.includes(b.status)),
>   [bookings],
> )
> ```

### Ciclo de vida de una reserva

```text
               (servicio de cotización)               (servicio de precio fijo)
createBooking ─► cotizacion_pendiente ─► cotizada ─┐   createBooking ─┐
                                                    ▼                  ▼
                                               confirmada ─► en_camino ─► en_progreso ─► finalizada
                                                    │             │                         │
                                                    └──► cancelada ◄┘            garantía 30 días + calificar
```

| Acción (`useBookings`)                            | Quién la usa          | Qué hace además                                                                              |
| ------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------- |
| `createBooking(draft)`                            | A4 (flujo de reserva) | Asigna técnico si es `null`, calcula precio, crea PIN y código, abre conversación y notifica |
| `advanceStatus(id)`                               | B2 ("Simular avance") | Pasa al siguiente estado, escribe en el chat y notifica; al finalizar activa la garantía     |
| `acceptQuote(id)`                                 | B2                    | `cotizada` → `confirmada`                                                                    |
| `cancelBooking(id)`, `rescheduleBooking(id, iso)` | B2                    | Solo en estados `CANCELLABLE`                                                                |
| `rateBooking(id, rating)`                         | B4                    | Guarda la calificación                                                                       |
| `claimWarranty(id, claim)`                        | B4                    | Registra la solicitud de garantía y notifica                                                 |

`STATUS_META[status]` da la etiqueta y el tono del `Badge` para cada estado.

## Archivos compartidos y dueños

| Archivo / carpeta                                | Dueño           | Regla                                                                    |
| ------------------------------------------------ | --------------- | ------------------------------------------------------------------------ |
| `src/features/<área>`                            | Rol de esa área | Libre                                                                    |
| `src/router.tsx`                                 | Fase 0          | Ya tiene todas las rutas. Si de verdad necesitas una nueva, PR aparte    |
| `src/types/index.ts`                             | Compartido      | Solo agregar campos opcionales                                           |
| `src/data/*`                                     | Compartido      | Solo agregar datos                                                       |
| `src/store/*`                                    | Compartido      | Agregar acciones nuevas sin cambiar las existentes                       |
| `src/components/ui`, `common`, `layout`, `brand` | Compartido      | Componentes nuevos en archivos nuevos; cambios a existentes en PR aparte |
| `src/index.css`                                  | Compartido      | Agregar tokens, no cambiar los existentes                                |
| `src/features/home/HomePage.tsx`                 | Rol A (A7)      | Rol B solo agrega la redirección de bienvenida (B7), avisando            |

## PWA

- Configurada en `vite.config.ts` (manifiesto, íconos en `public/icons`, service worker con actualización automática).
- Para regenerar el favicon y los íconos (techo blanco sobre naranja `#EE5A36`): `npm i -D playwright && npx playwright install chromium && node scripts/generate-icons.mjs`.
- El service worker solo funciona en el build (`npm run build && npm run preview`) o en Vercel, no en `npm run dev`.

## Fase 5 · Plan para datos y login reales (Supabase)

1. `src/lib/supabase.ts` crea el cliente con `import.meta.env.VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
2. `src/store/session.ts`: `signIn`, `signUp`, `signOut` usan Supabase Auth **sin cambiar sus firmas** (las pantallas de B6 no cambian). `AUTH_ENABLED = true`.
3. (Extra) Tabla `bookings (id uuid, user_id uuid, data jsonb, created_at)` con RLS `user_id = auth.uid()`. `createBooking` inserta cuando hay sesión.
4. Variables en `.env.local` (local) y en Vercel → _Settings → Environment Variables_. **Nunca** subir llaves al repo.
