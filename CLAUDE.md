# CLAUDE.md — Reglas del proyecto Renova

Renova es un piloto web (PWA, **mobile-first**) para contratar servicios del hogar en Bogotá. Dos personas trabajan en paralelo con IA. Lee esto antes de escribir código.

## Antes de empezar una tarea

1. Identifica la tarea (A1…A8, B1…B9) en `docs/02-fases-y-roles.md` y sus **criterios de aceptación**.
2. Revisa `docs/03-diseno.md` (componentes y tokens) y `docs/04-arquitectura.md` (datos y stores).
3. Usa `src/features/home/HomePage.tsx` como referencia de estilo.

## Comandos

- `npm run dev` — servidor local
- `npm run check` — lint + tipos + build. **Debe pasar antes de terminar cualquier tarea.**

## Reglas de propiedad (para no generar conflictos)

- Solo modifica la carpeta de la tarea: `src/features/<área>/`. Las rutas ya existen en `src/router.tsx`; **no lo edites**.
- Reemplaza el archivo "En construcción" (`ComingSoon`) de la pantalla por la implementación real.
- Subcomponentes de una pantalla → dentro de su carpeta de feature (ej. `src/features/booking/steps/`).
- Archivos compartidos (`src/types`, `src/data`, `src/store`, `src/components/*`, `src/index.css`): **solo agregar**, nunca renombrar ni borrar ni cambiar firmas. Si es imprescindible, avisa en el resumen final para que vaya en un PR aparte.
- No agregues dependencias nuevas sin que la tarea lo pida.

## Convenciones de código

- TypeScript estricto, componentes funcionales, `export default` para pantallas.
- Imports con alias `@/` (ej. `import { Button } from '@/components/ui'`).
- Nombres de código en inglés; **todo texto visible en español de Colombia**, tuteo, claro y breve.
- Datos del catálogo SOLO vía `@/data/catalog` (no importes los arreglos directamente).
- Estado vía `@/store`. **Zustand v5:** un selector no puede devolver un arreglo/objeto nuevo (`s => s.bookings.filter(...)` = bucle infinito). Selecciona el dato crudo y deriva con `useMemo`.
- Formatos: `formatCOP`, `formatDate`, `formatTime`, `formatDateTime`, `formatRelative` (`@/lib/format`).
- IDs de la URL inválidos → estado "no encontrado" con `EmptyState`, nunca pantalla en blanco.

## Diseño

- Usa los componentes de `@/components/ui`, `@/components/layout` y `@/components/common` antes de crear nuevos.
- **Prohibido usar colores hex sueltos.** Usa los tokens: `navy-*`, `coral-*`, `ink`, `muted`, `line`, `surface`, `tile-*`/`accent-*` (vía `toneClasses` de `@/lib/tones`), `success|warning|danger|info`.
- Títulos grandes estilo mockup: `font-display-tight` con una palabra en `text-coral-500`.
- Márgenes `px-5`, tarjetas `rounded-2xl shadow-card`, botones `rounded-full`, zonas táctiles ≥ 44 px.
- Pantallas de flujo: `PageHeader` arriba y acción principal en `StickyFooter`.
- Verifica a 360 px y 430 px de ancho.

## Producto (no lo olvides)

Los 4 pilares deben sentirse: **verificados, precio claro, hora exacta, garantía de 30 días**. El login es **visual** (`signIn`/`signUp` responden `coming_soon`) hasta la Fase 5.
