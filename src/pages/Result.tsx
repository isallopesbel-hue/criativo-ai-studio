import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Copy, ExternalLink, Play, Sparkles, Check, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

const Result = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const result = location.state?.result
  const isNew = location.state?.isNew || false

  const [isGenerating, setIsGenerating] = useState(isNew)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!result) {
      navigate('/')
      return
    }

    if (isNew) {
      const timer = setTimeout(() => {
        setIsGenerating(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [result, isNew, navigate])

  if (!result) return null

  const jsonString = JSON.stringify(result.json, null, 2)

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    toast({
      title: 'Copiado com sucesso!',
      description: 'O JSON foi copiado para a área de transferência.',
      className: 'bg-green-600 text-white border-none font-medium',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhisk = () => {
    window.open(
      `https://labs.google/whisk?prompt=${encodeURIComponent(jsonString)}`,
      '_blank',
    )
  }

  const handleFlow = () => {
    window.open(
      `https://labs.google/flow?prompt=${encodeURIComponent(jsonString)}`,
      '_blank',
    )
  }

  const handleCapCut = () => {
    window.location.href = 'capcut://'
    setTimeout(() => {
      toast({
        title: 'Abrindo CapCut...',
        description: 'Se o app não abrir, instale o CapCut no seu dispositivo.',
        className: 'bg-[#0A111F] text-white border-white/20',
      })
    }, 500)
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 md:p-12 flex flex-col gap-8 min-h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full">
      <div className="text-center space-y-2 mt-4">
        <div className="inline-flex items-center justify-center p-4 bg-yellow-400/10 rounded-full mb-2 border border-yellow-400/20 shadow-[0_0_20px_rgba(250,204,21,0.15)]">
          <Sparkles className="h-8 w-8 text-yellow-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-tight">
          Prompt Pronto!
        </h2>
        <p className="text-cyan-400 text-sm md:text-base font-medium">
          Seu JSON estruturado foi gerado com sucesso e está pronto para uso.
        </p>
      </div>

      <Card className="overflow-hidden border border-white/10 shadow-2xl bg-[#0A111F] rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2 text-white/50">
            <Code2 className="h-4 w-4" />
            <span className="text-xs font-mono font-medium tracking-wider">
              prompt.json
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 h-8 gap-1.5 px-3 rounded-lg border border-yellow-400/20"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="text-xs font-semibold">
              {copied ? 'COPIADO' : 'COPIAR'}
            </span>
          </Button>
        </div>

        <div className="p-5 md:p-6 overflow-x-auto hide-scrollbar bg-[#050A0F]">
          {isGenerating ? (
            <div className="animate-pulse space-y-3 py-4">
              <div className="h-4 bg-white/5 rounded w-1/4"></div>
              <div className="h-4 bg-white/5 rounded w-3/4"></div>
              <div className="h-4 bg-white/5 rounded w-1/2"></div>
              <div className="h-4 bg-white/5 rounded w-2/3"></div>
              <div className="h-4 bg-white/5 rounded w-1/3"></div>
            </div>
          ) : (
            <pre className="font-mono text-sm md:text-[15px] leading-relaxed text-[#E5E7EB]">
              <span className="text-[#38BDF8]">{'{'}</span>
              <br />
              <span className="text-[#38BDF8]"> "nicho"</span>
              <span className="text-[#9CA3AF]">: </span>
              <span className="text-[#FACC15]">"{result.json.nicho}"</span>
              <span className="text-[#9CA3AF]">,</span>
              <br />
              <span className="text-[#38BDF8]"> "opcao"</span>
              <span className="text-[#9CA3AF]">: </span>
              <span className="text-[#FACC15]">"{result.json.opcao}"</span>
              <span className="text-[#9CA3AF]">,</span>
              <br />
              <span className="text-[#38BDF8]"> "personagem"</span>
              <span className="text-[#9CA3AF]">: </span>
              <span className="text-[#FACC15]">"{result.json.personagem}"</span>
              <span className="text-[#9CA3AF]">,</span>
              <br />
              <span className="text-[#38BDF8]"> "estilo"</span>
              <span className="text-[#9CA3AF]">: </span>
              <span className="text-[#FACC15]">"{result.json.estilo}"</span>
              <span className="text-[#9CA3AF]">,</span>
              <br />
              <span className="text-[#38BDF8]"> "iluminacao"</span>
              <span className="text-[#9CA3AF]">: </span>
              <span className="text-[#FACC15]">"{result.json.iluminacao}"</span>
              <span className="text-[#9CA3AF]">,</span>
              <br />
              <span className="text-[#38BDF8]"> "data"</span>
              <span className="text-[#9CA3AF]">: </span>
              <span className="text-[#FACC15]">"{result.json.data}"</span>
              <br />
              <span className="text-[#38BDF8]">{'}'}</span>
            </pre>
          )}
        </div>
      </Card>

      <div className="space-y-4 pb-12">
        <h3 className="font-bold text-sm uppercase tracking-wider text-white/50 px-1 flex items-center justify-center md:justify-start gap-2">
          Exportar & Criar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="h-12 md:h-14 rounded-xl border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 font-bold text-sm bg-transparent"
          >
            <Copy className="mr-2 h-4 w-4" />
            COPIAR JSON
          </Button>

          <Button
            onClick={handleWhisk}
            className="h-12 md:h-14 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            ABRIR WHISK
          </Button>

          <Button
            onClick={handleFlow}
            className="h-12 md:h-14 rounded-xl bg-[#7ED4AD] hover:bg-[#6BC19A] text-[#0A1F33] font-bold text-sm shadow-lg"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            ABRIR FLOW
          </Button>

          <Button
            onClick={handleCapCut}
            className="h-12 md:h-14 rounded-xl bg-[#FF6B4A] hover:bg-[#E55A39] text-white font-bold text-sm shadow-lg"
          >
            <Play className="mr-2 h-4 w-4 fill-white" />
            CAPCUT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Result
