import { SearchX } from 'lucide-react'
import { ButtonLink, EmptyState } from '@/components/ui'
import { PageHeader } from '@/components/layout'

export default function NotFoundPage() {
  return (
    <>
      <PageHeader title="Página no encontrada" backTo="/" />
      <EmptyState
        icon={<SearchX className="size-7" />}
        title="No encontramos esta página"
        description="Puede que el enlace esté mal escrito o que la página ya no exista."
        action={<ButtonLink to="/">Ir al inicio</ButtonLink>}
      />
    </>
  )
}
