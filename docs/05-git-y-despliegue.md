# Git, colaboración y despliegue

## Preparar tu computador (una vez)

Necesitas **Node.js 20 o superior** ([nodejs.org](https://nodejs.org), versión LTS) y **Git**.

```bash
git clone https://github.com/NicoGomez4262/renova.git
cd renova
npm install
npm run dev
```

La terminal muestra dos direcciones:

- `Local: http://localhost:5173` → ábrela en el computador.
- `Network: http://192.168.x.x:5173` → ábrela **en tu celular** (conectado a la misma Wi-Fi) para probar de verdad.

> En el navegador del computador usa las herramientas de desarrollo (F12 → ícono de celular) y elige un iPhone o Android para simular la pantalla.

### Comandos

| Comando                             | Qué hace                                                            |
| ----------------------------------- | ------------------------------------------------------------------- |
| `npm run dev`                       | Servidor local con recarga automática                               |
| `npm run check`                     | Lint + verificación de tipos + build (**córrelo antes de cada PR**) |
| `npm run build` / `npm run preview` | Build de producción y vista local del build (con PWA)               |
| `npm run format`                    | Formatea el código con Prettier                                     |

## Flujo de trabajo con Git

`main` siempre debe funcionar: es lo que se publica en Vercel.

### Por cada tarea

```bash
# 1. Parte de main actualizado
git checkout main
git pull origin main

# 2. Crea tu rama:  <rol>/<tarea>-<descripcion>
git checkout -b a/a1-catalogo        # o b/b1-mis-reservas

# 3. Trabaja y haz commits pequeños
git add .
git commit -m "A1: lista de categorías y buscador"

# 4. Antes de subir: trae lo último de main y verifica
git pull origin main
npm run check

# 5. Sube y abre el Pull Request
git push -u origin a/a1-catalogo
```

En GitHub aparece el botón **"Compare & pull request"**. Usa la plantilla: tarea, qué cambió, capturas y checklist.

### Revisión e integración

1. GitHub Actions corre `lint` + `build` (✅ verde = listo).
2. Vercel comenta el link de **vista previa** del PR → el otro rol lo abre en el celular (5 min).
3. Si no hay comentarios en ~15 min y está verde → **Squash and merge**.
4. Borra la rama y vuelve al paso 1 con la siguiente tarea.

### Si aparece un conflicto

Con el reparto por carpetas casi no debería pasar. Si pasa:

```bash
git pull origin main          # Git marca los archivos en conflicto
# Abre cada archivo, busca <<<<<<< y deja la versión correcta (o ambas)
npm run check
git add . && git commit -m "Resuelve conflicto con main"
git push
```

Si el conflicto es en un archivo compartido (`types`, `store`, `data`), resuélvanlo juntos por llamada (5 min).

### Mensajes de commit

`<Tarea>: <qué hiciste>` en español. Ej.: `B2: línea de tiempo de estados y PIN de seguridad`.

## Despliegue en Vercel

Una sola vez, la persona dueña del repositorio (Rol A):

1. Entra a [vercel.com](https://vercel.com) → **Sign up / Log in with GitHub**.
2. **Add New… → Project** → busca `renova` → **Import** (si no aparece: _Adjust GitHub App Permissions_ y dale acceso al repo).
3. Vercel detecta **Vite** solo. No cambies nada (Build: `npm run build`, Output: `dist`). → **Deploy**.
4. En ~1 minuto tendrás una URL tipo `https://renova-xxxx.vercel.app`. Puedes cambiarla en _Settings → Domains_ (ej. `renova-piloto.vercel.app`).
5. Pega la URL en el [README](../README.md) (sección "Demo en vivo").

Desde ahí:

- Cada push/merge a `main` → actualiza la URL de producción.
- Cada PR → Vercel crea un **link de vista previa** y lo comenta en el PR.

> **Repositorio privado + plan gratuito (Hobby):** Vercel puede bloquear las vistas previas de commits hechos por un colaborador que no es dueño del proyecto en Vercel. Opciones: (a) hacer el repositorio público, o (b) revisar con `npm run dev` + celular en la misma Wi-Fi, y que el dueño haga el merge (el deploy de `main` sí funciona).

El archivo `vercel.json` ya hace que todas las rutas (ej. `/reservas/123`) carguen la app al recargar o compartir el enlace.

## Probar e instalar en el celular

- **Android (Chrome):** abre la URL → menú ⋮ → **Instalar app**.
- **iPhone (Safari):** abre la URL → botón Compartir → **Agregar a inicio**.

Se abre a pantalla completa con el ícono de Renova, como una app.

## Usar Claude Code (o tu IA) en este repo

- El archivo `CLAUDE.md` en la raíz le explica a la IA las reglas del proyecto. Claude Code lo lee solo.
- Cada tarea en [fases y roles](02-fases-y-roles.md) trae un **prompt sugerido**. Pégalo tal cual y revisa el resultado en el celular.
- Pídele siempre que corra `npm run check` y que **no toque archivos de la otra persona**.
