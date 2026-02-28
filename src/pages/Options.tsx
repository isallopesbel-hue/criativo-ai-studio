import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { NICHES, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  UserCircle2,
  Users,
  Dices,
  Clapperboard,
  BookOpenText,
  Castle,
  Skull,
  Headphones,
  MessageSquare,
  Smartphone,
  Building2,
  MonitorPlay,
  ShoppingBag,
  Mic,
  MessageSquareQuote,
  Mars,
  Venus,
  PenTool,
  Wand2,
} from 'lucide-react'

const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, any> = {
    Users,
    Dices,
    Clapperboard,
    BookOpenText,
    Castle,
    Skull,
    Headphones,
    MessageSquare,
    Smartphone,
    Building2,
    MonitorPlay,
    ShoppingBag,
  }
  const Icon = icons[iconName] || Sparkles
  return <Icon className={className} />
}

const CARTOON_STYLES = [
  {
    id: 'pixar',
    label: 'Estilo 3D Pixar/Disney',
    en: 'Ultra Premium 3D animation, Pixar and Disney style masterpiece, highly detailed 3D render, vibrant colors, global illumination',
    icon: Sparkles,
  },
  {
    id: 'anime',
    label: 'Estilo Anime Japonês',
    en: 'Ultra Premium Japanese Anime style, Studio Ghibli or Ufotable quality, 2D animation, beautifully drawn, highly detailed backgrounds',
    icon: Wand2,
  },
  {
    id: 'classic2d',
    label: 'Estilo Desenho Clássico 2D',
    en: 'Ultra Premium classic 2D animation, 90s cartoon network style, traditional hand-drawn cel animation, flat colors, nostalgic aesthetic',
    icon: Clapperboard,
  },
]

const RadioOption = ({
  value,
  label,
  current,
  icon: Icon,
  description,
}: any) => {
  const isSelected = current === value
  return (
    <Label
      className={`relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden group ${
        isSelected
          ? 'border-[#FFC107] bg-[#FFC107]/10 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)]'
          : 'border-border bg-card hover:bg-secondary/80 hover:border-[#FFC107]/40 hover:shadow-lg'
      }`}
    >
      {isSelected && (
        <div className="absolute -inset-2 bg-gradient-to-r from-[#FFC107]/10 to-transparent blur-xl" />
      )}

      <div
        className={`relative z-10 flex items-center justify-center w-6 h-6 shrink-0 rounded-full border ${
          isSelected
            ? 'border-[#FFC107] text-[#FFC107]'
            : 'border-muted-foreground/40 bg-background group-hover:border-[#FFC107]/40'
        }`}
      >
        {isSelected && (
          <CheckCircle2 className="w-6 h-6 absolute -inset-[1px]" />
        )}
      </div>

      {Icon && (
        <div className="relative z-10 flex items-center justify-center">
          <Icon
            className={`w-6 h-6 ${
              isSelected
                ? 'text-[#FFC107]'
                : 'text-muted-foreground group-hover:text-[#FFC107]/70'
            }`}
          />
        </div>
      )}

      <div className="relative z-10 flex-1">
        <span
          className={`font-semibold text-sm md:text-base leading-snug block ${
            isSelected
              ? 'text-[#FFC107]'
              : 'text-foreground group-hover:text-foreground/90'
          }`}
        >
          {label}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground mt-0.5 block font-medium">
            {description}
          </span>
        )}
      </div>

      <RadioGroupItem value={value} id={`opt-${value}`} className="sr-only" />
    </Label>
  )
}

const Options = () => {
  const { nicheId } = useParams()
  const navigate = useNavigate()
  const { setDraft, addResult } = usePromptStore()

  const niche = useMemo(() => NICHES.find((n) => n.id === nicheId), [nicheId])
  const isConsistentCharacter = niche?.id === 'personagem-consistente'
  const isCartoon = niche?.id === 'desenhos-animados'

  const nicheCharacters = useMemo(() => {
    if (!niche) return []
    return [
      ...niche.characters,
      {
        id: 'custom',
        name: 'Criar Personalizado',
        description: 'Descreva e a IA otimizará',
        descriptionEn: 'Custom AI Optimized Character Profile.',
      },
    ]
  }, [niche])

  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [customCharacterDesc, setCustomCharacterDesc] = useState<string>('')

  // States for Cartoon Niche
  const [cartoonStyle, setCartoonStyle] = useState<string>('pixar')

  // States for Non-Consistent Character Speech
  const [speechText, setSpeechText] = useState<string>('')

  // States for Consistent Character
  const [sceneCount, setSceneCount] = useState<number[]>([1])
  const [narrativeMode, setNarrativeMode] = useState<string>('narration')
  const [gender, setGender] = useState<string>('female')
  const [age, setAge] = useState<string>('25')
  const [scenesData, setScenesData] = useState<
    { visual: string; speech: string }[]
  >([{ visual: '', speech: '' }])

  useEffect(() => {
    if (isConsistentCharacter) {
      setScenesData((prev) => {
        const count = sceneCount[0]
        if (prev.length === count) return prev
        if (prev.length < count) {
          const newItems = Array.from({ length: count - prev.length }, () => ({
            visual: '',
            speech: '',
          }))
          return [...prev, ...newItems]
        }
        return prev.slice(0, count)
      })
    }
  }, [sceneCount, isConsistentCharacter])

  const isFormValid = useMemo(() => {
    let valid = selectedOption !== '' && selectedCharacter !== ''
    if (selectedCharacter === 'custom') {
      valid = valid && customCharacterDesc.trim() !== ''
    }
    if (isConsistentCharacter) {
      const scenesValid = scenesData.every(
        (s) => s.visual.trim() !== '' && s.speech.trim() !== '',
      )
      valid = valid && age.trim() !== '' && scenesValid
    }
    return valid
  }, [
    selectedOption,
    selectedCharacter,
    customCharacterDesc,
    isConsistentCharacter,
    scenesData,
    age,
  ])

  if (!niche) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Categoria não encontrada no sistema.
      </div>
    )
  }

  const getVoiceProfile = (gen: string, a: string) => {
    const ageNum = parseInt(a, 10)
    if (isNaN(ageNum)) return 'Adult Female Voice'
    let ageGroup = 'Adult'
    if (ageNum < 13) ageGroup = 'Child'
    else if (ageNum <= 19) ageGroup = 'Teen'
    else if (ageNum >= 60) ageGroup = 'Elderly'

    const genderStr = gen === 'male' ? 'Male' : 'Female'
    return `${ageGroup} ${genderStr} Voice`
  }

  const handleGenerate = () => {
    if (!isFormValid) return

    setDraft({ option: selectedOption, character: selectedCharacter })

    const { estilo, iluminacao } = generateMetadata(selectedOption)
    const selectedOptObj = niche.options.find((o) => o.pt === selectedOption)
    const conceptEn = selectedOptObj ? selectedOptObj.en : selectedOption

    let qualitySettings =
      'Ultra Premium, 8K, ultra-realistic, cinematic lighting, high resolution, sharp focus, highly detailed, photorealistic, masterpiece, professional cinematography, no blur, perfectly crisp'

    if (isCartoon) {
      qualitySettings =
        'Ultra Premium, high resolution, sharp focus, highly detailed, masterpiece, perfect animation quality, vibrant, clean lines, perfectly crisp'
    }

    let finalStyle = estilo
    if (isCartoon) {
      finalStyle =
        CARTOON_STYLES.find((s) => s.id === cartoonStyle)?.en || estilo
    }

    let charProfileEn = ''
    if (selectedCharacter === 'custom') {
      if (isCartoon) {
        charProfileEn = `Ultra Premium, highly detailed character design of ${customCharacterDesc.trim()}. Perfectly capturing the animation style, expressive features, and vivid colors.`
      } else {
        charProfileEn = `Ultra Premium, highly detailed, ultra-realistic portrait of ${customCharacterDesc.trim()}. The subject is deeply humanized with authentic skin texture, expressive eyes, natural posture, and a highly professional appearance. Rendered as a masterpiece portrait with striking emotional depth.`
      }
    } else {
      const charObj = nicheCharacters.find((c) => c.id === selectedCharacter)
      charProfileEn = `Ultra Premium, ${charObj?.descriptionEn || charObj?.name || selectedCharacter}`
    }

    let jsonPayload: any = {}

    if (isConsistentCharacter) {
      jsonPayload = {
        task: 'consistent_character_storytelling',
        niche_en: niche.titleEn,
        concept_en: conceptEn,
        technical_specifications_en: {
          quality: qualitySettings,
          style: finalStyle,
          lighting: iluminacao,
        },
        character_profile_en: {
          base_character_description: charProfileEn,
          gender: gender === 'male' ? 'male' : 'female',
          age: parseInt(age, 10),
          voice_profile: getVoiceProfile(gender, age),
        },
        narrative_type:
          narrativeMode === 'narration' ? 'narration' : 'dialogue',
        scene_count: sceneCount[0],
        scenes: scenesData.map((data, idx) => ({
          scene_number: idx + 1,
          visual_action_description_en: `[English] ${data.visual}`,
          character_speech_pt_br: `[Português Brasileiro] ${data.speech}`,
        })),
        language_enforcement:
          'All visual descriptions are in English. All character speech and dialogues are STRICTLY in Brazilian Portuguese (pt-BR).',
      }
    } else {
      jsonPayload = {
        task: 'professional_content_generation',
        niche_en: niche.titleEn,
        narrative_concept_en: conceptEn,
        subject_and_character_en: charProfileEn,
        technical_specifications_en: {
          quality: qualitySettings,
          lighting: iluminacao,
          camera: isCartoon
            ? 'Perfect framing, clear composition'
            : 'Sharp focus, perfectly crisp, no blur, DSLR 50mm lens',
          style: finalStyle,
        },
        audio_and_speech: {
          language: 'pt-BR',
          character_speech_pt_br:
            speechText.trim() ||
            'Sua fala ou narração em Português do Brasil será inserida aqui.',
        },
        language_enforcement:
          'All visual descriptions are in English. All character speech and dialogues are STRICTLY in Brazilian Portuguese (pt-BR).',
      }
    }

    const charObjToSave = nicheCharacters.find(
      (c) => c.id === selectedCharacter,
    )

    const newResult = {
      id: Math.random().toString(36).substring(7),
      nicheId: niche.id,
      nicheTitle: niche.title,
      nicheIcon: niche.icon,
      option: selectedOption,
      character:
        selectedCharacter === 'custom'
          ? 'Personalizado (IA)'
          : charObjToSave?.name || selectedCharacter,
      date: new Date().toISOString(),
      timeDisplay: 'agora',
      json: jsonPayload,
    }

    addResult(newResult)
    navigate('/result', { state: { result: newResult, isNew: true } })
  }

  let stepNumber = 1

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className="h-20 w-20 shrink-0 rounded-2xl bg-card border border-[#FFC107]/40 shadow-[0_0_20px_-5px_rgba(255,193,7,0.3)] flex items-center justify-center text-[#FFC107] relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FFC107]/5" />
          {getIcon(niche.icon, 'w-10 h-10 relative z-10')}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
            {niche.title}
          </h2>
          <p className="text-muted-foreground text-base font-medium mt-2">
            Configure os parâmetros do prompt para geração de alta qualidade
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-12 pb-28">
        {/* 1. Estrutura Narrativa */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
              {stepNumber++}
            </div>
            <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
              Estrutura Narrativa
            </h3>
          </div>
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {niche.options.map((opt, i) => (
              <RadioOption
                key={i}
                value={opt.pt}
                label={opt.pt}
                current={selectedOption}
              />
            ))}
          </RadioGroup>
        </section>

        {isCartoon && (
          <>
            <Separator className="bg-border" />
            {/* 2. Estilo de Animação (Only for Cartoon) */}
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
                  {stepNumber++}
                </div>
                <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
                  Estilo de Animação
                </h3>
              </div>
              <RadioGroup
                value={cartoonStyle}
                onValueChange={setCartoonStyle}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {CARTOON_STYLES.map((style) => (
                  <RadioOption
                    key={style.id}
                    value={style.id}
                    label={style.label}
                    icon={style.icon}
                    current={cartoonStyle}
                  />
                ))}
              </RadioGroup>
            </section>
          </>
        )}

        <Separator className="bg-border" />

        {/* Character Selection */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
              {stepNumber++}
            </div>
            <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
              Perfil do Personagem
            </h3>
          </div>
          <RadioGroup
            value={selectedCharacter}
            onValueChange={setSelectedCharacter}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {nicheCharacters.map((char) => (
              <Label
                key={char.id}
                className={`relative flex flex-col p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                  selectedCharacter === char.id
                    ? 'border-[#FFC107] bg-[#FFC107]/10 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)]'
                    : 'border-border bg-card hover:bg-secondary/80 hover:border-[#FFC107]/40 hover:shadow-lg'
                }`}
              >
                {selectedCharacter === char.id && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFC107]/10 to-transparent blur-xl" />
                )}

                <div className="relative z-10 flex justify-between items-start w-full mb-5">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                      selectedCharacter === char.id
                        ? 'border-[#FFC107] text-[#FFC107]'
                        : 'border-muted-foreground/40 bg-background group-hover:border-[#FFC107]/40'
                    }`}
                  >
                    {selectedCharacter === char.id && (
                      <CheckCircle2 className="w-6 h-6 absolute -inset-[1px]" />
                    )}
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      selectedCharacter === char.id
                        ? 'bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/30'
                        : 'bg-background border border-border text-muted-foreground group-hover:text-[#FFC107]'
                    }`}
                  >
                    {char.id === 'custom' ? (
                      <PenTool className="w-5 h-5" />
                    ) : (
                      <UserCircle2 className="w-6 h-6" />
                    )}
                  </div>
                </div>

                <div className="relative z-10">
                  <span
                    className={`font-bold text-lg block mb-1.5 ${
                      selectedCharacter === char.id
                        ? 'text-[#FFC107]'
                        : 'text-foreground'
                    }`}
                  >
                    {char.name}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground leading-relaxed">
                    {char.description}
                  </span>
                </div>

                <RadioGroupItem
                  value={char.id}
                  id={`char-${char.id}`}
                  className="sr-only"
                />
              </Label>
            ))}
          </RadioGroup>

          {/* Custom Character Textarea */}
          {selectedCharacter === 'custom' && (
            <div className="mt-6 p-6 bg-[#FFC107]/5 border border-[#FFC107]/30 rounded-2xl animate-in fade-in slide-in-from-top-2 shadow-sm">
              <Label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFC107]" />
                Descreva seu Personagem
              </Label>
              <Textarea
                value={customCharacterDesc}
                onChange={(e) => setCustomCharacterDesc(e.target.value)}
                placeholder="Ex: Um jovem na faixa dos 25 anos, com cabelo estilo bagunçado, usando um moletom preto minimalista, com expressão focada e confiante..."
                className="min-h-[120px] bg-background border-border focus-visible:ring-[#FFC107]/50"
              />
              <p className="text-xs text-muted-foreground font-medium mt-3 flex items-center gap-2">
                Nossa IA irá reescrever e humanizar esta descrição em Inglês
                para garantir máxima qualidade.
              </p>
            </div>
          )}
        </section>

        {isConsistentCharacter && (
          <>
            <Separator className="bg-border" />

            {/* Story Configuration */}
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
                  {stepNumber++}
                </div>
                <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
                  Configuração da História
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-5 bg-card border border-border p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-bold text-foreground">
                      Quantidade de Cenas
                    </Label>
                    <span className="text-[#FFC107] font-bold text-lg bg-[#FFC107]/10 px-3 py-1 rounded-md">
                      {sceneCount[0]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[1]}
                    max={8}
                    min={1}
                    step={1}
                    value={sceneCount}
                    onValueChange={setSceneCount}
                    className="py-2"
                  />
                  <p className="text-xs text-muted-foreground font-medium">
                    Defina o número de cenas ou takes para a geração contínua do
                    vídeo.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-bold text-foreground mb-1 block">
                    Modo de Narrativa
                  </Label>
                  <RadioGroup
                    value={narrativeMode}
                    onValueChange={setNarrativeMode}
                    className="grid gap-3"
                  >
                    <RadioOption
                      value="narration"
                      label="Narraçao"
                      description="Locução narrando a história"
                      icon={Mic}
                      current={narrativeMode}
                    />
                    <RadioOption
                      value="dialogue"
                      label="Diálogo do Personagem"
                      description="Personagem falando diretamente"
                      icon={MessageSquareQuote}
                      current={narrativeMode}
                    />
                  </RadioGroup>
                </div>
              </div>
            </section>

            <Separator className="bg-border" />

            {/* Voice Profile Mapping */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
                  {stepNumber++}
                </div>
                <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
                  Identidade Vocal & Perfil
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-sm font-bold text-foreground">
                    Gênero do Personagem
                  </Label>
                  <RadioGroup
                    value={gender}
                    onValueChange={setGender}
                    className="grid grid-cols-2 gap-3"
                  >
                    <RadioOption
                      value="male"
                      label="Masculino"
                      icon={Mars}
                      current={gender}
                    />
                    <RadioOption
                      value="female"
                      label="Feminino"
                      icon={Venus}
                      current={gender}
                    />
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-bold text-foreground">
                    Idade (Para adequação de voz)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Ex: 25"
                    className="h-[76px] text-lg font-bold bg-card"
                  />
                </div>
              </div>
            </section>

            <Separator className="bg-border" />

            {/* Dynamic Scenes Content */}
            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
                  {stepNumber++}
                </div>
                <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
                  Roteiro das Cenas
                </h3>
              </div>

              <div className="space-y-6">
                {scenesData.map((data, idx) => (
                  <div
                    key={idx}
                    className="space-y-5 p-6 rounded-2xl border border-border bg-card shadow-sm"
                  >
                    <Label className="text-sm font-bold text-[#FFC107] uppercase tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFC107]" />
                      Cena {idx + 1}
                    </Label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold text-foreground uppercase flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
                          Visual (Em Inglês)
                        </Label>
                        <Textarea
                          placeholder="Ex: A futuristic neon city, character walking confidently..."
                          value={data.visual}
                          onChange={(e) => {
                            const newContent = [...scenesData]
                            newContent[idx].visual = e.target.value
                            setScenesData(newContent)
                          }}
                          className="min-h-[120px] text-sm border-border focus-visible:ring-[#FFC107]/50 bg-background/50"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold text-foreground uppercase flex items-center gap-2">
                          <Mic className="w-3.5 h-3.5 text-[#FFC107]" />
                          Fala/Narração (Português)
                        </Label>
                        <Textarea
                          placeholder="Ex: Esta cidade nunca dorme, e eu também não..."
                          value={data.speech}
                          onChange={(e) => {
                            const newContent = [...scenesData]
                            newContent[idx].speech = e.target.value
                            setScenesData(newContent)
                          }}
                          className="min-h-[120px] text-sm border-border focus-visible:ring-[#FFC107]/50 bg-background/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {!isConsistentCharacter && (
          <>
            <Separator className="bg-border" />

            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFC107]/10 text-[#FFC107] w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-[#FFC107]/20">
                  {stepNumber++}
                </div>
                <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
                  Áudio & Fala
                </h3>
              </div>

              <div className="bg-[#FFC107]/5 border border-[#FFC107]/30 rounded-2xl p-6 shadow-sm">
                <Label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#FFC107]" />O que o personagem
                  vai dizer? (Em Português)
                </Label>
                <Textarea
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  placeholder="Digite a fala do personagem ou a narração do vídeo em Português do Brasil... (Opcional)"
                  className="min-h-[100px] bg-background border-border focus-visible:ring-[#FFC107]/50 mt-2"
                />
                <p className="text-xs text-muted-foreground font-medium mt-3 flex items-center gap-2">
                  Esta fala será processada com uma voz de IA e garantida no
                  prompt final em Português Brasileiro (pt-BR).
                </p>
              </div>
            </section>
          </>
        )}
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/95 backdrop-blur-xl border-t border-border z-50 flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-4xl px-2">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full h-14 rounded-xl bg-[#FFC107] hover:bg-[#FFC107]/90 text-black font-extrabold text-base tracking-wide shadow-[0_0_25px_-5px_rgba(255,193,7,0.4)] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-[#FFC107] disabled:shadow-none"
          >
            <Sparkles className="mr-2 h-5 w-5 text-black" />
            <span className="text-black">GERAR PROMPT MASTER</span>
            <ArrowRight className="ml-2 h-5 w-5 text-black" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Options
