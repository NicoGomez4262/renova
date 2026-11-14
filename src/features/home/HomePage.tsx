import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { ChevronRight, Search } from 'lucide-react'
import { TopBar } from '@/components/layout'
import { ButtonLink, SectionTitle } from '@/components/ui'
import { CategoryTile, ServiceCard, TrustBadges } from '@/components/common'
import { HouseIllustration } from '@/components/brand/HouseIllustration'
import { getCategories, getPopularServices } from '@/data/catalog'
import { FeaturedProducts, NextBookingCard, TopTechnicians } from './sections'

/**
 * Inicio — referencia visual del sistema de diseño (Fase 0) + secciones
 * de la tarea A7: próxima reserva, técnicos y materiales.
 */
export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const categories = getCategories().slice(0, 4)
  const popular = getPopularServices()

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    navigate(query.trim() ? `/servicios?q=${encodeURIComponent(query.trim())}` : '/servicios')
  }

  return (
    <div className="animate-fade-in">
      <TopBar />

      {/* Saludo */}
      <section className="relative px-5 pt-3 pb-5">
        <HouseIllustration className="absolute top-1 right-[2%] w-[34%] max-w-44" />
        <h1 className="font-display-tight text-navy-900 relative text-[clamp(1.9rem,8.6vw,2.6rem)]">
          Hola,
          <br />
          ¿qué necesita
          <br />
          <span className="text-coral-500">tu hogar?</span>
        </h1>
      </section>

      {/* Buscador */}
      <form onSubmit={onSearch} className="px-5" role="search">
        <label className="border-line shadow-card focus-within:border-navy-300 flex h-14 items-center gap-3 rounded-2xl border bg-white px-4">
          <Search className="text-navy-900 size-5.5" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar un servicio"
            aria-label="Buscar un servicio"
            className="placeholder:text-muted h-full flex-1 bg-transparent text-base outline-none"
          />
        </label>
      </form>

      {/* Categorías */}
      <section className="mt-5 grid grid-cols-4 gap-2.5 px-5" aria-label="Categorías">
        {categories.map((c) => (
          <CategoryTile key={c.id} category={c} />
        ))}
      </section>

      {/* Próxima reserva (si hay una activa) */}
      <NextBookingCard />

      {/* Banner */}
      <section className="mt-6 px-5">
        <div className="from-coral-50 relative flex min-h-56 overflow-hidden rounded-3xl bg-gradient-to-r via-[#fdf2ea] to-[#f8eadf]">
          <div className="relative z-10 flex w-[64%] flex-col justify-center py-6 pl-5">
            <h2 className="font-display-tight text-navy-900 text-[1.65rem]">
              Todo lo que tu hogar necesita <span className="text-coral-500">a un clic</span>
            </h2>
            <p className="text-muted mt-2 text-sm leading-snug">
              Mantenimiento y limpieza para tu hogar.
            </p>
            <ButtonLink
              to="/servicios"
              size="sm"
              className="mt-4 self-start px-4 whitespace-nowrap"
              iconRight={<ChevronRight className="size-4" aria-hidden />}
            >
              Ver todos los servicios
            </ButtonLink>
          </div>
          <img
            src="/img/banner-hogar.webp"
            alt="Una clienta saluda a un técnico de Renova en su casa"
            className="absolute inset-y-0 right-0 h-full w-[46%] object-cover object-left"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 28%)' }}
          />
        </div>
      </section>

      {/* Servicios populares */}
      <section className="mt-7 px-5">
        <SectionTitle title="Servicios populares" to="/servicios" />
        <div className="grid grid-cols-2 gap-3">
          {popular.map((s) => (
            <ServiceCard key={s.id} service={s} showCategory />
          ))}
        </div>
      </section>

      <TopTechnicians />
      <FeaturedProducts />

      {/* Por qué Renova */}
      <section className="mt-8 px-5">
        <SectionTitle title="¿Por qué Renova?" />
        <TrustBadges />
      </section>

      {/* Lado técnico */}
      <section className="mt-6 px-5 pb-4">
        <Link
          to="/unete"
          className="bg-navy-900 flex items-center justify-between gap-3 rounded-2xl p-4 text-white"
        >
          <span>
            <span className="block font-extrabold">¿Eres técnico?</span>
            <span className="text-navy-100 block text-sm">
              Más trabajos cerca de ti, pagos seguros y salud.
            </span>
          </span>
          <ChevronRight className="size-5 shrink-0" aria-hidden />
        </Link>
      </section>
    </div>
  )
}
