import { useNavigate, Link } from 'react-router-dom'
import { NICHES } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'
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
  Sparkles,
  Camera,
  ArrowRight,
  Wand2,
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

const colors = [
  'text-blue-400 bg-blue-400/10 border-blue-400/20 group-hover:border-blue-400/40 group-hover:bg-blue-400/20',
  'text-emerald-400 bg-emerald-400/10 border-emerald-400/20 group-hover:border-emerald-400/40 group-hover:bg-emerald-400/20',
  'text-purple-400 bg-purple-400/10 border-purple-400/20 group-hover:border-purple-400/40 group-hover:bg-purple-400/20',
  'text-rose-400 bg-rose-400/10 border-rose-400/20 group-hover:border-rose-400/40 group-hover:bg-rose-400/20',
  'text-amber-400 bg-amber-400/10 border-amber-400/20 group-hover:border-amber-400/40 group-hover:bg-amber-400/20',
  'text-cyan-400 bg-cyan-400/10 border-cyan-400/20 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/20',
]

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
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-200 to-yellow-600 tracking-tight">
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

      {/* Special Tools Banners */}
      <section className="w-full max-w-5xl mx-auto space-y-6">
        <Link
          to="/transform"
          className="block relative overflow-hidden rounded-2xl border border-[#FFC107]/40 bg-card p-6 md:p-8 group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(255,193,7,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFC107]/10 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5 md:gap-6">
              <div className="p-4 rounded-xl bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/30 group-hover:bg-[#FFC107]/30 transition-colors">
                <Wand2 className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground group-hover:text-[#FFC107] transition-colors">
                  Ferramenta de Transformação Cinematográfica
                </h3>
                <p className="text-muted-foreground mt-1 text-sm md:text-base font-medium">
                  Transforme sua aparência em um personagem com um prompt IA 8K
                  profissional em JSON.
                </p>
              </div>
            </div>
            <div className="inline-flex bg-[#FFC107] text-black px-6 py-3 rounded-xl font-bold items-center justify-center gap-2 group-hover:bg-[#FFC107]/90 transition-colors w-full md:w-auto">
              Acessar Ferramenta <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <Link
          to="/ensaio"
          className="block relative overflow-hidden rounded-2xl border border-accent/40 bg-card p-6 md:p-8 group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(8,145,178,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5 md:gap-6">
              <div className="p-4 rounded-xl bg-accent/20 text-accent border border-accent/30 group-hover:bg-accent/30 transition-colors">
                <Camera className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground group-hover:text-accent transition-colors">
                  Ferramenta de Ensaio Fotográfico
                </h3>
                <p className="text-muted-foreground mt-1 text-sm md:text-base font-medium">
                  Faça upload de imagens de referência e gere prompts de alta
                  qualidade.
                </p>
              </div>
            </div>
            <div className="inline-flex bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold items-center justify-center gap-2 group-hover:bg-accent/90 transition-colors w-full md:w-auto">
              Acessar Ferramenta <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </section>

      {/* Categories Grid */}
      <section className="w-full max-w-5xl mx-auto pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {NICHES.map((niche, index) => {
            const colorClass = colors[index % colors.length]

            return (
              <div
                key={niche.id}
                onClick={() => handleSelectNiche(niche.id)}
                className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-card hover:bg-secondary/80 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,193,7,0.15)] transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div
                  className={`relative z-10 p-3 rounded-xl border transition-colors duration-300 ${colorClass}`}
                >
                  {getIcon(niche.icon, 'w-6 h-6')}
                </div>

                <div className="relative z-10 flex-1">
                  <h3 className="font-bold text-foreground text-base md:text-lg leading-snug group-hover:text-primary transition-colors duration-300">
                    {niche.title}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Index
