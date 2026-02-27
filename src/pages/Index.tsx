import { useNavigate } from 'react-router-dom'
import { NICHES } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
import {
  Users,
  Shuffle,
  Palette,
  BookOpen,
  Baby,
  Ghost,
  Music,
  Bot,
  Smartphone,
  Hammer,
  Laptop,
  Package,
  Sparkles,
} from 'lucide-react'

const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, any> = {
    Users,
    Shuffle,
    Palette,
    BookOpen,
    Baby,
    Ghost,
    Music,
    Bot,
    Smartphone,
    Hammer,
    Laptop,
    Package,
  }
  const Icon = icons[iconName] || Sparkles
  return <Icon className={className} />
}

const Index = () => {
  const { clearDraft } = usePromptStore()
  const navigate = useNavigate()

  const handleSelectNiche = (nicheId: string) => {
    clearDraft()
    navigate(`/options/${nicheId}`)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center gap-12 bg-background min-h-[calc(100vh-4rem)] p-6 md:p-12">
      {/* Header Section */}
      <section className="text-center space-y-5 max-w-3xl mx-auto mt-6 md:mt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-accent tracking-tight">
          PROMPT MASTER
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-foreground tracking-wide">
          Domine a Criação de Comandos para IA
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          Gere estruturas avançadas em JSON para automatizar vídeos, campanhas e
          conteúdos de alta conversão com engenharia de prompt profissional.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="w-full max-w-5xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {NICHES.map((niche) => (
            <div
              key={niche.id}
              onClick={() => handleSelectNiche(niche.id)}
              className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-card hover:bg-secondary/60 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(251,191,36,0.2)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Glassmorphism shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-3 rounded-xl bg-background border border-border group-hover:border-primary/30 group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {getIcon(niche.icon, 'w-6 h-6')}
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="font-bold text-foreground text-base md:text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                  {niche.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Index
