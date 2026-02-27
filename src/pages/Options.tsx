import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { NICHES, CHARACTERS, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import { Button } from '@/components/ui/button'
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
    return (
      <div className="p-8 text-center text-navy">Nicho não encontrado.</div>
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
    <div className="animate-slide-in-right px-4 py-6 flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      <div className="mb-6 flex items-center gap-3 px-1">
        <div className="h-12 w-12 rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center text-2xl">
          {niche.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-navy leading-tight">
            {niche.title}
          </h2>
          <p className="text-gold text-xs font-medium mt-0.5">
            Configure seu prompt
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-6 pb-24">
        {/* Options Selection */}
        <section>
          <h3 className="font-bold text-[13px] uppercase tracking-wider text-navy/70 mb-3 px-1">
            1. O que deseja criar?
          </h3>
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="space-y-2.5"
          >
            {niche.options.map((opt, i) => (
              <Label
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                  selectedOption === opt
                    ? 'border-navy bg-navy/5 shadow-sm'
                    : 'border-transparent bg-white hover:border-navy/20'
                }`}
              >
                <RadioGroupItem
                  value={opt}
                  id={`opt-${i}`}
                  className="mt-0.5 shrink-0"
                />
                <span className="font-semibold text-sm leading-snug text-navy">
                  {opt}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </section>

        <Separator className="bg-navy/10" />

        {/* Character Selection */}
        <section>
          <h3 className="font-bold text-[13px] uppercase tracking-wider text-navy/70 mb-3 px-1">
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
                className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all active:scale-[0.98] ${
                  selectedCharacter === char.id
                    ? 'border-navy bg-navy/5 shadow-sm'
                    : 'border-transparent bg-white hover:border-navy/20'
                }`}
              >
                <div className="flex justify-between items-start w-full mb-3">
                  <RadioGroupItem value={char.id} id={`char-${char.id}`} />
                  <div className="h-8 w-8 rounded-full bg-[#F5F0E9] flex items-center justify-center text-sm shadow-inner">
                    🎭
                  </div>
                </div>
                <span className="font-bold text-sm text-navy">{char.name}</span>
                <span className="text-[11px] font-medium text-navy/60 mt-0.5 leading-tight">
                  {char.description}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </section>
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-background/90 backdrop-blur-md border-t border-navy/5 z-10">
        <Button
          onClick={handleGenerate}
          disabled={!isFormValid}
          className="w-full h-14 rounded-xl bg-navy hover:bg-navy/90 text-white font-bold text-[15px] shadow-lg transition-all"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          GERAR PROMPT
        </Button>
      </div>
    </div>
  )
}

export default Options
