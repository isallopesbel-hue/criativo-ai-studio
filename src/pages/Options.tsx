import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { NICHES, CHARACTERS, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Sparkles, ArrowRight, CheckCircle2, UserCircle2 } from 'lucide-react'
import {
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

const Options = () => {
  const { nicheId } = useParams()
  const navigate = useNavigate()
  const { setDraft, addResult } = usePromptStore()

  const niche = useMemo(() => NICHES.find((n) => n.id === nicheId), [nicheId])

  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')

  if (!niche) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Categoria não encontrada no sistema.
      </div>
    )
  }

  const handleGenerate = () => {
    if (!selectedOption || !selectedCharacter) return

    setDraft({ option: selectedOption, character: selectedCharacter })

    const { estilo, iluminacao } = generateMetadata(selectedOption)

    const charName =
      CHARACTERS.find((c) => c.id === selectedCharacter)?.name ||
      selectedCharacter

    const newResult = {
      id: Math.random().toString(36).substring(7),
      nicheId: niche.id,
      nicheTitle: niche.title,
      nicheIcon: niche.icon,
      option: selectedOption,
      character: charName,
      date: new Date().toISOString(),
      timeDisplay: 'agora',
      json: {
        nicho: niche.title,
        opcao: selectedOption,
        personagem: charName,
        estilo,
        iluminacao,
        data: new Date().toISOString().split('T')[0],
      },
    }

    addResult(newResult)
    navigate('/result', { state: { result: newResult, isNew: true } })
  }

  const isFormValid = selectedOption !== '' && selectedCharacter !== ''

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
            {niche.options.map((opt, i) => {
              const isSelected = selectedOption === opt
              return (
                <Label
                  key={i}
                  className={`relative flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)]'
                      : 'border-border bg-card hover:bg-secondary/80 hover:border-primary/40 hover:shadow-lg'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent blur-xl" />
                  )}

                  <div
                    className={`relative z-10 flex items-center justify-center w-6 h-6 shrink-0 rounded-full border ${isSelected ? 'border-primary text-primary' : 'border-muted-foreground/40 bg-background group-hover:border-primary/40'}`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-6 h-6 absolute -inset-[1px]" />
                    )}
                  </div>

                  <div className="relative z-10 flex-1">
                    <span
                      className={`font-semibold text-sm md:text-base leading-snug block ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-foreground/90'}`}
                    >
                      {opt}
                    </span>
                  </div>

                  <RadioGroupItem
                    value={opt}
                    id={`opt-${i}`}
                    className="sr-only"
                  />
                </Label>
              )
            })}
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
            {CHARACTERS.map((char) => {
              const isSelected = selectedCharacter === char.id
              return (
                <Label
                  key={char.id}
                  className={`relative flex flex-col p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(255,193,7,0.2)]'
                      : 'border-border bg-card hover:bg-secondary/80 hover:border-primary/40 hover:shadow-lg'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent blur-xl" />
                  )}

                  <div className="relative z-10 flex justify-between items-start w-full mb-5">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full border ${isSelected ? 'border-primary text-primary' : 'border-muted-foreground/40 bg-background group-hover:border-primary/40'}`}
                    >
                      {isSelected && (
                        <CheckCircle2 className="w-6 h-6 absolute -inset-[1px]" />
                      )}
                    </div>
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${isSelected ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-background border border-border text-muted-foreground group-hover:text-primary'}`}
                    >
                      <UserCircle2 className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <span
                      className={`font-bold text-lg block mb-1.5 ${isSelected ? 'text-primary' : 'text-foreground'}`}
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
              )
            })}
          </RadioGroup>
        </section>
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/80 backdrop-blur-xl border-t border-border z-10 flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-4xl px-2">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold text-base tracking-wide shadow-[0_0_25px_-5px_rgba(255,193,7,0.4)] transition-all duration-300 disabled:opacity-50 disabled:hover:bg-primary disabled:shadow-none"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            GERAR PROMPT MASTER
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Options
