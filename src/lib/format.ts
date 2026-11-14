/** Formatea pesos colombianos: 150000 → "$150.000" */
export function formatCOP(value: number): string {
  return '$' + Math.round(value).toLocaleString('es-CO')
}

const dateFmt = new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
const shortDateFmt = new Intl.DateTimeFormat('es-CO', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})
const timeFmt = new Intl.DateTimeFormat('es-CO', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

/** "viernes, 14 de noviembre" */
export function formatDate(iso: string | Date): string {
  return capitalize(dateFmt.format(new Date(iso)))
}

/** "vie, 14 nov" */
export function formatShortDate(iso: string | Date): string {
  return capitalize(shortDateFmt.format(new Date(iso)).replace(/\./g, ''))
}

/** "8:00 a. m." */
export function formatTime(iso: string | Date): string {
  return timeFmt.format(new Date(iso))
}

/** "Viernes, 14 de noviembre · 8:00 a. m." */
export function formatDateTime(iso: string | Date): string {
  return `${formatDate(iso)} · ${formatTime(iso)}`
}

/** "Hace 5 min", "Hace 2 h", "Ayer", "12 nov" */
export function formatRelative(iso: string | Date): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const min = Math.round(diffMs / 60000)
  if (min < 1) return 'Ahora'
  if (min < 60) return `Hace ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `Hace ${h} h`
  if (h < 48) return 'Ayer'
  return formatShortDate(iso)
}

/** 90 → "1 h 30 min" */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/** "Carlos Gómez" → "CG" */
export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

/** "Carlos Gómez" → "Carlos" */
export function firstName(name: string): string {
  return name.split(' ')[0] ?? name
}
