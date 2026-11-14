/**
 * Genera los íconos PNG de la PWA a partir de public/favicon.svg.
 * Uso: node scripts/generate-icons.mjs  (requiere Playwright: npm i -D playwright)
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

// Playwright puede estar instalado global (NODE_PATH) o local
const { chromium } = createRequire(import.meta.url)('playwright')

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8')
const out = (name) => new URL(`../public/icons/${name}`, import.meta.url).pathname

const targets = [
  { name: 'icon-192.png', size: 192, scale: 0.72, radius: 0 },
  { name: 'icon-512.png', size: 512, scale: 0.72, radius: 0 },
  { name: 'icon-maskable-512.png', size: 512, scale: 0.58, radius: 0 },
  { name: 'apple-touch-icon.png', size: 180, scale: 0.7, radius: 0 },
]

const browser = await chromium.launch()
const page = await browser.newPage()
for (const t of targets) {
  const inner = Math.round(t.size * t.scale)
  await page.setViewportSize({ width: t.size, height: t.size })
  await page.setContent(`<html><body style="margin:0;width:${t.size}px;height:${t.size}px;display:flex;align-items:center;justify-content:center;background:#fff">
    <div style="width:${inner}px;height:${inner}px">${svg.replace('<svg ', `<svg width="${inner}" height="${inner}" `)}</div></body></html>`)
  await page.screenshot({ path: out(t.name), omitBackground: false })
  console.log('✓', t.name)
}
await browser.close()
