import { useEffect, useState } from 'react'
import { links } from '../../config/site'

/** Atalho fixo de pedido — aparece depois que o hero sai da tela. */
export function OrderFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Amarrado ao fim do hero, e não a um múltiplo fixo da tela: a distância
    // do pin pode mudar sem que este atalho volte a cobrir o CTA do hero.
    const onScroll = () => {
      const hero = document.getElementById('hero')
      setVisible(
        hero
          ? hero.getBoundingClientRect().bottom <= 48
          : window.scrollY > window.innerHeight
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <a
      href={links.menudino}
      target="_blank"
      rel="noreferrer noopener"
      className={[
        'fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-flame-500 px-5 py-3.5',
        'font-heading text-sm uppercase tracking-wider text-coffee-900 shadow-flame',
        'transition-all duration-300 md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0',
      ].join(' ')}
    >
      Peça agora
    </a>
  )
}
