import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/**
 * Revela em cascata os filhos marcados com [data-reveal] dentro do container.
 * Com movimento reduzido os elementos aparecem sem deslocamento.
 */
export function useSectionReveal({ enabled = true, stagger = 0.09 } = {}) {
  const ref = useRef(null)

  useIsomorphicLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    if (!enabled) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        }
      )
    }, root)

    return () => ctx.revert()
  }, [enabled, stagger])

  useIsomorphicLayoutEffect(() => {
    // Fontes e imagens mudam a altura da página depois do primeiro cálculo.
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return ref
}
