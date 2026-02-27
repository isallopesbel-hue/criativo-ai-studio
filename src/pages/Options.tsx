import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { NICHES, CHARACTERS, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Sparkles } from 'lucide-react'

const Options = () => {
  const { nicheId } = useParams()
  const navigate = useNavigate()
  const { setDraft, addResult } = usePromptStore()

  const niche = useMemo(() => NICHES.find((n) => n.id === nicheId), [nicheId])

  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')

  if (!niche) {
    return <div className="p-8 text-center">Nicho não encontrado.</div>
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
    <div className="animate-slide-in-right px-4 py-6 flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="mb-6 flex items-center gap-3 px-1">
        <div className="h-12 w-12 rounded-xl bg-background border shadow-sm flex items-center justify-center text-2xl">
          {niche.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary leading-tight">
            {niche.title}
          </h2>
          <p className="text-muted-foreground text-xs">Configure seu prompt</p>
        </div>
      </div>

      <div className="flex-1 space-y-8 pb-20">
        {/* Options Selection */}
        <section>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3 px-1">
            1. O que deseja criar?
          </h3>
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-3"
          >
            {niche.options.map((opt, i) => (
              <Label
                key={i}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${
                  selectedOption === opt
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <RadioGroupItem
                  value={opt}
                  id={`opt-${i}`}
                  className="mt-0.5"
                />
                <span className="font-medium text-sm leading-snug">{opt}</span>
              </Label>
            ))}
          </RadioGroup>
        </section>

        <Separator />

        {/* Character Selection */}
        <section>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3 px-1">
            2. Escolha o Personagem
          </h3>
          <RadioGroup
            value={selectedCharacter}
            onValueChange={setSelectedCharacter}
            className="grid grid-cols-2 gap-3"
          >
            {CHARACTERS.map((char) => (
              <Label
                key={char.id}
                className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${
                  selectedCharacter === char.id
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex justify-between items-start w-full mb-2">
                  <RadioGroupItem value={char.id} id={`char-${char.id}`} />
                  <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-xs">
                    🎭
                  </div>
                </div>
                <span className="font-bold text-sm text-primary mt-1">
                  {char.name}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5">
                  {char.description}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </section>
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-background/90 backdrop-blur-md border-t border-border z-10">
        <Button
          onClick={handleGenerate}
          disabled={!isFormValid}
          className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-elevation transition-all"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Gerar Prompt
        </Button>
      </div>
    </div>
  )
}

export default Options
