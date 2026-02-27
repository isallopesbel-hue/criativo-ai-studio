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
    description: 'Estilo Humor e Deboche',
  },
  {
    id: 'davi',
    name: 'Davi',
    description: 'Estilo Bíblico e Épico',
  },
]

export const NICHES: Niche[] = [
  {
    id: 'personagem-consistente',
    title: 'Personagem Consistente',
    icon: 'Users',
    options: [
      'Personagem masculino em vários cenários',
      'Personagem feminino em várias poses',
      'Mascote 3D em situações diversas',
      'Avatar hiper-realista',
    ],
  },
  {
    id: 'videos-aleatorios',
    title: 'Vídeos Aleatórios',
    icon: 'Dices',
    options: [
      'Mistério para desvendar',
      'Fato científico curioso',
      'Desafio visual dinâmico',
      'Momento inusitado e cômico',
    ],
  },
  {
    id: 'desenhos-animados',
    title: 'Animações & Cartoons',
    icon: 'Clapperboard',
    options: [
      'Herói em cena de ação',
      'Vilão caricato tramando plano',
      'Cena de amizade emocionante',
      'Aventura mística na floresta',
    ],
  },
  {
    id: 'historias-biblicas',
    title: 'Histórias Bíblicas',
    icon: 'BookOpenText',
    options: [
      'Davi enfrentando Golias',
      'Moisés diante do Mar Vermelho',
      'Arca de Noé em meio ao dilúvio',
      'Milagre de Jesus no mar',
    ],
  },
  {
    id: 'historias-infantis',
    title: 'Contos Infantis',
    icon: 'Castle',
    options: [
      'O coelho que explorou o espaço',
      'A fada que encontrou um tesouro',
      'O dragão que adorava ler',
      'A princesa inventora',
    ],
  },
  {
    id: 'dark-terror',
    title: 'Dark & Terror',
    icon: 'Skull',
    options: [
      'Exploração em asilo abandonado',
      'Criatura espreitando na névoa',
      'Espelho que reflete o passado',
      'Ruas vazias à meia-noite',
    ],
  },
  {
    id: 'clipes-musicais',
    title: 'Clipes Musicais',
    icon: 'Headphones',
    options: [
      'Banda de rock em palco neon',
      'Apresentação pop com coreografia',
      'Cena acústica em um pub',
      'Videoclipe de rap underground',
    ],
  },
  {
    id: 'objetos-falantes',
    title: 'Objetos Falantes',
    icon: 'MessageSquare',
    options: [
      'Xícara de café motivacional',
      'Relógio que avisa o futuro',
      'Mochila ranzinza',
      'Geladeira dando dicas de dieta',
    ],
  },
  {
    id: 'tiktok-instagram',
    title: 'Social Media (Reels/Shorts)',
    icon: 'Smartphone',
    options: [
      'Tutorial rápido de edição',
      'Transição de moda criativa',
      'Curiosidade em 15 segundos',
      'Vlog diário acelerado',
    ],
  },
  {
    id: 'construcao',
    title: 'Arquitetura & Engenharia',
    icon: 'Building2',
    options: [
      'Projeto de casa sustentável',
      'Renovação de cozinha rústica',
      'Design de interiores minimalista',
      'Acompanhamento de obra',
    ],
  },
  {
    id: 'produtos-digitais',
    title: 'Produtos Digitais',
    icon: 'MonitorPlay',
    options: [
      'Apresentação de E-book premium',
      'Dashboard de curso online',
      'Mockup de aplicativo',
      'Anúncio de Masterclass',
    ],
  },
  {
    id: 'produtos-fisicos',
    title: 'Produtos Físicos',
    icon: 'ShoppingBag',
    options: [
      'Unboxing cinematográfico',
      'Detalhes de textura do produto',
      'Produto em uso na natureza',
      'Demonstração de durabilidade',
    ],
  },
]

export const MOCK_HISTORY = [
  {
    id: '1',
    nicheId: 'construcao',
    nicheTitle: 'Arquitetura & Engenharia',
    nicheIcon: 'Building2',
    option: 'Projeto de casa sustentável',
    character: 'BellivroAberto',
    date: new Date().toISOString(),
    timeDisplay: '10:30',
    json: {
      nicho: 'Arquitetura & Engenharia',
      opcao: 'Projeto de casa sustentável',
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

  if (lower.includes('modern') || lower.includes('premium')) {
    estilo = 'moderno'
    iluminacao = 'natural e difusa'
  } else if (
    lower.includes('luxo') ||
    lower.includes('dramátic') ||
    lower.includes('noite') ||
    lower.includes('terror') ||
    lower.includes('abandonad')
  ) {
    estilo = 'cinematográfico'
    iluminacao = 'dramática com alto contraste'
  } else if (
    lower.includes('anim') ||
    lower.includes('cart') ||
    lower.includes('infant') ||
    lower.includes('coelho')
  ) {
    estilo = 'animação 3D estilo Pixar'
    iluminacao = 'suave e colorida'
  } else if (
    lower.includes('vlog') ||
    lower.includes('social') ||
    lower.includes('tutorial')
  ) {
    estilo = 'câmera de celular 4K'
    iluminacao = 'ring light frontal'
  } else if (
    lower.includes('dark') ||
    lower.includes('névoa') ||
    lower.includes('assustador')
  ) {
    estilo = 'sombrio e obscuro'
    iluminacao = 'baixa luz com sombras projetadas'
  } else if (lower.includes('neon') || lower.includes('pop')) {
    estilo = 'vibrante e estilizado'
    iluminacao = 'luzes neon coloridas'
  }

  return { estilo, iluminacao }
}
