import { Hammer } from 'lucide-react'
import { useLocation } from 'react-router'
import { PageHeader } from '@/components/layout/PageHeader'
import { ButtonLink } from '@/components/ui'

const DOCS_URL = 'https://github.com/NicoGomez4262/renova/blob/main/docs/02-fases-y-roles.md'

/**
 * Pantalla temporal ("en construcción").
 * Cada ruta del esqueleto la usa mientras su dueño implementa la tarea.
 * 👉 Cuando tomes la tarea, REEMPLAZA el archivo de la pantalla completo.
 */
export function ComingSoon({
  title,
  task,
  role,
  todo,
  hideHeader,
}: {
  title: string
  /** Id de la tarea en docs/02-fases-y-roles.md, ej. "A1" */
  task: string
  role: 'A' | 'B'
  /** Qué debe tener esta pantalla */
  todo: string[]
  hideHeader?: boolean
}) {
  const { pathname } = useLocation()
  return (
    <>
      {!hideHeader && <PageHeader title={title} />}
      <div className="px-5 py-6">
        <div className="border-navy-200 bg-navy-50/50 rounded-3xl border-2 border-dashed p-5">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-coral-500 shadow-card flex size-11 items-center justify-center rounded-full bg-white">
              <Hammer className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-muted text-xs font-bold tracking-wide uppercase">
                En construcción
              </p>
              <p className="text-ink font-extrabold">
                Tarea {task} · Rol {role}
              </p>
            </div>
          </div>
          <p className="text-muted mb-3 text-sm">
            Ruta <code className="text-ink rounded bg-white px-1.5 py-0.5">{pathname}</code>. Esta
            pantalla debe incluir:
          </p>
          <ul className="space-y-2">
            {todo.map((item) => (
              <li key={item} className="text-ink flex gap-2 text-[15px]">
                <span className="bg-coral-500 mt-2 size-1.5 shrink-0 rounded-full" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={`${DOCS_URL}#${task.toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
            className="text-coral-600 mt-4 inline-block text-sm font-bold underline underline-offset-2"
          >
            Ver la tarea en la documentación →
          </a>
        </div>
        <ButtonLink to="/" variant="outline" fullWidth className="mt-6">
          Volver al inicio
        </ButtonLink>
      </div>
    </>
  )
}
