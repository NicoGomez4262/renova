# Fases, roles y tareas

Plan para que **2 personas trabajen en paralelo** y en **1 a 2 días** tengamos una primera versión muy buena de Renova, enfocada en la **experiencia del cliente**.

> **Cómo leer este documento**
>
> 1. Mira la [línea de tiempo](#línea-de-tiempo) y [tu rol](#roles).
> 2. Lee las [reglas para no pisarnos](#reglas-para-trabajar-en-paralelo-sin-conflictos).
> 3. Toma tu tarea de la fase actual, crea tu rama y, si usas Claude Code, pega el **prompt sugerido**.
> 4. Marca la casilla en el [README](../README.md#estado) cuando tu PR se integre a `main`.

---

## Roles

La app está partida por **recorrido del cliente**, no por capas técnicas. Así cada quien es dueño de pantallas completas (vista + lógica) y casi nunca editamos los mismos archivos.

|               | **Rol A · Contratar**                                                                                                             | **Rol B · Acompañar**                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Misión**    | Que el cliente encuentre lo que necesita y reserve (o compre) en pocos toques, con confianza.                                     | Que el cliente se sienta acompañado después de reservar: seguimiento, chat, calificación, garantía y su cuenta.                                                               |
| **Pantallas** | Servicios, categoría, detalle de servicio, perfil del técnico, **flujo de reserva**, confirmación, **tienda**, carrito, checkout. | Mis reservas, **detalle de reserva** (estados en vivo), chat, notificaciones, calificar, garantía, perfil, ingresar/registro (visual), ayuda, bienvenida, únete como técnico. |
| **Carpetas**  | `src/features/services`, `technicians`, `booking`, `shop`                                                                         | `src/features/bookings`, `messages`, `notifications`, `account`, `onboarding`                                                                                                 |
| **Quién**     | @NicoGomez4262 _(sugerido: también conecta Vercel)_                                                                               | Compañero/a colaborador/a                                                                                                                                                     |

> ¿Prefieren cambiar los roles? Edítenlo en esta tabla y en el README. Lo importante es que **cada carpeta tenga un solo dueño**.

**Punto de unión entre roles:** la reserva (`Booking`). Rol A la **crea** con `createBooking()` al final del flujo; Rol B la **muestra y la hace avanzar**. El contrato (tipos y funciones) ya existe desde la Fase 0, y hay **2 reservas de ejemplo** precargadas, así que Rol B no necesita esperar a Rol A.

---

## Línea de tiempo

| Bloque         | Fase                                    | Rol A · Contratar                                | Rol B · Acompañar                                         | Duración  |
| -------------- | --------------------------------------- | ------------------------------------------------ | --------------------------------------------------------- | --------- |
| Día 1 · inicio | **0 · Esqueleto** ✅                    | Leer docs, conectar Vercel                       | Leer docs, correr local                                   | 30–45 min |
| Día 1 · mañana | **1 · Núcleo**                          | A1 Catálogo de servicios · A2 Perfil del técnico | B1 Mis reservas · B2 Detalle de reserva                   | ~3–4 h    |
|                | 🔄 **Sincronización 1**                 |                                                  |                                                           | 20 min    |
| Día 1 · tarde  | **2 · Reserva de punta a punta**        | A3 + A4 Flujo de reserva                         | B3 Mensajes · B4 Calificar y garantía · B5 Notificaciones | ~3–4 h    |
|                | 🔄 **Sincronización 2** — demo completa |                                                  |                                                           | 30 min    |
| Día 2 · mañana | **3 · Tienda y cuenta**                 | A5 Tienda · A6 Carrito y checkout                | B6 Perfil e ingreso (visual) · B7 Bienvenida y Únete      | ~3 h      |
|                | 🔄 **Sincronización 3**                 |                                                  |                                                           | 20 min    |
| Día 2 · tarde  | **4 · Pulido y QA**                     | A7 Pulido de Inicio y flujos A                   | B8 Pulido flujos B + PWA                                  | ~2 h      |
| Día 2 · cierre | **5 · Autenticación real** _(opcional)_ | A8 Reservas en la nube _(extra)_                 | B9 Login con Supabase                                     | ~2–3 h    |

**¿Solo tienen 1 día?** Hagan las tareas **P0** de las fases 1, 2 y 3 y la Sincronización 2. Las **P1/P2** se pueden recortar sin romper la demo.

---

## Reglas para trabajar en paralelo sin conflictos

1. **Cada quien toca solo sus carpetas** (`src/features/...` de su rol). Las rutas ya están registradas en `src/router.tsx`: **no hace falta editarlo**.
2. **Archivos compartidos** (cambios pequeños, en un PR aparte y avisando por chat):
   - `src/types/index.ts` → solo **agregar** campos opcionales, nunca renombrar o borrar.
   - `src/data/*` → solo **agregar** datos.
   - `src/store/*` → ya tiene todas las acciones; si necesitas una nueva, agrégala sin cambiar las existentes.
   - `src/components/ui/*`, `src/components/common/*`, `src/index.css` → si necesitas un componente nuevo **reutilizable**, créalo en un archivo nuevo. Si es solo para tu pantalla, déjalo dentro de tu carpeta de feature.
3. **Ramas cortas, PRs pequeños** (una tarea = una rama = un PR). Integra a `main` al menos 2 veces por bloque.
4. **Antes de abrir el PR:** `git pull origin main` + `npm run check` (lint + build) en verde.
5. **Nombre de rama:** `a/a1-catalogo`, `b/b2-detalle-reserva`, etc.
6. **Revisión:** el otro rol mira el link de vista previa de Vercel en el PR (5 minutos, en el celular). Si está verde y no hay comentarios en 15 min, se puede integrar.

---

## Definición de "terminado" (para cada tarea)

- [ ] Se ve bien en un celular de **360 px** y de **430 px** de ancho (y no se rompe en computador).
- [ ] Usa los **componentes y colores del sistema de diseño** (nada de colores hex sueltos). Ver [diseño](03-diseno.md).
- [ ] Todos los textos en **español** (tuteo, cercano y claro). Precios con `formatCOP`, fechas con `formatDate`/`formatTime`.
- [ ] Tiene **estado vacío** y caso de **"no encontrado"** si aplica.
- [ ] Botones y zonas táctiles de **mínimo 44 px**; campos con `label`.
- [ ] `npm run check` pasa sin errores.
- [ ] Se probó en la **vista previa de Vercel** desde un celular real.

---

## Fase 0 · Esqueleto ✅ (hecha)

Ya está en el repositorio:

- Proyecto **React + TypeScript + Vite + Tailwind CSS v4**, instalable como **PWA**.
- **Sistema de diseño** sacado de los mockups (colores, tipografías, ilustraciones de categorías, logo) y **componentes base**.
- **Todas las rutas** registradas, con pantallas temporales "En construcción" que dicen qué tarea las implementa.
- **Pantalla de Inicio** completa (referencia visual).
- **Datos simulados**: 6 categorías, 14 servicios, 10 técnicos, reseñas, 12 productos, 5 zonas piloto.
- **Backend simulado** (guardado en el navegador): reservas con todo su ciclo de vida, chat con respuestas automáticas, notificaciones, carrito y pedidos, sesión de invitado.
- CI en GitHub Actions (lint + build en cada PR) y configuración de Vercel.

### Tareas de arranque (todos, 30–45 min)

- [ ] **Ambos:** clonar, `npm install`, `npm run dev`, abrir en el celular (misma red Wi-Fi) con la URL `Network` que muestra la terminal.
- [ ] **Ambos:** leer `README.md`, este documento y [diseño](03-diseno.md) (15 min).
- [ ] **Rol A (dueño del repo):** conectar Vercel → ver [despliegue](05-git-y-despliegue.md#despliegue-en-vercel). Compartir el link.
- [ ] **Rol A:** confirmar que el compañero aceptó la invitación de colaborador en GitHub (Settings → Collaborators).
- [ ] **Ambos:** recorrer la app y el [guion de demo](01-producto.md#guion-de-la-demo) para entender a dónde vamos.

---

## Fase 1 · Núcleo (Día 1, mañana)

<a id="a1"></a>

### A1 · Catálogo de servicios — Rol A · **P0** · ~2 h

**Rutas:** `/servicios` (y `?q=`), `/servicios/:categoryId`, `/servicio/:serviceId`
**Archivos:** `src/features/services/ServicesPage.tsx`, `CategoryPage.tsx`, `ServiceDetailPage.tsx`
**Usa:** `getCategories`, `getCategory`, `getServicesByCategory`, `getService`, `searchServices`, `getTechniciansForService` (en `@/data/catalog`) · `CategoryTile`, `ServiceRow`, `TechnicianCard`, `TrustBadges` · `PageHeader`, `StickyFooter`, `ButtonLink`, `EmptyState`.

**Criterios de aceptación**

- [ ] `/servicios`: buscador arriba (lee/escribe `?q=` en la URL, así funciona la búsqueda de Inicio), cuadrícula con las 6 categorías y, si hay búsqueda, resultados con `ServiceRow`. Búsqueda sin resultados → estado vacío con sugerencia.
- [ ] `/servicios/:categoryId`: encabezado con fondo pastel de la categoría, ilustración y tagline; lista de servicios; sección "Técnicos destacados" (máx. 3). Categoría inexistente → estado "no encontrado".
- [ ] `/servicio/:serviceId`: nombre, descripción, duración aprox., lista "Qué incluye" con checks, **precio claro** (fijo: "$150.000 por visita"; cotización: "Desde $180.000" + aviso "Recibirás una cotización antes de confirmar"), `TrustBadges`, técnicos disponibles (máx. 3, enlazan al perfil).
- [ ] Botón fijo abajo: **"Reservar"** (fijo) o **"Solicitar cotización"** (cotización) → `/reservar/:serviceId`.
- [ ] Pintura usa la foto `/img/servicio-pintura.webp` en el encabezado (como en el mockup).

**Prompt sugerido (Claude Code)**

```text
Lee CLAUDE.md y la tarea A1 en docs/02-fases-y-roles.md. Implementa A1: reemplaza
src/features/services/ServicesPage.tsx, CategoryPage.tsx y ServiceDetailPage.tsx.
Usa solo componentes de @/components/ui, @/components/common y @/components/layout,
y datos de @/data/catalog. Sigue el estilo de src/features/home/HomePage.tsx y los
tokens de src/index.css. No modifiques archivos fuera de src/features/services.
Al terminar corre npm run check y muéstrame capturas a 390px de ancho.
```

<a id="a2"></a>

### A2 · Perfil del técnico — Rol A · **P0** · ~1,5 h

**Ruta:** `/tecnicos/:technicianId` · **Archivo:** `src/features/technicians/TechnicianPage.tsx`
**Usa:** `getTechnician`, `getReviewsForTechnician`, `getServicesByCategory`, `getZone` · `Avatar`, `RatingInline`, `StarRating`, `Badge`, `Card` · `useSession().favorites / toggleFavorite`.

**Criterios de aceptación**

- [ ] Encabezado: avatar grande con sello de verificado, nombre, título, ★ calificación (n reseñas), zona y distancia, botón de favorito (corazón) que persiste.
- [ ] 3 cifras: trabajos completados · años de experiencia · miembro desde.
- [ ] Bloque **"Verificado por Renova"** con las 4 verificaciones (identidad, antecedentes, salud, capacitación) — check verde o gris si falta.
- [ ] Badges ("Top Renova", "Puntual"…), biografía.
- [ ] Servicios que ofrece (de sus categorías) → cada uno lleva a reservar **con este técnico preseleccionado**: `/reservar/:serviceId?tecnico=:technicianId`.
- [ ] Reseñas con estrellas, autor, fecha y servicio. Sin reseñas → texto amable.
- [ ] Técnico inexistente → "no encontrado".

**Prompt sugerido**

```text
Lee CLAUDE.md y la tarea A2 en docs/02-fases-y-roles.md. Implementa el perfil del
técnico en src/features/technicians/TechnicianPage.tsx. La confianza es el corazón de
Renova: haz muy visible el bloque "Verificado por Renova". Los servicios enlazan a
/reservar/:serviceId?tecnico=:technicianId. Corre npm run check al terminar.
```

<a id="b1"></a>

### B1 · Mis reservas — Rol B · **P0** · ~1,5 h

**Ruta:** `/reservas` · **Archivo:** `src/features/bookings/BookingsPage.tsx`
**Usa:** `useBookings`, `ACTIVE_STATUSES`, `STATUS_META` (`@/store`) · `getService`, `getTechnician` · `Badge`, `Avatar`, `EmptyState`, `Chip` · `formatShortDate`, `formatTime`.

**Criterios de aceptación**

- [ ] Título "Mis reservas" y dos pestañas: **Próximas** (estados activos, ordenadas por fecha ascendente) e **Historial** (finalizadas y canceladas, más recientes primero).
- [ ] Tarjeta por reserva: ícono de la categoría, servicio, técnico (avatar + nombre), fecha y **hora exacta**, código RN-XXXX y `Badge` del estado. Toda la tarjeta lleva a `/reservas/:id`.
- [ ] Si una reserva finalizada no tiene calificación → botón "Calificar" en la tarjeta.
- [ ] Estado vacío por pestaña con botón "Reservar un servicio" → `/servicios`.
- [ ] Recuerda: con Zustand selecciona `s.bookings` y filtra con `useMemo` (ver CLAUDE.md).

**Prompt sugerido**

```text
Lee CLAUDE.md y la tarea B1 en docs/02-fases-y-roles.md. Implementa la lista de
reservas en src/features/bookings/BookingsPage.tsx con pestañas Próximas/Historial.
Usa useBookings, ACTIVE_STATUSES y STATUS_META de @/store. Ya hay 2 reservas de
ejemplo. Corre npm run check al terminar.
```

<a id="b2"></a>

### B2 · Detalle de reserva (seguimiento en vivo) — Rol B · **P0** · ~2,5 h

**Ruta:** `/reservas/:bookingId` · **Archivo:** `src/features/bookings/BookingDetailPage.tsx`
**Usa:** `useBooking(id)`, `useBookings()` → `advanceStatus`, `acceptQuote`, `cancelBooking`, `rescheduleBooking` · `STATUS_META`, `CANCELLABLE` · `getService`, `getTechnician`, `getZone` · `Sheet`, `Chip`, `Badge`, `Avatar`, `StickyFooter` · `getNextDays`, `getSlotsForDay` (`@/lib/slots`).

**Criterios de aceptación**

- [ ] Encabezado con servicio, código y `Badge` de estado.
- [ ] **Línea de tiempo vertical** de estados: Solicitud/cotización → Confirmada → En camino → En progreso → Finalizada, con hora de cada paso (de `statusHistory`). El estado actual resaltado en coral.
- [ ] Tarjeta del técnico (enlace a su perfil) + botón **"Escribir"** → `/mensajes/:conversationId`.
- [ ] **PIN de seguridad** grande y explicado: "Pídele este PIN a tu técnico al llegar".
- [ ] Datos: fecha y **hora exacta**, dirección, respuestas del paso de detalles, notas, **precio claro** (servicio, visita, total; "estimado" si `isEstimate`) y método de pago.
- [ ] Acciones según estado: **Aceptar cotización** (`cotizada`), **Reprogramar** (Sheet con días y horas), **Cancelar** (Sheet de confirmación). Solo en estados `CANCELLABLE`.
- [ ] Si está finalizada: "Garantía activa hasta {fecha}" + botones **Calificar** (si no hay calificación) y **Reportar un problema** → `/reservas/:id/garantia`.
- [ ] Botón discreto **"Simular avance (demo)"** que llama `advanceStatus(id)` — clave para presentar.
- [ ] Reserva inexistente → "no encontrada".

**Prompt sugerido**

```text
Lee CLAUDE.md y la tarea B2 en docs/02-fases-y-roles.md. Implementa el detalle de
reserva en src/features/bookings/BookingDetailPage.tsx con línea de tiempo de estados,
PIN de seguridad, acciones (aceptar cotización, reprogramar, cancelar) usando Sheet,
y el botón "Simular avance (demo)". Las acciones ya existen en useBookings (@/store).
Corre npm run check al terminar.
```

### 🔄 Sincronización 1 (20 min)

- [ ] Ambos PRs integrados a `main`; la URL de Vercel se actualizó.
- [ ] Recorrido en el celular: Inicio → categoría → servicio → técnico | Reservas → detalle → simular avance hasta finalizada.
- [ ] Anotar ajustes visuales para la Fase 4 (en un issue o en el chat).

---

## Fase 2 · Reserva de punta a punta (Día 1, tarde)

<a id="a3"></a>

### A3 · Flujo de reserva: detalles y dirección — Rol A · **P0** · ~2 h

**Ruta:** `/reservar/:serviceId` (acepta `?tecnico=:id`) · **Archivos:** `src/features/booking/BookingFlowPage.tsx` + los pasos que quieras crear en `src/features/booking/steps/`
**Usa:** `getService` · `OptionTile`, `Chip`, `TextField`, `TextArea`, `StepProgress`, `StickyFooter`, `PageHeader` · `PILOT_ZONES`, `zones` (`@/data/zones`) · `useSession().lastAddress / setLastAddress` · tipos `BookingDraft`, `ServiceQuestion`.

**Criterios de aceptación**

- [ ] Un solo componente de flujo con estado del borrador (`BookingDraft` parcial) y `StepProgress` ("Paso 1 de 5"). El botón atrás del encabezado vuelve al paso anterior (en el paso 1 sale del flujo).
- [ ] **Paso 1 · Detalles** (como el mockup de Pintura): renderiza `service.questions` de forma genérica:
  - `options` → `OptionTile` (con el tono de la categoría) o `Chip` si son muchas; `multiple` permite varias.
  - `number` → `TextField` con `suffix` (ej. "m²").
  - `text` → `TextField`.
  - `photos` → zona "Adjuntar fotos" (input file `accept="image/*" multiple`) con miniaturas; guarda nombres o data URLs pequeñas.
  - Campo "Notas para el técnico" opcional. Valida los `required` antes de continuar.
- [ ] **Paso 2 · Dirección:** localidad (solo zonas `active`; las demás aparecen deshabilitadas con "Próximamente"), dirección y detalles (apto/torre). Pre-llenado con `lastAddress`; al continuar guarda con `setLastAddress`.
- [ ] Caja informativa como el mockup: "Recibirás una cotización antes de confirmar" si el servicio es de cotización.

<a id="a4"></a>

### A4 · Flujo de reserva: hora exacta, técnico, resumen y confirmación — Rol A · **P0** · ~2 h

**Ruta:** misma + `/reserva-confirmada/:bookingId` · **Archivos:** `src/features/booking/*`, `BookingConfirmedPage.tsx`
**Usa:** `getNextDays`, `getSlotsForDay` (`@/lib/slots`) · `getTechniciansForService` · `TechnicianCard` (modo `onSelect`) · `calculatePrice` (`@/lib/pricing`) · `useBookings().createBooking` · `formatDateTime`, `formatCOP`.

**Criterios de aceptación**

- [ ] **Paso 3 · Fecha y hora exacta:** carrusel horizontal de 14 días + cuadrícula de horas (`Chip`, las no disponibles deshabilitadas). Mensaje: "Tu técnico llegará a la hora exacta que elijas".
- [ ] **Paso 4 · Técnico:** primera opción "El mejor disponible (recomendado)" + lista de técnicos del servicio. Si viene `?tecnico=`, queda preseleccionado.
- [ ] **Paso 5 · Resumen y pago:** servicio, respuestas, dirección, fecha/hora, técnico, **desglose de precio** (`calculatePrice`), método de pago (`tarjeta`, `nequi`, `daviplata`, `efectivo` con `OptionTile`), texto "Pagas cuando el servicio termine" y "Garantía de 30 días incluida".
- [ ] Botón final "Confirmar reserva" / "Enviar solicitud" (cotización) → `createBooking(draft)` → navega a `/reserva-confirmada/:id` (con `replace: true` para que "atrás" no vuelva al flujo).
- [ ] **Confirmación:** check animado, "¡Reserva confirmada!" o "¡Solicitud enviada!", código, resumen, **PIN de seguridad** con su explicación, botones "Ver mi reserva" y "Volver al inicio".
- [ ] La nueva reserva aparece en **Mis reservas**, el chat y las notificaciones (lo hace el store).

**Prompt sugerido (A3 + A4)**

```text
Lee CLAUDE.md y las tareas A3 y A4 en docs/02-fases-y-roles.md. Implementa el flujo
de reserva de 5 pasos en src/features/booking/ (puedes crear src/features/booking/steps/).
El paso de detalles debe renderizar service.questions de forma genérica (options,
number, text, photos) imitando el mockup de "Pintura para tu hogar". Al confirmar usa
useBookings().createBooking(draft) y navega a /reserva-confirmada/:id con replace.
Implementa también BookingConfirmedPage. Corre npm run check al terminar.
```

<a id="b3"></a>

### B3 · Mensajes y chat — Rol B · **P0** · ~2 h

**Rutas:** `/mensajes`, `/mensajes/:conversationId` · **Archivos:** `src/features/messages/MessagesPage.tsx`, `ChatPage.tsx`
**Usa:** `useMessages` → `conversations`, `sendMessage`, `markRead` · `useConversation(id)` · `getTechnician`, `useBooking` · `Avatar`, `EmptyState` · `formatRelative`, `formatTime`.

**Criterios de aceptación**

- [ ] Lista: avatar del técnico, nombre, servicio de la reserva, último mensaje (1 línea), hora relativa y contador de no leídos.
- [ ] Chat: encabezado con técnico (enlace al perfil) y botón "Ver reserva". Burbujas: cliente a la derecha (navy), técnico a la izquierda (blanco), mensajes de **Renova** centrados y discretos.
- [ ] Caja de texto fija abajo con botón enviar (Enter envía). El técnico responde solo a los ~1,5 s (ya lo hace el store); muestra "escribiendo…" mientras tanto (opcional).
- [ ] Al abrir: `markRead` y scroll al último mensaje.
- [ ] Sugerencias rápidas (opcional, P1): "¿A qué hora llegas?", "Te comparto una foto", "Gracias".

<a id="b4"></a>

### B4 · Calificar y garantía — Rol B · **P0** · ~1,5 h

**Rutas:** `/reservas/:id/calificar`, `/reservas/:id/garantia` · **Archivos:** `src/features/bookings/RateBookingPage.tsx`, `WarrantyPage.tsx`
**Usa:** `useBookings().rateBooking`, `claimWarranty` · `StarRating` (interactiva) · `Chip`, `TextArea` · `getProductsForCategory` · `toast`.

**Criterios de aceptación**

- [ ] Calificar: avatar del técnico, "¿Cómo te fue con {nombre}?", estrellas grandes, chips (Puntual, Amable, Trabajo limpio, Explicó todo, Buen precio) y comentario opcional. Guardar → toast + pantalla de agradecimiento.
- [ ] Al agradecer: **"¿Necesitas materiales?"** con 2–4 productos sugeridos de la categoría (`getProductsForCategory`) → enlazan a `/tienda/:productId` (cumple el paso 5 del recorrido: _calificar y comprar_).
- [ ] Garantía: explicación de la garantía de 30 días y fecha de vencimiento; formulario (motivo con chips, descripción, fotos) → `claimWarranty` → confirmación. Si la garantía venció o la reserva no está finalizada, explicarlo.

<a id="b5"></a>

### B5 · Notificaciones — Rol B · **P1** · ~45 min

**Ruta:** `/notificaciones` · **Archivo:** `src/features/notifications/NotificationsPage.tsx`
**Usa:** `useNotifications` → `items`, `markRead`, `markAllRead` · `formatRelative`.

**Criterios de aceptación**

- [ ] Lista con ícono según `kind`, título, texto, hora relativa; no leídas con fondo suave y punto coral.
- [ ] Tocar una notificación → `markRead` + navegar a `link`. Botón "Marcar todas como leídas".
- [ ] Estado vacío.

**Prompt sugerido (B3 + B4 + B5)**

```text
Lee CLAUDE.md y las tareas B3, B4 y B5 en docs/02-fases-y-roles.md. Implementa
mensajes y chat (src/features/messages), calificar y garantía (src/features/bookings/
RateBookingPage.tsx y WarrantyPage.tsx) y notificaciones (src/features/notifications).
Toda la lógica ya existe en @/store. Hazlo de a una tarea por commit y corre
npm run check al terminar cada una.
```

### 🔄 Sincronización 2 — la demo completa (30 min)

Hagan juntos el [guion de la demo](01-producto.md#guion-de-la-demo) en un celular real:

- [ ] Inicio → Pintura → Solicitar cotización → 5 pasos → Confirmación.
- [ ] La reserva aparece en Mis reservas → Simular avance (cotizada → aceptar → en camino → en progreso → finalizada).
- [ ] El chat y las notificaciones reflejan cada paso.
- [ ] Calificar → productos sugeridos.
- [ ] Lista de bugs priorizada para la Fase 4.

---

## Fase 3 · Tienda y cuenta (Día 2, mañana)

<a id="a5"></a>

### A5 · Tienda: catálogo y producto — Rol A · **P0** · ~1,5 h

**Rutas:** `/tienda`, `/tienda/:productId` · **Archivos:** `src/features/shop/ShopPage.tsx`, `ProductPage.tsx` (y componentes propios en `src/features/shop/`)
**Usa:** `getProducts`, `getProduct`, `getStore`, `productCategories` · `useCart().add`, `useCartCount` · `Chip`, `Card`, `Badge`, `toast`.

**Criterios de aceptación**

- [ ] Encabezado "Materiales para tu proyecto" + ícono de carrito con contador → `/carrito`.
- [ ] Filtros por categoría (`Chip`) y buscador simple.
- [ ] Tarjetas en 2 columnas: mosaico de color (`tone`) con ícono, nombre, precio, precio anterior tachado y % de descuento, ferretería aliada. Botón "+" agrega al carrito con `toast`.
- [ ] Producto: detalle completo, selector de cantidad, "Agregar al carrito", stock, ferretería y su zona, y **"¿Necesitas quién lo instale?"** → servicio relacionado (`relatedCategories`).

<a id="a6"></a>

### A6 · Carrito, checkout y pedido confirmado — Rol A · **P0** · ~1,5 h

**Rutas:** `/carrito`, `/checkout`, `/pedido-confirmado/:orderId` · **Archivos:** `src/features/shop/CartPage.tsx`, `CheckoutPage.tsx`, `OrderConfirmedPage.tsx`
**Usa:** `useCart` → `items`, `setQty`, `remove`, `placeOrder`, `orders` · `getCartTotals`, `FREE_DELIVERY_FROM` · `useSession().lastAddress`.

**Criterios de aceptación**

- [ ] Carrito: líneas con +/−, eliminar, subtotal, domicilio ("Gratis desde $150.000" con barra de progreso opcional), total. Vacío → estado vacío con enlace a la tienda.
- [ ] Checkout: dirección (pre-llenada), método de pago, resumen → `placeOrder` → `/pedido-confirmado/:id` (`replace`).
- [ ] Pedido confirmado: código PD-XXXX, productos, total, "Llega hoy o mañana", botones "Seguir comprando" y "Ir al inicio".

**Prompt sugerido (A5 + A6)**

```text
Lee CLAUDE.md y las tareas A5 y A6 en docs/02-fases-y-roles.md. Implementa la tienda
(catálogo, producto, carrito, checkout y pedido confirmado) en src/features/shop/.
El carrito y los pedidos ya existen en useCart (@/store). Corre npm run check.
```

<a id="b6"></a>

### B6 · Perfil, ingresar/registro (visual) y ayuda — Rol B · **P0** · ~2 h

**Rutas:** `/perfil`, `/ingresar`, `/registro`, `/ayuda` · **Archivos:** `src/features/account/*`
**Usa:** `useSession` (`user`, `signIn`, `signUp`, `AUTH_ENABLED`, `favorites`) · `resetDemo` · `faqs` (`@/data/faqs`) · `useCart().orders` · `TextField`, `Button`, `Card`, `Sheet`, `toast`.

**Criterios de aceptación**

- [ ] **Perfil (invitado):** tarjeta "Guarda tus reservas y direcciones" con botones **Ingresar** y **Crear cuenta**. Lista de opciones: Mis direcciones, Métodos de pago, Técnicos favoritos (con conteo), Mis pedidos de tienda, Ayuda, Términos y privacidad, **¿Eres técnico? Únete**. Las que no existen muestran `toast('Muy pronto')`.
- [ ] **"Reiniciar demo"** al final (con confirmación) → `resetDemo()` + toast. Útil antes de presentar.
- [ ] **Ingresar:** correo + contraseña con validación, "¿Olvidaste tu contraseña?", botón "Continuar con Google" (visual). Al enviar llama `signIn` → como responde `coming_soon`, muestra un Sheet: "Muy pronto podrás crear tu cuenta. Por ahora puedes usar Renova como invitado" + botón "Seguir como invitado".
- [ ] **Registro:** nombre, correo, celular, contraseña, acepto términos; mismo comportamiento con `signUp`.
- [ ] Diseño listo para que en la Fase 5 solo cambie la lógica (no la UI).
- [ ] **Ayuda:** acordeón de preguntas frecuentes + contacto (WhatsApp y correo, visuales).

<a id="b7"></a>

### B7 · Bienvenida y Únete como técnico — Rol B · **P1** · ~1,5 h

**Rutas:** `/bienvenida`, `/unete` · **Archivos:** `src/features/onboarding/*` (+ una redirección desde Inicio, coordinando con Rol A)
**Usa:** `useSession().hasSeenOnboarding / completeOnboarding` · imágenes `/img/tecnico-verificado.webp`, `/img/llegada-tecnico.webp`, `/img/app-hogar.webp` · `TRUST_PILLARS`.

**Criterios de aceptación**

- [ ] Bienvenida: 3 pantallas deslizables (scroll-snap) con foto + título + texto: **Técnicos verificados**, **Hora exacta**, **Garantía de 30 días**. Indicador de puntos, "Saltar" y "Empezar" → `completeOnboarding()` → `/`.
- [ ] Se muestra solo la primera vez: en `HomePage`, si `!hasSeenOnboarding`, redirigir a `/bienvenida` (cambio de 3 líneas; avisar a Rol A).
- [ ] Únete: beneficios para técnicos (más trabajos cerca, pagos trazables, salud afiliada, reputación digital), requisitos de verificación y formulario de lista de espera (nombre, celular, oficio, localidad) → toast "¡Te escribiremos pronto!".

**Prompt sugerido (B6 + B7)**

```text
Lee CLAUDE.md y las tareas B6 y B7 en docs/02-fases-y-roles.md. Implementa perfil,
ingresar, registro y ayuda en src/features/account/ (el login es visual: signIn y
signUp responden coming_soon) y la bienvenida y "Únete como técnico" en
src/features/onboarding/. Corre npm run check al terminar.
```

### 🔄 Sincronización 3 (20 min)

- [ ] Recorrido completo incluyendo tienda y perfil.
- [ ] Repartir la lista de bugs/ajustes para la Fase 4.

---

## Fase 4 · Pulido y QA (Día 2, tarde)

<a id="a7"></a>

### A7 · Pulido de Inicio y flujos de Rol A — Rol A · **P1** · ~2 h

- [ ] Inicio: sección **"Tu próxima reserva"** (si hay una activa) arriba de los servicios populares, y **"Técnicos destacados"** (`getTopTechnicians`) en carrusel horizontal.
- [ ] Inicio: sección "Materiales para tu proyecto" con 4 productos → tienda.
- [ ] Revisar todo el flujo A en 360 px y 430 px, textos y estados vacíos.
- [ ] En computador (≥ 1024 px): panel lateral con logo, frase y "Ábrelo en tu celular" (opcional, P2; ideal para la presentación).

<a id="b8"></a>

### B8 · Pulido de flujos de Rol B + PWA — Rol B · **P1** · ~2 h

- [ ] Revisar flujo B en 360 px y 430 px, textos, estados vacíos y accesibilidad (labels, foco, contraste).
- [ ] Probar **instalar la app**: Android (Chrome → "Instalar app") e iPhone (Safari → Compartir → "Agregar a inicio"). Verificar ícono, nombre y que abre sin barra del navegador.
- [ ] Correr Lighthouse (Chrome DevTools, modo móvil) y anotar puntajes en el PR. Meta: ≥ 90 en Accesibilidad y Buenas prácticas.
- [ ] Revisar el "Reiniciar demo" antes de presentar.

**Ambos:** congelar `main` 30 min antes de presentar. Solo arreglos críticos.

---

## Fase 5 · Autenticación real (opcional, si sobra tiempo)

> Hacerla **solo si las fases 1–4 están integradas y la demo funciona.** La UI de login ya existe (B6); aquí solo se conecta la lógica.

<a id="b9"></a>

### B9 · Login con Supabase — Rol B · **P2** · ~2 h

- [ ] Crear proyecto gratis en [supabase.com](https://supabase.com) → Authentication → Email habilitado (desactivar "Confirm email" para la demo).
- [ ] `npm i @supabase/supabase-js` y crear `src/lib/supabase.ts` que lea `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- [ ] Variables en `.env.local` (no se sube) y en Vercel → Settings → Environment Variables. Agregar `.env.example` con los nombres.
- [ ] Reemplazar `signIn`, `signUp` y `signOut` de `src/store/session.ts` por Supabase Auth, guardar `user` y escuchar `onAuthStateChange`. Poner `AUTH_ENABLED = true`.
- [ ] Perfil muestra nombre/correo cuando hay sesión y botón "Cerrar sesión".

<a id="a8"></a>

### A8 · Reservas en la nube — Rol A · **P2** · ~2–3 h _(extra)_

- [ ] Tabla `bookings` en Supabase (columnas de `Booking`, `user_id`, `data jsonb` para simplificar) con Row Level Security por usuario.
- [ ] Si hay sesión: `createBooking` también inserta en Supabase y al iniciar sesión se cargan las reservas del usuario. Si no hay sesión, todo sigue igual (local).

**Prompt sugerido (B9)**

```text
Lee CLAUDE.md y la tarea B9 en docs/02-fases-y-roles.md. Conecta Supabase Auth
(correo y contraseña) reemplazando signIn, signUp y signOut en src/store/session.ts
sin cambiar sus firmas, usando VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. Agrega
.env.example. Actualiza el Perfil para mostrar el usuario y "Cerrar sesión".
```
