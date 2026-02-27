import { useNavigate } from 'react-router-dom'
import { NICHES } from '@/lib/data'
import usePromptStore from '@/stores/usePromptStore'

const Index = () => {
  const { clearDraft } = usePromptStore()
  const navigate = useNavigate()

  const handleSelectNiche = (nicheId: string) => {
    clearDraft()
    navigate(`/options/${nicheId}`)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center gap-10 bg-background min-h-[calc(100vh-4rem)] p-6 md:p-12">
      {/* Header Section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto mt-4 md:mt-8">
        <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 tracking-tight">
          Gerador de Prompt Profissional
        </h1>
        <h2 className="text-lg md:text-xl font-medium text-white">
          Ferramentas Exclusivas do Canal Play Money
        </h2>
        <p className="text-cyan-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Gere vídeos automáticos com IA para redes sociais, canais, anúncios e
          muito mais em poucos cliques!
        </p>
      </section>

      {/* Categories Grid */}
      <section className="w-full max-w-5xl mx-auto pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {NICHES.map((niche) => (
            <div
              key={niche.id}
              onClick={() => handleSelectNiche(niche.id)}
              className="flex items-center gap-4 p-4 md:p-5 rounded-xl border border-white/10 bg-[#0A111F] hover:bg-[#111A2E] hover:border-yellow-400/50 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(250,204,21,0.1)] transition-all cursor-pointer group"
            >
              <div className="text-2xl md:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {niche.icon}
              </div>
              <h3 className="font-semibold text-white text-sm md:text-base leading-snug">
                {niche.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Index
