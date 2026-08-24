import { ingredients } from '../../config/site'

/**
 * Legenda do ingrediente que a câmera está atravessando. Só uma fica visível
 * por vez — a timeline do hero cuida das entradas e saídas.
 * Desktop: coluna da direita, no espaço preto ao lado do sanduíche.
 * Mobile: abaixo da janela do vídeo.
 */
export function IngredientCaptions({ captionRefs }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
      {ingredients.map((item, index) => (
        <div
          key={item.id}
          ref={(node) => {
            captionRefs.current[index] = node
          }}
          className={[
            'absolute bottom-[13%] left-1/2 w-[82%] max-w-sm -translate-x-1/2 text-center opacity-0',
            'lg:bottom-auto lg:left-auto lg:right-[6%] lg:top-1/2 lg:w-[26%] lg:max-w-sm',
            'lg:-translate-x-0 lg:-translate-y-1/2 lg:text-left',
            // O frame por trás pode ser um macro claro: a sombra garante o contraste.
            '[text-shadow:0_2px_20px_rgba(8,4,2,0.95),0_0_6px_rgba(8,4,2,0.8)]',
          ].join(' ')}
        >
          <span className="mx-auto mb-3 block h-px w-14 bg-gradient-to-r from-transparent via-gold-500 to-transparent lg:mx-0 lg:w-20 lg:from-gold-500 lg:via-gold-500" />
          <p className="heading-title text-xl text-white sm:text-2xl lg:text-3xl">{item.label}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">{item.detail}</p>
        </div>
      ))}
    </div>
  )
}
