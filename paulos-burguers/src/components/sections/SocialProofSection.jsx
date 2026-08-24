import { brand, links, socialProof } from '../../config/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionReveal } from '../../hooks/useSectionReveal'
import { SectionHeading } from '../ui/SectionHeading'

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function VerifiedIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 1.6 2.5 2.2 3.3-.4 1 3.2 3 1.5-1.2 3.1 1.2 3.1-3 1.5-1 3.2-3.3-.4L12 22.4l-2.5-2.2-3.3.4-1-3.2-3-1.5L3.4 12 2.2 8.9l3-1.5 1-3.2 3.3.4L12 1.6Z" />
      <path d="m8.6 12.2 2.3 2.3 4.5-4.6" fill="none" stroke="#120a05" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SocialProofSection() {
  const prefersReducedMotion = useReducedMotion()
  const ref = useSectionReveal({ enabled: !prefersReducedMotion })

  return (
    <section
      id="comunidade"
      ref={ref}
      className="grain relative overflow-hidden border-t border-white/5 bg-coffee-700 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-radial-flame opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Comunidade"
          title="A cidade toda"
          highlight="já provou"
          description={`${socialProof.followers} pessoas acompanham o dia a dia da chapa. Em ${brand.city}, quando o assunto é burguer, o trono é nosso.`}
        />

        {/* Cartão de perfil, no espírito do Instagram */}
        <div
          data-reveal
          className="surface-card mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 p-6 sm:flex-row sm:p-8"
        >
          <div className="relative shrink-0">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-flame-500 via-ketchup to-gold-400 blur-[1px]" />
            <img
              src={brand.logo}
              alt={brand.name}
              width="96"
              height="96"
              loading="lazy"
              className="relative h-20 w-20 rounded-full border-2 border-coffee-700 sm:h-24 sm:w-24"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="flex items-center justify-center gap-1.5 font-heading text-lg tracking-wide text-white sm:justify-start">
              {links.instagramHandle}
              <VerifiedIcon className="h-4 w-4 text-[#3897f0]" />
            </p>
            <p className="mt-1 text-sm text-white/50">
              Hamburgueria · {brand.city}/{brand.state} · desde {brand.since}
            </p>

            <dl className="mt-4 flex justify-center gap-7 sm:justify-start">
              {[
                { v: socialProof.posts, l: 'posts' },
                { v: socialProof.followers, l: 'seguidores' },
                { v: `${socialProof.years}+`, l: 'anos' },
              ].map((s) => (
                <div key={s.l} className="text-center sm:text-left">
                  <dt className="font-heading text-xl text-white sm:text-2xl">{s.v}</dt>
                  <dd className="text-[11px] uppercase tracking-wider text-white/45">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-flame-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-coffee-900 shadow-flame transition-transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="h-4 w-4" />
            Seguir
          </a>
        </div>

        {/* Números da marca */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {socialProof.stats.map((stat) => (
            <div key={stat.label} data-reveal className="surface-card p-5 text-center">
              <p className="font-heading text-2xl text-gold-gradient sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Depoimentos */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {socialProof.quotes.map((quote) => (
            <figure key={quote.author} data-reveal className="surface-card flex h-full flex-col p-6">
              <span aria-hidden="true" className="font-display text-4xl leading-none text-flame-500/60">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
                {quote.text}
              </blockquote>
              <figcaption className="mt-4 text-xs uppercase tracking-wider text-gold-400">
                {quote.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
