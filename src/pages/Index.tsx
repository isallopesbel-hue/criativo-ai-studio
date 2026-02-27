import { useNavigate } from 'react-router-dom'
import { Rocket, BookOpen, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import usePromptStore from '@/stores/usePromptStore'

const POPULAR_NICHES = [
  { id: 'construcao', icon: '🏗️', name: 'CONSTRUÇÃO', count: 12 },
  { id: 'historias-biblicas', icon: '📖', name: 'BÍBLICO', count: 8 },
  { id: 'dark-terror', icon: '👻', name: 'TERROR', count: 6 },
  { id: 'historias-infantis', icon: '🧸', name: 'INFANTIL', count: 10 },
  { id: 'produtos-digitais', icon: '💰', name: 'PRODUTOS', count: 15 },
]

const Index = () => {
  const { history, clearDraft } = usePromptStore()
  const navigate = useNavigate()

  const handleStart = () => {
    clearDraft()
    navigate('/nichos')
  }

  const handleOpenHistory = (result: any) => {
    navigate('/result', { state: { result } })
  }

  return (
    <div className="animate-slide-in-right pb-6 flex flex-col gap-6 bg-background min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="text-center px-6 pt-10 pb-6 space-y-5">
        <h1 className="text-3xl font-bold text-navy tracking-tight">
          CRIATIVO AI STUDIO
        </h1>
        <h2 className="text-lg font-medium text-gold -mt-3">
          Gerador de Prompts Profissionais
        </h2>
        <p className="text-navy/70 text-sm leading-relaxed max-w-sm mx-auto">
          Crie comandos estruturados para IA em segundos. Mais de 50 templates
          prontos • Personagens consistentes • Exporte para Whisk, Flow e
          CapCut.
        </p>

        <div className="pt-2 space-y-3">
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full h-14 rounded-xl bg-navy hover:bg-navy/90 text-white font-bold text-[15px] shadow-lg active:scale-[0.98] transition-all"
          >
            <Rocket className="mr-2 h-5 w-5" />
            COMEÇAR AGORA
          </Button>
          <Button
            onClick={() => {}}
            size="lg"
            variant="ghost"
            className="w-full h-14 rounded-xl bg-black/5 hover:bg-black/10 text-navy font-bold text-[15px] active:scale-[0.98] transition-all"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            VER DEMO
          </Button>
        </div>
      </section>

      {/* Popular Niches Section */}
      <section className="px-0">
        <h3 className="font-bold text-navy text-sm mb-3 px-6">
          Nichos Populares
        </h3>
        <div className="flex overflow-x-auto gap-3 px-6 pb-4 snap-x hide-scrollbar">
          {POPULAR_NICHES.map((niche) => (
            <Card
              key={niche.id}
              className="min-w-[140px] snap-start shrink-0 p-4 border-none shadow-sm flex flex-col items-center justify-center text-center bg-white rounded-2xl"
            >
              <span className="text-3xl mb-2">{niche.icon}</span>
              <h4 className="font-bold text-navy text-xs tracking-wider uppercase mb-1">
                {niche.name}
              </h4>
              <p className="text-[10px] text-muted-foreground mb-3">
                {niche.count} templates
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-[11px] h-8 border-navy/20 text-navy hover:bg-navy/5 font-semibold rounded-lg"
                onClick={() => {
                  clearDraft()
                  navigate(`/options/${niche.id}`)
                }}
              >
                SELECIONAR
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className="px-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-navy/70" />
          <h3 className="font-bold text-navy text-sm">Últimos Prompts</h3>
        </div>

        <div className="space-y-2.5">
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border border-dashed border-navy/20 rounded-2xl bg-white/50">
              Nenhum prompt gerado ainda.
            </div>
          ) : (
            history.map((item) => (
              <Card
                key={item.id}
                className="p-3.5 cursor-pointer hover:bg-black/5 active:scale-[0.99] transition-all border-none shadow-sm flex flex-col justify-center bg-white rounded-xl"
                onClick={() => handleOpenHistory(item)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-navy leading-snug">
                      <span className="mr-1">{item.nicheIcon}</span>
                      <span className="uppercase">{item.nicheTitle}</span>:{' '}
                      <span className="font-normal">{item.option}</span>
                    </p>
                  </div>
                  <div className="shrink-0 text-[11px] font-medium text-navy/50 pt-0.5 whitespace-nowrap">
                    Tempo: {item.timeDisplay || 'agora'}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Index
