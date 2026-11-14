import type { Zone, ZoneId } from '@/types'

/** Localidades de Bogotá. `active: true` = zona del piloto. */
export const zones: Zone[] = [
  { id: 'usaquen', name: 'Usaquén', active: true },
  { id: 'chapinero', name: 'Chapinero', active: true },
  { id: 'suba', name: 'Suba', active: true },
  { id: 'teusaquillo', name: 'Teusaquillo', active: true },
  { id: 'barrios-unidos', name: 'Barrios Unidos', active: true },
  { id: 'engativa', name: 'Engativá', active: false },
  { id: 'kennedy', name: 'Kennedy', active: false },
  { id: 'fontibon', name: 'Fontibón', active: false },
]

export const PILOT_ZONES = zones.filter((z) => z.active)

export function getZone(id: ZoneId): Zone {
  return zones.find((z) => z.id === id) ?? zones[0]
}
