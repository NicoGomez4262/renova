import { useParams } from 'react-router'
import { SearchX, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/layout'
import { ButtonLink, EmptyState, SectionTitle } from '@/components/ui'
import { ServiceRow, TechnicianCard } from '@/components/common'
import { CategoryIcon } from '@/components/brand/CategoryIcon'
import { getCategory, getServicesByCategory, getTechniciansByCategory } from '@/data/catalog'
import { cn } from '@/lib/cn'
import { formatCOP } from '@/lib/format'
import { toneClasses } from '@/lib/tones'
import { CATEGORY_IMAGES } from './images'

/** Categoría — Tarea A1 (Rol A). */
export default function CategoryPage() {
  const { categoryId = '' } = useParams()
  const category = getCategory(categoryId)

  if (!category) {
    return (
      <>
        <PageHeader title="Categoría" backTo="/servicios" />
        <EmptyState
          icon={<SearchX className="size-7" />}
          title="No encontramos esta categoría"
          description="Puede que el enlace esté mal escrito. Mira todas las categorías disponibles."
          action={<ButtonLink to="/servicios">Ver servicios</ButtonLink>}
        />
      </>
    )
  }

  const services = getServicesByCategory(category.id)
  const technicians = getTechniciansByCategory(category.id)
  const image = CATEGORY_IMAGES[category.id]
  const tone = toneClasses[category.tone]

  return (
    <div className="animate-fade-in">
      <PageHeader title={category.name} />

      {/* Encabezado estilo mockup: "Pintura para tu hogar" */}
      <section className="px-5 pt-4">
        {image ? (
          <div className={cn('relative flex min-h-48 overflow-hidden rounded-3xl', tone.tile)}>
            <div className="relative z-10 flex w-[58%] flex-col justify-center py-6 pl-5">
              <h1 className="font-display-tight text-navy-900 text-[clamp(1.8rem,8vw,2.4rem)]">
                {category.name} para <span className="text-coral-500">tu hogar</span>
              </h1>
              <p className="text-muted mt-2 text-[15px] leading-snug">{category.tagline}.</p>
              <FromPrice value={category.fromPrice} />
            </div>
            <img
              src={image}
              alt=""
              className="absolute inset-y-0 right-0 h-full w-[48%] object-cover"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 22%)' }}
            />
          </div>
        ) : (
          <div className={cn('rounded-3xl p-5', tone.tile)}>
            <span className="mb-3 flex size-16 items-center justify-center rounded-2xl bg-white/70">
              <CategoryIcon id={category.id} size={44} />
            </span>
            <h1 className="font-display-tight text-navy-900 text-[clamp(1.6rem,7.4vw,2.2rem)]">
              {category.name} para <span className="text-coral-500">tu hogar</span>
            </h1>
            <p className="text-muted mt-2 text-[15px] leading-snug">{category.tagline}.</p>
            <FromPrice value={category.fromPrice} />
          </div>
        )}
      </section>

      {/* Servicios */}
      <section className="mt-7 px-5">
        <SectionTitle title="¿Qué necesitas?" />
        <div className="space-y-3">
          {services.map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Técnicos */}
      {technicians.length > 0 && (
        <section className="mt-8 px-5 pb-4">
          <SectionTitle title="Técnicos destacados" />
          <div className="space-y-3">
            {technicians.slice(0, 3).map((t) => (
              <TechnicianCard key={t.id} technician={t} />
            ))}
          </div>
          <div className="bg-navy-50/70 mt-4 flex items-start gap-3 rounded-2xl p-4">
            <ShieldCheck className="text-navy-700 mt-0.5 size-5 shrink-0" aria-hidden />
            <p className="text-ink text-sm">
              <span className="font-bold">Todos están verificados por Renova:</span> identidad,
              antecedentes, afiliación a salud y capacitación.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

function FromPrice({ value }: { value: number }) {
  return (
    <p className="text-ink mt-3 text-sm font-bold">
      Desde <span className="text-coral-500">{formatCOP(value)}</span>
    </p>
  )
}
