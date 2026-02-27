import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { NICHES, generateMetadata } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'

const Nichos = () => {
  const navigate = useNavigate()
  const { setDraft, addResult } = usePromptStore()

  const handleSelectOption = (niche: any, option: string) => {
    setDraft({ nicheId: niche.id, option })

    const { estilo, iluminacao } = generateMetadata(option)
    const charName = 'Personagem Padrão'

    const newResult = {
      id: Math.random().toString(36).substring(7),
      nicheId: niche.id,
      nicheTitle: niche.title,
      nicheIcon: niche.icon,
      option: option,
      character: charName,
      date: new Date().toISOString(),
      timeDisplay: 'agora',
      json: {
        nicho: niche.title,
        opcao: option,
        personagem: charName,
        estilo,
        iluminacao,
        data: new Date().toISOString().split('T')[0],
      },
    }

    addResult(newResult)
    navigate('/result', { state: { result: newResult, isNew: true } })
  }

  return (
    <div className="animate-slide-in-right pb-10 flex flex-col min-h-screen bg-background">
      <div className="px-5 pt-8 pb-6">
        <h1 className="text-[28px] font-bold text-navy tracking-tight uppercase leading-none">
          GERADOR DE PROMPT
        </h1>
        <h2 className="text-[20px] font-bold text-muted-foreground mt-2 leading-none">
          Profissional
        </h2>
        <p className="text-[15px] text-muted-foreground mt-3">
          Escolha o nicho para começar
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {NICHES.slice(0, 11).map((niche) => (
          <section key={niche.id} className="w-full">
            <h3 className="font-bold text-navy text-[15px] mb-3 px-5 uppercase flex items-center gap-2">
              <span className="text-xl">{niche.icon}</span> {niche.title}
            </h3>

            <div className="flex overflow-x-auto gap-4 px-5 pb-2 snap-x hide-scrollbar">
              {niche.options.map((opt, i) => (
                <Card
                  key={i}
                  onClick={() => handleSelectOption(niche, opt)}
                  className="snap-start shrink-0 w-[240px] p-4 flex flex-col justify-between cursor-pointer hover:border-navy/20 active:scale-[0.98] transition-all shadow-sm h-[120px] bg-slate-50 border border-slate-100 rounded-[10px]"
                >
                  <p className="font-semibold text-[14px] leading-snug text-navy line-clamp-2">
                    {opt}
                  </p>
                  <span className="text-blue-600 font-bold text-[12px] uppercase tracking-wide flex items-center">
                    GERAR PROMPT &rarr;
                  </span>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Nichos
