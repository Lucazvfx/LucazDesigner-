# Paulo's Burguers — Landing Page

Landing page one-page, mobile-first, para a hamburgueria **Paulo's Burguers** (Vilhena-RO, desde 2017).
O destaque é um hero cinematográfico onde o hambúrguer se abre em camadas conforme o scroll
("exploded burger"), com paralaxe 3D, legendas dos ingredientes e CTA para as lojas de app.

## Stack

- **React 18** + **Vite 7**
- **TailwindCSS 3** (design tokens da marca em `tailwind.config.js`)
- **GSAP 3 + ScrollTrigger** (pin + scrub do hero e revelações das seções)

## Rodando

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
npm run preview  # serve o build
```

## Estrutura

```
src/
  config/site.js          # TODO o conteúdo: marca, links, camadas, cardápio, unidades, prova social
  lib/gsap.js             # registro único do ScrollTrigger + defaults de performance
  hooks/
    useReducedMotion.js   # prefers-reduced-motion (reativo)
    useLowPerformance.js  # heurística de aparelho fraco
    useSectionReveal.js   # cascata de [data-reveal] nas seções
  components/
    hero/
      ExplodedBurgerHero.jsx  # timeline em 3 atos (explode → legendas → monta + CTA)
      BurgerStack.jsx         # empilhamento absoluto das camadas
      IngredientCaptions.jsx  # legendas laterais (desktop) / sequenciais (mobile)
    sections/               # cardápio, unidades, prova social
    layout/                 # navbar, rodapé, atalho fixo de pedido
    ui/                     # backdrop ambiente, badges das lojas, título de seção
public/assets/
  burger/                 # camadas do hero (SVG placeholder)
  brand/                  # logo recortado do emblema oficial
  menu/                   # imagens dos cards (SVG placeholder)
  video/                  # vídeo ambiente opcional do hero
```

## O efeito do hero

`ExplodedBurgerHero` fixa (`pin`) o palco por **260% da altura da tela** e roda uma timeline
com `scrub`, dividida em três atos:

1. **Explode** — o título sobe e some, o palco assume o centro óptico e cada camada se afasta
   pelo próprio `offset`/`depth` (translação em Y, `translateZ` e `rotationX` sob `perspective`).
2. **Legendas** — no desktop as legendas entram em cascata ancoradas na altura de cada camada;
   no mobile elas aparecem uma por vez no mesmo ponto, sem sobreposição.
3. **Monta** — as camadas voltam ao lugar, o sanduíche se estabiliza no centro e os botões
   **Google Play** / **App Store** surgem.

Uma barra fina no rodapé do hero mostra o progresso do ato.

### Fallback

Com `prefers-reduced-motion: reduce` **ou** aparelho fraco (`deviceMemory <= 4` / `hardwareConcurrency <= 4`
em tela pequena ou touch, ou `saveData`), o pin e o scrub não são criados: o hero vira uma tela
única com o hambúrguer montado, animação sutil de flutuação, resumo dos ingredientes e o CTA
sempre visível. A decisão está em `staticMode`, dentro de `ExplodedBurgerHero`.

### Performance

- Só `transform`/`opacity` são animados; as camadas ficam com `will-change` e `force3D`.
- As camadas do hero têm `<link rel="preload">` no `index.html` para não haver "pop-in".
- `ScrollTrigger.config({ ignoreMobileResize: true })` evita recálculo do pin quando a barra
  de endereço do mobile aparece/some.
- `ScrollTrigger.refresh()` roda depois de `document.fonts.ready` e do `load`.
- GSAP sai em chunk separado no build.

## Trocando os assets

Tudo é dirigido por `src/config/site.js` — não há conteúdo fixo nos componentes.

**Camadas do hero.** Os SVGs em `public/assets/burger/` são placeholders. Exporte os recortes
finais (PNG/WebP com fundo transparente) na mesma proporção do palco (`burgerStage`, 800×960)
e troque o `src` de cada item de `burgerLayers`. Os campos por camada:

| campo | efeito |
| --- | --- |
| `top` / `height` | posição e altura da camada, em % do palco (define o sanduíche montado) |
| `offset` | quanto a camada se afasta na explosão, em % da altura do palco (sinal = direção) |
| `depth` | intensidade do paralaxe em Z (1 = camada mais próxima) |
| `rotate` / `tilt` | giro no plano e inclinação 3D no auge da explosão |
| `label` / `detail` | texto da legenda que acompanha a camada |
| `highlight` | entra no resumo curto exibido no fallback estático |

**Fotos do cardápio.** Troque os arquivos de `public/assets/menu/` (proporção 4:3) e o campo
`image` de cada item em `menu`.

**Vídeo ambiente do hero.** `public/assets/video/hero-loop.mp4` já está no repositório, porém
**desligado**: ative em `heroVideo.enabled` depois de conferir o corte e ajuste `opacity`.

## Pendências antes de publicar

- `links.playStore` e `links.appStore` estão com placeholder — colocar as URLs reais das lojas.
- `socialProof.quotes` traz depoimentos de exemplo: substituir por avaliações reais e autorizadas.
- Preços e itens do `menu` são exemplos e precisam bater com o cardápio vigente.
- Conferir os horários em `locations` (baseados no post de "novo horário de funcionamento").
