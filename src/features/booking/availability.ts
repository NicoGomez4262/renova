/**
 * Disponibilidad simulada para la "hora exacta".
 * Una hora está disponible si al menos uno de los técnicos posibles
 * está libre (o el técnico elegido, si ya hay uno).
 */
import { getSlotsForDay, startOfDay, type TimeSlot } from '@/lib/slots'

export function slotsForTechnicians(day: Date, techIds: string[]): TimeSlot[] {
  if (techIds.length === 0) return getSlotsForDay(day)
  const lists = techIds.map((id) => getSlotsForDay(day, id))
  return lists[0].map((slot, i) => ({ ...slot, available: lists.some((l) => l[i]?.available) }))
}

export function isSlotAvailable(iso: string, techIds: string[]): boolean {
  const day = startOfDay(new Date(iso))
  return slotsForTechnicians(day, techIds).some((s) => s.iso === iso && s.available)
}

/** Técnicos (de la lista) libres a esa hora */
export function availableAt<T extends { id: string }>(technicians: T[], iso: string | null): T[] {
  if (!iso) return technicians
  return technicians.filter((t) => isSlotAvailable(iso, [t.id]))
}
