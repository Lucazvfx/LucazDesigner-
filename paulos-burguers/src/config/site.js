/**
 * Fonte única de verdade do conteúdo da landing page.
 * Trocar textos, preços, unidades e links aqui — nenhum componente tem conteúdo hardcoded.
 */

export const brand = {
  name: "Paulo's Burguers",
  tagline: 'O melhor burguer está aqui!',
  since: 2017,
  city: 'Vilhena',
  state: 'RO',
  phone: '(69) 98444-3171',
  phoneRaw: '5569984443171',
  logo: '/assets/brand/logo.png',
}

export const links = {
  instagram: 'https://www.instagram.com/paulosburguersvilhena/',
  instagramHandle: '@paulosburguersvilhena',
  bistroHandle: '@paulosbistro',
  bistro: 'https://www.instagram.com/paulosbistro/',
  menudino: 'https://paulosburguers.menudino.com/lojas/paulosburguers',
  whatsapp: 'https://wa.me/5569984443171',
  // TODO: substituir pelos links reais das lojas (o menudino informa o pacote/ID do app).
  playStore: 'https://play.google.com/store/apps/details?id=SEU.PACOTE.AQUI',
  appStore: 'https://apps.apple.com/br/app/SEU-APP/idSEU_ID',
}

/**
 * Camadas do hambúrguer "explodido", de cima para baixo.
 * `depth` controla o parallax (quanto maior, mais a camada se afasta no eixo Z).
 * `offset` é o deslocamento vertical em vh quando a explosão está no auge.
 * Basta substituir `src` pelo PNG/WebP final recortado — o resto continua funcionando.
 */
export const burgerLayers = [
  {
    id: 'bun-top',
    src: '/assets/burger/bun-top.svg',
    alt: 'Pão brioche superior com gergelim',
    label: 'Pão brioche artesanal',
    detail: 'Assado todo dia, com gergelim e brilho de manteiga.',
    top: 0,
    height: 31.25,
    depth: 1,
    offset: -34,
    rotate: -5,
    tilt: 26,
    highlight: true,
  },
  {
    id: 'onion',
    src: '/assets/burger/onion.svg',
    alt: 'Anéis de cebola roxa',
    label: 'Cebola roxa em anéis',
    detail: 'Cortada na hora, crocante e levemente adocicada.',
    top: 21.35,
    height: 20.83,
    depth: 0.76,
    offset: -22,
    rotate: 6,
    tilt: 22,
  },
  {
    id: 'lettuce',
    src: '/assets/burger/lettuce.svg',
    alt: 'Folhas de alface crocante',
    label: 'Alface americana crocante',
    detail: 'Lavada folha a folha, sempre gelada.',
    top: 30.42,
    height: 22.92,
    depth: 0.58,
    offset: -13,
    rotate: -7,
    tilt: 18,
  },
  {
    id: 'tomato',
    src: '/assets/burger/tomato.svg',
    alt: 'Rodelas de tomate fresco',
    label: 'Tomate fresco em rodelas',
    detail: 'Selecionado no ponto certo de maturação.',
    top: 42.08,
    height: 19.79,
    depth: 0.4,
    offset: -4,
    rotate: 4,
    tilt: 14,
  },
  {
    id: 'cheese',
    src: '/assets/burger/cheese.svg',
    alt: 'Queijo derretido escorrendo',
    label: 'Queijo derretido na hora',
    detail: 'Derretido na chapa em cima do blend quente.',
    top: 51.88,
    height: 23.96,
    depth: 0.24,
    offset: 6,
    rotate: -4,
    tilt: 10,
    highlight: true,
  },
  {
    id: 'patty',
    src: '/assets/burger/patty.svg',
    alt: 'Blend artesanal 100% Angus',
    label: 'Blend 100% Angus',
    detail: '180g de carne artesanal selada na chapa quente.',
    top: 64.17,
    height: 21.88,
    depth: 0.1,
    offset: 18,
    rotate: 5,
    tilt: 6,
    highlight: true,
  },
  {
    id: 'bun-bottom',
    src: '/assets/burger/bun-bottom.svg',
    alt: 'Base do pão brioche',
    label: 'Base selada na manteiga',
    detail: 'Tostada na chapa para segurar todo o recheio.',
    top: 77.29,
    height: 19.79,
    depth: 0,
    offset: 30,
    rotate: -3,
    tilt: 0,
  },
]

/** Proporção do palco de camadas (mesma do arquivo burger-full). */
export const burgerStage = { width: 800, height: 960 }

/** Imagem única usada no fallback (reduced motion / dispositivo fraco). */
export const burgerStatic = '/assets/burger/burger-full.svg'

/**
 * Vídeo ambiente opcional atrás do hero.
 * Ative com `enabled: true` depois de conferir o corte final do arquivo.
 */
export const heroVideo = {
  enabled: false,
  src: '/assets/video/hero-loop.mp4',
  poster: '/assets/burger/burger-full.svg',
  opacity: 0.28,
}

export const menu = [
  {
    id: 'double-cheese',
    name: 'Double Cheese',
    description: 'Dois blends de 120g, cheddar duplo derretido na chapa e maionese da casa no pão brioche.',
    price: 34.9,
    image: '/assets/menu/double-cheese.svg',
    badge: 'Mais pedido',
  },
  {
    id: 'bacon-supremo',
    name: 'Bacon Supremo',
    description: 'Blend 180g, bacon caramelizado, queijo prato e cebola crispy. O clássico que virou tradição.',
    price: 38.9,
    image: '/assets/menu/bacon-supremo.svg',
    badge: 'Campeão da casa',
  },
  {
    id: 'paulos-signature',
    name: "Paulo's Signature",
    description: 'Blend Angus 200g, queijo brie, geleia de pimenta artesanal e rúcula fresca.',
    price: 44.9,
    image: '/assets/menu/paulos-signature.svg',
    badge: 'Since 2017',
  },
  {
    id: 'smash-duplo',
    name: 'Smash Duplo',
    description: 'Dois smashes prensados na chapa, cheddar americano, picles e molho secreto.',
    price: 29.9,
    image: '/assets/menu/smash-duplo.svg',
    badge: null,
  },
  {
    id: 'frango-crocante',
    name: 'Frango Crocante',
    description: 'Filé de frango empanado na hora, maionese defumada, alface americana e tomate.',
    price: 32.9,
    image: '/assets/menu/frango-crocante.svg',
    badge: null,
  },
  {
    id: 'combo-familia',
    name: 'Combo Família',
    description: '4 burguers artesanais, porção de fritas grande e 2 refrigerantes de 1L.',
    price: 129.9,
    image: '/assets/menu/combo-familia.svg',
    badge: 'Melhor custo',
  },
]

export const locations = [
  {
    id: 'jardim-america',
    name: 'Unidade Jardim América',
    address: 'Av. Sabino B. Queiroz — Vilhena/RO',
    maps: 'https://www.google.com/maps/search/?api=1&query=Paulos+Burguers+Sabino+B+Queiroz+Vilhena+RO',
    hours: [
      { days: 'Segunda a sexta', time: '18:30 às 23:00' },
      { days: 'Sábado', time: '18:30 às 03:00' },
      { days: 'Domingo', time: '18:30 às 23:00' },
    ],
  },
  {
    id: 'shopping-jardins',
    name: 'Unidade Shopping Jardins',
    address: 'Shopping Jardins de Vilhena — Vilhena/RO',
    maps: 'https://www.google.com/maps/search/?api=1&query=Shopping+Jardins+de+Vilhena',
    hours: [{ days: 'Todos os dias', time: '11:00 às 22:00' }],
  },
]

export const socialProof = {
  followers: '25,4 mil',
  posts: '3.879',
  years: new Date().getFullYear() - brand.since,
  stats: [
    { value: '25,4 mil', label: 'seguidores no Instagram' },
    { value: '3.879', label: 'posts publicados' },
    { value: '2', label: 'unidades em Vilhena' },
    { value: `${new Date().getFullYear() - brand.since}+`, label: 'anos servindo a cidade' },
  ],
  // Depoimentos de exemplo. Substituir por avaliações reais e autorizadas
  // antes de publicar — não usar @ de clientes sem consentimento.
  quotes: [
    {
      author: 'Cliente — Jardim América',
      text: 'Melhor hambúrguer de Vilhena, sem discussão. O blend é outro nível.',
    },
    {
      author: 'Cliente — Shopping Jardins',
      text: 'Peço pelo app toda semana. Chega quente, rápido e sempre do jeito certo.',
    },
    {
      author: 'Cliente — delivery',
      text: 'Atendimento nota 10 nas duas unidades. Virou programa de família.',
    },
  ],
}

export const navItems = [
  { id: 'hero', label: 'Início' },
  { id: 'cardapio', label: 'Cardápio' },
  { id: 'unidades', label: 'Unidades' },
  { id: 'comunidade', label: 'Comunidade' },
]
