import { useParams, useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { NICHES, CHARACTERS, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Sparkles, ArrowRight } from 'lucide-react'

const Options = () => {
  const { nicheId } = useParams()
  const navigate = useNavigate()
  const { setDraft, addResult } = usePromptStore()

  const niche = useMemo(() => NICHES.find((n) => n.id === nicheId), [nicheId])

  const [selectedOption, setSelectedOption] = useState<string>('')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')

  if (!niche) {
    return (
      <div className="p-8 text-center text-white">Nicho não encontrado.</div>
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
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#0A111F] border border-white/10 shadow-lg flex items-center justify-center text-3xl">
          {niche.icon}
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 leading-tight">
            {niche.title}
          </h2>
          <p className="text-cyan-400 text-sm font-medium mt-1">
            Configure as opções para o seu prompt
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-8 pb-24">
        {/* Options Selection */}
        <section>
          <h3 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4 flex items-center gap-2">
            <span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              1
            </span>
            O que deseja criar?
          </h3>
          <RadioGroup
            value={selectedOption}
            onValueChange={setSelectedOption}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {niche.options.map((opt, i) => (
              <Label
                key={i}
                className={`flex items-start gap-3 p-4 rounded-xl border border-white/10 cursor-pointer transition-all hover:scale-[1.01] ${
                  selectedOption === opt
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.1)]'
                    : 'bg-[#0A111F] hover:bg-[#111A2E] hover:border-white/30'
                }`}
              >
                <RadioGroupItem
                  value={opt}
                  id={`opt-${i}`}
                  className="mt-0.5 shrink-0 border-white/50 text-yellow-400 data-[state=checked]:border-yellow-400"
                />
                <span className="font-semibold text-sm leading-snug text-white">
                  {opt}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </section>

        <Separator className="bg-white/10" />

        {/* Character Selection */}
        <section>
          <h3 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4 flex items-center gap-2">
            <span className="bg-white/10 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              2
            </span>
            Escolha o Personagem
          </h3>
          <RadioGroup
            value={selectedCharacter}
            onValueChange={setSelectedCharacter}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {CHARACTERS.map((char) => (
              <Label
                key={char.id}
                className={`flex flex-col p-4 rounded-xl border border-white/10 cursor-pointer transition-all hover:scale-[1.01] ${
                  selectedCharacter === char.id
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-[0_0_15px_rgba(250,204,21,0.1)]'
                    : 'bg-[#0A111F] hover:bg-[#111A2E] hover:border-white/30'
                }`}
              >
                <div className="flex justify-between items-start w-full mb-3">
                  <RadioGroupItem
                    value={char.id}
                    id={`char-${char.id}`}
                    className="border-white/50 text-yellow-400 data-[state=checked]:border-yellow-400"
                  />
                  <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-sm border border-white/10">
                    🎭
                  </div>
                </div>
                <span className="font-bold text-sm text-white">
                  {char.name}
                </span>
                <span className="text-xs font-medium text-cyan-400/70 mt-1 leading-tight">
                  {char.description}
                </span>
              </Label>
            ))}
          </RadioGroup>
        </section>
      </div>

      {/* Fixed Footer CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-background/90 backdrop-blur-md border-t border-white/10 z-10 flex justify-center">
        <div className="w-full max-w-4xl px-2">
          <Button
            onClick={handleGenerate}
            disabled={!isFormValid}
            className="w-full h-14 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base shadow-[0_0_20px_rgba(250,204,21,0.2)] transition-all disabled:opacity-50 disabled:hover:bg-yellow-400 disabled:shadow-none"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            GERAR PROMPT AGORA
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Options
