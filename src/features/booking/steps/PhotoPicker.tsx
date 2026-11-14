import { useState } from 'react'
import { Camera, LoaderCircle, X } from 'lucide-react'
import { toast } from '@/store'
import { compressImage } from '../photos'
import { MAX_PHOTOS } from '../draft'

/** Zona "Adjuntar fotos" con miniaturas (como el mockup). */
export function PhotoPicker({
  photos,
  onChange,
  hint = 'Puedes subir varias fotos',
}: {
  photos: string[]
  onChange: (photos: string[]) => void
  hint?: string
}) {
  const [loading, setLoading] = useState(false)
  const remaining = MAX_PHOTOS - photos.length

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return
    const list = Array.from(files).slice(0, remaining)
    if (files.length > remaining) toast(`Puedes adjuntar hasta ${MAX_PHOTOS} fotos`)
    setLoading(true)
    const added: string[] = []
    for (const file of list) {
      try {
        added.push(await compressImage(file))
      } catch {
        toast('No pudimos leer una de las fotos', 'error')
      }
    }
    setLoading(false)
    if (added.length) onChange([...photos, ...added])
  }

  return (
    <div className="space-y-3">
      {remaining > 0 && (
        <label className="border-navy-200 bg-navy-50/40 hover:border-navy-300 has-[:focus-visible]:outline-coral-500 flex cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-4 py-5 transition has-[:focus-visible]:outline-2">
          {loading ? (
            <LoaderCircle className="text-accent-sky size-8 animate-spin" aria-hidden />
          ) : (
            <Camera className="text-accent-sky size-9" strokeWidth={1.6} aria-hidden />
          )}
          <span>
            <span className="text-navy-900 block font-bold">Adjuntar fotos</span>
            <span className="text-muted block text-sm">{hint}</span>
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              void onFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </label>
      )}
      {photos.length > 0 && (
        <ul className="grid grid-cols-4 gap-2">
          {photos.map((src, i) => (
            <li key={i} className="relative aspect-square">
              <img src={src} alt={`Foto ${i + 1}`} className="size-full rounded-xl object-cover" />
              <button
                type="button"
                onClick={() => onChange(photos.filter((_, j) => j !== i))}
                aria-label={`Quitar foto ${i + 1}`}
                className="bg-navy-900 shadow-card absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full text-white"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
