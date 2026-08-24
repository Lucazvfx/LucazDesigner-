import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useLowPerformance } from '../../hooks/useLowPerformance'
import { brand, burgerLayers, heroVideo } from '../../config/site'
import { AmbientBackdrop } from '../ui/AmbientBackdrop'
import { StoreBadges } from '../ui/StoreBadges'
import { BurgerStack } from './BurgerStack'
import { IngredientCaptions } from './IngredientCaptions'

/** Distância de rolagem consumida pelo pin, em múltiplos da altura da seção. */
const SCROLL_DISTANCE = '+=260%'

/** Ingredientes citados no fallback estático, onde não há legendas no scroll. */
const highlights = burgerLayers.filter((layer) => layer.highlight)

export function ExplodedBurgerHero() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const stageRef = useRef(null)
  const stackWrapRef = useRef(null)
  const glowRef = useRef(null)
  const headlineRef = useRef(null)
  const hintRef = useRef(null)
  const finalRef = useRef(null)
  const progressRef = useRef(null)
  const layerRefs = useRef([])
  const captionRefs = useRef([])

  const prefersReducedMotion = useReducedMotion()
  const isLowPerf = useLowPerformance()

  // Fallback: sem pin, sem scrub — hambúrguer montado com flutuação sutil.
  const staticMode = prefersReducedMotion || isLowPerf

  useIsomorphicLayoutEffect(() => {
    if (staticMode) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        { isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023px)' },
        (context) => {
          const { isDesktop } = context.conditions
          const layers = layerRefs.current.filter(Boolean)
          const captions = captionRefs.current.filter(Boolean)
          const stageHeight = () => stageRef.current?.offsetHeight ?? 600

          // Quanto o sanduíche encolhe enquanto explode, para caber na dobra.
          const explodedScale = isDesktop ? 1.05 : 0.98
          const spread = isDesktop ? 0.88 : 0.72

          // Sem o título no caminho, o sanduíche assume o centro óptico da tela.
          // +30 compensa a barra fixa no topo, para o centro óptico ficar abaixo dela.
          const centerShift = () => 30 - ((headlineRef.current?.offsetHeight ?? 0) + 20) / 2

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: SCROLL_DISTANCE,
              scrub: 1,
              pin: pinRef.current,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onToggle: (self) =>
                document.documentElement.classList.toggle('is-pinning', self.isActive),
              onUpdate: (self) =>
                progressRef.current && gsap.set(progressRef.current, { scaleX: self.progress }),
            },
          })

          /* ---- Ato 1: o sanduíche se abre em camadas ---- */
          tl.to(headlineRef.current, { yPercent: -46, opacity: 0, scale: 0.92, ease: 'power2.in', duration: 0.9 }, 0)
            .to(hintRef.current, { opacity: 0, duration: 0.25 }, 0)
            .to(stageRef.current, { scale: explodedScale, duration: 1 }, 0)
            .to(stackWrapRef.current, { y: centerShift, duration: 1, ease: 'power2.out' }, 0)
            .to(glowRef.current, { scale: 1.35, opacity: 0.75, duration: 1 }, 0)

          layers.forEach((node, index) => {
            const layer = burgerLayers[index]
            tl.to(
              node,
              {
                y: () => (layer.offset / 100) * stageHeight() * spread,
                z: layer.depth * (isDesktop ? 170 : 90),
                rotate: layer.rotate * (isDesktop ? 1 : 0.6),
                rotationX: layer.tilt,
                duration: 1,
                ease: 'power2.out',
              },
              0
            )
          })

          /* ---- Ato 2: as legendas dos ingredientes ---- */
          if (isDesktop) {
            // Cada legenda entra e permanece: elas ocupam alturas diferentes.
            tl.fromTo(
              captions,
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' },
              0.75
            )
          } else {
            // Uma de cada vez, no mesmo ponto da tela.
            // Janelas sem sobreposição: cada legenda sai antes de a próxima entrar.
            const step = 0.21
            captions.forEach((node, index) => {
              const at = 0.75 + index * step
              tl.fromTo(node, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.08 }, at)
                .to(node, { opacity: 0, y: -14, duration: 0.08 }, at + 0.12)
            })
          }

          /* ---- Ato 3: tudo se junta e o CTA aparece ---- */
          const assembleAt = 2.35
          tl.to(layers, { y: 0, z: 0, rotate: 0, rotationX: 0, duration: 0.9, ease: 'power3.inOut' }, assembleAt)
            .to(stageRef.current, { scale: isDesktop ? 1 : 0.9, duration: 0.9, ease: 'power3.inOut' }, assembleAt)
            .to(glowRef.current, { scale: 1, opacity: 1, duration: 0.9 }, assembleAt)

          if (isDesktop) {
            tl.to(captions, { opacity: 0, duration: 0.3 }, assembleAt)
          }

          tl.fromTo(
            finalRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            assembleAt + 0.5
          )

          // Reserva um respiro no fim para o CTA ficar legível antes de soltar o pin.
          tl.to({}, { duration: 0.6 })

          return () => {
            document.documentElement.classList.remove('is-pinning')
          }
        }
      )

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [staticMode])

  // Fontes e imagens mudam a altura da página depois do primeiro cálculo do pin.
  useIsomorphicLayoutEffect(() => {
    if (staticMode) return
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready?.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [staticMode])

  return (
    <section id="hero" ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className={[
          'grain relative flex h-[100svh] min-h-[560px] w-full flex-col items-center justify-center',
          'overflow-hidden px-5 pt-20 sm:pt-24',
          staticMode ? 'pb-10' : 'pb-28',
        ].join(' ')}
      >
        <AmbientBackdrop animated={!prefersReducedMotion} particles={isLowPerf ? 8 : 18} />

        {heroVideo.enabled && (
          <video
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ opacity: heroVideo.opacity }}
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}

        {/* Título de impacto */}
        <div ref={headlineRef} className="relative z-40 shrink-0 text-center">
          <img
            src={brand.logo}
            alt={brand.name}
            width="112"
            height="112"
            className="mx-auto mb-4 h-16 w-16 drop-shadow-gold sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          />
          <p className="mb-2 text-[10px] uppercase tracking-[0.42em] text-gold-400 sm:text-xs">
            {brand.city} — {brand.state} · desde {brand.since}
          </p>
          <h1 className="display-title text-4xl text-white sm:text-6xl lg:text-7xl">
            O melhor <span className="text-flame-gradient">burguer</span>
            <br />
            está aqui!
          </h1>
        </div>

        {/* Sanduíche em camadas */}
        <div
          ref={stackWrapRef}
          className={[
            'relative z-20 mt-5 shrink-0',
            staticMode
              ? 'h-[26svh] animate-float sm:h-[32svh] lg:h-[38svh]'
              : 'h-[34svh] sm:h-[38svh] lg:h-[44svh]',
          ].join(' ')}
        >
          <BurgerStack layerRefs={layerRefs} stageRef={stageRef} glowRef={glowRef} />
        </div>

        {!staticMode && <IngredientCaptions captionRefs={captionRefs} />}

        {/* CTA final do hero */}
        <div
          ref={finalRef}
          className={
            staticMode
              ? 'relative z-40 mt-6 shrink-0 text-center'
              : 'absolute inset-x-0 bottom-[7%] z-40 px-6 text-center opacity-0'
          }
        >
          {staticMode && (
            <p className="mx-auto mb-4 max-w-2xl text-[10px] uppercase leading-relaxed tracking-[0.18em] text-gold-400/85 sm:text-xs">
              {highlights.map((layer) => layer.label).join(' · ')}
            </p>
          )}
          <p className="mb-4 text-sm text-white/70 sm:text-base">
            Peça pelo app e receba quentinho na sua casa.
          </p>
          <StoreBadges />
        </div>

        {/* Indicação de rolagem */}
        {!staticMode && (
          <div
            ref={hintRef}
            className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-center"
            aria-hidden="true"
          >
            <span className="block text-[10px] uppercase tracking-[0.3em] text-white/45">
              role para montar
            </span>
            <span className="mx-auto mt-2 block h-8 w-px animate-pulse-glow bg-gradient-to-b from-gold-400 to-transparent" />
          </div>
        )}

        {/* Progresso do ato */}
        {!staticMode && (
          <div className="absolute inset-x-0 bottom-0 z-40 h-[3px] bg-white/5">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-gradient-to-r from-flame-500 via-gold-400 to-flame-500"
            />
          </div>
        )}
      </div>
    </section>
  )
}
