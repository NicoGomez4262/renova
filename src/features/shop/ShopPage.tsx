import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ChevronRight, PackageSearch, Search, Truck, X } from 'lucide-react'
import type { ProductCategory } from '@/types'
import { PageHeader, StickyFooter } from '@/components/layout'
import { Button, ButtonLink, Chip, EmptyState } from '@/components/ui'
import { getProducts, normalize } from '@/data/catalog'
import { productCategories } from '@/data/products'
import { formatCOP } from '@/lib/format'
import { FREE_DELIVERY_FROM, getCartTotals, useCart } from '@/store'
import { CartButton, ProductCard } from './parts'

/**
 * Tienda — Tarea A5 (Rol A).
 * La categoría vive en la URL (?categoria=pintura) para poder enlazarla.
 */
export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const cartItems = useCart((s) => s.items)
  const totals = useMemo(() => getCartTotals(cartItems), [cartItems])

  const raw = params.get('categoria')
  const category = productCategories.some((c) => c.id === raw)
    ? (raw as ProductCategory)
    : undefined

  const products = useMemo(() => {
    const q = normalize(query)
    return getProducts(category).filter(
      (p) => !q || normalize(`${p.name} ${p.description}`).includes(q),
    )
  }, [category, query])

  const setCategory = (id?: ProductCategory) =>
    setParams(id ? { categoria: id } : {}, { replace: true, preventScrollReset: true })

  return (
    <div className="animate-fade-in">
      <PageHeader title="Tienda" hideBack right={<CartButton />} />

      <section className="px-5 pt-5">
        <h1 className="font-display-tight text-navy-900 text-[clamp(1.9rem,8.4vw,2.5rem)]">
          Materiales para <span className="text-coral-500">tu proyecto</span>
        </h1>
        <p className="text-muted mt-2 text-[15px]">
          De ferreterías aliadas de tu zona, con entrega en tu casa.
        </p>
      </section>

      {/* Buscador */}
      <div className="px-5 pt-4">
        <label className="border-line shadow-card focus-within:border-navy-300 flex h-13 items-center gap-3 rounded-2xl border bg-white px-4">
          <Search className="text-navy-900 size-5 shrink-0" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pintura, grifería, taladro…"
            aria-label="Buscar productos"
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
      </div>

      {/* Categorías */}
      <div
        className="no-scrollbar mt-3 flex gap-2 overflow-x-auto px-5 pb-1"
        aria-label="Categorías de productos"
      >
        <Chip selected={!category} onClick={() => setCategory()}>
          Todo
        </Chip>
        {productCategories.map((c) => (
          <Chip key={c.id} selected={category === c.id} onClick={() => setCategory(c.id)}>
            {c.name}
          </Chip>
        ))}
      </div>

      {/* Domicilio */}
      <div className="bg-tile-mint mx-5 mt-4 flex items-center gap-3 rounded-2xl px-4 py-3">
        <Truck className="text-accent-mint size-5 shrink-0" aria-hidden />
        <p className="text-ink text-sm">
          <span className="font-bold">Domicilio gratis</span> en compras desde{' '}
          {formatCOP(FREE_DELIVERY_FROM)}. Llega hoy o mañana.
        </p>
      </div>

      {/* Productos */}
      <section className="px-5 pt-5 pb-4" aria-live="polite">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<PackageSearch className="size-7" />}
            title="No encontramos ese producto"
            description="Prueba con otra palabra o mira todas las categorías."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('')
                  setCategory()
                }}
              >
                Ver todos los productos
              </Button>
            }
          />
        )}
      </section>

      {/* Acceso rápido al carrito */}
      {totals.count > 0 && (
        <StickyFooter aboveNav>
          <ButtonLink
            to="/carrito"
            size="lg"
            fullWidth
            variant="secondary"
            className="justify-between px-5"
            iconRight={<ChevronRight className="size-5" aria-hidden />}
          >
            <span>
              Ver carrito · {totals.count} {totals.count === 1 ? 'producto' : 'productos'}
            </span>
            <span className="ml-auto">{formatCOP(totals.subtotal)}</span>
          </ButtonLink>
        </StickyFooter>
      )}
    </div>
  )
}
