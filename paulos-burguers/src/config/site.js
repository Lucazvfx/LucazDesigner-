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
 * Vídeo do hero. A câmera parte do hambúrguer inteiro, mergulha pelas camadas
 * (pão → molho → cebola → alface → tomate → queijo → blend → base) e, em `cutAt`,
 * corta de volta para o plano aberto — é nesse corte que o CTA aparece.
 *
 * Trocar o vídeo: substitua o arquivo, ajuste `authoredDuration`/`cutAt` e as
 * janelas de `ingredients` (tudo em segundos do vídeo original).
 *
 * Reencode recomendado para scrub suave (GOP curto = seek barato):
 *   ffmpeg -i entrada.mp4 -an -c:v libx264 -crf 23 -g 6 -keyint_min 6 \
 *          -sc_threshold 0 -preset slow -movflags +faststart hero-burger.mp4
 */
export const heroVideo = {
  src: '/assets/video/hero-burger.mp4',
  poster: '/assets/video/hero-burger-poster.jpg',
  authoredDuration: 10,
  cutAt: 9.05,
}

/**
 * Legendas que acompanham o mergulho da câmera. `from`/`to` são os segundos do
 * vídeo em que aquele ingrediente está no centro do quadro; o componente
 * converte para a fração da timeline, então o sincronismo sobrevive a pequenas
 * diferenças de duração no reencode.
 */
export const ingredients = [
  {
    id: 'bun-top',
    label: 'Pão brioche artesanal',
    detail: 'Assado todo dia, com gergelim e o molho da casa por cima.',
    from: 2.5,
    to: 4.3,
    highlight: true,
  },
  {
    id: 'onion',
    label: 'Cebola roxa em anéis',
    detail: 'Cortada na hora, crocante e levemente adocicada.',
    from: 4.4,
    to: 5.3,
  },
  {
    id: 'lettuce',
    label: 'Alface crocante',
    detail: 'Lavada folha a folha, sempre gelada.',
    from: 5.4,
    to: 6.1,
  },
  {
    id: 'tomato',
    label: 'Tomate fresco em rodelas',
    detail: 'Selecionado no ponto certo de maturação.',
    from: 6.2,
    to: 6.9,
  },
  {
    id: 'cheese',
    label: 'Queijo derretido na hora',
    detail: 'Derretido na chapa em cima do blend quente.',
    from: 7,
    to: 7.6,
    highlight: true,
  },
  {
    id: 'patty',
    label: 'Blend 100% Angus',
    detail: '180g de carne artesanal selada na chapa.',
    from: 7.7,
    to: 8.4,
    highlight: true,
  },
  {
    id: 'bun-bottom',
    label: 'Base selada na manteiga',
    detail: 'Tostada na chapa para segurar todo o recheio.',
    from: 8.5,
    to: 9,
  },
]

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
