import { burgerLayers, burgerStage } from '../../config/site'

/**
 * Empilhamento absoluto das camadas dentro de um palco de proporção fixa.
 * Cada camada guarda sua referência em `layerRefs.current[index]` para o GSAP.
 * Trocar os PNG/WebP finais em `site.js` não exige mudar nada aqui.
 */
export function BurgerStack({ layerRefs, stageRef, glowRef }) {
  return (
    <div
      ref={stageRef}
      className="relative mx-auto h-full max-w-[88vw]"
      style={{
        aspectRatio: `${burgerStage.width} / ${burgerStage.height}`,
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Brilho quente atrás do sanduíche */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[70%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame-500/30 blur-3xl"
      />

      {burgerLayers.map((layer, index) => (
        <img
          key={layer.id}
          ref={(node) => {
            layerRefs.current[index] = node
          }}
          src={layer.src}
          alt={index === 0 ? "Hambúrguer artesanal Paulo's Burguers em camadas" : ''}
          aria-hidden={index === 0 ? undefined : 'true'}
          decoding="async"
          loading="eager"
          draggable="false"
          className="burger-layer absolute left-0 w-full select-none object-contain"
          style={{
            top: `${layer.top}%`,
            height: `${layer.height}%`,
            zIndex: index + 1,
          }}
        />
      ))}

      {/* Sombra projetada no "chão" */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[12%] bottom-[-6%] h-[9%] rounded-[50%] bg-black/70 blur-xl"
      />
    </div>
  )
}
