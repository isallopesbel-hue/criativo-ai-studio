import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { NICHES } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'

const Nichos = () => {
  const navigate = useNavigate()
  const { setDraft } = usePromptStore()

  const handleSelectNiche = (id: string) => {
    setDraft({ nicheId: id })
    navigate(`/options/${id}`)
  }

  return (
    <div className="animate-slide-in-right px-4 py-6">
      <div className="mb-6 px-1">
        <h2 className="text-2xl font-bold text-navy mb-1">Escolha o Nicho</h2>
        <p className="text-muted-foreground text-sm">
          Selecione a categoria para focar seu prompt.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {NICHES.map((niche) => (
          <Card
            key={niche.id}
            onClick={() => handleSelectNiche(niche.id)}
            className="group cursor-pointer p-4 flex flex-col items-center justify-center text-center gap-3 hover:border-navy/30 active:scale-95 transition-all shadow-sm h-32 border-transparent bg-white rounded-2xl"
          >
            <div className="text-3xl transition-transform group-hover:scale-110 duration-300">
              {niche.icon}
            </div>
            <h3 className="font-bold text-[13px] leading-tight text-navy">
              {niche.title}
            </h3>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Nichos
