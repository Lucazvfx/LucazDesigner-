import { menu, links } from '../../config/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { SectionHeading } from '../ui/SectionHeading'

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function BurgerCard({ item }) {
  return (
    <article
      data-reveal
      className="surface-card group relative flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 hover:border-flame-500/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-coffee-700">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-flame-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-coffee-900">
            {item.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="heading-title text-xl text-white sm:text-2xl">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{item.description}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-heading text-2xl text-gold-gradient">{brl.format(item.price)}</span>
          <a
            href={links.menudino}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-flame-500/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-flame-400 transition-colors hover:bg-flame-500 hover:text-coffee-900"
          >
            Peça agora
          </a>
        </div>
      </div>
    </article>
  )
}

export function MenuSection() {
  const prefersReducedMotion = useReducedMotion()
  const ref = useSectionReveal({ enabled: !prefersReducedMotion })

  return (
    <section id="cardapio" ref={ref} className="relative border-t border-white/5 bg-coffee-700 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-radial-flame opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Cardápio"
          title="Os queridinhos"
          highlight="da casa"
          description="Blend artesanal, pão assado no dia e ingredientes selecionados. Do clássico ao autoral — tem sempre um do seu jeito."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <BurgerCard key={item.id} item={item} />
          ))}
        </div>

        <div data-reveal className="mt-12 text-center">
          <a
            href={links.menudino}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-flame-500 px-8 py-4 font-heading uppercase tracking-wider text-coffee-900 shadow-flame transition-transform hover:-translate-y-0.5"
          >
            Ver cardápio completo
          </a>
        </div>
      </div>
    </section>
  )
}
