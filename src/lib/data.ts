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
    title: 'CONSTRUÇÃO E REFORMA',
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
    title: 'HISTÓRIAS BÍBLICAS',
    icon: '📖',
    options: [
      'Davi enfrentando Golias',
      'Moisés abrindo o Mar Vermelho',
      'Arca de Noé com animais',
      'Jesus andando sobre as águas',
    ],
  },
  {
    id: 'historias-infantis',
    title: 'HISTÓRIAS INFANTIS',
    icon: '🧸',
    options: [
      'O coelho que não queria dormir',
      'A fada que perdeu a varinha',
      'O dragão amigável',
      'A princesa que salvou o reino',
    ],
  },
  {
    id: 'dark-terror',
    title: 'DARK E TERROR',
    icon: '👻',
    options: [
      'Casa abandonada à noite',
      'Floresta com criatura',
      'Boneca que se mexe',
      'Cemitério com névoa',
    ],
  },
  {
    id: 'produtos-digitais',
    title: 'PRODUTOS DIGITAIS',
    icon: '💰',
    options: [
      'E-book com dinheiro saindo',
      'Curso online com aluno',
      'Mentoria antes e depois',
      'Infoproduto com gráfico',
    ],
  },
  {
    id: 'clipes-musicais',
    title: 'CLIPES MUSICAIS',
    icon: '🎵',
    options: [
      'Cantor em estúdio neon',
      'Banda em show',
      'Dançarinos urbanos',
      'Cena romântica',
    ],
  },
  {
    id: 'tiktok-instagram',
    title: 'TIKTOK / INSTAGRAM / YOUTUBE',
    icon: '🎬',
    options: [
      'Short de dicas rápidas',
      'Reel com transição',
      'Thumbnail chamativa',
      'Story interativo',
    ],
  },
  {
    id: 'objetos-falantes',
    title: 'OBJETOS FALANTES',
    icon: '🗣️',
    options: [
      'Lâmpada que dá conselhos',
      'Celular contando história',
      'Livro que ensina',
      'Brinquedo que conversa',
    ],
  },
  {
    id: 'produtos-fisicos',
    title: 'PRODUTOS FÍSICOS',
    icon: '📦',
    options: [
      'Roupa em movimento',
      'Cosmético com brilho',
      'Eletrônico em uso',
      'Embalagem abrindo',
    ],
  },
  {
    id: 'desenhos-animados',
    title: 'DESENHOS ANIMADOS',
    icon: '🎨',
    options: [
      'Herói em ação',
      'Vilão caricato',
      'Cena de amizade',
      'Aventura na floresta',
    ],
  },
  {
    id: 'videos-aleatorios',
    title: 'VÍDEOS ALEATÓRIOS',
    icon: '🎲',
    options: [
      'Mistério para desvendar',
      'Fato curioso',
      'Desafio viral',
      'Momento inusitado',
    ],
  },
]

export const MOCK_HISTORY = [
  {
    id: '1',
    nicheId: 'construcao',
    nicheTitle: 'CONSTRUÇÃO E REFORMA',
    nicheIcon: '🏗️',
    option: 'Casa moderna de dois andares',
    character: 'BellivroAberto',
    date: new Date().toISOString(),
    timeDisplay: '10:30',
    json: {
      nicho: 'CONSTRUÇÃO E REFORMA',
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
    nicheTitle: 'HISTÓRIAS BÍBLICAS',
    nicheIcon: '📖',
    option: 'Davi enfrentando Golias',
    character: 'Davi',
    date: new Date(Date.now() - 86400000).toISOString(),
    timeDisplay: 'ontem',
    json: {
      nicho: 'HISTÓRIAS BÍBLICAS',
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
    nicheTitle: 'HISTÓRIAS INFANTIS',
    nicheIcon: '🧸',
    option: 'O coelho que não queria dormir',
    character: 'Coelho',
    date: new Date(Date.now() - 172800000).toISOString(),
    timeDisplay: '2 dias',
    json: {
      nicho: 'HISTÓRIAS INFANTIS',
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
