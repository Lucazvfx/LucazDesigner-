import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useConstrainedDevice } from '../../hooks/useConstrainedDevice'
import { brand, heroVideo, ingredients } from '../../config/site'
import { AmbientBackdrop } from '../ui/AmbientBackdrop'
import { StoreBadges } from '../ui/StoreBadges'
import { IngredientCaptions } from './IngredientCaptions'

/** Distância de rolagem consumida pelo pin, em múltiplos da altura da seção. */
const SCROLL_DISTANCE = '+=320%'

/** Comprimento da timeline em unidades — o vídeo inteiro ocupa esse intervalo. */
const TOTAL = 4

/** Segundo do vídeo → unidade da timeline (independente da duração real do arquivo). */
const at = (seconds) => (seconds / heroVideo.authoredDuration) * TOTAL

const CUT = at(heroVideo.cutAt)

/** Ingredientes citados no fallback estático, onde não há legendas no scroll. */
const highlights = ingredients.filter((item) => item.highlight)

/**
 * Coluna lateral no desktop, faixa horizontal no mobile.
 * As âncoras verticais ficam em cada bloco para não conflitarem entre si —
 * utilitários do mesmo breakpoint que escrevem a mesma propriedade têm ordem
 * indefinida no CSS gerado.
 */
const sideColumn = [
  'absolute z-40 px-5 text-center',
  'lg:bottom-0 lg:left-0 lg:right-auto lg:top-0 lg:flex lg:w-[38%] lg:max-w-lg',
  'lg:flex-col lg:justify-center lg:px-0 lg:pl-[5vw] lg:pr-8 lg:text-left',
].join(' ')

function HeadlineContent() {
  return (
    <>
      <img
        src={brand.logo}
        alt={brand.name}
        width="96"
        height="96"
        className="mx-auto mb-3 h-12 w-12 drop-shadow-gold sm:h-16 sm:w-16 lg:mx-0 lg:mb-5 lg:h-20 lg:w-20"
      />
      <p className="mb-2 text-[10px] uppercase tracking-[0.38em] text-gold-400 sm:text-xs">
        {brand.city} — {brand.state} · desde {brand.since}
      </p>
      <h1 className="display-title text-3xl text-white sm:text-5xl lg:text-[3.25rem]">
        O melhor <span className="text-flame-gradient">burguer</span> está aqui!
      </h1>
    </>
  )
}

function CtaContent({ withHighlights = false }) {
  return (
    <>
      {withHighlights && (
        <p className="mx-auto mb-4 max-w-md text-[10px] uppercase leading-relaxed tracking-[0.18em] text-gold-400/85 sm:text-xs lg:mx-0">
          {highlights.map((item) => item.label).join(' · ')}
        </p>
      )}
      <p className="mb-4 text-sm text-white/70 sm:text-base">
        Peça pelo app e receba quentinho na sua casa.
      </p>
      <StoreBadges className="lg:justify-start" />
    </>
  )
}

export function ExplodedBurgerHero() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const videoRef = useRef(null)
  const headlineRef = useRef(null)
  const hintRef = useRef(null)
  const finalRef = useRef(null)
  const flashRef = useRef(null)
  const veilRef = useRef(null)
  const progressRef = useRef(null)
  const captionRefs = useRef([])
  const durationRef = useRef(heroVideo.authoredDuration)

  const prefersReducedMotion = useReducedMotion()
  const isConstrained = useConstrainedDevice()

  // Fallback: sem pin, sem vídeo — só o frame do sanduíche montado, flutuando.
  const staticMode = prefersReducedMotion || isConstrained

  // Prepara o vídeo para receber seeks: guarda a duração real e destrava o
  // decodificador, que no iOS só começa a bufferizar depois de um play().
  useIsomorphicLayoutEffect(() => {
    const video = videoRef.current
    if (staticMode || !video) return

    const prime = () => {
      // muted + playsInline tornam o play automático permitido; se ainda assim
      // for barrado, o toque abaixo tenta de novo.
      video.play().then(() => video.pause()).catch(() => {})
    }

    const onMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration
      }
      prime()
      ScrollTrigger.refresh()
    }

    if (video.readyState >= 1) onMeta()
    else video.addEventListener('loadedmetadata', onMeta, { once: true })

    // Rede de segurança para o iOS: alguns contextos só liberam a mídia após um
    // gesto do usuário, e aí o primeiro scroll pegaria o vídeo ainda parado.
    window.addEventListener('touchstart', prime, { once: true, passive: true })
    window.addEventListener('pointerdown', prime, { once: true })

    return () => {
      video.removeEventListener('loadedmetadata', onMeta)
      window.removeEventListener('touchstart', prime)
      window.removeEventListener('pointerdown', prime)
    }
  }, [staticMode])

  useIsomorphicLayoutEffect(() => {
    if (staticMode) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // As duas condições precisam existir: o gsap.matchMedia só executa o
      // callback quando ALGUMA delas casa — com apenas `isDesktop`, nada rodaria
      // abaixo de 1024px e o hero ficaria sem pin nem scrub no mobile.
      mm.add(
        { isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023px)' },
        (context) => {
        const { isDesktop } = context.conditions
        const captions = captionRefs.current.filter(Boolean)
        const seek = { time: 0 }

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

        /* ---- O scroll conduz o tempo do vídeo ----
           O scrub do ScrollTrigger já roda uma vez por frame, então basta
           escrever em currentTime aqui; a tolerância de meio frame evita
           seeks redundantes que travariam a decodificação. */
        tl.fromTo(
          seek,
          { time: 0 },
          {
            time: () => durationRef.current,
            duration: TOTAL,
            onUpdate: () => {
              const video = videoRef.current
              if (!video || video.readyState < 1) return
              // Escrever em currentTime com um seek ainda em curso empilha
              // pedidos e trava a decodificação no Safari. Melhor perder o
              // quadro intermediário: o próximo tick já escreve o valor atual.
              if (video.seeking) return
              if (Math.abs(video.currentTime - seek.time) > 1 / 48) {
                video.currentTime = seek.time
              }
            },
          },
          0
        )

        /* ---- Ato 1: o título abre caminho para a câmera ---- */
        tl.to(headlineRef.current, {
          opacity: 0,
          y: isDesktop ? 0 : -30,
          x: isDesktop ? -40 : 0,
          ease: 'power2.in',
          duration: at(2.4),
        }, 0)
          .to(hintRef.current, { opacity: 0, duration: at(0.8) }, 0)

        /* ---- Ato 2: uma legenda por camada atravessada ----
           O véu entra junto: sem ele, texto branco sobre um macro claro
           (tomate, queijo) fica ilegível. */
        tl.fromTo(
          veilRef.current,
          { opacity: 0 },
          { opacity: 0.45, duration: at(0.5), ease: 'power1.out' },
          at(2.1)
        ).to(veilRef.current, { opacity: 0, duration: 0.2, ease: 'power1.in' }, CUT - 0.14)

        /* ---- Ato 2: uma legenda por camada atravessada ---- */
        ingredients.forEach((item, index) => {
          const node = captions[index]
          if (!node) return
          const start = at(item.from)
          const end = at(item.to)
          const fade = Math.min(0.12, (end - start) / 3)

          tl.fromTo(
            node,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: fade, ease: 'power2.out' },
            start
          ).to(node, { opacity: 0, y: -16, duration: fade, ease: 'power2.in' }, end - fade)
        })

        /* ---- Ato 3: o corte de câmera devolve o sanduíche inteiro + CTA ---- */
        tl.fromTo(
          flashRef.current,
          { opacity: 0 },
          { opacity: 0.32, duration: 0.05, ease: 'power2.out' },
          CUT - 0.05
        )
          .to(flashRef.current, { opacity: 0, duration: 0.16, ease: 'power2.in' }, CUT)
          .fromTo(
            finalRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.22, ease: 'power3.out' },
            CUT + 0.04
          )

          return () => {
            document.documentElement.classList.remove('is-pinning')
          }
        }
      )

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [staticMode])

  // Fontes e mídia mudam a altura da página depois do primeiro cálculo do pin.
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
        className="grain relative h-[100svh] min-h-[560px] w-full overflow-hidden"
      >
        <AmbientBackdrop />

        {/* O sanduíche ocupa a tela inteira: sem recorte, não há emenda entre
            o fundo de estúdio do vídeo e o cenário da marca. */}
        <div className="absolute inset-0 z-0">
          {staticMode ? (
            <img
              src={heroVideo.poster}
              alt="Hambúrguer artesanal da Paulo's Burguers em camadas"
              className="h-full w-full animate-float object-cover"
              decoding="async"
              fetchPriority="high"
            />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={heroVideo.src}
              poster={heroVideo.poster}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
            />
          )}
        </div>

        {/* Véu que escurece os macros enquanto as legendas estão em cena */}
        <div
          ref={veilRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-coffee-900 opacity-0"
        />

        {/* Sem timeline não há véu animado: no mobile o texto fica sobre o meio
            do sanduíche, onde os degradês de topo e base não alcançam. */}
        {staticMode && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[5] bg-coffee-900/50 lg:hidden"
          />
        )}

        {/* Calor da marca por cima da cena filmada */}
        <AmbientBackdrop layer="glow" animated={!prefersReducedMotion} particles={isConstrained ? 8 : 18} />

        {/* Véus de leitura: o texto precisa sobreviver a qualquer frame do vídeo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[44%] bg-gradient-to-b from-coffee-900 via-coffee-900/60 to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[46%] bg-gradient-to-t from-coffee-900 via-coffee-900/65 to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[46%] bg-gradient-to-r from-coffee-900 via-coffee-900/70 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[42%] bg-gradient-to-l from-coffee-900 via-coffee-900/75 to-transparent lg:block"
        />

        {/* Clarão que disfarça o corte de câmera */}
        <div
          ref={flashRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 bg-flame-400 opacity-0 mix-blend-screen"
        />

        {staticMode ? (
          /* Sem animação os dois blocos convivem: viram uma coluna só. */
          <div
            className={`${sideColumn} inset-x-0 top-1/2 -translate-y-1/2 drop-shadow-[0_2px_18px_rgba(8,4,2,0.9)] lg:inset-x-auto lg:top-0 lg:translate-y-0 lg:drop-shadow-none`}
          >
            <HeadlineContent />
            <div className="mt-8">
              <CtaContent withHighlights />
            </div>
          </div>
        ) : (
          <>
            {/* Título de impacto */}
            <div
              ref={headlineRef}
              className={`${sideColumn} inset-x-0 top-[5%] drop-shadow-[0_2px_18px_rgba(8,4,2,0.9)] lg:inset-x-auto lg:drop-shadow-none`}
            >
              <HeadlineContent />
            </div>

            <IngredientCaptions captionRefs={captionRefs} />

            {/* CTA final — assume o lugar do título quando a câmera abre de novo */}
            <div
              ref={finalRef}
              className={[
                sideColumn,
                'inset-x-0 bottom-[5%] opacity-0 drop-shadow-[0_2px_18px_rgba(8,4,2,0.9)]',
                'lg:inset-x-auto lg:drop-shadow-none',
              ].join(' ')}
            >
              <CtaContent />
            </div>
          </>
        )}

        {/* Indicação de rolagem */}
        {!staticMode && (
          <div
            ref={hintRef}
            className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-center lg:left-[5vw] lg:translate-x-0 lg:text-left"
            aria-hidden="true"
          >
            <span className="block text-[10px] uppercase tracking-[0.3em] text-white/45">
              role para mergulhar
            </span>
            <span className="mx-auto mt-2 block h-8 w-px animate-pulse-glow bg-gradient-to-b from-gold-400 to-transparent lg:mx-0" />
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
