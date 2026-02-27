export interface Niche {
  id: string
  title: string
  icon: string
  options: string[]
}

export interface Character {
  id: string
  name: string
  description: string
}

export const CHARACTERS: Character[] = [
  {
    id: 'bellivroaberto',
    name: 'BellivroAberto',
    description: 'Estilo Humor/Deboche',
  },
  {
    id: 'davi',
    name: 'Davi',
    description: 'Estilo Bíblico/Realista',
  },
]

export const NICHES: Niche[] = [
  {
    id: 'construcao',
    title: 'Construção e Reforma',
    icon: '🏗️',
    options: [
      'Quero construir uma casa moderna de dois andares',
      'Quero reformar uma cozinha industrial',
      'Quero fabricar móveis planejados de luxo',
      'Quero decorar uma sala minimalista',
    ],
  },
  {
    id: 'historias-biblicas',
    title: 'Histórias Bíblicas',
    icon: '📖',
    options: [
      'Davi enfrentando Golias no vale',
      'Moisés abrindo o Mar Vermelho',
      'Arca de Noé com os animais',
      'Jesus andando sobre as águas',
    ],
  },
  {
    id: 'historias-infantis',
    title: 'Histórias Infantis',
    icon: '🧸',
    options: [
      'O coelho que não queria dormir',
      'A fada que perdeu a varinha',
      'O dragão que cuspia glitter',
      'A princesa que salvou a si mesma',
    ],
  },
  {
    id: 'dark-terror',
    title: 'Dark & Terror',
    icon: '👻',
    options: [
      'Casa abandonada à noite com vulto',
      'Floresta nebulosa com criatura',
      'Boneca que se mexe sozinha',
      'Cemitério com névoa',
    ],
  },
  {
    id: 'produtos-digitais',
    title: 'Produtos Digitais',
    icon: '💰',
    options: [
      'E-book com dinheiro saindo',
      'Curso online com aluno comemorando',
      'Mentoria com antes e depois',
      'Infoproduto com gráfico subindo',
    ],
  },
  {
    id: 'clipes-musicais',
    title: 'Clipes Musicais',
    icon: '🎵',
    options: [
      'Palco com luzes neon',
      'Cantor em close dramático',
      'Dançarinos urbanos',
      'Guitarrista solo no topo',
    ],
  },
  {
    id: 'personagem-consistente',
    title: 'Personagem Consistente',
    icon: '🖌️',
    options: [
      'Avatar estilo Pixar',
      'Ilustração 2D plana',
      'Render 3D hiper-realista',
      'Esboço a lápis',
    ],
  },
  {
    id: 'tiktok-instagram',
    title: 'TikTok/Insta/YT',
    icon: '🎬',
    options: [
      'Vlog de viagem com transições dinâmicas',
      'Unboxing de tecnologia minimalista',
      'Tutorial de maquiagem rápida ring light',
      'Desafio de dança viral com efeitos',
    ],
  },
  {
    id: 'objetos-falantes',
    title: 'Objetos Falantes',
    icon: '🗣️',
    options: [
      'Xícara de café conversando animada',
      'Tênis de corrida motivador suado',
      'Smartphone reclamando da bateria',
      'Árvore sábia contando histórias',
    ],
  },
  {
    id: 'produtos-fisicos',
    title: 'Produtos Físicos',
    icon: '📦',
    options: [
      'Garrafa térmica em cenário outdoor',
      'Relógio de luxo em veludo brilhante',
      'Tênis esportivo em ação com poeira',
      'Cosméticos naturais com folhas e água',
    ],
  },
  {
    id: 'desenhos-animados',
    title: 'Desenhos Animados',
    icon: '🎨',
    options: [
      'Estilo anime anos 90 com filtro VHS',
      'Desenho clássico em preto e branco rubber hose',
      'Animação moderna vibrante flat design',
      'Estilo aquarela suave e mágico',
    ],
  },
  {
    id: 'videos-aleatorios',
    title: 'Vídeos Aleatórios',
    icon: '🎲',
    options: [
      'Explosão de cores abstratas em câmera lenta',
      'Time-lapse de cidade movimentada à noite',
      "Natureza macro de gota d'água em folha",
      'Cyberpunk futurista rua chuvosa com neon',
    ],
  },
]

export const MOCK_HISTORY = [
  {
    id: '1',
    nicheId: 'construcao',
    nicheTitle: 'CONSTRUÇÃO',
    nicheIcon: '🏗️',
    option: 'Casa moderna de dois andares',
    character: 'BellivroAberto',
    date: new Date().toISOString(),
    timeDisplay: '10:30',
    json: {
      nicho: 'Construção',
      opcao: 'Casa moderna de dois andares',
      personagem: 'BellivroAberto',
      estilo: 'moderno',
      iluminacao: 'natural',
      data: '2026-02-26',
    },
  },
  {
    id: '2',
    nicheId: 'historias-biblicas',
    nicheTitle: 'BÍBLICO',
    nicheIcon: '📖',
    option: 'Davi enfrentando Golias',
    character: 'Davi',
    date: new Date(Date.now() - 86400000).toISOString(),
    timeDisplay: 'ontem',
    json: {
      nicho: 'Bíblico',
      opcao: 'Davi enfrentando Golias',
      personagem: 'Davi',
      estilo: 'cinematográfico',
      iluminacao: 'dramática',
      data: '2026-02-25',
    },
  },
  {
    id: '3',
    nicheId: 'historias-infantis',
    nicheTitle: 'INFANTIL',
    nicheIcon: '🧸',
    option: 'O coelho que não queria dormir',
    character: 'Coelho',
    date: new Date(Date.now() - 172800000).toISOString(),
    timeDisplay: '2 dias',
    json: {
      nicho: 'Infantil',
      opcao: 'O coelho que não queria dormir',
      personagem: 'Coelho',
      estilo: 'animação 3D',
      iluminacao: 'suave e colorida',
      data: '2026-02-24',
    },
  },
]

export function generateMetadata(option: string) {
  const lower = option.toLowerCase()
  let estilo = 'realista'
  let iluminacao = 'balanceada'

  if (lower.includes('modern')) {
    estilo = 'moderno'
    iluminacao = 'natural'
  } else if (
    lower.includes('luxo') ||
    lower.includes('dramátic') ||
    lower.includes('noite') ||
    lower.includes('terror')
  ) {
    estilo = 'cinematográfico'
    iluminacao = 'dramática'
  } else if (
    lower.includes('anim') ||
    lower.includes('pixar') ||
    lower.includes('infant')
  ) {
    estilo = 'animação 3D'
    iluminacao = 'suave e colorida'
  } else if (lower.includes('vlog') || lower.includes('tiktok')) {
    estilo = 'câmera de celular'
    iluminacao = 'ring light'
  } else if (lower.includes('dark') || lower.includes('terror')) {
    estilo = 'sombrio'
    iluminacao = 'baixa luz, sombras duras'
  }

  return { estilo, iluminacao }
}
