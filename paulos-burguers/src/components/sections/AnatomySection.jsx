import { useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useConstrainedDevice } from '../../hooks/useConstrainedDevice'
import { burgerAnatomy } from '../../config/site'
import { SectionHeading } from '../ui/SectionHeading'

const { frame, layers } = burgerAnatomy

/** Afastamento entre camadas no auge, em % da altura do palco. */
const SPREAD = 8.5

/** Quanto o palco encolhe ao explodir, para o conjunto continuar cabendo. */
const EXPLODED_SCALE = 0.76

/** Deslocamento da camada `index` quando explodida, em % da altura do palco. */
const offsetOf = (index) => (index - (layers.length - 1) / 2) * SPREAD

export function AnatomySection() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const stageRef = useRef(null)
  const layerRefs = useRef([])
  const labelRefs = useRef([])

  const prefersReducedMotion = useReducedMotion()
  const isConstrained = useConstrainedDevice()
  const staticMode = prefersReducedMotion || isConstrained

  useIsomorphicLayoutEffect(() => {
    if (staticMode) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // As duas condições precisam existir: o matchMedia só roda o callback
      // quando alguma delas casa.
      mm.add(
        { isDesktop: '(min-width: 1024px)', isMobile: '(max-width: 1023px)' },
        (context) => {
          const { isDesktop } = context.conditions
          const stage = stageRef.current
          const els = layerRefs.current.filter(Boolean)
          const labels = labelRefs.current.filter(Boolean)
          const stageHeight = () => stage?.offsetHeight ?? 600

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: 1,
              pin: pinRef.current,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          /* ---- As camadas se afastam ---- */
          tl.to(stage, { scale: EXPLODED_SCALE, duration: 1, ease: 'power2.out' }, 0)

          els.forEach((node, index) => {
            tl.to(
              node,
              {
                y: () => (offsetOf(index) / 100) * stageHeight(),
                // Camadas de cima inclinam mais: dá profundidade sem custo de layout.
                rotationX: (layers.length - 1 - index) * 4,
                duration: 1,
                ease: 'power2.out',
              },
              0
            )
          })

          /* ---- As legendas entram acompanhando cada camada ---- */
          if (isDesktop) {
            // Alturas diferentes: podem coexistir, viram um diagrama.
            tl.fromTo(
              labels,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.32, stagger: 0.16, ease: 'power2.out' },
              0.85
            )
          } else {
            // Mesmo ponto da tela: uma de cada vez, sem sobreposição.
            const step = 0.34
            labels.forEach((node, index) => {
              const start = 0.9 + index * step
              tl.fromTo(node, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.12 }, start)
              if (index < labels.length - 1) {
                tl.to(node, { opacity: 0, y: -12, duration: 0.12 }, start + step - 0.12)
              }
            })
          }

          tl.to({}, { duration: 0.4 })
        }
      )

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [staticMode])

  return (
    <section
      id="anatomia"
      ref={sectionRef}
      className="relative border-t border-white/5 bg-coffee-900"
    >
      <div
        ref={pinRef}
        className={[
          'grain relative flex w-full flex-col items-center overflow-hidden px-5 pt-24',
          staticMode ? 'pb-20' : 'h-[100svh] min-h-[600px] pb-24 sm:pb-28',
        ].join(' ')}
      >
        <div className="pointer-events-none absolute inset-0 bg-radial-flame opacity-70" aria-hidden="true" />

        <div className="relative z-30 shrink-0">
          <SectionHeading
            eyebrow="Anatomia"
            title="Camada por"
            highlight="camada"
            description="Role e veja o que entra em cada burguer que sai da nossa chapa."
          />
        </div>

        {/* Palco na proporção do quadro de origem: as camadas remontam a foto. */}
        <div
          className={[
            'relative z-20 mt-6 flex w-full items-center justify-center',
            staticMode ? 'h-[46svh]' : 'flex-1',
          ].join(' ')}
        >
          <div
            ref={stageRef}
            className="relative h-full max-h-[38svh] sm:max-h-[42svh] lg:max-h-[58svh]"
            style={{ aspectRatio: `${frame.width} / ${frame.height}`, perspective: '1200px' }}
          >
            {layers.map((layer, index) => (
              <img
                key={layer.id}
                ref={(node) => {
                  layerRefs.current[index] = node
                }}
                src={layer.src}
                alt={index === 0 ? 'Hambúrguer artesanal separado em camadas' : ''}
                aria-hidden={index === 0 ? undefined : 'true'}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="burger-layer absolute select-none"
                style={{
                  left: `${layer.left}%`,
                  top: `${layer.top}%`,
                  width: `${layer.width}%`,
                  height: `${layer.height}%`,
                  zIndex: index + 1,
                }}
              />
            ))}

            {/* Legendas: ancoradas na posição já explodida de cada camada, que é
                onde elas aparecem. Fora do palco no desktop, abaixo no mobile. */}
            {!staticMode &&
              layers.map((layer, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div
                    key={`${layer.id}-label`}
                    ref={(node) => {
                      labelRefs.current[index] = node
                    }}
                    aria-hidden="true"
                    style={{ '--label-top': `${layer.top + layer.height / 2 + offsetOf(index)}%` }}
                    className={[
                      'absolute left-1/2 top-full w-[86vw] max-w-sm -translate-x-1/2 pt-10 text-center opacity-0',
                      'lg:top-[var(--label-top)] lg:w-[19vw] lg:max-w-[15rem]',
                      'lg:-translate-x-0 lg:-translate-y-1/2 lg:pt-0',
                      // Underscore vira espaço: calc(100%+2.5vw) sem espaços em
                      // volta do sinal é CSS inválido e a regra é descartada.
                      isLeft
                        ? 'lg:left-auto lg:right-[calc(100%_+_2.5vw)] lg:text-right'
                        : 'lg:left-[calc(100%_+_2.5vw)] lg:text-left',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'mb-2 block h-px w-12 bg-gradient-to-r from-transparent via-gold-500 to-transparent',
                        'mx-auto lg:mx-0 lg:w-16',
                        isLeft ? 'lg:ml-auto lg:mr-0' : '',
                      ].join(' ')}
                    />
                    <p className="heading-title text-lg text-white sm:text-xl lg:text-[1.3rem]">
                      {layer.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55 sm:text-sm">
                      {layer.detail}
                    </p>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Sem scroll para revelar as legendas, elas viram uma lista simples. */}
        {staticMode && (
          <ul className="relative z-30 mx-auto mt-10 grid max-w-3xl gap-x-8 gap-y-5 sm:grid-cols-2">
            {layers.map((layer) => (
              <li key={layer.id} className="border-l-2 border-gold-500/40 pl-4">
                <p className="heading-title text-base text-white sm:text-lg">{layer.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/55 sm:text-sm">
                  {layer.detail}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
