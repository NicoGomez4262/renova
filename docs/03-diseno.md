# Sistema de diseño

Sacado de los mockups de Inicio y de Pintura. La pantalla de **Inicio** (`src/features/home/HomePage.tsx`) es la referencia viva: si dudas cómo se ve algo, mira cómo está hecho ahí.

## Principios

1. **Celular primero.** Diseña para 360–430 px. En computador la app se muestra centrada como una columna de celular (máx. 512 px).
2. **Confianza visible.** Verificación, precio, hora exacta y garantía deben verse sin buscarlos.
3. **Una acción principal por pantalla**, en coral y, en flujos, fija abajo (`StickyFooter`).
4. **Aire y redondez:** bordes muy redondeados, fondos pastel, sombras suaves.
5. **Pocas palabras, claras.** Títulos cortos y textos de ayuda en gris.

## Color

Definidos como tokens en `src/index.css` (`@theme`). **No uses colores hex sueltos**: usa las clases.

| Token / clase                                    | Valor                | Uso                                                                         |
| ------------------------------------------------ | -------------------- | --------------------------------------------------------------------------- |
| `navy-900` (`text-navy-900`, `bg-navy-900`)      | `#0b1d2e`            | Logo, títulos, navegación activa, botón secundario                          |
| `navy-50 … navy-800`                             | escala               | Fondos suaves (`bg-navy-50`), bordes de foco, textos                        |
| `coral-500` (`bg-coral-500`, `text-coral-500`)   | `#ee5a36`            | **Acción principal**, precios, palabra destacada del título                 |
| `coral-50 … coral-700`                           | escala               | Hover (`coral-600`), fondos suaves (`coral-50`)                             |
| `ink`                                            | `#0b1d2e`            | Texto principal                                                             |
| `muted`                                          | `#667585`            | Texto secundario                                                            |
| `line`                                           | `#e5e9ef`            | Bordes y divisores                                                          |
| `surface`                                        | `#f6f7f9`            | Fondo de la página                                                          |
| `brand-orange`, `brand-black`                    | `#ff8a00`, `#1f2020` | **Solo logo e íconos** (colores de la presentación). No usar en la interfaz |
| `success`, `warning`, `danger`, `info` (+ `-bg`) |                      | Estados y badges                                                            |

**Tonos pastel por categoría** (fondo `tile-*`, ícono `accent-*`). Usa el mapa `toneClasses` de `@/lib/tones` en vez de construir la clase dinámicamente:

| Tono     | Categoría         | Fondo            | Ícono                |
| -------- | ----------------- | ---------------- | -------------------- |
| `sky`    | Plomería          | `bg-tile-sky`    | `text-accent-sky`    |
| `mint`   | Limpieza          | `bg-tile-mint`   | `text-accent-mint`   |
| `peach`  | Pintura           | `bg-tile-peach`  | `text-accent-peach`  |
| `butter` | Electricidad      | `bg-tile-butter` | `text-accent-butter` |
| `teal`   | Electrodomésticos | `bg-tile-teal`   | `text-accent-teal`   |
| `lilac`  | Instalaciones     | `bg-tile-lilac`  | `text-accent-lilac`  |

```tsx
import { toneClasses } from '@/lib/tones'
<div className={toneClasses[category.tone].tile}>…</div>   // ✅
<div className={`bg-tile-${category.tone}`}>…</div>         // ❌ Tailwind no la genera
```

## Tipografía

| Familia                       | Clase                     | Uso                                                                                       |
| ----------------------------- | ------------------------- | ----------------------------------------------------------------------------------------- |
| **Fraunces** (serif, negrita) | `font-display-tight`      | Títulos grandes tipo mockup: "Hola, ¿qué necesita **tu hogar?**", "Pintura para tu hogar" |
| **Nunito Sans**               | `font-sans` (por defecto) | Todo lo demás                                                                             |

Escala sugerida: título de pantalla `text-lg font-extrabold` (en `PageHeader`) · título de sección `text-xl font-extrabold` · texto `text-[15px]` · ayuda `text-sm text-muted` · precio `text-lg font-extrabold text-coral-500`.

Patrón del título con palabra coral:

```tsx
<h1 className="font-display-tight text-navy-900 text-[2.4rem]">
  Pintura para <span className="text-coral-500">tu hogar</span>
</h1>
```

## Forma y espacio

- Márgenes laterales de pantalla: `px-5`. Separación entre secciones: `mt-6`–`mt-8`.
- Radios: tarjetas `rounded-2xl`, banners y hojas `rounded-3xl`, botones y chips `rounded-full`, campos `rounded-xl`.
- Sombras: `shadow-card` (tarjetas), `shadow-float` (hojas, toasts).
- Zonas táctiles de mínimo **44 px** (`h-11`). Los campos miden `h-13`.

## Íconos e ilustraciones

- Íconos de interfaz: **lucide-react** (`import { Bell } from 'lucide-react'`), tamaño `size-5` o `size-6`.
- Ilustraciones de categoría a color: `<CategoryIcon id="pintura" size={44} />` (`@/components/brand/CategoryIcon`).
- Logo: `<Logo size={26} />` (`inverted` para fondos oscuros) · isotipo (techo con puerta): `<HouseMark color="orange" />` (`@/components/brand/Logo`). El texto del logo está en trazos vectoriales: no depende de fuentes.
- Casa del Inicio: `<HouseIllustration />`.

## Imágenes disponibles (`public/img`)

| Archivo                   | Para                                                |
| ------------------------- | --------------------------------------------------- |
| `banner-hogar.webp`       | Banner de Inicio (clienta + técnico)                |
| `servicio-pintura.webp`   | Encabezado de Pintura (como el mockup)              |
| `tecnico-verificado.webp` | Bienvenida / confianza (técnico mostrando su carné) |
| `llegada-tecnico.webp`    | Bienvenida / hora exacta                            |
| `app-hogar.webp`          | Bienvenida / la app                                 |

Siempre con `alt` descriptivo en español y `object-cover`. Formato WebP, menos de 100 KB.

## Componentes disponibles

### Base — `@/components/ui`

| Componente                   | Para qué                                                                                                                                              | Ejemplo                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `Button`, `ButtonLink`       | Acciones. Variantes `primary` (coral), `secondary` (navy), `outline`, `ghost`, `soft`; tamaños `sm`, `md`, `lg`; `fullWidth`, `iconLeft`, `iconRight` | `<Button size="lg" fullWidth>Confirmar reserva</Button>`                |
| `Card`                       | Contenedor blanco con borde y sombra                                                                                                                  | `<Card>…</Card>`                                                        |
| `TextField`, `TextArea`      | Campos con `label`, `hint`, `error`, `icon`, `suffix`                                                                                                 | `<TextField label="Área aproximada" suffix="m²" inputMode="numeric" />` |
| `OptionTile`                 | Opción grande seleccionable con tono pastel (mockup "¿Qué deseas pintar?")                                                                            | `<OptionTile label="Paredes" tone="sky" selected />`                    |
| `Chip`                       | Píldora seleccionable: filtros, horas, etiquetas                                                                                                      | `<Chip selected>9:00</Chip>`                                            |
| `Badge`                      | Etiqueta de estado (`info`, `success`, `warning`, `danger`, `coral`, `neutral`)                                                                       | `<Badge tone="success">Finalizada</Badge>`                              |
| `StarRating`, `RatingInline` | Estrellas (interactivas con `onChange`) y "★ 4.9 (127)"                                                                                               | `<StarRating value={n} onChange={setN} />`                              |
| `Avatar`                     | Iniciales con color y sello de verificado                                                                                                             | `<Avatar name="Carlos Gómez" tone="sky" verified />`                    |
| `SectionTitle`               | Título de sección + "Ver todos >"                                                                                                                     | `<SectionTitle title="Servicios populares" to="/servicios" />`          |
| `EmptyState`                 | Estado vacío                                                                                                                                          | `<EmptyState title="Aún no tienes reservas" action={…} />`              |
| `Sheet`                      | Hoja inferior modal (confirmaciones, selección)                                                                                                       | `<Sheet open onClose={…} title="¿Cancelar?">…</Sheet>`                  |
| `StepProgress`               | Progreso por pasos                                                                                                                                    | `<StepProgress current={2} total={5} label="Dirección" />`              |
| `toast()` (de `@/store`)     | Aviso corto                                                                                                                                           | `toast('Agregado al carrito', 'success')`                               |

### Estructura — `@/components/layout`

| Componente     | Para qué                                                                    |
| -------------- | --------------------------------------------------------------------------- |
| `TopBar`       | Logo + campana (solo Inicio)                                                |
| `PageHeader`   | Encabezado de pantalla interna: atrás + título + acción (`right`)           |
| `StickyFooter` | Botón principal fijo abajo (`aboveNav` si la pantalla tiene barra inferior) |
| `BottomNav`    | Barra inferior (ya montada por `TabsLayout`)                                |

### De dominio — `@/components/common`

| Componente                     | Para qué                                                   |
| ------------------------------ | ---------------------------------------------------------- |
| `CategoryTile`                 | Mosaico pastel de categoría → `/servicios/:id`             |
| `ServiceCard`                  | Tarjeta compacta 2 columnas ("Desde $X")                   |
| `ServiceRow`                   | Fila de servicio para listados                             |
| `TechnicianCard`               | Técnico (enlace al perfil, o seleccionable con `onSelect`) |
| `TrustBadges`, `TRUST_PILLARS` | Los 4 pilares de confianza                                 |

## Patrones de pantalla

**Pantalla de pestaña** (Inicio, Tienda, Mensajes, Reservas, Perfil): ya tiene barra inferior.

```tsx
export default function BookingsPage() {
  return (
    <>
      <PageHeader title="Mis reservas" hideBack />
      <div className="px-5 py-4">…</div>
    </>
  )
}
```

**Pantalla de detalle / flujo** (sin barra inferior):

```tsx
<>
  <PageHeader title="Pintura de interiores" />
  <div className="space-y-6 px-5 py-5">…</div>
  <StickyFooter>
    <ButtonLink to="/reservar/pintura-interior" size="lg" fullWidth>
      Solicitar cotización
    </ButtonLink>
  </StickyFooter>
</>
```

**No encontrado** (id inválido en la URL): `PageHeader` + `EmptyState` con botón al inicio.

## Accesibilidad mínima

- Todo campo con `label` (los componentes ya lo hacen). Botones solo con ícono → `aria-label`.
- Contraste: texto gris solo sobre blanco o pastel claro.
- No depender solo del color: los estados llevan texto (`Badge`).
- El foco visible ya está definido globalmente (contorno coral).
