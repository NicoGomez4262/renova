/** Título grande + texto de ayuda al inicio de cada paso */
export function StepIntro({ title, text }: { title: string; text?: string }) {
  return (
    <div>
      <h2 className="font-display-tight text-navy-900 text-[1.9rem]">{title}</h2>
      {text && <p className="text-muted mt-1.5 text-[15px] leading-snug">{text}</p>}
    </div>
  )
}
