import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { NICHES, CHARACTERS, generateMetadata } from '@/lib/data'
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

// Reusable Radio Option Component to keep code DRY
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
          ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)]'
          : 'border-border bg-card hover:bg-secondary/80 hover:border-primary/40 hover:shadow-lg'
      }`}
    >
      {isSelected && (
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent blur-xl" />
      )}

      <div
        className={`relative z-10 flex items-center justify-center w-6 h-6 shrink-0 rounded-full border ${
          isSelected
            ? 'border-primary text-primary'
            : 'border-muted-foreground/40 bg-background group-hover:border-primary/40'
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
                ? 'text-primary'
                : 'text-muted-foreground group-hover:text-primary/70'
            }`}
          />
        </div>
      )}

      <div className="relative z-10 flex-1">
        <span
          className={`font-semibold text-sm md:text-base leading-snug block ${
            isSelected
              ? 'text-primary'
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

  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')

  // New states for Consistent Character feature
  const [sceneCount, setSceneCount] = useState<number[]>([1])
  const [narrativeMode, setNarrativeMode] = useState<string>('narration')
  const [gender, setGender] = useState<string>('female')
  const [age, setAge] = useState<string>('25')
  const [scenesContent, setScenesContent] = useState<string[]>([''])

  useEffect(() => {
    if (isConsistentCharacter) {
      setScenesContent((prev) => {
        const count = sceneCount[0]
        if (prev.length === count) return prev
        if (prev.length < count) {
          return [...prev, ...Array(count - prev.length).fill('')]
        }
        return prev.slice(0, count)
      })
    }
  }, [sceneCount, isConsistentCharacter])

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

  const isFormValid = useMemo(() => {
    let valid = selectedOption !== '' && selectedCharacter !== ''
    if (isConsistentCharacter) {
      const scenesValid = scenesContent.every((s) => s.trim() !== '')
      valid = valid && age.trim() !== '' && scenesValid
    }
    return valid
  }, [
    selectedOption,
    selectedCharacter,
    isConsistentCharacter,
    scenesContent,
    age,
  ])

  const handleGenerate = () => {
    if (!isFormValid) return

    setDraft({ option: selectedOption, character: selectedCharacter })

    const { estilo, iluminacao } = generateMetadata(selectedOption)
    const charName =
      CHARACTERS.find((c) => c.id === selectedCharacter)?.name ||
      selectedCharacter

    let jsonPayload: any = {}

    if (isConsistentCharacter) {
      jsonPayload = {
        task: 'consistent_character_storytelling',
        niche: niche.title,
        concept: selectedOption,
        quality_settings: '8K ultra-realistic, Cinematic Quality',
        style: estilo,
        lighting: iluminacao,
        character_profile: {
          base_character: charName,
          gender: gender,
          age: parseInt(age, 10),
          voice_profile: getVoiceProfile(gender, age),
        },
        narrative_type: narrativeMode,
        scene_count: sceneCount[0],
        scenes: scenesContent.map((desc, idx) => ({
          [`scene_${idx + 1}`]: desc,
        })),
      }
    } else {
      jsonPayload = {
        nicho: niche.title,
        opcao: selectedOption,
        personagem: charName,
        estilo,
        iluminacao,
        data: new Date().toISOString().split('T')[0],
      }
    }

    const newResult = {
      id: Math.random().toString(36).substring(7),
      nicheId: niche.id,
      nicheTitle: niche.title,
      nicheIcon: niche.icon,
      option: selectedOption,
      character: charName,
      date: new Date().toISOString(),
      timeDisplay: 'agora',
      json: jsonPayload,
    }

    addResult(newResult)
    navigate('/result', { state: { result: newResult, isNew: true } })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className="h-20 w-20 shrink-0 rounded-2xl bg-card border border-border shadow-lg flex items-center justify-center text-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
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
        {/* Options Selection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-primary/20">
              1
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
                value={opt}
                label={opt}
                current={selectedOption}
              />
            ))}
          </RadioGroup>
        </section>

        <Separator className="bg-border" />

        {/* Character Selection */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-primary/20">
              2
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
            {CHARACTERS.map((char) => (
              <Label
                key={char.id}
                className={`relative flex flex-col p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                  selectedCharacter === char.id
                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)]'
                    : 'border-border bg-card hover:bg-secondary/80 hover:border-primary/40 hover:shadow-lg'
                }`}
              >
                {selectedCharacter === char.id && (
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent blur-xl" />
                )}

                <div className="relative z-10 flex justify-between items-start w-full mb-5">
                  <div
                    className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                      selectedCharacter === char.id
                        ? 'border-primary text-primary'
                        : 'border-muted-foreground/40 bg-background group-hover:border-primary/40'
                    }`}
                  >
                    {selectedCharacter === char.id && (
                      <CheckCircle2 className="w-6 h-6 absolute -inset-[1px]" />
                    )}
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      selectedCharacter === char.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-background border border-border text-muted-foreground group-hover:text-primary'
                    }`}
                  >
                    <UserCircle2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="relative z-10">
                  <span
                    className={`font-bold text-lg block mb-1.5 ${
                      selectedCharacter === char.id
                        ? 'text-primary'
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
        </section>

        {isConsistentCharacter && (
          <>
            <Separator className="bg-border" />

            {/* Story Configuration */}
            <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-primary/20">
                  3
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
                    <span className="text-primary font-bold text-lg bg-primary/10 px-3 py-1 rounded-md">
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
                      label="Narration"
                      description="Voiceover reading the story"
                      icon={Mic}
                      current={narrativeMode}
                    />
                    <RadioOption
                      value="dialogue"
                      label="Character Dialogue"
                      description="Character speaking directly"
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
                <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-primary/20">
                  4
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
                      label="Male"
                      icon={Mars}
                      current={gender}
                    />
                    <RadioOption
                      value="female"
                      label="Female"
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
                <div className="bg-primary/10 text-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border border-primary/20">
                  5
                </div>
                <h3 className="font-bold text-base uppercase tracking-widest text-foreground">
                  Roteiro das Cenas
                </h3>
              </div>

              <div className="space-y-6">
                {scenesContent.map((content, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 p-5 rounded-2xl border border-border bg-card shadow-sm"
                  >
                    <Label className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Cena {idx + 1}
                    </Label>
                    <Textarea
                      placeholder={`Describe actions, environment, and story details for Scene ${
                        idx + 1
                      } (in English or Portuguese)...`}
                      value={content}
                      onChange={(e) => {
                        const newContent = [...scenesContent]
                        newContent[idx] = e.target.value
                        setScenesContent(newContent)
                      }}
                      className="min-h-[100px] text-sm border-muted-foreground/20 focus-visible:ring-primary/40 bg-background/50"
                    />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/80 backdrop-blur-xl border-t border-border z-10 flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-4xl px-2">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-base tracking-wide shadow-[0_0_25px_-5px_rgba(255,193,7,0.4)] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-primary disabled:shadow-none"
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
