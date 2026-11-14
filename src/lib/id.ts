/** Id único corto para entidades locales */
export function uid(prefix = ''): string {
  const rand = Math.random().toString(36).slice(2, 8)
  const time = Date.now().toString(36).slice(-4)
  return `${prefix}${time}${rand}`
}

/** Código legible: "RN-4821" */
export function humanCode(prefix = 'RN'): string {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`
}

/** PIN de 4 dígitos */
export function pin(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}
