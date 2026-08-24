export function SectionHeading({ eyebrow, title, highlight, description, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left' : 'text-center mx-auto'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p data-reveal className="mb-3 text-[10px] uppercase tracking-[0.4em] text-gold-400 sm:text-xs">
          {eyebrow}
        </p>
      )}
      <h2 data-reveal className="display-title text-3xl text-white sm:text-5xl">
        {title} {highlight && <span className="text-flame-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p data-reveal className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
