export interface NicheOption {
  pt: string
  en: string
}

export interface Character {
  id: string
  name: string
  description: string
  descriptionEn: string
}

export interface Niche {
  id: string
  title: string
  titleEn: string
  icon: string
  options: NicheOption[]
  characters: Character[]
}

export const CARTOON_STYLES = [
  {
    id: 'pixar',
    label: 'Estilo 3D Pixar/Disney',
    en: 'Ultra Premium 3D animation, Pixar and Disney style masterpiece, highly detailed 3D render, vibrant colors, global illumination',
  },
  {
    id: 'anime',
    label: 'Estilo Anime Japonês',
    en: 'Ultra Premium Japanese Anime style, Studio Ghibli or Ufotable quality, 2D animation, beautifully drawn, highly detailed backgrounds',
  },
  {
    id: 'classic2d',
    label: 'Estilo Desenho Clássico 2D',
    en: 'Ultra Premium classic 2D animation, 90s cartoon network style, traditional hand-drawn cel animation, flat colors, nostalgic aesthetic',
  },
]

export const STYLE_PRESETS = {
  cyberpunk: {
    lighting: 'neon',
    atmosphere: 'rain/heavy fog',
    lens: '35mm',
  },
  medieval: {
    lighting: 'torch light/fire',
    atmosphere: 'foggy/mystic',
    lens: '50mm dramatic',
  },
  pixar: {
    lighting: 'soft global illumination',
    atmosphere: 'vibrant/clean',
    volumetric_light: true,
  },
}

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
    characters: [
      {
        id: 'influenciador-digital',
        name: 'Influenciador Digital',
        description: 'Aparência carismática, estilo de vida moderno.',
        descriptionEn:
          'Charismatic appearance, modern lifestyle digital influencer.',
      },
      {
        id: 'avatar-corporativo',
        name: 'Avatar Corporativo',
        description: 'Profissional, elegante, transmite confiança.',
        descriptionEn:
          'Professional, elegant corporate avatar conveying trust.',
      },
      {
        id: 'mascote-3d',
        name: 'Mascote 3D',
        description: 'Personagem estilizado, expressivo e amigável.',
        descriptionEn:
          'Stylized, expressive, and friendly 3D mascot character.',
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
    characters: [
      {
        id: 'narrador-misterioso',
        name: 'Narrador Misterioso',
        description: 'Voz profunda, presença enigmática.',
        descriptionEn: 'Deep voice, enigmatic presence narrator.',
      },
      {
        id: 'guia-explorador',
        name: 'Guia Explorador',
        description: 'Aventureiro, energético, roupas práticas.',
        descriptionEn:
          'Adventurous, energetic explorer guide in practical clothing.',
      },
      {
        id: 'especialista-sabio',
        name: 'Especialista Sábio',
        description: 'Intelectual, óculos, ambiente de biblioteca.',
        descriptionEn:
          'Intellectual wise expert with glasses in a library setting.',
      },
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
    characters: [
      {
        id: 'heroi-corajoso',
        name: 'Herói Corajoso',
        description: 'Traços fortes, olhar determinado, capa vibrante.',
        descriptionEn: 'Strong features, determined look, vibrant cape hero.',
      },
      {
        id: 'vilao-comico',
        name: 'Vilão Cômico',
        description: 'Expressões exageradas, risada maquiavélica.',
        descriptionEn:
          'Exaggerated expressions, machiavellian laugh comedic villain.',
      },
      {
        id: 'ajudante-desastrado',
        name: 'Ajudante Desastrado',
        description: 'Pequeno, fofo, sempre tropeçando.',
        descriptionEn: 'Small, cute, always stumbling clumsy sidekick.',
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
    characters: [
      {
        id: 'profeta-antigo',
        name: 'Profeta Antigo',
        description: 'Barba longa, vestes rústicas, olhar visionário.',
        descriptionEn:
          'Long beard, rustic robes, visionary look ancient prophet.',
      },
      {
        id: 'figura-angelical',
        name: 'Figura Angelical',
        description: 'Asas de luz, aura brilhante, serenidade.',
        descriptionEn: 'Wings of light, glowing aura, serene angelic figure.',
      },
      {
        id: 'campones-simples',
        name: 'Camponês Simples',
        description: 'Roupas de época, humilde, trabalhador.',
        descriptionEn: 'Period clothing, humble, hardworking simple peasant.',
      },
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
    characters: [
      {
        id: 'crianca-aventureira',
        name: 'Criança Aventureira',
        description: 'Mochila nas costas, curiosidade no olhar.',
        descriptionEn: 'Backpack on back, curiosity in eyes adventurous child.',
      },
      {
        id: 'fada-guia',
        name: 'Fada Guia',
        description: 'Pequena, brilhante, varinha mágica.',
        descriptionEn: 'Tiny, glowing, magic wand guide fairy.',
      },
      {
        id: 'animal-falante',
        name: 'Animal Falante',
        description: 'Expressivo, antropomórfico, pelagem macia.',
        descriptionEn: 'Expressive, anthropomorphic, soft fur talking animal.',
      },
    ],
  },
  {
    id: 'dark-terror',
    title: 'Dark & Terror',
    titleEn: 'Dark & Horror',
    icon: 'Skull',
    options: [
      {
        pt: 'Terror Psicológico',
        en: 'Psychological Horror focusing on paranoia, sanity, and internal dread',
      },
      {
        pt: 'Horror Sobrenatural',
        en: 'Supernatural Horror focusing on ghosts, ancient curses, and paranormal entities',
      },
      {
        pt: 'Suspense Slasher',
        en: 'Slasher Thriller focusing on high tension, survival, and a persistent antagonist',
      },
    ],
    characters: [
      {
        id: 'investigador-paranormal',
        name: 'Investigador Paranormal',
        description: 'Cético, experiente, carrega equipamentos antigos.',
        descriptionEn:
          'Skeptical, experienced paranormal investigator carrying vintage equipment.',
      },
      {
        id: 'vitima-fugitiva',
        name: 'Vítima Fugitiva',
        description: 'Aterrorizada, exausta, lutando pela sobrevivência.',
        descriptionEn: 'Terrified, exhausted victim fighting for survival.',
      },
      {
        id: 'entidade-obscura',
        name: 'Entidade Obscura',
        description: 'Figura sombria, ameaçadora, indescritível.',
        descriptionEn: 'Shadowy, menacing, indescribable dark entity.',
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
    characters: [
      {
        id: 'estrela-pop',
        name: 'Estrela Pop',
        description: 'Roupas extravagantes, carisma de palco.',
        descriptionEn: 'Extravagant clothes, stage charisma pop star.',
      },
      {
        id: 'rapper-underground',
        name: 'Rapper Underground',
        description: 'Estilo urbano, atitude confiante, correntes.',
        descriptionEn:
          'Urban style, confident attitude, chains underground rapper.',
      },
      {
        id: 'dj-eletronico',
        name: 'DJ Eletrônico',
        description: 'Fones de ouvido, luzes neon, energia alta.',
        descriptionEn: 'Headphones, neon lights, high energy electronic DJ.',
      },
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
    characters: [
      {
        id: 'objeto-sabio',
        name: 'Objeto Sábio',
        description: 'Aparência antiga, voz conselheira.',
        descriptionEn: 'Ancient appearance, advising voice wise object.',
      },
      {
        id: 'objeto-ranzinza',
        name: 'Objeto Ranzinza',
        description: 'Desgastado, reclamações cômicas.',
        descriptionEn: 'Worn out, comedic complaints grumpy object.',
      },
      {
        id: 'objeto-animado',
        name: 'Objeto Animado',
        description: 'Cores vivas, saltitante, muito alegre.',
        descriptionEn: 'Bright colors, bouncy, very cheerful animated object.',
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
    characters: [
      {
        id: 'vlogger-dinamico',
        name: 'Vlogger Dinâmico',
        description: 'Câmera na mão, sorridente, cortes rápidos.',
        descriptionEn: 'Camera in hand, smiling, fast-paced dynamic vlogger.',
      },
      {
        id: 'dancarino-viral',
        name: 'Dançarino Viral',
        description: 'Roupas flexíveis, movimentos precisos.',
        descriptionEn: 'Flexible clothes, precise movements viral dancer.',
      },
      {
        id: 'especialista-dicas',
        name: 'Especialista em Dicas',
        description: 'Aponta para textos imaginários, didático.',
        descriptionEn: 'Points to imaginary text, didactic tips expert.',
      },
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
    characters: [
      {
        id: 'arquiteto-senior',
        name: 'Arquiteto Sênior',
        description: 'Prancheta na mão, capacete branco, visão técnica.',
        descriptionEn:
          'Clipboard in hand, white helmet, technical vision senior architect.',
      },
      {
        id: 'engenheiro-obra',
        name: 'Engenheiro de Obra',
        description: 'Colete refletivo, botas pesadas, focado.',
        descriptionEn:
          'Reflective vest, heavy boots, focused construction engineer.',
      },
      {
        id: 'designer-interiores',
        name: 'Designer de Interiores',
        description: 'Estilo elegante, amostras de cores na mão.',
        descriptionEn:
          'Elegant style, color swatches in hand interior designer.',
      },
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
    characters: [
      {
        id: 'estrategista-vendas',
        name: 'Estrategista de Vendas',
        description: 'Profissional confiante, vestuário moderno e analítico.',
        descriptionEn:
          'Confident professional sales strategist, modern and analytical.',
      },
      {
        id: 'criador-conteudo',
        name: 'Criador de Conteúdo',
        description: 'Carismático, ambiente de estúdio iluminado.',
        descriptionEn:
          'Charismatic content creator in a well-lit studio environment.',
      },
      {
        id: 'empreendedor-digital',
        name: 'Empreendedor Digital',
        description: 'Visionário, trabalhando em um laptop premium.',
        descriptionEn:
          'Visionary digital entrepreneur working on a premium laptop.',
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
    characters: [
      {
        id: 'modelo-estilo-vida',
        name: 'Modelo de Estilo de Vida',
        description: 'Aparência impecável, usando o produto naturalmente.',
        descriptionEn:
          'Flawless appearance, naturally using the product lifestyle model.',
      },
      {
        id: 'especialista-review',
        name: 'Especialista em Review',
        description: 'Analisando detalhes com lupa ou luz forte.',
        descriptionEn:
          'Analyzing details with a magnifying glass or strong light review expert.',
      },
      {
        id: 'usuario-diario',
        name: 'Usuário Diário',
        description: 'Pessoa comum, satisfeita, ambiente doméstico.',
        descriptionEn:
          'Common person, satisfied, domestic environment daily user.',
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
    character: 'Empreendedor Digital',
    date: new Date().toISOString(),
    timeDisplay: '10:30',
    json: {
      task: 'professional_content_generation',
      niche: 'Digital Products',
      narrative_concept: 'SaaS software launch',
      subject_and_character:
        'Visionary digital entrepreneur working on a premium laptop.',
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
    lower.includes('sobrenatural') ||
    lower.includes('slasher') ||
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
