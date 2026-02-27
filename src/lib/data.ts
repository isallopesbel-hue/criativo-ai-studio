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
      'Casa moderna de dois andares',
      'Cozinha industrial',
      'Móveis planejados de luxo',
      'Sala minimalista',
    ],
  },
  {
    id: 'historias-biblicas',
    title: 'Histórias Bíblicas',
    icon: '📖',
    options: [
      'Davi enfrentando Golias',
      'Moisés abrindo o Mar Vermelho',
      'Arca de Noé',
      'Jesus andando sobre as águas',
    ],
  },
  {
    id: 'historias-infantis',
    title: 'Histórias Infantis',
    icon: '🧸',
    options: [
      'Coelho que não queria dormir',
      'Fada que perdeu a varinha',
      'Dragão que cuspia glitter',
      'Princesa que salvou a si mesma',
    ],
  },
  {
    id: 'dark-terror',
    title: 'Dark & Terror',
    icon: '👻',
    options: [
      'Casa abandonada com vulto',
      'Floresta nebulosa',
      'Boneca que se mexe sozinha',
      'Cemitério com névoa',
    ],
  },
  {
    id: 'produtos-digitais',
    title: 'Produtos Digitais',
    icon: '💰',
    options: [
      'E-book com dinheiro',
      'Curso online (aluno comemorando)',
      'Mentoria (antes e depois)',
      'Infoproduto (gráfico subindo)',
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
      'Vlog de viagem',
      'Unboxing de tecnologia',
      'Tutorial de maquiagem rápida',
      'Desafio de dança viral',
    ],
  },
  {
    id: 'objetos-falantes',
    title: 'Objetos Falantes',
    icon: '🗣️',
    options: [
      'Xícara de café conversando',
      'Tênis de corrida motivador',
      'Smartphone reclamando',
      'Árvore sábia',
    ],
  },
  {
    id: 'produtos-fisicos',
    title: 'Produtos Físicos',
    icon: '📦',
    options: [
      'Garrafa térmica em cenário outdoor',
      'Relógio de luxo em veludo',
      'Tênis esportivo em ação',
      'Cosméticos naturais',
    ],
  },
  {
    id: 'desenhos-animados',
    title: 'Desenhos Animados',
    icon: '🎨',
    options: [
      'Estilo anime anos 90',
      'Desenho clássico em preto e branco',
      'Animação moderna vibrante',
      'Estilo aquarela',
    ],
  },
  {
    id: 'videos-aleatorios',
    title: 'Vídeos Aleatórios',
    icon: '🎲',
    options: [
      'Explosão de cores abstratas',
      'Time-lapse de cidade',
      'Natureza macro',
      'Cyberpunk futurista',
    ],
  },
]

export const MOCK_HISTORY = [
  {
    id: '1',
    nicheId: 'construcao',
    nicheTitle: 'Construção e Reforma',
    nicheIcon: '🏗️',
    option: 'Casa moderna de dois andares',
    character: 'BellivroAberto',
    date: '2026-02-26T10:00:00Z',
    json: {
      nicho: 'Construção e Reforma',
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
    nicheTitle: 'Histórias Bíblicas',
    nicheIcon: '📖',
    option: 'Davi enfrentando Golias',
    character: 'Davi',
    date: '2026-02-25T14:30:00Z',
    json: {
      nicho: 'Histórias Bíblicas',
      opcao: 'Davi enfrentando Golias',
      personagem: 'Davi',
      estilo: 'cinematográfico',
      iluminacao: 'dramática',
      data: '2026-02-25',
    },
  },
]

// Helper to generate some logic for style and lighting based on the option
export function generateMetadata(option: string) {
  const lower = option.toLowerCase()
  let estilo = 'realista'
  let iluminacao = 'balanceada'

  if (lower.includes('modern')) {
    estilo = 'moderno'
    iluminacao = 'natural'
  } else if (lower.includes('luxo') || lower.includes('dramátic')) {
    estilo = 'cinematográfico'
    iluminacao = 'dramática'
  } else if (lower.includes('anim') || lower.includes('pixar')) {
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
