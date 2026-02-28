export interface NicheOption {
  pt: string
  en: string
}

export interface Niche {
  id: string
  title: string
  titleEn: string
  icon: string
  options: NicheOption[]
}

export interface Character {
  id: string
  name: string
  description: string
  descriptionEn: string
}

export const CHARACTERS: Character[] = [
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Estilo Moderno, Analítico e Visionário',
    descriptionEn: 'Modern, analytical, and visionary tech professional.',
  },
  {
    id: 'creative-artist',
    name: 'Creative Artist',
    description: 'Expressivo, Colorido e Boêmio',
    descriptionEn: 'Expressive, colorful, and bohemian artistic personality.',
  },
  {
    id: 'corporate-exec',
    name: 'Corporate Exec',
    description: 'Apresentação Corporativa High-End',
    descriptionEn: 'Sharp, high-end corporate executive in a tailored suit.',
  },
  {
    id: 'urban-explorer',
    name: 'Urban Explorer',
    description: 'Dinâmico, Streetwear e Aventureiro',
    descriptionEn: 'Dynamic streetwear urban explorer ready for action.',
  },
  {
    id: 'custom',
    name: 'Criar Personalizado',
    description: 'Descreva e a IA otimizará',
    descriptionEn: 'Custom AI Optimized Character Profile.',
  },
]

export const NICHES: Niche[] = [
  {
    id: 'personagem-consistente',
    title: 'Personagem Consistente',
    titleEn: 'Consistent Character',
    icon: 'Users',
    options: [
      {
        pt: 'Personagem masculino em vários cenários',
        en: 'Male character in multiple environments',
      },
      {
        pt: 'Personagem feminino em várias poses',
        en: 'Female character in various dynamic poses',
      },
      {
        pt: 'Mascote 3D em situações diversas',
        en: '3D mascot in diverse situations',
      },
      { pt: 'Avatar hiper-realista', en: 'Hyper-realistic avatar' },
      {
        pt: 'Influenciador virtual em rotina diária',
        en: 'Virtual influencer in daily routine',
      },
      {
        pt: 'Profissional focado em ambiente de trabalho',
        en: 'Focused professional in a workspace environment',
      },
    ],
  },
  {
    id: 'videos-aleatorios',
    title: 'Vídeos Aleatórios',
    titleEn: 'Random & Varied Videos',
    icon: 'Dices',
    options: [
      { pt: 'Mistério para desvendar', en: 'Mystery to be solved' },
      { pt: 'Fato científico curioso', en: 'Curious scientific fact' },
      { pt: 'Desafio visual dinâmico', en: 'Dynamic visual challenge' },
      { pt: 'Momento inusitado e cômico', en: 'Unusual and comedic moment' },
      {
        pt: 'Paisagem surreal com elementos flutuantes',
        en: 'Surreal landscape with floating elements',
      },
      { pt: 'Transição de ilusão de ótica', en: 'Optical illusion transition' },
    ],
  },
  {
    id: 'desenhos-animados',
    title: 'Animações & Cartoons',
    titleEn: 'Animations & Cartoons',
    icon: 'Clapperboard',
    options: [
      { pt: 'Herói em cena de ação', en: 'Hero in an action scene' },
      {
        pt: 'Vilão caricato tramando plano',
        en: 'Caricature villain plotting a scheme',
      },
      { pt: 'Cena de amizade emocionante', en: 'Emotional friendship scene' },
      {
        pt: 'Aventura mística na floresta',
        en: 'Mystical adventure in the forest',
      },
      {
        pt: 'Cidade futurista em estilo cyberpunk animado',
        en: 'Futuristic city in animated cyberpunk style',
      },
      {
        pt: 'Mascote engraçado quebrando a quarta parede',
        en: 'Funny mascot breaking the fourth wall',
      },
    ],
  },
  {
    id: 'historias-biblicas',
    title: 'Histórias Bíblicas',
    titleEn: 'Biblical Stories',
    icon: 'BookOpenText',
    options: [
      { pt: 'Davi enfrentando Golias', en: 'David facing Goliath' },
      { pt: 'Moisés diante do Mar Vermelho', en: 'Moses parting the Red Sea' },
      {
        pt: 'Arca de Noé em meio ao dilúvio',
        en: "Noah's Ark amidst the flood",
      },
      { pt: 'Milagre de Jesus no mar', en: 'Miracle of Jesus on the sea' },
      { pt: 'Criação do mundo no Éden', en: 'Creation of the world in Eden' },
      { pt: 'Batalha celestial épica', en: 'Epic celestial battle' },
    ],
  },
  {
    id: 'historias-infantis',
    title: 'Contos Infantis',
    titleEn: "Children's Tales",
    icon: 'Castle',
    options: [
      {
        pt: 'O coelho que explorou o espaço',
        en: 'The rabbit that explored space',
      },
      {
        pt: 'A fada que encontrou um tesouro',
        en: 'The fairy who found a treasure',
      },
      { pt: 'O dragão que adorava ler', en: 'The dragon who loved to read' },
      { pt: 'A princesa inventora', en: 'The inventor princess' },
      { pt: 'A árvore mágica sussurrante', en: 'The whispering magic tree' },
      { pt: 'O trem voador de brinquedo', en: 'The flying toy train' },
    ],
  },
  {
    id: 'dark-terror',
    title: 'Dark & Terror',
    titleEn: 'Dark & Horror',
    icon: 'Skull',
    options: [
      {
        pt: 'Exploração em asilo abandonado',
        en: 'Exploration in an abandoned asylum',
      },
      {
        pt: 'Criatura espreitando na névoa',
        en: 'Creature lurking in the fog',
      },
      {
        pt: 'Espelho que reflete o passado',
        en: 'Mirror that reflects the past',
      },
      { pt: 'Ruas vazias à meia-noite', en: 'Empty streets at midnight' },
      {
        pt: 'Floresta amaldiçoada sob lua cheia',
        en: 'Cursed forest under a full moon',
      },
      {
        pt: 'Sombra no final do corredor',
        en: 'Shadow at the end of the hallway',
      },
    ],
  },
  {
    id: 'clipes-musicais',
    title: 'Clipes Musicais',
    titleEn: 'Music Videos',
    icon: 'Headphones',
    options: [
      { pt: 'Banda de rock em palco neon', en: 'Rock band on a neon stage' },
      {
        pt: 'Apresentação pop com coreografia',
        en: 'Pop performance with choreography',
      },
      { pt: 'Cena acústica em um pub', en: 'Acoustic scene in a pub' },
      {
        pt: 'Videoclipe de rap underground',
        en: 'Underground rap music video',
      },
      {
        pt: 'DJ set em festival eletrônico',
        en: 'DJ set at an electronic festival',
      },
      { pt: 'Cantor solista na chuva', en: 'Solo singer in the rain' },
    ],
  },
  {
    id: 'objetos-falantes',
    title: 'Objetos Falantes',
    titleEn: 'Talking Objects',
    icon: 'MessageSquare',
    options: [
      { pt: 'Xícara de café motivacional', en: 'Motivational coffee cup' },
      { pt: 'Relógio que avisa o futuro', en: 'Clock that warns the future' },
      { pt: 'Mochila ranzinza', en: 'Grumpy backpack' },
      {
        pt: 'Geladeira dando dicas de dieta',
        en: 'Refrigerator giving diet tips',
      },
      { pt: 'Tênis de corrida competitivo', en: 'Competitive running shoe' },
      {
        pt: 'Espelho elogiando o visual',
        en: 'Mirror complimenting the outfit',
      },
    ],
  },
  {
    id: 'tiktok-instagram',
    title: 'Social Media (Reels/Shorts)',
    titleEn: 'Social Media (Reels/Shorts)',
    icon: 'Smartphone',
    options: [
      { pt: 'Tutorial rápido de edição', en: 'Quick editing tutorial' },
      { pt: 'Transição de moda criativa', en: 'Creative fashion transition' },
      { pt: 'Curiosidade em 15 segundos', en: 'Curiosity in 15 seconds' },
      { pt: 'Vlog diário acelerado', en: 'Fast-paced daily vlog' },
      { pt: 'Unboxing ASMR satisfatório', en: 'Satisfying ASMR unboxing' },
      { pt: 'Desafio de dança viral', en: 'Viral dance challenge' },
    ],
  },
  {
    id: 'construcao',
    title: 'Arquitetura & Engenharia',
    titleEn: 'Architecture & Engineering',
    icon: 'Building2',
    options: [
      { pt: 'Projeto de casa sustentável', en: 'Sustainable house project' },
      { pt: 'Renovação de cozinha rústica', en: 'Rustic kitchen renovation' },
      {
        pt: 'Design de interiores minimalista',
        en: 'Minimalist interior design',
      },
      { pt: 'Acompanhamento de obra', en: 'Construction site monitoring' },
      {
        pt: 'Fachada de prédio comercial envidraçado',
        en: 'Glass commercial building facade',
      },
      { pt: 'Maquete 3D interativa', en: 'Interactive 3D architectural model' },
    ],
  },
  {
    id: 'produtos-digitais',
    title: 'Produtos Digitais',
    titleEn: 'Digital Products',
    icon: 'MonitorPlay',
    options: [
      {
        pt: 'Apresentação de E-book premium',
        en: 'Premium E-book presentation',
      },
      { pt: 'Dashboard de curso online', en: 'Online course dashboard' },
      { pt: 'Mockup de aplicativo', en: 'Application mockup' },
      { pt: 'Anúncio de Masterclass', en: 'Masterclass ad' },
      { pt: 'Lançamento de Software SaaS', en: 'SaaS software launch' },
      {
        pt: 'Imersão Digital em Realidade Virtual',
        en: 'Virtual reality digital immersion',
      },
    ],
  },
  {
    id: 'produtos-fisicos',
    title: 'Produtos Físicos',
    titleEn: 'Physical Products',
    icon: 'ShoppingBag',
    options: [
      { pt: 'Unboxing cinematográfico', en: 'Cinematic unboxing' },
      { pt: 'Detalhes de textura do produto', en: 'Product texture details' },
      { pt: 'Produto em uso na natureza', en: 'Product in use in nature' },
      { pt: 'Demonstração de durabilidade', en: 'Durability demonstration' },
      {
        pt: 'Sessão fotográfica de estúdio high-end',
        en: 'High-end studio photo session',
      },
      {
        pt: 'Campanha de lifestyle urbano',
        en: 'Urban lifestyle product campaign',
      },
    ],
  },
]

export const MOCK_HISTORY = [
  {
    id: '1',
    nicheId: 'produtos-digitais',
    nicheTitle: 'Produtos Digitais',
    nicheIcon: 'MonitorPlay',
    option: 'Lançamento de Software SaaS',
    character: 'Tech Innovator',
    date: new Date().toISOString(),
    timeDisplay: '10:30',
    json: {
      task: 'professional_content_generation',
      niche: 'Digital Products',
      narrative_concept: 'SaaS software launch',
      subject_and_character:
        'Modern, analytical, and visionary tech professional.',
      technical_specifications: {
        quality:
          '8K, ultra-realistic, cinematic lighting, high resolution, sharp focus, highly detailed, photorealistic, masterpiece, no blur, perfectly crisp',
        lighting: 'Clean, natural and diffuse lighting',
        camera: 'Sharp focus, perfectly crisp, no blur, DSLR 50mm lens',
        style: 'High-end commercial photography, modern aesthetic',
      },
      language: 'en',
    },
  },
]

export function generateMetadata(optionPt: string) {
  const lower = optionPt.toLowerCase()
  let estilo = 'Ultra-realistic 8K photography'
  let iluminacao = 'Balanced studio lighting'

  if (
    lower.includes('modern') ||
    lower.includes('premium') ||
    lower.includes('software') ||
    lower.includes('saas')
  ) {
    estilo = 'High-end commercial photography, modern aesthetic'
    iluminacao = 'Clean, natural and diffuse lighting'
  } else if (
    lower.includes('luxo') ||
    lower.includes('dramátic') ||
    lower.includes('noite') ||
    lower.includes('terror') ||
    lower.includes('abandonad') ||
    lower.includes('dark')
  ) {
    estilo = 'Dark cinematic masterpiece'
    iluminacao = 'Dramatic high contrast, low key lighting, moody shadows'
  } else if (
    lower.includes('anim') ||
    lower.includes('cart') ||
    lower.includes('infant') ||
    lower.includes('coelho') ||
    lower.includes('mascote')
  ) {
    estilo = 'High-end 3D animation, Pixar-style masterpiece'
    iluminacao = 'Soft, vibrant and colorful global illumination'
  } else if (
    lower.includes('vlog') ||
    lower.includes('social') ||
    lower.includes('tutorial') ||
    lower.includes('influenciador')
  ) {
    estilo = '4K smartphone camera aesthetic, hyper-realistic'
    iluminacao = 'Frontal ring light, flattering facial lighting'
  } else if (
    lower.includes('neon') ||
    lower.includes('pop') ||
    lower.includes('cyberpunk')
  ) {
    estilo = 'Vibrant stylized cyberpunk photography'
    iluminacao = 'Neon colored rim lights, volumetric glowing lights'
  }

  return { estilo, iluminacao }
}
