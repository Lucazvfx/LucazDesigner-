import { brand, links, locations } from '../../config/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { SectionHeading } from '../ui/SectionHeading'

function PinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.5l3.5 2" strokeLinecap="round" />
    </svg>
  )
}

function LocationCard({ unit }) {
  return (
    <article data-reveal className="surface-card p-6 transition-colors hover:border-gold-500/40 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-flame-500/15 text-flame-400">
          <PinIcon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="heading-title text-xl text-white sm:text-2xl">{unit.name}</h3>
          <p className="mt-1 text-sm text-white/55">{unit.address}</p>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
        {unit.hours.map((slot) => (
          <li key={slot.days} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2 text-white/55">
              <ClockIcon className="h-4 w-4 text-gold-500" />
              {slot.days}
            </span>
            <span className="font-heading tracking-wider text-white">{slot.time}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={unit.maps}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/80 transition-colors hover:border-flame-500 hover:text-flame-400"
        >
          Como chegar
        </a>
        <a
          href={links.whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className="rounded-full bg-white/[0.06] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white/80 transition-colors hover:bg-flame-500 hover:text-coffee-900"
        >
          Chamar no WhatsApp
        </a>
      </div>
    </article>
  )
}

export function LocationsSection() {
  const prefersReducedMotion = useReducedMotion()
  const ref = useSectionReveal({ enabled: !prefersReducedMotion })

  return (
    <section id="unidades" ref={ref} className="relative border-t border-white/5 bg-coffee-800 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={`${brand.city} — ${brand.state}`}
          title="Duas unidades"
          highlight="pertinho de você"
          description="Salão climatizado, retirada rápida e delivery nas duas casas. Chegue com fome."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {locations.map((unit) => (
            <LocationCard key={unit.id} unit={unit} />
          ))}
        </div>

        <div
          data-reveal
          className="surface-card mt-8 flex flex-col items-center justify-between gap-4 p-6 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold-400">Reservas e pedidos</p>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="heading-title mt-1 block text-2xl text-white transition-colors hover:text-flame-400 sm:text-3xl"
            >
              {brand.phone}
            </a>
          </div>
          <a
            href={links.menudino}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-flame-500 px-7 py-3.5 font-heading uppercase tracking-wider text-coffee-900 shadow-flame transition-transform hover:-translate-y-0.5"
          >
            Pedir online
          </a>
        </div>
      </div>
    </section>
  )
}
