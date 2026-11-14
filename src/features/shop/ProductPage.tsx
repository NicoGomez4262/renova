import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { ChevronRight, PackageSearch, Store, Truck, Wrench } from 'lucide-react'
import { PageHeader, StickyFooter } from '@/components/layout'
import { Badge, Button, ButtonLink, EmptyState, RatingInline, SectionTitle } from '@/components/ui'
import { getCategory, getProduct, getProducts, getStore } from '@/data/catalog'
import { getZone } from '@/data/zones'
import { formatCOP } from '@/lib/format'
import { FREE_DELIVERY_FROM, toast, useCart } from '@/store'
import { CartButton, ProductCard, ProductThumb, QtyStepper, discountPercent } from './parts'

/** Producto — Tarea A5 (Rol A). */
export default function ProductPage() {
  const { productId = '' } = useParams()
  // key: al pasar a otro producto se reinicia la cantidad
  return <ProductDetail key={productId} productId={productId} />
}

function ProductDetail({ productId }: { productId: string }) {
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const product = getProduct(productId)

  if (!product) {
    return (
      <>
        <PageHeader title="Producto" backTo="/tienda" />
        <EmptyState
          icon={<PackageSearch className="size-7" />}
          title="No encontramos este producto"
          description="Puede que ya no esté disponible. Mira los demás productos de la tienda."
          action={<ButtonLink to="/tienda">Ir a la tienda</ButtonLink>}
        />
      </>
    )
  }

  const store = getStore(product.storeId)
  const discount = discountPercent(product)
  const lowStock = product.stock < 10
  const service = getCategory(product.relatedCategories[0])
  const related = getProducts(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 2)

  const onAdd = () => {
    add(product.id, qty)
    toast(qty > 1 ? `${qty} unidades agregadas al carrito` : 'Agregado al carrito', 'success')
    setQty(1)
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Producto" right={<CartButton />} />

      <div className="px-5 pt-4">
        <div className="relative">
          <ProductThumb product={product} size={120} className="h-56 w-full rounded-3xl" />
          {discount > 0 && (
            <span className="bg-coral-500 absolute top-4 left-4 rounded-full px-3 py-1 text-sm font-extrabold text-white">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      <section className="px-5 pt-5">
        <h1 className="text-ink text-2xl leading-tight font-extrabold">{product.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <RatingInline rating={product.rating} />
          {store && (
            <span className="text-muted inline-flex items-center gap-1 text-sm">
              <Store className="size-4" aria-hidden />
              {store.name} · {getZone(store.zone).name}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-end gap-3">
          <p className="text-coral-500 text-[2rem] leading-none font-extrabold">
            {formatCOP(product.price)}
          </p>
          {product.oldPrice && (
            <p className="text-muted pb-0.5 text-base line-through">
              {formatCOP(product.oldPrice)}
            </p>
          )}
        </div>
        <p className="text-muted mt-1 text-sm">Precio por {product.unit}</p>
        <div className="mt-3">
          {lowStock ? (
            <Badge tone="warning">¡Quedan solo {product.stock}!</Badge>
          ) : (
            <Badge tone="success">Disponible</Badge>
          )}
        </div>

        <p className="text-ink mt-4 text-[15px] leading-relaxed">{product.description}</p>
      </section>

      {/* Entrega */}
      <section className="px-5 pt-5">
        <div className="bg-tile-mint flex gap-3 rounded-2xl p-4">
          <Truck className="text-accent-mint mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="text-ink text-sm">
            <span className="block font-bold">Llega hoy o mañana a tu casa</span>
            Domicilio gratis en compras desde {formatCOP(FREE_DELIVERY_FROM)}.
          </p>
        </div>
      </section>

      {/* Instalación */}
      {service && (
        <section className="px-5 pt-3">
          <Link
            to={`/servicios/${service.id}`}
            className="border-line/70 shadow-card flex items-center gap-3 rounded-2xl border bg-white p-4 transition active:scale-[0.99]"
          >
            <span className="bg-coral-50 text-coral-600 flex size-11 shrink-0 items-center justify-center rounded-full">
              <Wrench className="size-5" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-ink block font-bold">¿Necesitas quién lo instale?</span>
              <span className="text-muted block text-sm">
                Un técnico verificado de {service.name.toLowerCase()} lo hace por ti, con garantía.
              </span>
            </span>
            <ChevronRight className="text-muted size-5 shrink-0" aria-hidden />
          </Link>
        </section>
      )}

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="px-5 pt-8">
          <SectionTitle title="También te puede servir" />
          <div className="grid grid-cols-2 gap-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <StickyFooter>
        <div className="flex items-center gap-3">
          <QtyStepper value={qty} max={product.stock} onChange={setQty} label="Cantidad" />
          <Button size="lg" className="flex-1 px-4" onClick={onAdd}>
            Agregar · {formatCOP(product.price * qty)}
          </Button>
        </div>
      </StickyFooter>
    </div>
  )
}
