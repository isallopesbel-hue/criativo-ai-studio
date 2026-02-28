import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { NICHES, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
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
      className={cn(
        'relative flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 group',
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/40 hover:bg-secondary/50',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center w-5 h-5 shrink-0 rounded-full border mt-0.5 transition-colors',
          isSelected
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/40 bg-background group-hover:border-primary/40',
        )}
      >
        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>

      {Icon && (
        <Icon
          className={cn(
            'w-5 h-5 mt-0.5 shrink-0 transition-colors',
            isSelected ? 'text-primary' : 'text-muted-foreground',
          )}
        />
      )}

      <div className="flex-1 space-y-1">
        <p
          className={cn(
            'font-semibold text-sm leading-none',
            isSelected ? 'text-primary' : 'text-foreground',
          )}
        >
          {label}
        </p>
        {description && (
          <p className="text-xs text-muted-foreground font-medium">
            {description}
          </p>
        )}
      </div>

      <RadioGroupItem value={value} id={`opt-${value}`} className="sr-only" />
    </Label>
  )
}

const CharacterOption = ({ char, current }: any) => {
  const isSelected = current === char.id
  return (
    <Label
      className={cn(
        'relative flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 group',
        isSelected
          ? 'border-primary bg-primary/5 shadow-sm'
          : 'border-border bg-card hover:border-primary/40 hover:bg-secondary/50',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center w-5 h-5 shrink-0 rounded-full border mt-1 transition-colors',
          isSelected
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-muted-foreground/40 bg-background group-hover:border-primary/40',
        )}
      >
        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>

      <div
        className={cn(
          'w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors',
          isSelected
            ? 'bg-primary/20 text-primary'
            : 'bg-secondary text-muted-foreground group-hover:text-primary',
        )}
      >
        {char.id === 'custom' ? (
          <PenTool className="w-5 h-5" />
        ) : (
          <UserCircle2 className="w-5 h-5" />
        )}
      </div>

      <div className="flex-1 space-y-1.5">
        <p
          className={cn(
            'font-bold text-base leading-tight',
            isSelected ? 'text-primary' : 'text-foreground',
          )}
        >
          {char.name}
        </p>
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          {char.description}
        </p>
      </div>

      <RadioGroupItem
        value={char.id}
        id={`char-${char.id}`}
        className="sr-only"
      />
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
        description: 'Descreva os detalhes e a IA otimizará',
        descriptionEn: 'Custom AI Optimized Character Profile.',
      },
    ]
  }, [niche])

  // Normal Form States
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [customCharacterDesc, setCustomCharacterDesc] = useState<string>('')
  const [cartoonStyle, setCartoonStyle] = useState<string>('pixar')
  const [sceneIdea, setSceneIdea] = useState<string>('')

  // Consistent Character specific states (Lean UI)
  const [dnaGender, setDnaGender] = useState<string>('female')
  const [dnaAge, setDnaAge] = useState<string>('25')
  const [dnaDescription, setDnaDescription] = useState<string>('')
  const [sceneCount, setSceneCount] = useState<number[]>([1])
  const [scenesData, setScenesData] = useState<{ idea: string }[]>([
    { idea: '' },
  ])

  useEffect(() => {
    if (isConsistentCharacter) {
      setScenesData((prev) => {
        const count = sceneCount[0]
        if (prev.length === count) return prev
        if (prev.length < count) {
          const newItems = Array.from({ length: count - prev.length }, () => ({
            idea: '',
          }))
          return [...prev, ...newItems]
        }
        return prev.slice(0, count)
      })
    }
  }, [sceneCount, isConsistentCharacter])

  const isFormValid = useMemo(() => {
    if (isConsistentCharacter) {
      return dnaAge.trim() !== '' && dnaDescription.trim() !== ''
    }

    let valid = selectedOption !== '' && selectedCharacter !== ''
    if (selectedCharacter === 'custom') {
      valid = valid && customCharacterDesc.trim() !== ''
    }
    return valid
  }, [
    selectedOption,
    selectedCharacter,
    customCharacterDesc,
    isConsistentCharacter,
    dnaAge,
    dnaDescription,
  ])

  if (!niche) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Categoria não encontrada no sistema.
      </div>
    )
  }

  const handleGenerate = () => {
    if (!isFormValid) return

    let jsonPayload: any = {}
    let saveOption = ''
    let saveCharacter = ''

    if (isConsistentCharacter) {
      saveOption = 'Narrativa Consistente'
      saveCharacter = 'DNA de Personagem'
      setDraft({ option: saveOption, character: saveCharacter })

      const genderEn = dnaGender === 'male' ? 'Male' : 'Female'
      const charDnaEn = `Gender: ${genderEn}, Age: ${dnaAge}. Visual Description: [TRANSLATE TO ENGLISH] ${dnaDescription.trim()}`

      jsonPayload = {
        task: 'consistent_character_storytelling',
        niche_en: niche.titleEn,
        character_dna_en: {
          gender: dnaGender,
          age: parseInt(dnaAge, 10) || 25,
          visual_description_pt: dnaDescription.trim(),
        },
        technical_specifications_en: {
          quality:
            'Ultra Premium, 8K, ultra-realistic, cinematic lighting, high resolution, sharp focus, highly detailed, photorealistic, masterpiece, professional cinematography, no blur, perfectly crisp',
          style: 'High-end commercial photography, modern aesthetic',
          lighting: 'Balanced studio lighting, consistent across all scenes',
        },
        scene_count: sceneCount[0],
        scenes: scenesData.map((data, idx) => {
          const baseIdea = data.idea.trim()
          return {
            scene_number: idx + 1,
            visual_action_description_en: baseIdea
              ? `[TRANSLATE TO ENGLISH & ENHANCE] Scene ${idx + 1}. Character Profile: (${charDnaEn}). Action based on: "${baseIdea}"`
              : `[AUTO-GENERATE IN ENGLISH] Scene ${idx + 1} of ${sceneCount[0]}. Character Profile: (${charDnaEn}). Create a highly detailed visual action description seamlessly continuing the narrative.`,
            character_speech_pt_br: baseIdea
              ? `[EXTRACT SPEECH/NARRATIVE IN PT-BR] Aprimore a fala ou crie uma narração natural em Português do Brasil baseada em: "${baseIdea}"`
              : `[AUTO-GENERATE SCRIPT IN PT-BR] Crie a fala/narração para a cena ${idx + 1} em Português do Brasil, alinhada à sequência lógica do personagem.`,
          }
        }),
        system_instruction:
          "CRITICAL: Programmatically injected Character DNA metadata MUST be maintained across every scene's visual description. All visual action descriptions MUST be in English. All character speech and dialogues MUST be STRICTLY in Brazilian Portuguese (pt-BR).",
      }
    } else {
      saveOption = selectedOption

      const charObjToSave = nicheCharacters.find(
        (c) => c.id === selectedCharacter,
      )
      saveCharacter =
        selectedCharacter === 'custom'
          ? 'Personalizado (IA)'
          : charObjToSave?.name || selectedCharacter

      setDraft({ option: saveOption, character: saveCharacter })

      const { estilo, iluminacao } = generateMetadata(selectedOption)
      const selectedOptObj = niche.options.find((o) => o.pt === selectedOption)
      const conceptEn = selectedOptObj ? selectedOptObj.en : selectedOption

      let qualitySettings =
        'Ultra Premium, 8K, ultra-realistic, cinematic lighting, high resolution, sharp focus, highly detailed, photorealistic, masterpiece, professional cinematography, no blur, perfectly crisp'

      if (isCartoon) {
        qualitySettings =
          'Ultra Premium, 8K, high resolution, sharp focus, highly detailed, masterpiece, perfect animation quality, vibrant, clean lines, perfectly crisp'
      }

      let finalStyle = estilo
      if (isCartoon) {
        finalStyle =
          CARTOON_STYLES.find((s) => s.id === cartoonStyle)?.en || estilo
      }

      let charProfileEn = ''
      if (selectedCharacter === 'custom') {
        charProfileEn = isCartoon
          ? `Ultra Premium, highly detailed character design of ${customCharacterDesc.trim()}. Perfectly capturing the animation style, expressive features, and vivid colors.`
          : `Ultra Premium, highly detailed, ultra-realistic portrait of ${customCharacterDesc.trim()}. The subject is deeply humanized with authentic skin texture, expressive eyes, natural posture, and a highly professional appearance. Rendered as a masterpiece portrait.`
      } else {
        const charObj = nicheCharacters.find((c) => c.id === selectedCharacter)
        charProfileEn = `Ultra Premium, ${charObj?.descriptionEn || charObj?.name || selectedCharacter}`
      }

      const fallbackScriptPt = `[AUTO-GENERATE SCRIPT] Crie um roteiro/diálogo envolvente, natural e altamente profissional em Português do Brasil (pt-BR) focado em '${selectedOption}', para ser dito por: ${saveCharacter}.`

      jsonPayload = {
        task: 'professional_content_generation',
        niche_en: niche.titleEn,
        narrative_concept_en: conceptEn,
        subject_and_character_en: charProfileEn,
        technical_specifications_en: {
          quality: qualitySettings,
          lighting: iluminacao,
          camera: isCartoon
            ? 'Perfect framing, clear composition, ultra premium render'
            : 'Sharp focus, perfectly crisp, no blur, DSLR 50mm lens',
          style: finalStyle,
        },
        scene_and_action_en: sceneIdea.trim()
          ? `[TRANSLATE TO ENGLISH & ENHANCE] Highly detailed visual prompt based on: "${sceneIdea.trim()}"`
          : `[AUTO-GENERATE VISUAL IN ENGLISH] Highly detailed visual scene description for the concept: '${conceptEn}'.`,
        audio_and_speech: {
          language: 'pt-BR',
          character_speech_pt_br: sceneIdea.trim()
            ? `[REWRITE & HUMANIZE] Reescreva o seguinte texto como uma fala/narração profissional em Português do Brasil: "${sceneIdea.trim()}"`
            : fallbackScriptPt,
        },
        system_instruction:
          'CRITICAL: All technical metadata and visual action descriptions MUST be in English. All dialogue, spoken lines, and narrations MUST be in Brazilian Portuguese (pt-BR).',
      }
    }

    const newResult = {
      id: Math.random().toString(36).substring(7),
      nicheId: niche.id,
      nicheTitle: niche.title,
      nicheIcon: niche.icon,
      option: saveOption,
      character: saveCharacter,
      date: new Date().toISOString(),
      timeDisplay: 'agora',
      json: jsonPayload,
    }

    addResult(newResult)
    navigate('/result', { state: { result: newResult, isNew: true } })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-5">
        <div className="h-16 w-16 shrink-0 rounded-2xl bg-card border border-primary/40 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)] flex items-center justify-center text-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          {getIcon(niche.icon, 'w-8 h-8 relative z-10')}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
            {niche.title}
          </h2>
          <p className="text-muted-foreground text-sm font-medium mt-1">
            Configure os parâmetros do prompt para geração de alta qualidade
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-10 pb-28">
        {isConsistentCharacter ? (
          <div className="space-y-10">
            {/* 1. Character DNA Profile */}
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                1. DNA do Personagem (Identidade Visual)
              </Label>

              <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">
                      Gênero
                    </Label>
                    <RadioGroup
                      value={dnaGender}
                      onValueChange={setDnaGender}
                      className="grid grid-cols-2 gap-3"
                    >
                      <RadioOption
                        value="male"
                        label="Masculino"
                        current={dnaGender}
                      />
                      <RadioOption
                        value="female"
                        label="Feminino"
                        current={dnaGender}
                      />
                    </RadioGroup>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-foreground">
                      Idade Aparente
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="120"
                      value={dnaAge}
                      onChange={(e) => setDnaAge(e.target.value)}
                      placeholder="Ex: 25"
                      className="bg-background h-[54px]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-bold text-foreground flex items-center justify-between">
                    <span>Descrição Visual Detalhada</span>
                  </Label>
                  <Textarea
                    value={dnaDescription}
                    onChange={(e) => setDnaDescription(e.target.value)}
                    placeholder="Ex: Cabelos curtos castanhos, olhos verdes expressivos, vestindo jaqueta de couro preta e camiseta branca..."
                    className="min-h-[120px] text-sm bg-background border-border/50 focus-visible:ring-primary/50"
                  />
                  <p className="text-xs text-muted-foreground font-medium">
                    Estes detalhes serão injetados em todas as cenas para
                    garantir consistência visual absoluta.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Dynamic Scenes */}
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                2. Gerador Dinâmico de Cenas
              </Label>

              <div className="space-y-5 p-6 rounded-xl border border-border bg-card shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label className="text-sm font-bold text-foreground">
                      Quantidade de Cenas
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Defina a duração da sua narrativa (1 a 8)
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold text-lg bg-primary/10 px-4 py-1.5 rounded-lg border border-primary/20">
                      {sceneCount[0]} {sceneCount[0] === 1 ? 'Cena' : 'Cenas'}
                    </span>
                  </div>
                </div>

                <div className="py-2">
                  <Slider
                    defaultValue={[1]}
                    max={8}
                    min={1}
                    step={1}
                    value={sceneCount}
                    onValueChange={setSceneCount}
                    className="py-2"
                  />
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {scenesData.map((data, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3 relative overflow-hidden group transition-all"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 group-focus-within:bg-primary transition-colors" />
                    <Label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                      Cena {idx + 1}
                    </Label>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Descreva a ação visual e/ou a fala desejada em português. (Opcional - a IA pode auto-completar a cena logicamente)"
                        value={data.idea}
                        onChange={(e) => {
                          const newContent = [...scenesData]
                          newContent[idx].idea = e.target.value
                          setScenesData(newContent)
                        }}
                        className="min-h-[80px] text-sm bg-background border-border/50 focus-visible:ring-primary/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-10">
            {/* 1. Estrutura Narrativa */}
            <section className="space-y-4">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                1. Estrutura Narrativa
              </Label>
              <RadioGroup
                value={selectedOption}
                onValueChange={setSelectedOption}
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
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
              <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                  2. Estilo de Animação
                </Label>
                <RadioGroup
                  value={cartoonStyle}
                  onValueChange={setCartoonStyle}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
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
            )}

            {/* 2/3. Perfil do Personagem */}
            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                {isCartoon ? '3.' : '2.'} Perfil do Personagem
              </Label>
              <RadioGroup
                value={selectedCharacter}
                onValueChange={setSelectedCharacter}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {nicheCharacters.map((char) => (
                  <CharacterOption
                    key={char.id}
                    char={char}
                    current={selectedCharacter}
                  />
                ))}
              </RadioGroup>

              {selectedCharacter === 'custom' && (
                <div className="mt-4 p-5 bg-primary/5 border border-primary/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                  <Label className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    Descreva seu Personagem
                  </Label>
                  <Textarea
                    value={customCharacterDesc}
                    onChange={(e) => setCustomCharacterDesc(e.target.value)}
                    placeholder="Ex: Um jovem na faixa dos 25 anos, com cabelo estilo bagunçado..."
                    className="min-h-[100px] bg-card border-border focus-visible:ring-primary/50"
                  />
                </div>
              )}
            </section>

            <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <Label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                {isCartoon ? '4.' : '3.'} Fala / Ideia da Cena (Opcional)
              </Label>
              <Textarea
                value={sceneIdea}
                onChange={(e) => setSceneIdea(e.target.value)}
                placeholder="Descreva a ação que deve acontecer ou a fala exata do personagem em português..."
                className="min-h-[120px] bg-card border-border focus-visible:ring-primary/50 text-base"
              />
              <p className="text-xs text-muted-foreground font-medium">
                Instruções visuais serão convertidas para o Inglês. A fala será
                mantida em Português do Brasil (pt-BR). Se em branco, a IA
                gerará automaticamente.
              </p>
            </section>
          </div>
        )}
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/95 backdrop-blur-xl border-t border-border z-50 flex justify-center">
        <div className="w-full max-w-4xl px-2">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-base tracking-wide shadow-lg transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            <span>GERAR PROMPT MASTER</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Options
