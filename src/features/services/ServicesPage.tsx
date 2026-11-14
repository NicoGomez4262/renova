import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { Search, SearchX, X } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { Button, Chip, EmptyState, SectionTitle } from '@/components/ui'
import { CategoryTile, ServiceRow } from '@/components/common'
import { getCategories, getPopularServices, searchServices } from '@/data/catalog'

/** Búsquedas rápidas sugeridas (problemas comunes en el hogar) */
const SUGGESTIONS = ['Fuga', 'Destapar', 'Pintar', 'Lavadora', 'Lámpara', 'TV']

/**
 * Todos los servicios + búsqueda — Tarea A1 (Rol A).
 * La búsqueda vive en la URL (?q=), así funciona el buscador de Inicio
 * y se puede compartir el enlace.
 */
export default function ServicesPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const trimmed = query.trim()

  const results = useMemo(() => (trimmed ? searchServices(trimmed) : []), [trimmed])
  const categories = getCategories()
  const popular = getPopularServices()

  const setQuery = (value: string) =>
    setParams(value ? { q: value } : {}, { replace: true, preventScrollReset: true })

  return (
    <div className="animate-fade-in">
      <PageHeader title="Servicios" backTo="/" />

      {/* Buscador */}
      <form
        role="search"
        className="px-5 pt-4"
        onSubmit={(e) => {
          e.preventDefault()
          ;(document.activeElement as HTMLElement | null)?.blur()
        }}
      >
        <label className="border-line shadow-card focus-within:border-navy-300 flex h-14 items-center gap-3 rounded-2xl border bg-white px-4">
          <Search className="text-navy-900 size-5.5 shrink-0" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué necesitas arreglar?"
            aria-label="Buscar un servicio"
            enterKeyHint="search"
            autoFocus={!!trimmed}
            className="placeholder:text-muted h-full min-w-0 flex-1 bg-transparent text-base outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Borrar búsqueda"
              className="text-muted hover:bg-surface -mr-2 flex size-10 items-center justify-center rounded-full"
            >
              <X className="size-5" />
            </button>
          )}
        </label>
      </form>

      {trimmed ? (
        <section className="px-5 pt-5" aria-live="polite">
          {results.length > 0 ? (
            <>
              <p className="text-muted mb-3 text-sm">
                {results.length} {results.length === 1 ? 'resultado' : 'resultados'} para{' '}
                <span className="text-ink font-bold">“{trimmed}”</span>
              </p>
              <div className="space-y-3">
                {results.map((s) => (
                  <ServiceRow key={s.id} service={s} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={<SearchX className="size-7" />}
              title={`No encontramos “${trimmed}”`}
              description="Prueba con otra palabra, como el problema que tienes o el electrodoméstico."
              action={
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.slice(0, 4).map((s) => (
                      <Chip key={s} onClick={() => setQuery(s)}>
                        {s}
                      </Chip>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => setQuery('')}>
                    Ver todas las categorías
                  </Button>
                </div>
              }
            />
          )}
        </section>
      ) : (
        <>
          {/* Sugerencias rápidas */}
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
            {SUGGESTIONS.map((s) => (
              <Chip key={s} onClick={() => setQuery(s)} className="h-9">
                {s}
              </Chip>
            ))}
          </div>

          {/* Categorías */}
          <section className="mt-6 px-5">
            <SectionTitle title="Categorías" />
            <div className="grid grid-cols-3 gap-2.5">
              {categories.map((c) => (
                <CategoryTile key={c.id} category={c} />
              ))}
            </div>
          </section>

          {/* Más pedidos */}
          <section className="mt-8 px-5 pb-4">
            <SectionTitle title="Los más pedidos" />
            <div className="space-y-3">
              {popular.map((s) => (
                <ServiceRow key={s.id} service={s} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
