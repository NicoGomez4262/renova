/**
 * Genera el favicon (public/favicon.svg) y los íconos PNG de la PWA
 * a partir del isotipo de Renova: techo blanco sobre naranja #EE5A36 (el coral de la app).
 *
 * Uso: node scripts/generate-icons.mjs
 * (requiere Playwright: npm i -D playwright && npx playwright install chromium)
 */
import { writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

// Playwright puede estar instalado global (NODE_PATH) o local
const { chromium } = createRequire(import.meta.url)('playwright')

const ORANGE = '#EE5A36'
const WHITE = '#FFFFFF'

// Isotipo (mismo dibujo que HouseMark en src/components/brand/Logo.tsx)
const MARK_W = 133.05
const MARK_H = 110.11
const ROOF = '0,110.11 66.52,0 133.05,110.11 101.5,110.11 66.52,52.21 31.55,110.11'
const DOOR = { x: 54.52, y: 82.11, w: 24, h: 28 }

/** SVG cuadrado: fondo naranja + techo blanco que ocupa `markHeight` (0–1) del alto */
function iconSvg(size, markHeight, radius = 0) {
  const s = (size * markHeight) / MARK_H
  const x = (size - MARK_W * s) / 2
  const y = (size - MARK_H * s) / 2 + size * 0.01 // el triángulo pesa abajo: se centra un poco más bajo
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${ORANGE}"/>
  <g transform="translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${s.toFixed(4)})" fill="${WHITE}">
    <polygon points="${ROOF}"/>
    <rect x="${DOOR.x}" y="${DOOR.y}" width="${DOOR.w}" height="${DOOR.h}"/>
  </g>
</svg>
`
}

const out = (name) => new URL(`../public/${name}`, import.meta.url).pathname

// Favicon: esquinas redondeadas y techo grande (se ve en 16 px)
writeFileSync(out('favicon.svg'), iconSvg(64, 0.6, 14))
console.log('✓ favicon.svg')

const targets = [
  { name: 'icons/icon-192.png', size: 192, mark: 0.5 },
  { name: 'icons/icon-512.png', size: 512, mark: 0.5 },
  // Maskable: Android recorta en círculo → el techo va dentro de la zona segura (80 %)
  { name: 'icons/icon-maskable-512.png', size: 512, mark: 0.4 },
  // iPhone redondea las esquinas por su cuenta
  { name: 'icons/apple-touch-icon.png', size: 180, mark: 0.5 },
]

const browser = await chromium.launch()
const page = await browser.newPage()
for (const t of targets) {
  await page.setViewportSize({ width: t.size, height: t.size })
  await page.setContent(`<html><body style="margin:0">${iconSvg(t.size, t.mark)}</body></html>`)
  await page.screenshot({ path: out(t.name), clip: { x: 0, y: 0, width: t.size, height: t.size } })
  console.log('✓', t.name)
}
await browser.close()
