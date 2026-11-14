import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import {
  Award,
  ChevronRight,
  CircleCheck,
  Clock,
  GraduationCap,
  Heart,
  HeartPulse,
  IdCard,
  MapPin,
  SearchX,
  ShieldCheck,
  UserX,
} from 'lucide-react'
import type { Service, Technician, Tone } from '@/types'
import { PageHeader, StickyFooter } from '@/components/layout'
import {
  Avatar,
  Badge,
  Button,
  ButtonLink,
  EmptyState,
  RatingInline,
  SectionTitle,
  Sheet,
  StarRating,
} from '@/components/ui'
import { CategoryIcon } from '@/components/brand/CategoryIcon'
import {
  getCategory,
  getReviewsForTechnician,
  getServicesByCategory,
  getTechnician,
} from '@/data/catalog'
import { getZone } from '@/data/zones'
import { toast, useSession } from '@/store'
import { cn } from '@/lib/cn'
import { firstName, formatCOP, formatShortDate } from '@/lib/format'
import { toneClasses } from '@/lib/tones'

const VERIFICATIONS: {
  key: keyof Technician['verification']
  icon: typeof IdCard
  title: string
  text: string
}[] = [
  {
    key: 'identity',
    icon: IdCard,
    title: 'Identidad verificada',
    text: 'Documento y foto confirmados',
  },
  {
    key: 'background',
    icon: ShieldCheck,
    title: 'Antecedentes revisados',
    text: 'Sin antecedentes judiciales ni disciplinarios',
  },
  { key: 'health', icon: HeartPulse, title: 'Afiliado a salud', text: 'Seguridad social al día' },
  {
    key: 'training',
    icon: GraduationCap,
    title: 'Capacitación Renova',
    text: 'Servicio al cliente, puntualidad y seguridad',
  },
]

const REVIEW_TONES: Tone[] = ['mint', 'peach', 'butter', 'lilac', 'teal', 'sky']

/** Perfil del técnico — Tarea A2 (Rol A). */
export default function TechnicianPage() {
  const { technicianId = '' } = useParams()
  const navigate = useNavigate()
  const favorites = useSession((s) => s.favorites)
  const toggleFavorite = useSession((s) => s.toggleFavorite)
  const [pickerOpen, setPickerOpen] = useState(false)

  const technician = getTechnician(technicianId)
  if (!technician) {
    return (
      <>
        <PageHeader title="Técnico" backTo="/servicios" />
        <EmptyState
          icon={<UserX className="size-7" />}
          title="No encontramos a este técnico"
          description="Puede que ya no esté disponible. Mira los técnicos de cada categoría."
          action={<ButtonLink to="/servicios">Ver servicios</ButtonLink>}
        />
      </>
    )
  }

  const name = firstName(technician.name)
  const isFavorite = favorites.includes(technician.id)
  const reviews = getReviewsForTechnician(technician.id)
  const services = technician.categories.flatMap((c) => getServicesByCategory(c))
  const verifiedCount = VERIFICATIONS.filter((v) => technician.verification[v.key]).length
  const bookingLink = (s: Service) => `/reservar/${s.id}?tecnico=${technician.id}`

  const onFavorite = () => {
    toggleFavorite(technician.id)
    toast(
      isFavorite ? 'Quitado de tus favoritos' : `${name} está en tus favoritos`,
      isFavorite ? 'default' : 'success',
    )
  }

  const onBook = () => {
    if (services.length === 1) navigate(bookingLink(services[0]))
    else setPickerOpen(true)
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Perfil del técnico"
        right={
          <button
            type="button"
            onClick={onFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className="hover:bg-surface flex size-11 items-center justify-center rounded-full"
          >
            <Heart
              className={cn(
                'size-6 transition',
                isFavorite ? 'fill-coral-500 text-coral-500 scale-110' : 'text-navy-900',
              )}
            />
          </button>
        }
      />

      {/* Encabezado */}
      <section className="flex flex-col items-center px-5 pt-6 text-center">
        <Avatar
          name={technician.name}
          tone={technician.tone}
          size={96}
          verified={technician.verification.identity}
        />
        <h1 className="text-ink mt-3 text-2xl font-extrabold">{technician.name}</h1>
        <p className="text-muted text-[15px]">{technician.title}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <RatingInline rating={technician.rating} count={technician.reviewsCount} />
          <span className="text-muted inline-flex items-center gap-1 text-sm">
            <MapPin className="size-4" aria-hidden />
            {getZone(technician.zone).name} · {technician.distanceKm.toFixed(1)} km
          </span>
        </div>
        {technician.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {technician.badges.map((b) =>
              b === 'Top Renova' ? (
                <Badge key={b} tone="coral" icon={<Award className="size-3.5" aria-hidden />}>
                  {b}
                </Badge>
              ) : (
                <Badge key={b} tone="info">
                  {b}
                </Badge>
              ),
            )}
          </div>
        )}
      </section>

      {/* Cifras */}
      <section className="mt-6 grid grid-cols-3 gap-2.5 px-5">
        <Stat value={String(technician.jobsCompleted)} label="trabajos realizados" />
        <Stat value={String(technician.yearsExperience)} label="años de experiencia" />
        <Stat value={String(technician.memberSince)} label="en Renova desde" />
      </section>

      {/* Verificado por Renova */}
      <section className="mt-6 px-5">
        <div className="border-line/70 shadow-card overflow-hidden rounded-3xl border bg-white">
          <div className="bg-navy-900 flex items-center gap-3 px-4 py-3.5 text-white">
            <ShieldCheck className="size-6 shrink-0" aria-hidden />
            <div className="min-w-0 flex-1">
              <p className="font-extrabold">Verificado por Renova</p>
              <p className="text-navy-100 text-sm">
                {verifiedCount} de {VERIFICATIONS.length} verificaciones completas
              </p>
            </div>
          </div>
          <ul className="divide-line/70 divide-y">
            {VERIFICATIONS.map(({ key, icon: Icon, title, text }) => {
              const ok = technician.verification[key]
              return (
                <li key={key} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full',
                      ok ? 'bg-success-bg text-success' : 'bg-surface text-muted',
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-ink block text-[15px] font-bold">{title}</span>
                    <span className="text-muted block text-sm">{text}</span>
                  </span>
                  {ok ? (
                    <CircleCheck
                      className="fill-success size-6 shrink-0 text-white"
                      aria-label="Verificado"
                    />
                  ) : (
                    <Badge tone="warning" icon={<Clock className="size-3.5" aria-hidden />}>
                      En proceso
                    </Badge>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Sobre */}
      <section className="mt-8 px-5">
        <SectionTitle title={`Sobre ${name}`} />
        <p className="text-ink text-[15px] leading-relaxed">{technician.bio}</p>
        <p className="text-muted mt-2 text-sm">
          Atiende en {getZone(technician.zone).name} y localidades cercanas.
        </p>
      </section>

      {/* Servicios */}
      <section className="mt-8 px-5">
        <SectionTitle title="Servicios que ofrece" />
        <div className="space-y-3">
          {services.map((s) => (
            <ServiceBookRow key={s.id} service={s} to={bookingLink(s)} />
          ))}
        </div>
      </section>

      {/* Reseñas */}
      <section className="mt-8 px-5 pb-2">
        <SectionTitle title="Reseñas" />
        <div className="bg-tile-butter mb-4 flex items-center gap-4 rounded-2xl p-4">
          <p className="text-ink text-4xl font-extrabold">{technician.rating.toFixed(1)}</p>
          <div>
            <StarRating value={technician.rating} size={20} />
            <p className="text-muted mt-1 text-sm">
              {technician.reviewsCount} calificaciones de clientes Renova
            </p>
          </div>
        </div>
        {reviews.length > 0 ? (
          <ul className="space-y-3">
            {reviews.map((r, i) => (
              <li key={r.id} className="border-line/70 shadow-card rounded-2xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={r.author} tone={REVIEW_TONES[i % REVIEW_TONES.length]} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-ink truncate font-bold">{r.author}</p>
                      <p className="text-muted shrink-0 text-xs">{formatShortDate(r.date)}</p>
                    </div>
                    <StarRating value={r.rating} size={14} />
                  </div>
                </div>
                <p className="text-ink mt-3 text-[15px] leading-relaxed">{r.text}</p>
                <p className="text-muted mt-2 text-xs">Servicio: {r.serviceName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<SearchX className="size-7" />}
            title="Aún no hay reseñas escritas"
            description={`Sé de los primeros en contar cómo te fue con ${name}.`}
          />
        )}
      </section>

      {/* Acción principal */}
      <StickyFooter>
        <Button
          size="lg"
          fullWidth
          onClick={onBook}
          iconRight={<ChevronRight className="size-5" aria-hidden />}
        >
          Reservar con {name}
        </Button>
      </StickyFooter>

      <Sheet
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title={`¿Qué necesitas de ${name}?`}
      >
        <div className="space-y-3">
          {services.map((s) => (
            <ServiceBookRow key={s.id} service={s} to={bookingLink(s)} />
          ))}
        </div>
      </Sheet>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface rounded-2xl px-2 py-3 text-center">
      <p className="text-navy-900 text-xl font-extrabold">{value}</p>
      <p className="text-muted text-xs leading-tight">{label}</p>
    </div>
  )
}

/** Fila de servicio que lleva directo al flujo de reserva con este técnico */
function ServiceBookRow({ service, to }: { service: Service; to: string }) {
  const category = getCategory(service.categoryId)
  if (!category) return null
  return (
    <Link
      to={to}
      className="border-line/70 shadow-card flex items-center gap-3 rounded-2xl border bg-white p-3 transition active:scale-[0.99]"
    >
      <span
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-xl',
          toneClasses[category.tone].tile,
        )}
      >
        <CategoryIcon id={category.id} size={30} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="text-ink block font-bold">{service.name}</span>
        <span className="text-coral-500 block text-sm font-extrabold">
          {service.priceType === 'cotizacion' ? 'Desde ' : ''}
          {formatCOP(service.price)}
        </span>
      </span>
      <span className="text-coral-600 flex items-center gap-0.5 text-sm font-bold">
        Reservar
        <ChevronRight className="size-4" aria-hidden />
      </span>
    </Link>
  )
}
