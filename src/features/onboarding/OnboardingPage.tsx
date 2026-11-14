import { ComingSoon } from '@/components/common'

/**
 * Bienvenida — TAREA B7 (Rol B).
 * Pantalla temporal del esqueleto: reemplaza este archivo completo
 * al implementar la tarea. Ver docs/02-fases-y-roles.md#b7
 */
export default function OnboardingPage() {
  return (
    <ComingSoon
      title="Bienvenida"
      task="B7"
      role="B"
      todo={[
        '3 pantallas deslizables: Verificados · Hora exacta · Garantía 30 días',
        'Botones "Saltar" y "Empezar" → completeOnboarding()',
        'Mostrar solo la primera vez (redirigir desde Inicio si !hasSeenOnboarding)',
      ]}
    />
  )
}
