import { burgerLayers } from '../../config/site'

/**
 * Legendas laterais que acompanham a explosão das camadas.
 * Desktop: ancoradas na altura da própria camada, alternando os lados.
 * Mobile: empilhadas no mesmo ponto — a timeline faz o cross-fade entre elas.
 */
export function IngredientCaptions({ captionRefs }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      {burgerLayers.map((layer, index) => {
        const isLeft = index % 2 === 0
        return (
          <div
            key={layer.id}
            ref={(node) => {
              captionRefs.current[index] = node
            }}
            style={{ '--cap-top': `${layer.top + layer.height / 2}%` }}
            className={[
              'absolute bottom-[9%] left-1/2 w-[78%] max-w-xs -translate-x-1/2 text-center opacity-0',
              'lg:bottom-auto lg:top-[var(--cap-top)] lg:w-[22%] lg:max-w-none lg:-translate-x-0 lg:-translate-y-1/2',
              isLeft ? 'lg:left-[6%] lg:text-right' : 'lg:left-auto lg:right-[6%] lg:text-left',
            ].join(' ')}
          >
            <span
              className={[
                'mb-2 inline-block h-px w-12 bg-gradient-to-r from-transparent via-gold-500 to-transparent',
                'lg:w-16',
              ].join(' ')}
            />
            <p className="heading-title text-lg text-white sm:text-xl lg:text-[1.35rem]">
              {layer.label}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-white/55 sm:text-sm">{layer.detail}</p>
          </div>
        )
      })}
    </div>
  )
}
