import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Copy, ExternalLink, Play, Sparkles, Check } from 'lucide-react'
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
      className: 'bg-mint text-navy border-none font-medium',
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
    // Attempt to open CapCut deep link
    window.location.href = 'capcut://'
    setTimeout(() => {
      toast({
        title: 'Abrindo CapCut...',
        description: 'Se o app não abrir, instale o CapCut no seu dispositivo.',
        className: 'bg-navy text-white border-none',
      })
    }, 500)
  }

  return (
    <div className="animate-slide-in-right px-4 py-6 flex flex-col gap-6 bg-background min-h-[calc(100vh-4rem)]">
      <div className="text-center space-y-1 mt-2">
        <div className="inline-flex items-center justify-center p-3 bg-mint/20 rounded-full mb-3 text-mint-foreground">
          <Sparkles className="h-7 w-7 text-mint" />
        </div>
        <h2 className="text-2xl font-bold text-navy">Prompt Pronto!</h2>
        <p className="text-navy/70 text-sm font-medium">
          Seu JSON estruturado foi gerado com sucesso.
        </p>
      </div>

      <Card className="overflow-hidden border-none shadow-lg bg-charcoal rounded-2xl">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/20">
          <span className="text-[11px] font-mono font-medium text-white/50 uppercase tracking-wider">
            prompt.json
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-white/70 hover:text-white hover:bg-white/10 h-8 gap-1.5 px-2.5 -mr-2 rounded-lg"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-mint" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="text-xs font-semibold">
              {copied ? 'COPIADO' : 'COPIAR'}
            </span>
          </Button>
        </div>

        <div className="p-4 overflow-x-auto hide-scrollbar">
          {isGenerating ? (
            <div className="animate-pulse-subtle space-y-3 py-4">
              <div className="h-4 bg-white/10 rounded w-1/4"></div>
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/10 rounded w-1/2"></div>
              <div className="h-4 bg-white/10 rounded w-2/3"></div>
              <div className="h-4 bg-white/10 rounded w-1/3"></div>
            </div>
          ) : (
            <pre className="font-mono text-[13px] leading-relaxed text-[#D4D4D4]">
              <span className="text-[#9CDCFE]">{'{'}</span>
              <br />
              <span className="text-[#9CDCFE]"> "nicho"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.nicho}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "opcao"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.opcao}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "personagem"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.personagem}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "estilo"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.estilo}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "iluminacao"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.iluminacao}"</span>
              <span className="text-[#D4D4D4]">,</span>
              <br />
              <span className="text-[#9CDCFE]"> "data"</span>
              <span className="text-[#D4D4D4]">: </span>
              <span className="text-[#CE9178]">"{result.json.data}"</span>
              <br />
              <span className="text-[#9CDCFE]">{'}'}</span>
            </pre>
          )}
        </div>
      </Card>

      <div className="space-y-4 pt-2 pb-6">
        <h3 className="font-bold text-[13px] uppercase tracking-wider text-navy/70 px-1">
          Exportar & Criar
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopy}
            variant="outline"
            className="col-span-2 h-12 rounded-xl border-2 border-navy text-navy hover:bg-navy/5 font-bold text-sm"
          >
            <Copy className="mr-2 h-4 w-4" />
            COPIAR JSON
          </Button>

          <Button
            onClick={handleWhisk}
            className="h-12 rounded-xl bg-navy hover:bg-navy/90 text-white font-bold text-sm shadow-sm"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            WHISK
          </Button>

          <Button
            onClick={handleFlow}
            className="h-12 rounded-xl bg-navy hover:bg-navy/90 text-white font-bold text-sm shadow-sm"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            FLOW
          </Button>

          <Button
            onClick={handleCapCut}
            className="col-span-2 h-14 rounded-xl bg-black hover:bg-gray-900 text-white font-bold text-[15px] shadow-lg active:scale-[0.98] transition-all mt-1"
          >
            <Play className="mr-2 h-5 w-5 fill-white" />
            ABRIR NO CAPCUT
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Result
