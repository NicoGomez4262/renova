/**
 * Paneles laterales para pantallas grandes (≥ 1280 px): marca a la
 * izquierda y "Ábrelo en tu celular" con código QR a la derecha.
 * Pensado para presentar la app desde un computador. En celular no se
 * renderiza (ni se descarga la librería del QR).
 */
import { useEffect, useState } from 'react'
import { Smartphone } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { TRUST_PILLARS } from '@/components/common/TrustBadges'
import { useMediaQuery } from '@/lib/useMediaQuery'

export function DesktopPanels() {
  const wide = useMediaQuery('(min-width: 1280px)')
  if (!wide) return null
  const url = window.location.origin

  return (
    <>
      {/* Marca */}
      <aside
        className="fixed inset-y-0 left-0 flex w-[calc(50vw-16rem)] items-center justify-center p-10"
        aria-label="Sobre Renova"
      >
        <div className="max-w-sm">
          <Logo size={34} />
          <p className="font-display-tight text-navy-900 mt-8 text-5xl">
            Todo lo que tu hogar necesita <span className="text-coral-500">a un clic</span>
          </p>
          <p className="text-muted mt-4 text-lg">
            Servicios para el hogar en Bogotá, con técnicos de confianza.
          </p>
          <ul className="mt-8 space-y-4">
            {TRUST_PILLARS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="text-navy-700 shadow-card flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="text-ink block font-extrabold">{title}</span>
                  <span className="text-muted block text-sm">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Ábrelo en tu celular */}
      <aside
        className="fixed inset-y-0 right-0 flex w-[calc(50vw-16rem)] items-center justify-center p-10"
        aria-label="Abrir en el celular"
      >
        <div className="shadow-float w-full max-w-xs rounded-3xl bg-white p-6 text-center">
          <span className="bg-coral-50 text-coral-500 mx-auto flex size-12 items-center justify-center rounded-full">
            <Smartphone className="size-6" aria-hidden />
          </span>
          <p className="text-ink mt-3 text-xl font-extrabold">Ábrelo en tu celular</p>
          <p className="text-muted mt-1 text-sm">Escanea el código con la cámara.</p>
          <div className="mt-4 flex justify-center">
            <QrCode text={url} size={180} />
          </div>
          <p className="text-navy-700 mt-3 text-sm font-bold break-all">
            {url.replace(/^https?:\/\//, '')}
          </p>
          <div className="bg-surface text-ink mt-5 space-y-1.5 rounded-2xl p-3 text-left text-sm">
            <p className="font-bold">Instálala como app</p>
            <p>
              <span className="font-semibold">Android:</span> menú ⋮ → Instalar app
            </p>
            <p>
              <span className="font-semibold">iPhone:</span> Compartir → Agregar a inicio
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

/** Código QR dibujado en SVG (la librería se carga solo cuando se necesita) */
function QrCode({ text, size }: { text: string; size: number }) {
  const [modules, setModules] = useState<boolean[][] | null>(null)

  useEffect(() => {
    let alive = true
    import('uqr').then(({ encode }) => {
      if (alive) setModules(encode(text, { ecc: 'M', border: 2 }).data)
    })
    return () => {
      alive = false
    }
  }, [text])

  if (!modules)
    return (
      <div className="bg-surface animate-pulse rounded-xl" style={{ width: size, height: size }} />
    )

  const n = modules.length
  let d = ''
  modules.forEach((row, y) =>
    row.forEach((on, x) => {
      if (on) d += `M${x} ${y}h1v1h-1z`
    }),
  )
  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`Código QR para abrir ${text}`}
    >
      <rect width={n} height={n} fill="#fff" />
      <path d={d} fill="var(--color-navy-900)" />
    </svg>
  )
}
