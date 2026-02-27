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
    id: 'personagem-consistente',
    title: 'Personagem consistente',
    icon: '🧍',
    options: [
      'Personagem masculino em vários cenários',
      'Personagem feminino em várias poses',
      'Mascote 3D consistente',
      'Avatar realista',
    ],
  },
  {
    id: 'videos-aleatorios',
    title: 'Vídeos aleatórios',
    icon: '🎲',
    options: [
      'Mistério para desvendar',
      'Fato curioso',
      'Desafio viral',
      'Momento inusitado',
    ],
  },
  {
    id: 'desenhos-animados',
    title: 'Desenhos Animados',
    icon: '🎨',
    options: [
      'Herói em ação',
      'Vilão caricato',
      'Cena de amizade',
      'Aventura na floresta',
    ],
  },
  {
    id: 'historias-biblicas',
    title: 'Histórias Bíblicas',
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
    title: 'Histórias Infantis',
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
    title: 'Vídeos Dark e Terror',
    icon: '👁️',
    options: [
      'Casa abandonada à noite',
      'Floresta com criatura',
      'Boneca que se mexe',
      'Cemitério com névoa',
    ],
  },
  {
    id: 'clipes-musicais',
    title: 'Clipes musicais',
    icon: '🎵',
    options: [
      'Cantor em estúdio neon',
      'Banda em show',
      'Dançarinos urbanos',
      'Cena romântica',
    ],
  },
  {
    id: 'objetos-falantes',
    title: 'Objetos falantes',
    icon: '🤖',
    options: [
      'Lâmpada que dá conselhos',
      'Celular contando história',
      'Livro que ensina',
      'Brinquedo que conversa',
    ],
  },
  {
    id: 'tiktok-instagram',
    title: 'TikTok, Instagram e Youtube Shorts',
    icon: '📱',
    options: [
      'Short de dicas rápidas',
      'Reel com transição',
      'Thumbnail chamativa',
      'Story interativo',
    ],
  },
  {
    id: 'construcao',
    title: 'Construção, Reforma e Fabricação',
    icon: '🏗️',
    options: [
      'Casa moderna de dois andares',
      'Cozinha industrial',
      'Móveis planejados de luxo',
      'Sala minimalista',
    ],
  },
  {
    id: 'produtos-digitais',
    title: 'Criativo de Vendas Produtos Digitais',
    icon: '💻',
    options: [
      'E-book com dinheiro saindo',
      'Curso online com aluno',
      'Mentoria antes e depois',
      'Infoproduto com gráfico',
    ],
  },
  {
    id: 'produtos-fisicos',
    title: 'Criativo de Vendas Produtos Físicos',
    icon: '📦',
    options: [
      'Roupa em movimento',
      'Cosmético com brilho',
      'Eletrônico em uso',
      'Embalagem abrindo',
    ],
  },
]

export const MOCK_HISTORY = [
  {
    id: '1',
    nicheId: 'construcao',
    nicheTitle: 'Construção, Reforma e Fabricação',
    nicheIcon: '🏗️',
    option: 'Casa moderna de dois andares',
    character: 'BellivroAberto',
    date: new Date().toISOString(),
    timeDisplay: '10:30',
    json: {
      nicho: 'Construção, Reforma e Fabricação',
      opcao: 'Casa moderna de dois andares',
      personagem: 'BellivroAberto',
      estilo: 'moderno',
      iluminacao: 'natural',
      data: '2026-02-26',
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
