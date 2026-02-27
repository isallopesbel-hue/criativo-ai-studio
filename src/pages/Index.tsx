import { Link, useNavigate } from 'react-router-dom'
import { Plus, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import usePromptStore from '@/stores/usePromptStore'

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
    <div className="animate-slide-in-right px-4 pt-8 pb-6 flex flex-col gap-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-2xl mb-2">
          <span className="text-4xl">🚀</span>
        </div>
        <h2 className="text-3xl font-bold text-primary tracking-tight px-4">
          Gerador de Prompt Profissional
        </h2>
        <p className="text-muted-foreground px-8 text-sm">
          Crie comandos estruturados perfeitos para IAs geradoras de vídeo e
          imagem em segundos.
        </p>

        <div className="pt-6 px-4">
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full h-14 rounded-full bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-elevation active:scale-[0.98] transition-all"
          >
            <Plus className="mr-2 h-5 w-5" />
            Começar
          </Button>
        </div>
      </section>

      {/* History Section */}
      <section className="px-2">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground text-lg">
            Últimos Prompts
          </h3>
        </div>

        <div className="space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border border-dashed rounded-2xl">
              Nenhum prompt gerado ainda.
            </div>
          ) : (
            history.map((item) => (
              <Card
                key={item.id}
                className="p-4 cursor-pointer hover:bg-black/5 active:scale-[0.99] transition-all border-border shadow-sm group"
                onClick={() => handleOpenHistory(item)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-background border flex items-center justify-center text-2xl shrink-0 shadow-sm">
                    {item.nicheIcon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-primary/70 mb-0.5 uppercase tracking-wider">
                      {item.nicheTitle}
                    </p>
                    <p className="text-sm font-semibold text-foreground truncate">
                      {item.option}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
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
