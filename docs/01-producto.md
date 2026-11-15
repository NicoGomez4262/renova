# Producto · Qué estamos construyendo

## Renova en una frase

**Todo lo que tu hogar necesita a un clic:** una app para contratar servicios del hogar en Bogotá (plomería, electricidad, pintura, limpieza, electrodomésticos e instalaciones) con **técnicos verificados, precio claro, hora exacta y garantía de 30 días**, más una **tienda de materiales** de ferreterías aliadas.

> _Renova: confianza para quien contrata, trabajo digno para quien repara._

## El problema (validación con 110 personas, oct. 2026)

| Dolor                                            | Dato                  | Cómo lo resuelve la app                                                                                                           |
| ------------------------------------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Arreglos mal hechos                              | 90 de 110 lo vivieron | **Garantía de 30 días** visible en cada servicio y reclamable desde la reserva. Reseñas reales.                                   |
| Técnicos que llegan tarde o no llegan            | 90 de 110             | **Hora exacta** (no franjas de 4 horas) + seguimiento en vivo del estado ("en camino").                                           |
| Incomodidad de quedarse solos con un desconocido | 80 de 110             | **Técnicos verificados** (identidad, antecedentes, salud, capacitación) + **PIN de seguridad** al llegar + chat dentro de la app. |
| Falta de tiempo para buscar y coordinar          | Entrevista            | Reserva en 5 pasos, todo en un solo lugar, recordatorios y notificaciones.                                                        |

**90 de 110 usarían Renova**, y lo que más pidieron fue **garantía**.

## Los 4 pilares (deben sentirse en cada pantalla)

| Pilar                   | Dónde se ve en la app                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 🛡️ **Verificados**      | Sello en el avatar, bloque "Verificado por Renova" en el perfil del técnico, PIN de seguridad.                                      |
| 💲 **Precio claro**     | "Desde $X" en el catálogo, desglose antes de confirmar, cotización sin compromiso para trabajos variables.                          |
| 🕐 **Hora exacta**      | Selector de hora específica, estados en vivo, mensaje "llega a la hora acordada".                                                   |
| 🏅 **Garantía 30 días** | En el detalle del servicio, en la confirmación, en la reserva finalizada (con fecha de vencimiento) y botón "Reportar un problema". |

## Para quién es este piloto

- **Cliente:** hogares urbanos de Bogotá con poco tiempo, que valoran la seguridad y la puntualidad.
- **Zonas piloto:** Usaquén, Chapinero, Suba, Teusaquillo y Barrios Unidos (las demás localidades aparecen como "Próximamente").
- **Técnico:** en esta versión solo existe la página **"Únete como técnico"** (lista de espera). La app del técnico es una fase futura.

## Alcance de esta primera versión

| ✅ Incluye                                                                                      | ❌ No incluye (por ahora)                  |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Experiencia completa del **cliente**: descubrir, reservar, seguir, chatear, calificar, garantía | App / panel del técnico                    |
| Tienda simple: catálogo, carrito y pedido **simulado**                                          | Pagos reales (pasarela)                    |
| Login y registro **visibles** (pantallas listas)                                                | Login funcional — opcional en la Fase 5    |
| Datos simulados y guardados en el navegador                                                     | Base de datos real (opcional en la Fase 5) |
| PWA instalable, publicada en Vercel                                                             | Dominio propio, tiendas de apps            |
| Botón "Simular avance" para mostrar el ciclo de una reserva                                     | Notificaciones push reales, mapas en vivo  |

## Recorrido del cliente

Los 5 pasos de la propuesta, convertidos en pantallas:

```text
1. Solicitar servicio  →  Inicio · Buscar · Categoría · Detalle del servicio
2. Elegir             →  Flujo de reserva: detalles, dirección, técnico
3. Confirmar hora     →  Flujo de reserva: fecha y HORA EXACTA, resumen con precio claro
4. Recibir técnico    →  Detalle de reserva: estados en vivo, PIN de seguridad, chat
5. Calificar y comprar →  Calificar · Garantía · Materiales sugeridos → Tienda
```

## Mapa de pantallas

| Ruta                             | Pantalla                         | Tarea           | Rol | Fase |
| -------------------------------- | -------------------------------- | --------------- | --- | ---- |
| `/`                              | Inicio                           | Fase 0 ✅ (+A7) | A   | 0    |
| `/servicios`                     | Todos los servicios y búsqueda   | A1              | A   | 1    |
| `/servicios/:categoryId`         | Categoría                        | A1              | A   | 1    |
| `/servicio/:serviceId`           | Detalle del servicio             | A1              | A   | 1    |
| `/tecnicos/:technicianId`        | Perfil del técnico               | A2              | A   | 1    |
| `/reservar/:serviceId`           | Flujo de reserva (5 pasos)       | A3 + A4         | A   | 2    |
| `/reserva-confirmada/:bookingId` | Reserva confirmada               | A4              | A   | 2    |
| `/tienda`                        | Tienda                           | A5              | A   | 3    |
| `/tienda/:productId`             | Producto                         | A5              | A   | 3    |
| `/carrito`                       | Carrito                          | A6              | A   | 3    |
| `/checkout`                      | Finalizar compra                 | A6              | A   | 3    |
| `/pedido-confirmado/:orderId`    | Pedido confirmado                | A6              | A   | 3    |
| `/reservas`                      | Mis reservas                     | B1              | B   | 1    |
| `/reservas/:bookingId`           | Detalle de reserva (seguimiento) | B2              | B   | 1    |
| `/mensajes`                      | Mensajes                         | B3              | B   | 2    |
| `/mensajes/:conversationId`      | Chat                             | B3              | B   | 2    |
| `/reservas/:bookingId/calificar` | Calificar                        | B4              | B   | 2    |
| `/reservas/:bookingId/garantia`  | Garantía                         | B4              | B   | 2    |
| `/notificaciones`                | Notificaciones                   | B5              | B   | 2    |
| `/perfil`                        | Perfil                           | B6              | B   | 3    |
| `/ingresar` · `/registro`        | Ingresar / Crear cuenta (visual) | B6              | B   | 3    |
| `/ayuda`                         | Ayuda                            | B6              | B   | 3    |
| `/bienvenida`                    | Bienvenida (primera vez)         | B7              | B   | 3    |
| `/unete`                         | Únete como técnico               | B7              | B   | 3    |

**Navegación inferior:** Inicio · Tienda · Mensajes · Reservas · Perfil (la de los mockups + Tienda).

## Referencias de diseño

- Mockups de **Inicio** ("Hola, ¿qué necesita tu hogar?") y **Pintura para tu hogar** (formulario de solicitud): son la guía visual. El Inicio ya está implementado igual al mockup.
- La presentación usa naranja y negro; **la app usa la paleta de los mockups** (azul marino + coral + pasteles). El **logo** ("Techo": RENOV + la "A" como techo con puerta) usa solo naranja `#EE5A36` (el mismo coral de "tu hogar?"), negro `#1F2020` y blanco. Ver [diseño](03-diseno.md).

## Guion de la demo

Para presentar en 3 minutos (antes: Perfil → **Reiniciar demo**):

1. **Inicio:** "Hola, ¿qué necesita tu hogar?" → mostrar los 4 pilares.
2. Tocar **Pintura** → **Pintura de interiores** → precio "Desde" + garantía.
3. **Solicitar cotización:** Paredes, 20 m², foto → dirección en Chapinero → **hora exacta** mañana 9:00 → técnica Diana (verificada, 4.9) → resumen con precio claro → Enviar.
4. **Confirmación** con PIN de seguridad.
5. **Reservas** → detalle → _Simular avance_: llega la cotización → **Aceptar** → _en camino_ (mostrar chat y notificación) → _en progreso_ → _finalizada_.
6. **Calificar** con 5 estrellas → "¿Necesitas materiales?" → agregar pintura a la **tienda** → pedido confirmado.
7. Mostrar **Garantía de 30 días** activa en la reserva.
8. Cerrar con **Perfil** (login listo para conectarse) y **Únete como técnico**.

## Tono y textos

- Tuteo, cercano, claro y breve: "Cuéntanos sobre el espacio que deseas pintar."
- Siempre en español de Colombia: "celular", "conjunto", "localidad", "apto".
- Precios en pesos: `$150.000` (usar `formatCOP`). Horas: `9:00 a. m.` (usar `formatTime`).
- Decir "clic" (no "click").
