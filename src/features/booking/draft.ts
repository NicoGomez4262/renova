/**
 * Borrador del flujo de reserva + validaciones por paso.
 * El borrador se guarda en sessionStorage: si recargas la página no
 * pierdes lo que llevabas (se borra al confirmar).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { BookingAnswers, PaymentMethod, Service, ZoneId } from '@/types'
import { isSlotAvailable } from './availability'

export interface FlowDraft {
  answers: BookingAnswers
  notes: string
  /** Fotos comprimidas (data URLs) */
  photos: string[]
  zone: ZoneId | null
  line: string
  details: string
  scheduledAt: string | null
  /** null = "El mejor disponible" */
  technicianId: string | null
  paymentMethod: PaymentMethod | null
}

export const STEPS = ['Detalles', 'Dirección', 'Fecha y hora', 'Técnico', 'Confirmar'] as const
export const MAX_PHOTOS = 4

export type FieldErrors = Record<string, string>

/* ───────── Validaciones ───────── */

export function validateDetails(service: Service, draft: FlowDraft): FieldErrors {
  const errors: FieldErrors = {}
  for (const q of service.questions) {
    if (q.type === 'photos') {
      if (q.required && draft.photos.length === 0) errors[q.id] = 'Adjunta al menos una foto'
      continue
    }
    const value = draft.answers[q.id]
    const empty =
      value === undefined || value === '' || (Array.isArray(value) && value.length === 0)
    if (empty) {
      if (q.required)
        errors[q.id] = q.type === 'options' ? 'Elige una opción' : 'Este dato es necesario'
      continue
    }
    if (q.type === 'number') {
      const n = Number(value)
      if (!Number.isFinite(n)) errors[q.id] = 'Escribe un número'
      else if (q.min !== undefined && n < q.min)
        errors[q.id] = `Mínimo ${q.min}${q.unit ? ` ${q.unit}` : ''}`
      else if (q.max !== undefined && n > q.max)
        errors[q.id] = `Máximo ${q.max}${q.unit ? ` ${q.unit}` : ''}`
    }
  }
  return errors
}

export function validateAddress(draft: FlowDraft): FieldErrors {
  const errors: FieldErrors = {}
  if (!draft.zone) errors.zone = 'Elige tu localidad'
  if (draft.line.trim().length < 5) errors.line = 'Escribe la dirección completa, ej. Cra 7 # 72-41'
  return errors
}

export function validateSchedule(draft: FlowDraft, techIds: string[]): string | null {
  if (!draft.scheduledAt) return 'Elige el día y la hora'
  if (!isSlotAvailable(draft.scheduledAt, techIds))
    return 'Esa hora ya no está disponible, elige otra'
  return null
}

export function validatePayment(draft: FlowDraft): string | null {
  return draft.paymentMethod ? null : 'Elige cómo vas a pagar'
}

/** Primer paso (1–5) que falta completar, o 6 si todo está listo */
export function firstIncompleteStep(service: Service, draft: FlowDraft, techIds: string[]): number {
  if (Object.keys(validateDetails(service, draft)).length) return 1
  if (Object.keys(validateAddress(draft)).length) return 2
  if (validateSchedule(draft, techIds)) return 3
  if (validatePayment(draft)) return 5
  return 6
}

/* ───────── Persistencia ───────── */

const storageKey = (serviceId: string) => `renova-draft-${serviceId}`

export function useFlowDraft(serviceId: string, init: () => FlowDraft) {
  const [draft, setDraft] = useState<FlowDraft>(() => {
    const base = init()
    try {
      const raw = sessionStorage.getItem(storageKey(serviceId))
      if (raw) {
        const stored = JSON.parse(raw) as Partial<FlowDraft>
        // Un técnico preseleccionado desde su perfil (?tecnico=) manda sobre el borrador
        return {
          ...base,
          ...stored,
          technicianId: base.technicianId ?? stored.technicianId ?? null,
        }
      }
    } catch {
      /* sin almacenamiento: seguimos con el borrador vacío */
    }
    return base
  })
  const finished = useRef(false)

  useEffect(() => {
    if (finished.current) return
    try {
      sessionStorage.setItem(storageKey(serviceId), JSON.stringify(draft))
    } catch {
      // Si las fotos no caben, guardamos el resto
      try {
        sessionStorage.setItem(storageKey(serviceId), JSON.stringify({ ...draft, photos: [] }))
      } catch {
        /* ignorar */
      }
    }
  }, [serviceId, draft])

  const update = useCallback(
    (patch: Partial<FlowDraft>) => setDraft((d) => ({ ...d, ...patch })),
    [],
  )

  /** Llamar al confirmar: deja de guardar y borra el borrador */
  const clear = useCallback(() => {
    finished.current = true
    try {
      sessionStorage.removeItem(storageKey(serviceId))
    } catch {
      /* ignorar */
    }
  }, [serviceId])

  return { draft, update, clear }
}

/** Props comunes de cada paso */
export interface StepProps {
  service: Service
  draft: FlowDraft
  update: (patch: Partial<FlowDraft>) => void
  /** true después de intentar continuar con datos incompletos */
  showErrors: boolean
}
