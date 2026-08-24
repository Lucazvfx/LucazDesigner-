import { brand, links, locations, navItems } from '../../config/site'
import { StoreBadges } from '../ui/StoreBadges'

function Icon({ path, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
      {path}
    </svg>
  )
}

const socials = [
  {
    label: 'Instagram',
    href: links.instagram,
    node: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    href: links.whatsapp,
    node: (
      <>
        <path d="M3.5 20.5 5 16a8 8 0 1 1 3 3l-4.5 1.5Z" strokeLinejoin="round" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.7 0 1.2-.6 1.2-1.2l-1.7-.8-.9 1a5.7 5.7 0 0 1-2.6-2.6l1-.9-.8-1.7c-.6 0-1.2.5-1.2 1.2Z" strokeLinejoin="round" />
      </>
    ),
  },
  {
    label: "Paulo's Bistrô",
    href: links.bistro,
    node: (
      <>
        <path d="M7 3v8a2.5 2.5 0 0 0 5 0V3M9.5 11v10" strokeLinecap="round" />
        <path d="M17 3c-1.5 1.5-2 3.5-2 5.5S15.5 12 17 12v9" strokeLinecap="round" />
      </>
    ),
  },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/10 bg-coffee-900">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-4">
              <img src={brand.logo} alt="" width="64" height="64" loading="lazy" className="h-14 w-14" />
              <div>
                <p className="font-heading text-xl uppercase tracking-widest text-white">
                  Paulo&apos;s <span className="text-gold-gradient">Burguers</span>
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
                  since {brand.since}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Hamburgueria artesanal em {brand.city}/{brand.state}. Blend feito na casa, pão assado
              todo dia e o atendimento que virou tradição na cidade.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/70 transition-colors hover:border-flame-500 hover:text-flame-400"
                >
                  <Icon path={s.node} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-white">Navegue</p>
            <ul className="mt-4 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-white/55 transition-colors hover:text-flame-400">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={links.menudino}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-white/55 transition-colors hover:text-flame-400"
                >
                  Cardápio online (menudino)
                </a>
              </li>
            </ul>
          </nav>

          {/* Unidades e contato */}
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.25em] text-white">Unidades</p>
            <ul className="mt-4 space-y-4 text-sm text-white/55">
              {locations.map((unit) => (
                <li key={unit.id}>
                  <a href={unit.maps} target="_blank" rel="noreferrer noopener" className="transition-colors hover:text-flame-400">
                    {unit.address}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={links.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="heading-title mt-5 block text-xl text-white transition-colors hover:text-flame-400"
            >
              {brand.phone}
            </a>
          </div>
        </div>

        {/* Atalho para o app */}
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/10 pt-10 text-center">
          <p className="text-sm text-white/55">
            Peça em poucos toques e acompanhe a entrega pelo app oficial.
          </p>
          <StoreBadges />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
          </p>
          <p>
            {links.instagramHandle} · Conheça também {links.bistroHandle}
          </p>
        </div>
      </div>
    </footer>
  )
}
