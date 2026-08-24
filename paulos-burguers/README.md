# Paulo's Burguers — Landing Page

Landing page one-page, mobile-first, para a hamburgueria **Paulo's Burguers** (Vilhena-RO, desde 2017).
O destaque é um hero cinematográfico: o scroll conduz o tempo de um vídeo em que a câmera
mergulha pelas camadas do hambúrguer, com legendas sincronizadas a cada ingrediente e CTA
para as lojas de app no final.

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

## Publicando

O deploy é automático: `.github/workflows/deploy-pages.yml` builda e publica no GitHub Pages
a cada push. Para ligar da primeira vez, no repositório: **Settings → Pages → Source: GitHub
Actions**. A partir daí o site sai em:

- `https://lucazvfx.github.io/LucazDesigner-/` — a landing page
- `https://lucazvfx.github.io/LucazDesigner-/portfolio/lucas.html` — o portfólio antigo

O workflow dispara em `main` e no branch da landing; depois do merge dá para remover o branch
da lista de gatilhos.

### Por que os caminhos de asset são relativos

No Pages o site fica sob `/LucazDesigner-/`, então `/assets/...` apontaria para fora do site.
Por isso `vite.config.js` usa `base: './'` e `src/config/site.js` guarda `assets/...` sem barra
inicial — o mesmo build serve tanto na raiz de um domínio (Vercel, Netlify, domínio próprio)
quanto num subcaminho, sem reconfigurar nada.

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
      ExplodedBurgerHero.jsx  # scrub do vídeo + timeline em 3 atos
      IngredientCaptions.jsx  # legenda do ingrediente em cena (uma por vez)
    sections/               # cardápio, unidades, prova social
    layout/                 # navbar, rodapé, atalho fixo de pedido
    ui/                     # backdrop ambiente, badges das lojas, título de seção
public/assets/
  brand/                  # logo recortado do emblema oficial
  menu/                   # imagens dos cards (SVG placeholder)
  video/                  # vídeo do hero + frame usado como poster/fallback
```

## O efeito do hero

`ExplodedBurgerHero` fixa (`pin`) o hero por **320% da altura da tela** e usa o progresso do
scroll para escrever em `video.currentTime` — o vídeo não toca sozinho, ele é **rebobinado
pelo scroll**. O `scrub` do ScrollTrigger já roda uma vez por frame, e um limiar de meio frame
evita seeks redundantes que travariam a decodificação.

A timeline tem três atos, todos ancorados em segundos do vídeo:

1. **Aproximação** (0s → ~2,4s) — o título sai de cena enquanto a câmera começa a entrar.
2. **Mergulho** (~2,5s → 9,0s) — a câmera atravessa pão, molho, cebola, alface, tomate, queijo,
   blend e base; cada ingrediente acende sua legenda na janela definida em `ingredients`.
   Um véu escurece o vídeo nesse trecho: sem ele, texto branco sobre um macro claro
   (tomate, queijo) fica ilegível.
3. **Revelação** (~9,05s → fim) — o vídeo tem um corte de câmera de volta ao plano aberto.
   Um clarão curto disfarça o corte e, no mesmo instante, entram os botões
   **Google Play** / **App Store**.

Uma barra fina no rodapé do hero mostra o progresso do ato.

### Fallback

Com `prefers-reduced-motion: reduce` **ou** aparelho fraco (`deviceMemory <= 4` /
`hardwareConcurrency <= 4` em tela pequena ou touch, ou `saveData`), o `<video>` nem chega ao
DOM — **nenhum byte de vídeo é baixado**. O hero vira uma tela única com o frame do sanduíche
montado (o mesmo poster), animação sutil de flutuação, resumo dos ingredientes e o CTA sempre
visível. A decisão está em `staticMode`, dentro de `ExplodedBurgerHero`.

### Performance

- O vídeo é reencodado com GOP de 6 frames: cada seek decodifica no máximo 5 quadros
  intermediários, que é o que torna o scrub fluido. Sem áudio, `+faststart`, ~3 MB.
- O poster tem `<link rel="preload">` no `index.html`, então o hero já aparece composto
  enquanto o vídeo carrega.
- Só `transform`/`opacity` são animados nos elementos de interface.
- `ScrollTrigger.config({ ignoreMobileResize: true })` evita recálculo do pin quando a barra
  de endereço do mobile aparece/some.
- `ScrollTrigger.refresh()` roda quando os metadados do vídeo chegam, depois de
  `document.fonts.ready` e no `load`.
- GSAP sai em chunk separado no build.

## Trocando os assets

Tudo é dirigido por `src/config/site.js` — não há conteúdo fixo nos componentes.

**Vídeo do hero.** Substitua `public/assets/video/hero-burger.mp4` e ajuste, em `heroVideo`,
`authoredDuration` (duração do vídeo original) e `cutAt` (segundo do corte de câmera que dispara
o CTA). Reencode antes de publicar — um vídeo com GOP longo trava o scrub:

```bash
ffmpeg -i entrada.mp4 -an -c:v libx264 -crf 23 -g 6 -keyint_min 6 \
       -sc_threshold 0 -preset slow -movflags +faststart hero-burger.mp4
ffmpeg -ss 9.6 -i entrada.mp4 -frames:v 1 -q:v 4 hero-burger-poster.jpg
```

O poster deve ser um frame com o sanduíche inteiro: ele aparece enquanto o vídeo carrega e é
a imagem única do fallback.

**Legendas.** Cada item de `ingredients` tem:

| campo | efeito |
| --- | --- |
| `from` / `to` | segundos do vídeo em que aquele ingrediente está no centro do quadro |
| `label` / `detail` | texto da legenda |
| `highlight` | entra no resumo curto exibido no fallback estático |

As janelas são convertidas para fração da timeline, então pequenas diferenças de duração no
reencode não desalinham o sincronismo.

**Fotos do cardápio.** Troque os arquivos de `public/assets/menu/` (proporção 4:3) e o campo
`image` de cada item em `menu`.

## Pendências antes de publicar

- `links.playStore` e `links.appStore` estão com placeholder — colocar as URLs reais das lojas.
- `socialProof.quotes` traz depoimentos de exemplo: substituir por avaliações reais e autorizadas.
- Preços e itens do `menu` são exemplos e precisam bater com o cardápio vigente.
- Conferir os horários em `locations` (baseados no post de "novo horário de funcionamento").
