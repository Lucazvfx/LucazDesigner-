import { useEffect, useState } from 'react'
import { brand, links, navItems } from '../../config/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open ? 'border-b border-white/10 bg-coffee-900/85 backdrop-blur-md' : '',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#hero" className="flex items-center gap-3" aria-label={`${brand.name} — início`}>
          <img src={brand.logo} alt="" width="40" height="40" className="h-10 w-10" />
          <span className="hidden font-heading text-lg uppercase tracking-widest text-white sm:block">
            Paulo&apos;s <span className="text-gold-gradient">Burguers</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm font-medium text-white/70 transition-colors hover:text-flame-400"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={links.menudino}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-flame-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-coffee-900 shadow-flame transition-transform hover:-translate-y-0.5 sm:px-5 sm:text-sm"
          >
            Peça agora
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label="Abrir menu"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute inset-x-0 top-0 h-0.5 bg-current transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
              <span className={`absolute inset-x-0 top-[6px] h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute inset-x-0 top-[12px] h-0.5 bg-current transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="menu-mobile" className="border-t border-white/10 px-5 pb-4 pt-2 md:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 font-heading uppercase tracking-wider text-white/80"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
